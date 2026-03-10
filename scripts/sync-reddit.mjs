
import { existsSync, readFileSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const redditRoot = path.resolve(projectRoot, 'frontend/src/assets/Reddit')
const outputPath = path.resolve(projectRoot, 'frontend/src/data/reddit.json')

const defaultData = {
  profile: {
    username: 'aibnsamin1',
    url: 'https://www.reddit.com/user/aibnsamin1/',
  },
  latestPost: {
    label: 'Most Recent Reddit Post',
    title: 'Latest Reddit Activity',
    description: 'Newest contribution and community discussion entry.',
    link: 'https://www.reddit.com/user/aibnsamin1/',
    cta: 'Open Reddit',
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
  return (value ?? '').replace(/\s+/g, ' ').trim()
}

function parseUtcDate(value) {
  return value ? Date.parse(value.replace(' UTC', 'Z')) : Number.NaN
}
function buildFromLocalExport() {
  const statsPath = path.join(redditRoot, 'statistics.csv')
  const postsPath = path.join(redditRoot, 'posts.csv')

  if (!existsSync(statsPath) || !existsSync(postsPath)) {
    return null
  }

  const statistics = rowsToObjects(parseCsv(readFileSync(statsPath, 'utf8')))
  const username = statistics.find((row) => row.statistic === 'account name')?.value || defaultData.profile.username
  const profileUrl = `https://www.reddit.com/user/${username}/`

  const posts = rowsToObjects(parseCsv(readFileSync(postsPath, 'utf8')))
    .filter((post) => post.permalink && post.title && post.title !== '[deleted by user]')
    .sort((a, b) => parseUtcDate(b.date) - parseUtcDate(a.date))

  const latest = posts.find((post) => /occidentalism/i.test(`${post.title} ${post.body}`)) ?? posts[0]
  if (!latest) {
    return {
      ...defaultData,
      profile: { username, url: profileUrl },
      fetchedAt: new Date().toISOString(),
      source: 'local-export',
    }
  }

  const description = [
    latest.subreddit ? `r/${latest.subreddit}` : '',
    stripMarkup(latest.body),
  ]
    .filter(Boolean)
    .join(' - ')
    .slice(0, 280)

  return {
    profile: {
      username,
      url: profileUrl,
    },
    latestPost: {
      label: 'Most Recent Reddit Post',
      title: latest.title,
      description: description || defaultData.latestPost.description,
      link: latest.permalink,
      cta: 'Open Reddit post',
    },
    fetchedAt: new Date().toISOString(),
    source: 'local-export',
  }
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true })

  const data = buildFromLocalExport()
  if (!data) {
    console.warn('Skipping Reddit sync: no local Reddit export found.')
    return
  }

  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`Saved Reddit data from local export to ${outputPath}`)
}

main().catch(async (error) => {
  console.error('Reddit sync failed:', error.message)
  try {
    const current = await readFile(outputPath, 'utf8')
    console.warn(`Keeping existing cached data at ${outputPath} (${current.length} bytes).`)
  } catch {
    await writeFile(outputPath, `${JSON.stringify(defaultData, null, 2)}\n`, 'utf8')
    console.warn(`Wrote default Reddit data to ${outputPath}.`)
  }
})
