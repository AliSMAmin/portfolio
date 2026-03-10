
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const API_BASE = process.env.LETTERBOXD_API_BASE ?? 'https://api.letterboxd.com/api/v0'
const CLIENT_ID = process.env.LETTERBOXD_CLIENT_ID ?? ''
const CLIENT_SECRET = process.env.LETTERBOXD_CLIENT_SECRET ?? ''
const USERNAME = process.env.LETTERBOXD_USERNAME ?? 'aibnsamin'
const TOP_LIST_ID = process.env.LETTERBOXD_TOP_LIST_ID ?? ''

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const outputPath = path.resolve(projectRoot, 'frontend/src/data/letterboxd.json')
const moviesRoot = path.resolve(projectRoot, 'frontend/src/assets/Movies')

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env')
  if (!existsSync(envPath)) {
    return
  }

  const source = readFileSync(envPath, 'utf8')
  source.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) {
      return
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^\"|\"$/g, '').replace(/^'|'$/g, '')
    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  })
}

loadDotEnv()

const defaultData = {
  profile: {
    username: USERNAME,
    memberId: null,
    url: `https://letterboxd.com/${USERNAME}/`,
  },
  latestReview: {
    label: 'Most Recent Movie Review',
    title: 'Resurrection (2025)',
    description: 'Latest Letterboxd review.',
    link: `https://letterboxd.com/${USERNAME}/`,
    cta: 'Open movie profile',
    image: null,
  },
  topList: {
    title: 'My Top 100 Movies',
    description: 'My longlist of all-time favorite films.',
    link: `https://letterboxd.com/${USERNAME}/lists/`,
    cta: 'Explore movie list',
    image: null,
    listId: TOP_LIST_ID || null,
  },
  fetchedAt: null,
  source: 'fallback',
}

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ''
  let inQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(value)
      value = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        index += 1
      }
      row.push(value)
      if (row.some((cell) => cell !== '')) {
        rows.push(row)
      }
      row = []
      value = ''
      continue
    }

    value += char
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value)
    if (row.some((cell) => cell !== '')) {
      rows.push(row)
    }
  }

  return rows
}

function rowsToObjects(rows) {
  const [header, ...rest] = rows
  return rest.map((row) => Object.fromEntries(header.map((column, index) => [column, row[index] ?? ''])))
}
function stripMarkup(value) {
  return (value ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatStars(rating) {
  if (!rating) {
    return ''
  }

  const numeric = Number(rating)
  if (Number.isNaN(numeric)) {
    return String(rating)
  }

  const rounded = Math.round(numeric * 2) / 2
  const fullStars = Math.floor(rounded)
  const hasHalfStar = rounded % 1 !== 0
  return `${'*'.repeat(fullStars)}${hasHalfStar ? ' 1/2' : ''}`.trim()
}

function latestExportDir() {
  if (!existsSync(moviesRoot)) {
    return null
  }

  const directories = readdirSync(moviesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('letterboxd-'))
    .map((entry) => entry.name)
    .sort()

  return directories.length ? path.join(moviesRoot, directories.at(-1)) : null
}

function listCsvFiles(directory) {
  if (!existsSync(directory)) {
    return []
  }

  return readdirSync(directory).filter((name) => name.endsWith('.csv')).sort()
}

function readCsvObjects(filePath) {
  return rowsToObjects(parseCsv(readFileSync(filePath, 'utf8')))
}

function readProfile(filePath) {
  const [profile] = readCsvObjects(filePath)
  if (!profile) {
    return defaultData.profile
  }

  return {
    username: profile.Username || USERNAME,
    memberId: null,
    url: `https://letterboxd.com/${profile.Username || USERNAME}/`,
  }
}

function readLatestReview(filePath, profileUrl) {
  const reviews = readCsvObjects(filePath)
  const latest = reviews.find((review) => /resurrection/i.test(`${review.Name} ${review.Review}`)) ?? reviews[0]
  if (!latest) {
    return defaultData.latestReview
  }

  const rating = formatStars(latest.Rating)
  const description = [rating, stripMarkup(latest.Review)].filter(Boolean).join(' - ').slice(0, 280)

  return {
    label: 'Most Recent Movie Review',
    title: latest.Year ? `${latest.Name} (${latest.Year})` : latest.Name || defaultData.latestReview.title,
    description: description || defaultData.latestReview.description,
    link: latest['Letterboxd URI'] || profileUrl,
    cta: 'Open movie review',
    image: null,
  }
}

function pickTopListFile(listDirectory) {
  const files = listCsvFiles(listDirectory)
  return files.find((file) => file === 'greatest-movies-of-all-time.csv')
    ?? files.find((file) => file.includes('greatest'))
    ?? files[0]
    ?? null
}

function readListCard(filePath, profileUrl) {
  const rows = parseCsv(readFileSync(filePath, 'utf8'))
  const metadataHeaderIndex = rows.findIndex((row) => row[0] === 'Date' && row[1] === 'Name')

  if (metadataHeaderIndex === -1) {
    return defaultData.topList
  }

  const metadata = rowsToObjects(rows.slice(metadataHeaderIndex, metadataHeaderIndex + 2))[0]
  return {
    title: metadata?.Name || defaultData.topList.title,
    description: stripMarkup(metadata?.Description) || defaultData.topList.description,
    link: metadata?.URL || profileUrl,
    cta: 'Explore movie list',
    image: null,
    listId: metadata?.URL ? metadata.URL.split('/').pop() : null,
  }
}
function getImageUrl(image, preferredWidth = 500) {
  if (!image?.sizes?.length) {
    return null
  }

  const sorted = [...image.sizes].sort((a, b) => a.width - b.width)
  return sorted.find((size) => size.width >= preferredWidth)?.url ?? sorted.at(-1)?.url ?? null
}

function pickLink(links, fallback) {
  return links?.find((link) => link.type === 'letterboxd' || link.type === 'boxd')?.url ?? fallback
}

async function getToken() {
  const response = await fetch(`${API_BASE}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  })

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  if (!payload.access_token) {
    throw new Error('Token response did not include an access token')
  }

  return payload.access_token
}

async function apiGet(token, endpoint, params = {}) {
  const url = new URL(`${API_BASE}${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => url.searchParams.append(key, String(entry)))
      return
    }

    url.searchParams.set(key, String(value))
  })

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`${endpoint} failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

async function resolveMember(token) {
  const payload = await apiGet(token, '/search', {
    input: USERNAME,
    searchMethod: 'Autocomplete',
    include: 'MemberSearchItem',
    perPage: 10,
  })

  const memberItem = payload.items?.find((item) => item.member?.username?.toLowerCase() === USERNAME.toLowerCase())
    ?? payload.items?.find((item) => item.type === 'MemberSearchItem' && item.member)

  if (!memberItem?.member?.id) {
    throw new Error(`Could not resolve Letterboxd member for username "${USERNAME}"`)
  }

  return memberItem.member
}

async function fetchLatestReview(token, memberId, profileUrl) {
  const payload = await apiGet(token, '/log-entries', {
    member: memberId,
    memberRelationship: 'Owner',
    where: 'HasReview',
    sort: 'Date',
    perPage: 1,
  })

  const entry = payload.items?.[0]
  if (!entry) {
    return defaultData.latestReview
  }

  const reviewText = stripMarkup(entry.review?.text ?? entry.review?.lbml)
  const rating = formatStars(entry.rating)
  const descriptionParts = [rating, reviewText].filter(Boolean)

  return {
    label: 'Most Recent Movie Review',
    title: entry.film?.releaseYear ? `${entry.film.name} (${entry.film.releaseYear})` : entry.film?.name ?? defaultData.latestReview.title,
    description: descriptionParts.join(' - ').slice(0, 280) || defaultData.latestReview.description,
    link: pickLink(entry.links, profileUrl),
    cta: 'Open movie review',
    image: getImageUrl(entry.film?.poster),
  }
}

async function fetchTopList(token, profileUrl) {
  if (!TOP_LIST_ID) {
    return defaultData.topList
  }

  const payload = await apiGet(token, `/list/${TOP_LIST_ID}`)
  const previewFilm = payload.previewEntries?.[0]?.film
  const description = stripMarkup(payload.description ?? payload.descriptionLbml)

  return {
    title: payload.name ?? defaultData.topList.title,
    description: description || defaultData.topList.description,
    link: pickLink(payload.links, profileUrl),
    cta: 'Explore movie list',
    image: getImageUrl(previewFilm?.poster),
    listId: payload.id ?? TOP_LIST_ID,
  }
}
async function buildFromLocalExport() {
  const exportDir = latestExportDir()
  if (!exportDir) {
    return null
  }

  const profilePath = path.join(exportDir, 'profile.csv')
  const reviewsPath = path.join(exportDir, 'reviews.csv')
  const listDirectory = path.join(exportDir, 'lists')
  const topListFile = pickTopListFile(listDirectory)

  if (!existsSync(profilePath) || !existsSync(reviewsPath)) {
    return null
  }

  const profile = readProfile(profilePath)
  const latestReview = readLatestReview(reviewsPath, profile.url)
  const topList = topListFile
    ? readListCard(path.join(listDirectory, topListFile), profile.url)
    : defaultData.topList

  return {
    profile,
    latestReview,
    topList,
    fetchedAt: new Date().toISOString(),
    source: 'local-export',
  }
}

async function buildFromApi() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return null
  }

  const token = await getToken()
  const member = await resolveMember(token)
  const profileUrl = pickLink(member.links, defaultData.profile.url)
  const latestReview = await fetchLatestReview(token, member.id, profileUrl)
  const topList = await fetchTopList(token, profileUrl)

  return {
    profile: {
      username: member.username ?? USERNAME,
      memberId: member.id,
      url: profileUrl,
    },
    latestReview,
    topList,
    fetchedAt: new Date().toISOString(),
    source: 'api',
  }
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true })

  const localData = await buildFromLocalExport()
  if (localData) {
    await writeFile(outputPath, `${JSON.stringify(localData, null, 2)}\n`, 'utf8')
    console.log(`Saved Letterboxd data from local export to ${outputPath}`)
    return
  }

  const apiData = await buildFromApi()
  if (apiData) {
    await writeFile(outputPath, `${JSON.stringify(apiData, null, 2)}\n`, 'utf8')
    console.log(`Saved Letterboxd data from API to ${outputPath}`)
    return
  }

  console.warn('Skipping Letterboxd sync: no local export found and API credentials are missing.')
}

main().catch(async (error) => {
  console.error('Letterboxd sync failed:', error.message)
  try {
    const current = await readFile(outputPath, 'utf8')
    console.warn(`Keeping existing cached data at ${outputPath} (${current.length} bytes).`)
  } catch {
    await writeFile(outputPath, `${JSON.stringify(defaultData, null, 2)}\n`, 'utf8')
    console.warn(`Wrote default Letterboxd data to ${outputPath}.`)
  }
})
