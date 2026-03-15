import { useEffect, useMemo, useState } from 'react'
import './App.css'
import letterboxdData from './data/letterboxd.json'
import redditData from './data/reddit.json'

import aliPortrait from './assets/PicturesOfAli/9.3 (8.9).jpg'
import aliSuitPortrait from './assets/PicturesOfAli/8.7 (8.7) Suit (Editted).jpg'
import bitcoinBookCover from './assets/Publications/Is Bitcoin Halal.jpg'
import enderalCover from './assets/Games/CurrentlyPlaying/Enderal.jpg'
import salafismCover from './assets/Books/CurrentReads/understanding-salafism-9781786078483_hr-923828085.jpg'
import awsCert from './assets/secularDiplomas/AWS/AWS-SAA.png'
import blockchainCert from './assets/secularDiplomas/Blockchain/Certified Blockchain Expert.png'
import mastersDegree from './assets/secularDiplomas/Degrees/mastersdegree.png'
import youtubeIcon from './assets/Icons/youtube.png'
import githubIcon from './assets/Icons/github.png'
import redditIcon from './assets/Icons/Reddit-Logo-1958974045.jpg'
import stashIcon from './assets/Icons/stash-game-collection-tracker-logo-766785159.jpg'
import letterboxdIcon from './assets/Icons/letterboxd-logo-alt-v-neg-rgb-1000px.png'
import storyGraphIcon from './assets/Icons/Logo_for_The_StoryGraph.png'
import beliIcon from './assets/Icons/Beli+Logo_FINAL070423.webp'
import whatsappIcon from './assets/Icons/whatsapp-logo-vector-11573849504ftryug0qkh-3425029298.png'
import linkedinIcon from './assets/Icons/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector-3472963540.jpg'
import favoriteBooksCover from './assets/Books/FavoriteBooks/Screenshot 2026-02-21 133002.png'
import favoriteGameCover from './assets/Games/Favorites/AssassinsCreed.webp'
import currentGameCover from './assets/Games/CurrentlyPlaying/ChronoTrigger.webp'
import currentShowCover from './assets/TV/CurrentlyWatching/frieren.jpg'
import favoriteShowCover from './assets/TV/Favorites/frieren - Copy.jpg'

const IJAZAT_FILE_DATES = {
  "./assets/Ijazat/arbaunijaza.png": "2026-02-19T14:24:13",
  "./assets/Ijazat/Screenshot 2026-01-31 172120.png": "2026-01-31T17:21:20",
  "./assets/Ijazat/بلوغ المرام_121.jpg": "2025-11-10T11:29:55",
  "./assets/Ijazat/شمائل_55.jpg": "2025-10-18T12:05:13",
  "./assets/Ijazat/Al-Wasiyya1.png": "2023-06-14T14:33:27",
  "./assets/Ijazat/Wadha'if Shahr Rabi' al-Awal 2.png": "2022-12-23T07:41:44",
  "./assets/Ijazat/Wadha'if Shahr Rabi' al-Awwal 1.png": "2022-12-23T07:41:33",
  "./assets/Ijazat/Qasida Burda 3.png": "2022-12-23T07:41:05",
  "./assets/Ijazat/Qasida Burda 2.png": "2022-12-23T07:40:05",
  "./assets/Ijazat/Qasida Burda 1.png": "2022-12-23T07:39:32",
  "./assets/Ijazat/Mawlid b. Mibrad.png": "2022-12-23T07:38:55",
  "./assets/Ijazat/Mawlid b. Jawzi.png": "2022-12-23T07:38:10",
  "./assets/Ijazat/Ijazah in Usul al-Sunnah.png": "2022-12-23T07:33:50",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-52-51.png": "2022-10-03T19:52:52",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-52-32.png": "2022-10-03T19:52:33",
  "./assets/Ijazat/Shahadah.png": "2022-10-03T19:52:12",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-51-41.png": "2022-10-03T19:51:42",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-51-36.png": "2022-10-03T19:51:36",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-50-02.png": "2022-10-03T19:50:03",
  "./assets/Ijazat/Diplomatajwid.png": "2022-10-03T19:47:37",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-47-02.png": "2022-10-03T19:47:03",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-46-54.png": "2022-10-03T19:46:55",
  "./assets/Ijazat/Screenshot from 2022-10-03 19-46-25.png": "2022-10-03T19:46:26",
  "./assets/Ijazat/Diploma.png": "2022-10-03T19:43:43",
  "./assets/Ijazat/Ijazah Khalil Fasting (2).png": "2022-09-21T18:19:02",
  "./assets/Ijazat/HistoryofQuran.png": "2022-09-10T07:37:07",
  "./assets/Ijazat/Ali bin Shukri Amin IPT6.png": "2022-08-19T18:01:30",
  "./assets/Ijazat/virtues of dhu2.png": "2022-08-01T02:37:33",
  "./assets/Ijazat/Virtues of Dhu.png": "2022-08-01T02:37:23",
  "./assets/Ijazat/Qira'āt 101 - Ali Amin.png": "2022-07-29T11:14:11",
  "./assets/Ijazat/tashil.png": "2022-06-04T21:50:53",
  "./assets/Ijazat/Waghlisiyyah.png": "2022-06-04T21:50:53",
  "./assets/Ijazat/Qurraijaza.png": "2022-06-04T21:50:52",
  "./assets/Ijazat/nasiha.png": "2022-06-04T21:50:51",
  "./assets/Ijazat/Urjuza Ijaza.png": "2022-06-04T21:50:50",
  "./assets/Ijazat/Moralsijaza.png": "2022-06-04T21:50:50",
  "./assets/Ijazat/ha'iyya.png": "2022-06-04T21:50:48",
  "./assets/Ijazat/Ijazamusalsalyawmashura.jpeg": "2022-06-04T21:50:47",
  "./assets/Ijazat/Mawlid al-Rasul al-A'dham.png": "2022-03-16T21:50:47",
  "./assets/Ijazat/Al-Wasiyya.png": "2022-03-16T21:50:46",
  "./assets/Ijazat/dhikr2.png": "2022-03-16T21:50:46",
  "./assets/Ijazat/dhikr1.png": "2022-03-16T21:50:45",
  "./assets/Ijazat/naqd.png": "2022-03-16T21:50:45",
  "./assets/Ijazat/illustratedtajwid2.png": "2021-07-09T08:43:54",
  "./assets/Ijazat/asanidbirr.png": "2021-01-13T18:04:52",
  "./assets/Ijazat/khasa fi bad kutub al nasiha.png": "2021-01-13T18:00:14",
  "./assets/Ijazat/Illustrated Tajwid I.png": "2020-10-11T05:52:56",
}

const ijazatImages = Object.entries(
  import.meta.glob('./assets/Ijazat/**/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => {
    const dateA = IJAZAT_FILE_DATES[a]
    const dateB = IJAZAT_FILE_DATES[b]

    if (dateA && dateB) {
      return dateB.localeCompare(dateA)
    }

    if (dateA) {
      return -1
    }

    if (dateB) {
      return 1
    }

    return a.localeCompare(b)
  })
  .map(([path, src], index) => {
    const segments = path.split('/')
    const fileName = segments.at(-1)?.replace(/\.[^.]+$/, '') ?? `Ijazat Credential ${index + 1}`
    const category = segments.at(-2) ?? 'Ijazat'

    return {
      title: fileName.replace(/[_-]/g, ' '),
      description: `${category} credential`,
      image: typeof src === 'string' ? src : src?.default,
    }
  })

const SECULAR_FILE_DATES = {
  "./assets/secularDiplomas/Screenshot 2026-02-19 143721.png": "2026-02-19T14:37:21",
  "./assets/secularDiplomas/Screenshot 2026-02-19 143709.png": "2026-02-19T14:37:09",
  "./assets/secularDiplomas/Screenshot 2026-02-19 143559.png": "2026-02-19T14:35:59",
  "./assets/secularDiplomas/Screenshot 2026-02-19 143551.png": "2026-02-19T14:35:52",
  "./assets/secularDiplomas/Screenshot 2026-02-19 143533.png": "2026-02-19T14:35:33",
  "./assets/secularDiplomas/Screenshot 2026-02-19 143520.png": "2026-02-19T14:35:20",
  "./assets/secularDiplomas/network+.png": "2026-02-19T14:34:13",
  "./assets/secularDiplomas/mastersdegree.png": "2026-02-19T14:28:30",
  "./assets/secularDiplomas/bachelor's.png": "2024-09-03T20:57:50",
  "./assets/secularDiplomas/Google's Go (golang) Programming.jpg": "2022-08-18T17:50:15",
  "./assets/secularDiplomas/certifiedethereumexpert.png": "2022-04-11T10:40:55",
  "./assets/secularDiplomas/Associatesdegree.jpg": "2022-03-14T08:57:00",
  "./assets/secularDiplomas/AWS-SAA.png": "2021-11-13T07:13:12",
  "./assets/secularDiplomas/Systems Support Specialist.png": "2021-09-22T07:56:49",
  "./assets/secularDiplomas/Linux+.png": "2021-09-22T07:56:28",
  "./assets/secularDiplomas/AWS-CCP.png": "2021-09-04T06:56:05",
  "./assets/secularDiplomas/SecureCloudProfessional.png": "2021-06-16T06:40:49",
  "./assets/secularDiplomas/Cloud+.png": "2021-06-16T06:38:29",
  "./assets/secularDiplomas/sec+.png": "2021-04-02T07:56:35",
  "./assets/secularDiplomas/Aplus.png": "2021-02-06T07:55:38",
  "./assets/secularDiplomas/cloudes+.png": "2021-01-09T07:47:21",
  "./assets/secularDiplomas/itf+.png": "2020-11-20T10:05:08",
  "./assets/secularDiplomas/Certified Blockchain Expert.png": "2020-10-05T14:10:38",
  "./assets/secularDiplomas/coursera.png": "2020-09-15T08:44:18",
}

const secularImages = Object.entries(
  import.meta.glob('./assets/secularDiplomas/**/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => {
    const dateA = SECULAR_FILE_DATES[a]
    const dateB = SECULAR_FILE_DATES[b]

    if (dateA && dateB) {
      return dateB.localeCompare(dateA)
    }

    if (dateA) {
      return -1
    }

    if (dateB) {
      return 1
    }

    return a.localeCompare(b)
  })
  .map(([path, src], index) => {
    const segments = path.split('/')
    const fileName = segments.at(-1)?.replace(/\.[^.]+$/, '') ?? `Credential ${index + 1}`
    const category = segments.at(-2) ?? 'Professional'

    return {
      title: fileName.replace(/[_-]/g, ' '),
      description: `${category} credential`,
      image: typeof src === 'string' ? src : src?.default,
    }
  })

const foodImages = Object.entries(

  import.meta.glob('./assets/Food/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() ?? `Food Image ${index + 1}`
    const cleanName = fileName.replace(/\.[^.]+$/, '')

    return {
      key: `foodImage${index + 1}`,
      label: `Food: ${cleanName}`,
      src: typeof src === 'string' ? src : src?.default,
    }
  })

const foodImageLibrary = Object.fromEntries(foodImages.map(({ key, label, src }) => [key, { label, src }]))

const movieImages = Object.entries(
  import.meta.glob('./assets/Movies/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => {
    const fileName = path.split('/').pop() ?? `Movie Image ${index + 1}`
    const cleanName = fileName.replace(/\.[^.]+$/, '')

    return {
      key: `movieImage${index + 1}`,
      label: `Movie: ${cleanName}`,
      src: typeof src === 'string' ? src : src?.default,
    }
  })

const movieImageLibrary = Object.fromEntries(movieImages.map(({ key, label, src }) => [key, { label, src }]))

const selfPortraits = Object.entries(
  import.meta.glob('./assets/PicturesOfAli/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    id: `selfPortrait${index + 1}`,
    label: path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? `Portrait ${index + 1}`,
    src: typeof src === 'string' ? src : src?.default,
  }))

const IMAGE_LIBRARY = {
  aliPortrait: { label: 'Ali Portrait', src: aliPortrait },
  aliSuitPortrait: { label: 'Ali Suit Portrait', src: aliSuitPortrait },
  bitcoinBookCover: { label: 'Is Bitcoin Halal (Publication)', src: bitcoinBookCover },
  enderalCover: { label: 'Enderal (Game)', src: enderalCover },
  currentGameCover: { label: 'Chrono Trigger (Game)', src: currentGameCover },
  salafismCover: { label: 'Salafism: Between Fact and Fiction', src: salafismCover },
  favoriteBooksCover: { label: 'Favorite Books Shelf', src: favoriteBooksCover },
  favoriteGameCover: { label: 'Favorite Games', src: favoriteGameCover },
  currentShowCover: { label: 'Current Show', src: currentShowCover },
  favoriteShowCover: { label: 'Favorite Show', src: favoriteShowCover },
  awsCert: { label: 'AWS-SAA', src: awsCert },
  blockchainCert: { label: 'Certified Blockchain Expert', src: blockchainCert },
  mastersDegree: { label: 'Masters Degree', src: mastersDegree },
  ...movieImageLibrary,
  ...foodImageLibrary,
}

const IMAGE_OPTIONS = Object.entries(IMAGE_LIBRARY).map(([value, data]) => ({
  value,
  label: data.label,
}))

const TOP_MOVIE_CARD = {
  id: 'movie',
  label: 'Most Recent Movie Review',
  title: 'Resurrection (2025)',
  description: 'Latest Letterboxd review.',
  link: 'https://letterboxd.com/aibnsamin/',
  cta: 'Open movie profile',
  image: null,
  ...letterboxdData.latestReview,
}

const TOP_MOVIES_LIST_CARD = {
  title: 'My Top 100 Movies',
  description: 'My longlist of all-time favorite films.',
  link: 'https://letterboxd.com/aibnsamin/lists/',
  cta: 'Explore movie list',
  image: null,
  ...letterboxdData.topList,
}

const CONTENT_CARDS = [
  {
    id: 'reading',
    label: 'What I Am Reading',
    title: 'Salafism: Between Fact and Fiction',
    description: 'Yasir Qadhi · current active read.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
    cta: 'View reading tracker',
  },
  {
    id: 'favorite-books',
    label: 'My Favorite Books',
    title: 'My Favorite Books',
    description: 'A long-form shelf of the books that shaped my thinking most.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
    cta: 'Explore favorite books',
  },
  {
    id: 'playing',
    label: "What I'm Playing",
    title: 'Enderal: Forgotten Stories',
    description: 'Current game focus with roleplay and worldbuilding-heavy progression.',
    link: 'https://stash.games/users/alishukriamin',
    cta: 'View game profile',
  },
  {
    id: 'favorite-games',
    label: 'My Favorite Video Games',
    title: 'My Favorite Video Games',
    description: 'A curated collection of favorite games and all-time replays.',
    link: 'https://stash.games/users/alishukriamin',
    cta: 'View favorite games',
  },
  {
    id: 'watching',
    label: 'What Show I Am Currently Watching',
    title: 'Current TV Tracking on Serializd',
    description: 'Follow my latest TV activity and ongoing watchlist updates.',
    link: 'https://www.serializd.com/',
    cta: 'View Serializd profile',
  },
  {
    id: 'favorite-shows',
    label: 'My Favorite Shows',
    title: 'My Favorite Shows',
    description: 'A ranked list of shows I return to the most.',
    link: 'https://www.serializd.com/',
    cta: 'View favorite shows',
  },
  {
    id: 'instagram',
    label: 'Most Recent Instagram Post',
    title: 'Instagram Update',
    description: 'Recent post highlight from my profile feed.',
    link: 'https://www.instagram.com/alishukriamin/',
    cta: 'Open Instagram',
  },
  {
    id: 'reddit',
    label: 'Most Recent Reddit Post',
    title: 'Latest Reddit Activity',
    description: 'Newest contribution and community discussion entry.',
    link: 'https://www.reddit.com/user/aibnsamin1/',
    cta: 'Open Reddit',
    ...redditData.latestPost,
  },
  {
    id: 'islamic-blog',
    label: 'Recent Islamic Blog Post',
    title: 'Are Sufis Mushrik or Are Salafis Extremists?',
    description: 'Current featured Islamic writing and video-linked update.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
    cta: 'Read / Watch',
  },
  {
    id: 'philosophy-blog',
    label: 'Recent Philosophy Blog Post',
    title: 'ASA Philosophy',
    description: 'Newest article from my philosophy publication stream.',
    link: 'https://asaphilosophy.wordpress.com',
    cta: 'Open philosophy blog',
  },
  {
    id: 'humanities-blog',
    label: 'Recent Humanities Blog Post',
    title: 'ASA Humanities',
    description: 'Latest cultural and humanities essay update.',
    link: 'https://asahumanities.wordpress.com',
    cta: 'Open humanities blog',
  },
]

const HERO_CAROUSEL_SLIDES = [TOP_MOVIE_CARD, ...CONTENT_CARDS].map((card) => ({
  id: `slide-${card.id}`,
  cardId: card.id,
  title: card.label,
  description: card.description,
  link: card.link,
  cta: card.cta,
}))

const CONTENT_LAYOUT_ORDER = [
  'reading',
  'favorite-books',
  'favorite-games',
  'playing',
  'watching',
  'favorite-shows',
  'instagram',
  'reddit',
  'islamic-blog',
  'philosophy-blog',
  'humanities-blog',
]

const CURRENT_FAVORITES_CARDS = [
  {
    id: 'favorite-coffee',
    label: 'Current Favorite Coffee',
    title: 'Geisha',
    description: 'My current coffee fixation when I want something aromatic, clean, and memorable in the cup.',
    link: 'https://maqhali.wordpress.com/',
    cta: 'Open tea & coffee blog',
  },
  {
    id: 'favorite-tea',
    label: 'Current Favorite Tea',
    title: 'Matcha & Pu-erh',
    description: 'The current tea rotation: one for focused ritual and one for slow, earthy depth.',
    link: 'https://maqhali.wordpress.com/',
    cta: 'Read tea notes',
  },
  {
    id: 'current-motorcycle',
    label: 'Current Motorcycle',
    title: 'Husqvarna Svartpilen 401',
    description: 'My current motorcycle pick for minimalist styling, nimble handling, and everyday riding.',
    link: 'https://asacycling.wordpress.com/',
    cta: 'Open motorcycling blog',
  },
  {
    id: 'current-podcast',
    label: 'What I Am Currently Listening To',
    title: 'Current Podcasts',
    description: 'The podcast rotation I have on right now for long-form thinking, analysis, and steady background listening.',
    link: 'https://open.spotify.com/',
    cta: 'Open listening queue',
  },
]

const PROFESSIONAL_HIGHLIGHTS = [
  'M.S. IT Management',
  'AI',
  'Blockchain',
  'Smart Contracts',
  'Golang',
  'AWS | DevOps',
  'Linux',
  'Python',
]

const PROFESSIONAL_POSTS = [
  {
    title: 'The Religion of Quraysh | Istighatha & Tawassul p. 4',
    author: 'aibnsamin',
    date: 'August 25, 2025',
    category: 'Uncategorized',
    comments: 'No Comments',
    excerpt:
      'I. THE RELIGION OF QURAYSH. The Qur’an was revealed to the Prophet Muhammad in order to teach the message of Tawhid and submission.',
  },
  {
    title: 'Definitions | Istighatha & Tawassul p. 2',
    author: 'aibnsamin',
    date: 'August 25, 2025',
    category: 'Uncategorized',
    comments: 'No Comments',
    excerpt:
      'Definition of wasila in the Islamic sciences, both linguistically and as-applied in the religion, with careful conceptual framing.',
  },
  {
    title: 'Introduction | Istighatha & Tawassul p.1',
    author: 'aibnsamin',
    date: 'August 25, 2025',
    category: 'Uncategorized',
    comments: 'No Comments',
    excerpt:
      'An introduction to one of the most controversial issues of the last three hundred years: al-istighatha and tawassul.',
  },
  {
    title: 'Cultivating Justice: The Soulful Future of LegalTech',
    author: 'aibnsamin',
    date: 'July 26, 2025',
    category: 'Legal Tech',
    comments: 'No Comments',
    excerpt:
      'Legal technology should streamline process and expand access to justice without reducing law to sterile workflow automation.',
  },
]

const PROFESSIONAL_STATS = [
  { label: 'Technical Papers Written', value: '10 +' },
  { label: 'Professional Certificates Earned', value: '25 +' },
]

const PROFESSIONAL_DOCUMENTS = [
  {
    title: 'Solutions Architecture Document for Flow (Dapper Labs)',
    link: 'https://1drv.ms/w/s!Aq0kYd-TFSJtkyLa3G2eMHIa9I3A?e=rjXsjd',
  },
  {
    title: 'Where is Bitcoin Going and When?',
    link: 'https://aliamin.info/2020/04/where-is-bitcoin-going-and-when/',
  },
  {
    title: 'Technical Architecture and Design Document for Etr Culinary Marketing Group',
    link: 'https://drive.google.com/file/d/1fSP0eMgGOiLQ8tPOOHQAgm332qMXhVQk/view?usp=sharing',
  },
  {
    title: 'Mobile Software Technical Architecture and Design Document for Rescue Systems',
    link: 'https://drive.google.com/file/d/1jSHSkYS5RCmLLZq6yrvyhNq5a8lpZ3C-/view?usp=sharing',
  },
  {
    title: 'Bit-thereum – The Potential of Bitcoin, Ethereum, and Orisi at Coinbrief',
    link: 'https://web.archive.org/web/20140621015849/http://coinbrief.net/bitthereum-bitcoin-ethereum-orisi-1/',
  },
  {
    title: 'Lex Cryptographia, Bitcoin, and the Revolution of OpenBazaar at Coinbrief',
    link: 'https://web.archive.org/web/20140702081857/http://coinbrief.net/bitcoin-openbazaar/',
  },
  {
    title: 'Business Plan – AG Trucking & Logistics',
    link: 'https://1drv.ms/w/s!Aq0kYd-TFSJtj0SduF1hn61p0JgZ?e=Rh2ZcD',
  },
  {
    title: 'Business Proposal for Etr Culinary Marketing Group',
    link: 'https://drive.google.com/file/d/1ckYUP1psg3MrQHzGnQ_C6jxjwVISWsRI/view?usp=sharing',
  },
  {
    title: '#Justice4All example',
    link: 'https://1drv.ms/w/s!Aq0kYd-TFSJtinb9qLlRSmMWNqN4?e=WjuccY',
  },
  {
    title: 'Sonochemistry Researcher at George Mason University – Proposal',
    link: 'https://shorturl.at/AGZ03',
  },
  {
    title: 'Sonochemical Synthesis of Gold & Silver Nanoparticles – Presentation',
    link: 'https://prezi.com/rpcpptqo7l3-/sonochemical-synthesis-of-gold-silver-nanoparticles/',
  },
  {
    title: 'Ground Delivery Drones – Snackbot Presentation',
    link: 'https://prezi.com/ho_4inpoyfix/snackbot/',
  },
]

const PROFESSIONAL_QUALIFICATIONS = [
  'Master of Science Degree in IT Management – Western Governor’s University',
  'Bachelor of Science Degree in Information Technology – Western Governor’s University | 4.0 GPA',
  'Associates Degree in General Studies – NOVA Community College',
  'Certified Associate in Project Management (CAPM) • PMI',
  'Linux+ • CompTIA',
  'Linux Network Professional • CompTIA',
  'Security+ • CompTIA',
  'Secure Infrastructure Specialist • CompTIA',
  'Network+ • CompTIA',
  'Network Infrastructure Professional • CompTIA',
  'A+ • CompTIA',
  'Cloud+ • CompTIA',
  'Cloud Essentials+ • CompTIA',
  'Secure Cloud Professional • CompTIA',
  'Cloud Admin Professional • CompTIA',
  'Project+ • CompTIA',
  'Systems Support Specialist • CompTIA',
  'IT Operations Specialist • CompTIA',
  'Certified Blockchain Expert • Blockchain Council',
  'Certified Ethereum Expert • Blockchain Council',
  'AWS Certified Solutions Architect Professional • Amazon Web Services',
  'AWS Certified Solutions Architect Associate • Amazon Web Services',
  'AWS Certified Cloud Practitioner • Amazon Web Services',
  'Google’s Go (Golang) Programming Language • Udemy',
  'Introduction to Programming • Vanderbilt University',
  'Google IT Support Professional • Grow with Google',
  'ITIL 4 Foundation • Axelos',
  'Business Information Processing • 200 Hours Training',
]

const PROFESSIONAL_PROJECTS = [
  {
    index: '01',
    title: '#Justice4all',
    bullets: [
      'Co-founded a legal assistance non-profit to help indigent pro se litigants obtain critical due-process information about their criminal cases.',
      'Worked with subject-matter experts to assist over two hundred inmates with petitions, clerk filings, and court submissions, including one inmate granted release.',
      'Created fill-in-the-blank motion and lawsuit structures for recurring due-process violations.',
    ],
  },
  {
    index: '02',
    title: 'Rescue Systems',
    bullets: [
      'Completed a TAADD for a mobile software application.',
      'Worked with automobile-industry SMEs to design a car safety app for a start-up.',
      'Handled solutions-architecture planning around configuration, calibration, and organizational system guidance.',
    ],
  },
  {
    index: '03',
    title: 'Etr Culinary Group',
    bullets: [
      'Wrote a business proposal for a culinary tech start-up enabling home chefs to sell prepared meals or work as personal chefs on contract.',
      'Designed a model that helps locals sell food or food labor to one another while helping restaurants offload excess items before expiration.',
      'Worked closely with subject-matter experts to shape the operating model.',
    ],
  },
]

const PROFESSIONAL_TESTIMONIALS = [
  {
    quote:
      'Ali Amin demonstrated exceptional time management, negotiation skill, and dedication to becoming the best version of himself. He would be an asset in every way to any organization.',
    attribution: 'Shayne Moreaux, SSGT USA (Ret) • +1 (412) 733-6247',
  },
  {
    quote:
      'Ali was a dedicated worker, eager to learn, and showed strong conceptual skills in engineering fundamentals, programming, and circuit-building initiative.',
    attribution: 'John McLaughlin, Staff Software Engineer at ASSETT, Inc. • April 19, 2014',
  },
]

const PROFESSIONAL_SKILLS = [
  'Advanced Mathematics (College Algebra, Calculus, Trigonometry)',
  'Analytical Reasoning',
  'Blockchain Analysis',
  'Computer Science Consultancy',
  'Cryptocurrency',
  'Encryption, Cryptography, Network Security, and Hardening',
  "Fluent Arabic (MSA / العربية الفصحى الحديثة)",
  'Google Analytics',
  'Linux',
  'Prezi',
  'Management Information Systems',
  'Microsoft Office Professional Suite',
  'Python',
  'Social Media Marketing',
  'Software Development and Programming',
  'Technical Writing',
  'WordPress',
  'MATLAB',
  'Computer Architecture',
  'Remote Connections',
  'Virtual Machines',
  'Networking',
  'Software Management',
  'Troubleshooting',
  'VPNs and Proxies',
  'Process Management',
  'Resource Monitoring',
  'Systems Administration',
  'Network Security',
  'Data Management and Recovery',
  'Directory Services',
  'Package and Software Management',
]

const BLOG_PAGE_POSTS = [
  {
    section: 'Islamic Thought',
    title: 'The Religion of Quraysh | Istighatha & Tawassul p. 4',
    date: 'August 25, 2025',
    excerpt:
      'The Qur’an was revealed to teach Tawhid and submission, and this entry continues the broader study of istighatha and tawassul.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
  },
  {
    section: 'Islamic Thought',
    title: 'Definitions | Istighatha & Tawassul p. 2',
    date: 'August 25, 2025',
    excerpt:
      'A close look at the definition of wasila in language and in the Islamic sciences, with attention to proper conceptual boundaries.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
  },
  {
    section: 'Legal Tech',
    title: 'Cultivating Justice: The Soulful Future of LegalTech',
    date: 'July 26, 2025',
    excerpt:
      'A vision for legal technology that improves access and clarity without flattening the law into empty workflow automation.',
    link: 'https://aliamin.info/professional/',
  },
  {
    section: 'Philosophy',
    title: 'ASA Philosophy',
    date: 'Ongoing',
    excerpt:
      'Essays and reflections on metaphysics, skepticism, ethics, and broader philosophical questions.',
    link: 'https://asaphilosophy.wordpress.com',
  },
  {
    section: 'Humanities',
    title: 'ASA Humanities',
    date: 'Ongoing',
    excerpt:
      'Writing on culture, history, aesthetics, literature, and the human questions that sit underneath political life.',
    link: 'https://asahumanities.wordpress.com',
  },
  {
    section: 'Tea & Coffee',
    title: 'Maqhali',
    date: 'Ongoing',
    excerpt:
      'Notes on ritual, taste, slowness, and the pleasures of coffee and tea as part of a cultivated life.',
    link: 'https://maqhali.wordpress.com/',
  },
]

const ISLAM_PAGE_POSTS = [
  {
    title: 'The Religion of Quraysh | Istighatha & Tawassul p. 4',
    date: 'August 25, 2025',
    excerpt:
      'A continuation of the study of tawhid, shirk, and the underlying religious worldview opposed by the Qur’an.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
  },
  {
    title: 'Definitions | Istighatha & Tawassul p. 2',
    date: 'August 25, 2025',
    excerpt:
      'Definitions of wasila and related terms in both linguistic and shari contexts, laying out the conceptual groundwork.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
  },
  {
    title: 'Introduction | Istighatha & Tawassul p.1',
    date: 'August 25, 2025',
    excerpt:
      'An introduction to one of the most contested issues in the last three centuries of Sunni discourse.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
  },
]

const ISLAM_PAGE_TOPICS = [
  'Tawhid',
  'Aqida',
  'Hadith',
  'Qiraat',
  'Fiqh',
  'Ihsan',
  'Refutations',
  'Islamic Research',
]

const RESTAURANTS_BEEN = [
  'Oyster Oyster — $$$$ | American, Vegetarian — Northwest Washington, DC — 10.0',
  'Albi — $$$$ | Palestinian, Middle Eastern, Mediterranean — Navy Yard, Washington, DC — 9.9',
  'Nasime Japanese Restaurant — $$$$ | Japanese — Old Town, Alexandria, VA — 9.9',
  'Joon — $$ | Persian, Mediterranean, Iranian — Vienna, VA — 9.8',
  'Petite Cerise — $$$ | French — Northwest Washington, DC — 9.7 (Permanently closed)',
  'Sushi Nakazawa — $$$$ | Japanese, Omakase, Sushi — Northwest Washington, DC — 9.7',
  'Rose’s Luxury — $$$$ | American — Capitol Hill, Washington, DC — 9.6',
  'PhoXotic — $$ | Vietnamese, Pho — Northwest Washington, DC — 9.5',
  'Oyamel Cocina Mexicana — $$$ | Mexican, Tapas, Tacos — Penn Quarter, Washington, DC — 9.5',
  'Bourbon and Fig — American — Lake Ridge, VA — 9.4',
  'Ceibo — $$$ | Uruguayan, Wine Bar — Northwest Washington, DC — 9.4',
  'Bistro L’Hermitage — $$$ | French — Woodbridge, VA — score not visible',
  'Kazan Restaurant — $$ | Turkish — McLean, VA — 9.1',
  'The Dabney — $$$$ | American — Shaw, Washington, DC — 9.0',
  'CHIKO — $$ | Chinese, Korean, Asian Fusion — Dupont Circle, Washington, DC — 9.0',
  'Maketto — $$$ | Asian Fusion, Taiwanese, Cantonese — H Street Corridor, Washington, DC — 8.9',
  'I Egg You — $$ | Breakfast, Korean, Asian Fusion — Capitol Hill, Washington, DC — 8.6',
  'Menya Hosaki — $$ | Japanese, Ramen, Noodles — Petworth, Washington, DC — 8.6',
  'Timber Pizza Co. Petworth — $ | Pizza — Northwest Washington, DC — 8.5',
  'Alfreda — $$ | Pizza, Italian — Northwest Washington, DC — 8.4',
  'Yume Sushi — $$$ | Japanese, Sushi — East Falls Church, Arlington, VA — 8.4',
  'Blue Duck Tavern — $$$ | American — Northwest Washington, DC — 8.3',
  'Ravi Kabob House — $$ | Pakistani, South Asian — Ashton Heights, Arlington, VA — 8.1',
  'Ottoman Taverna — $$ | Middle Eastern, Turkish — Mount Vernon Triangle, Washington, DC — 8.0',
  'Bansari Indian Cuisine — $$ | Indian — Vienna, VA — 7.9',
  'Mediterranean Eats and Butchery — Woodbridge, VA — 7.9',
  'CHIYOSHI — $ | Chinese — Woodbridge, VA — 7.8',
  'bb.q Chicken Potomac Town Center — Korean, Fried Chicken — Woodbridge, VA — 7.7',
  'Space 220 Restaurant — cuisine/location not visible — 7.7',
  'America’s Best Wings — $$ — Woodbridge, VA — 7.5',
  'Tasty Crab — $$ | Seafood, American — Woodbridge, VA — 7.4',
  'Two Brothers Chicken — $ — Woodbridge, VA — 7.3',
  'Layla’s Lebanese Restaurant — $$ | Lebanese — Woodbridge, VA — 7.3',
  'La Tingeria — $ | Mexican, Tacos — Falls Church, VA — 7.2',
  'Lutèce — $$$$ | French, Contemporary — Northwest Washington, DC — 7.2',
  'Mim’s Food – Uyghur Cuisine — $$ | Uyghur — Fairfax, VA — 7.1 (Permanently closed)',
  'Kabob Zone — $$ | Afghan — Woodbridge, VA — 7.0',
  'Shawarma Taco — Mediterranean, Mexican — Woodbridge, VA — 7.0',
  'Marib Restaurant — $$ | Middle Eastern, Arabic — Springfield, VA — 6.9',
  'Chili on Top (Woodbridge) — Mexican, Tex-Mex — Woodbridge, VA — 6.8',
  'JINYA Ramen Bar – Logan Circle — $$ | Ramen, Bar, Japanese — Northwest Washington, DC — 6.8',
  'Seray — $$$ | Lebanese — Vienna, VA — 6.7',
  'Residents Cafe & Bar — $$$ | Bar, Brunch, Greek — Connecticut Ave / K Street, Washington, DC — 6.5',
  'Afghan Bistro — $$ | Afghan — Springfield, VA — 6.2',
  'Thai Ghang Waan — $$ | Thai — Springfield, VA — 6.0 (score partially obscured)',
  'Rus Uz — $$ | Russian, Uzbek — Virginia Square, Arlington, VA — 5.3',
  'Anju — $$$ | Korean, Asian Fusion — Northwest Washington, DC — 5.3',
  'Rasika — $$$ | Indian — Northwest Washington, DC — 5.3',
  'The Cheesecake Factory — $$ | American — Woodbridge, VA — 4.6',
]

const ISLAM_ACCOMPLISHMENTS = [
  "Qira'ah in Hafs 'an 'Asim (2022)",
  'Hadith - Ijaza in the Six Sunnan, Muwatta al-Imam Malik, and Muwatta al-Imam al-Shaybani (2022)',
  'Hikmah with Classical Medicine Degree (2022)',
  'Certificate in Islamic Theology (2022)',
  "Twenty-five (25) ijazat and three (3) certificates ('Aqidah, Fiqh, Tazkiyyah)",
  'Author of five Islamic books',
  'Author of numerous Islamic articles',
  'Islamic financial analyst and cryptocurrency expert',
  'Khatib',
  "Qira'ah in the ten Qira'at (2024)",
  "'Alim Diploma (2024)",
  "Tafsir with ijazah in Tafsir and Hermeneutics (2024)",
  "Talab al-'Ilm with a certificate from Tayba Foundation (2025)",
  "Talab al-'Ilm with a certificate from Ibn Abdil Barr Academy (2025)",
  "Bachelor's in Islamic Law & Theology (2027)",
]

const ISLAM_STUDY_PARAGRAPHS = [
  'Abu Lut casually studied the Din from the age of fifteen until eighteen, then began serious structured study and is currently pursuing Islamic studies through multiple institutions.',
  "He benefited from the companionship of a student of shaykh 'AbdAllah al-'Azzam and a student of shaykh 'Umar 'Abd al-Rahman, from whom he also took tajwid.",
  "Abu Lut al-Muhammadi has studied with the Tayba Foundation, California Islamic University, Ibn 'Abd al-Barr Academy, Critical Loyalty University, Madrasah al-Ansar Online, al-Madrasah al-Hanbaliyyah, and ITQAN for 'Ulum al-Qur'an.",
  "Through shaykh 'Uthman Khan at Critical Loyalty, he pursued ijazah in the six books of Sunnah, a diploma of classical medicine and holistic health, and advanced study in the ten qira'at.",
  "He also enrolled in a three-year program under shaykh al-Hasan b. 'Ali al-Kettani at Ibn 'AbdilBarr Academy focused on Athari 'aqidah, Maliki fiqh, and tazkiyyah al-nafs.",
  "He intends to continue in both Ash'ari and Athari 'aqidah, the Maliki school, tazkiyya, tafsir, and the other sciences of the Din while continuing Qur'an memorization and Arabic development.",
  "He currently holds ten ijazat and three certificates in Qur'an and completed twenty-one non-ijazah or certificate courses at the time of that summary.",
]

const ISLAM_COMPLETED_COURSES = [
  {
    provider: 'Tayba Foundation',
    items: [
      'ISLAM 99 (Introduction to Islam)',
      'IMAN 100 (Introduction to Islamic Beliefs)',
      "IMAN 101 ('Aqidah al-Tahawiyya)",
      'FIQH 100 (Introduction to Fiqh)',
      'FIQH 101 (Al-Akhdari)',
      "FIQH 102 (Al-Murshid al-Mu'in)",
      'IHSN 101 (Introduction to Tazkiyya al-Nafs / Tasawwuf)',
      'ADAB 100 (Etiquettes of Seeking Knowledge)',
      'ADAB 101 (Rights of the Parents)',
      'ADAB 102 (Prohibitions of the Tongue)',
      "QRAN 101 (Introduction to 'Ulum al-Qur'an)",
    ],
  },
  {
    provider: 'ITQAN',
    items: [
      'Certificate in Illustrated Tajwid by Ayman Suweid I',
      'Certificate in Illustrated Tajwid II by Ayman Suweid',
      "Certificate in the History of the Qur'an",
    ],
  },
  {
    provider: 'California Islamic University',
    items: [
      'Beliefs I (Survey of Islamic Beliefs)',
      'Islamic Law I (Essentials of Islamic Practice)',
      'Spirituality I (Purification of the Soul) (in progress)',
      'Sunna I (Wisdom from the Prophet) (in progress)',
      'History I (Life of the Prophet)',
    ],
  },
  {
    provider: 'Ibn Abdil Barr Academy',
    items: [
      "Ha'iyya ibn Abi Dawud (ijaza)",
      'Morals and Manners from Risala ibn Abi Zayd (ijaza)',
      "Tashil Al-Wusul (Athari 'Aqidah) (ijaza)",
      "Al-Urjuza al-Mi'iyya (Sira) (ijaza)",
      'Al-Muqaddimah Al-Waghlisiyah (Maliki Fiqh) (ijaza)',
      'Al-Nasihah al-Kafiyah in Tazkiyya (Ihsan) (ijaza)',
      'Qurra al-Absar (Sira) (ijaza)',
      "The Forty Ahadith of Imam Al Nawawi (Usul al-Din) (ijaza)",
      "Sullam al-Wusul li Daruri min al-Usul by Shaykh Al Disi (Usul al-Fiqh) (ijaza)",
      'Mukhtasar Khalil | Bab al-Siyam (ijaza)',
      "Al-Turfa by shaykh Muhammad Al-'Arabi Al-Fasi Al-Fahri (Mustalah al-Hadith) (ijaza)",
      "Usul al-Sunnah by Ibn Abi Zamanin Al Ibiri Al Andalusi ('Aqidah)",
    ],
  },
  {
    provider: 'Critical Loyalty',
    items: [
      'An Islamic Journey through Time and Money Management',
      'Intermediate Strategies in Time and Money Management',
      'Advanced Strategies in the Stock Market',
      "History of Tajwid and Qira'at",
      "The Etiquettes of the Qur'an from al-Ri'ayah by Makki b. Abi Talib",
      'Certificate in Islamic Theology',
      'TH01: The Evolution of Islamic Thought and Theology',
      'TH02: History of Fatwa',
      "Qira'at 101 - ReciteWithUs",
      'Critical Loyalty Diploma of Classical Medicine and Holistic Health (Hakim degree)',
      'Ijazah in the Six Works of Hadith',
      "Ijazah in Tajwid and Qur'anic Reading (Riwayah of Hafs)",
      "TAJ01: Qasidat al-Khaqaniyyah",
      'TAJ02: Classical Approach to the Rules of Tajwid',
      'TAJ03: Evolution of Tajwid',
    ],
  },
  {
    provider: 'Madrasah al-Ansar',
    items: [
      "Al-Wajibat al-Mutahima lil al-Ma'rifa 'ala Kuli Muslimin wa Muslimatin (ijaza)",
    ],
  },
  {
    provider: 'Al-Madrasah al-Hanbaliyyah',
    items: [
      "Naqd Nawaqid al-Islam (ijaza)",
      'Wasiyya b. Qudama al-Maqdisi (ijaza)',
      "Muqaddimah Usul al-Tafsir by b. Taymiyyah",
    ],
  },
  {
    provider: 'Cordoba Academy',
    items: [
      'Al-Hadith al-Musalsal bi al-Awwaliyyah',
      'Kitab Birr al-Walidayn (riwaya ijaza)',
      'Ayyuha al-Walad (riwaya ijaza)',
    ],
  },
]

const ISLAM_FUTURE_GOALS = [
  {
    heading: 'He intends to complete the following by the end of 2025',
    items: [
      "Bachelor's in Islamic Law & Theology | Mishkah University",
      'Al-Sawa’iq al-Ilahiyya - Madrasa Hanbaliyya',
      "Muqaddimah Usul al-Tafsir by b. Taymiyyah - Madrasah Hanbaliyya",
      "Furu' al-Fiqh - shaykh Ahmad Musa Jibril",
      'Certificate in 100-series courses (Tayba)',
      'USUL 101 (Introduction to Usul al-Fiqh)',
      "HDTH 101 (Introduction to 'Ulum al-Hadith)",
      'SIRA 101 (Introduction to the Sira)',
      "'Alim Diploma (Critical Loyalty)",
      "al-Qira'at al-'Ashr - Critical Loyalty",
      "Ijazah in the Variant Readings of the Qur'an (Sughra and Kubra)",
      'LA02: Nahw and Sarf - Intermediate I',
      'LA03: Nahw and Sarf - Intermediate II',
      'LA04: Nahw and Sarf - Advanced I',
      "Al-Murshid al-Mu'in by 'Abd al-Wahid b. 'Ashir",
      'Nazhm al-Maghazi by Ahmad al-Badwi al-Majlisi al-Shinqiti',
      "Introduction to Usul al-Tafsir by b. Juzayy al-Kalbi al-Andalusi",
    ],
  },
  {
    heading: 'He intends to complete the following by the end of 2026',
    items: [
      'Ijazah in Tafsir and Hermeneutics',
      "Ijazah in the Science of Fiqh and Ijtihad (Nur al-Anwar)",
      "AS01: al-Qira'at al-'Ashr (al-Shatibiyyah wa al-Tayyibah)",
      "AS02: Nadhimat-al-Zuhr / 'Aqilat atrab al-Qasa'id",
      "AS03: Al-Fawa'id al-Mu'tabarah and ijazah in four Qira'at",
      '6-Month Online Hadith Diploma - Cordoba Academy',
      'Nukhbat al-Fikar fi Mustalah Ahlil Athar',
      "Imam Ibn Hajr al-Asqalani's Nuzhat al-Nadhr",
      'Thulathiyyat of Imam al-Bukhari',
      "Manzumah al-Bayquniyyah fi Mustalah Ahl al-Hadith wa al-Athar",
      "Jami' Akhlaq al-Rawi",
      "Imam ibn al-Mulaqin's Tazkira fi Uloom al-Hadith",
      'Three-Year Ijaza Program',
      "Aqeedah - Al-Aqeedah al-Kubra li ibn Azouz (12/30)",
      "Taysir al-Lateef al-Mannan (3/30)",
      'Al-Risala ibn Abi Zayd al-Qayrawani (6/30)',
      'History of the Khulafa al-Rashidin (9/30)',
    ],
  },
]

const ISLAM_SELF_STUDIED = [
  {
    group: "Qur'an",
    sections: [
      { title: 'Tafsir', items: ['Jawahir al-Qur’an by al-Ghazali', 'Journey through the Qur’an by M. al-Ghazali (incomplete)', 'Usool al-Tafseer by B. Phillips', "Tafsir al-Sa'di v. 1 (incomplete)"] },
      { title: "'Ulum al-Qur'an", items: ['Supplications and Treatment with Ruqya by al-Qahtani', "How to Approach the Qur'an by J. Zarabozo", "Introduction to the Sciences of the Qur'an by Y. Qadhi", 'Al-Tibyan fi Adab Hamla al-Qur’an by al-Nawawi', "Gateway to the Qur'anic Sciences by O. Husain (incomplete)", "'Ulum al-Qur'an by A. Denffer (incomplete)", "History of the Qur'anic Text by M. M. Azami (incomplete)"] },
      { title: 'Arabic Sarf and Nahw', items: ["Sharh al-Ajrumiyya by al-'Uthaymin (incomplete)", 'Kitab al-Asasi volume 1', 'Madina textbook v. 1'] },
    ],
  },
  {
    group: 'Sunnah',
    sections: [
      { title: 'Sira', items: ['The Sealed Nectar by al-Mubarakpuri (incomplete)', 'Muhammad by M. Lings (incomplete)', 'Noble Life of the Prophet by Dr. A. al-Sallabi (v. 1 and part of v.2)'] },
      { title: 'Mustalah / Takhrij', items: ['Usool al-Hadeeth by B. Phillips', 'Al-Muqaddima by al-Shahrazuri (incomplete)', "Sharh Muqadimma Sahih Muslim by 'Abd al-Karim al-Khudayr (incomplete)"] },
    ],
  },
  {
    group: 'Islam, Iman, Ihsan, and History',
    sections: [
      { title: 'Fiqh / Mu’amalat / Siyasa / Iqtisad', items: ['Mukhtasar al-Akhdari', "Book of the Major Sins by M. b. 'Abd al-Wah'hab", 'Congregational Salah by G. al-Sadlan', "Zad al-Mustaqni' (chapter of fasting)", 'Risala ibn Abi Zayd (chapter on fasting)', "Usul al-Fiqh of the Salaf by W. Al-'Abbas", 'Milestones by S. Qutb', "In Defense of Muslim Lands by 'A. Azzam", 'Al-Ahkam al-Sultaniyya by al-Mawardi (incomplete)', 'The Problem with Interest by T. Al-Diwany'] },
      { title: "Usul al-Din / 'Aqidah / Manhaj / Da'wah", items: ['Thalatha al-Usul with multiple commentaries', "Imam Nawawi's Arba'in (incomplete)", "Kitab al-Tawhid by Mohamed b. 'Abd al-Wah'hab (half complete)", 'Misquoting Muhammad by Jonathan Brown', 'Usul al-Thalatha', 'Safina al-Naja (incomplete)', "Introduction to the Aqidah of Ahl al-Sunnah by A. al-Athari", 'La ilaha il Allah by M. Raslan (incomplete)', "Things which Nullify One's Islam by al-Fawzan (incomplete)", "Al-Iman bi Allah by 'U. al-'Ashqar (incomplete)", "In Pursuit of Allah's Pleasure by 'U. 'Abd al-Rahman (incomplete)", "The Prophetic Methodology in Correcting People's Mistakes by S. al-Munajjid (incomplete)", 'Divine Reality by H. Tzortzis'] },
      { title: 'Tazkiyya', items: ['Purification of the Soul by J. Zarabozo', "Al-Zuhd wa al-Wara' wa al-'Ibada by b. Taymiyya", 'The Book of Assistance by al-Haddad', 'Book of Tasawuff from al-Maqasid by imam al-Nawawi', 'Mukhtasar Minhaj al-Qasidin by ibn Qudama al-Maqdisi', "Mathara al-Qulub by M. Mawlud (incomplete)"] },
      { title: "Ta'rikh", items: ['Lost Islamic History by F. al-Khateeb', 'Islam and the World by A. al-Nadwi', "The First Saudi State & the History of Ad-Dir'iyya", "The Life, Teachings, and Influence of Mohamed b. 'Abd al-Wah'hab by J. Zarabozo", "The Biography and Mission of b. 'Abd al-Wah'hab by J. Abulrab"] },
    ],
  },
]

const ISLAM_NOTES_AND_WORKS = [
  { title: "Qur'an", items: ["The Etiquettes of the Qur'an from al-Ri'ayah | Transcription, Translation, and Commentary (Complete Work)", 'Sharh al-Qasida al-Khaqaniyya | Complete Work', 'Sharh al-Qasida al-Sakhawiyya (notes)', 'Ijaza in Hafs (notes)', "History of Tajwid and Qira'at (notes)", 'Nahw and Sarf (notes)', 'Manzhuma b. Ajrum (notes)'] },
  { title: 'Sunnah', items: ["Elucidation of Imam al-Tirmidhi's 'Ilal al-Saghir' | Complete Work", "Elucidation of Imam Muslim's Muqaddimma", 'Sharh Sunnan al-Tirmidhi (notes)', 'Sharh Sunnan Ibn Majah (notes)', 'Sharh Sunnan Abi Dawud (notes)', 'Sharh Sahih Muslim (notes)', 'Sharh Sahih al-Bukhari (Introduction)', 'Sharh Sahih al-Bukhari (Beginning of Revelation)', 'Sharh Sahih al-Bukhari (Fasting)', "Al-Urjuza al-Mi'iyyah (notes)", 'Qurra al-Absar (notes)'] },
  { title: 'Islam / Iman / Ihsan', items: ["Furu' al-Fiqh by Yusuf b. Mibrad | Complete Work", "Elucidation of Mukhtasar Khalil (IABA) | Complete Work", 'Are Cryptocurrencies Halal? (article)', 'Al-Muqaddima Al-Waghlisiyyah (notes)', 'Fiqh al-Hijaz versus Fiqh Kufa (notes)', 'Al-Nazhm al-Saghir Mukhtasar al-Tahrir (notes)', 'Risala b. Abi Zayd al-Qayrawani (notes)', 'The History and Development of Islamic Theology | Complete Work', "'Aqidah al-Imam al-Waghlisi (notes)", "Tas'hil al-Wusul ila Thalatha al-Usul (notes)", "'Aqidah al-Najah (notes)", "Ha'iyya b. Abi Dawud al-Sijistani (notes)", 'Naqd Nawaqid al-Islam (notes)', "Al-Sawa'iq al-Ilahiyya (notes)", 'An Introduction to Islamic Hikmah | Complete Work', 'Wasiyya b. Qudama al-Maqdisi', 'Al-Nasiha al-Kafiyya', 'Risala b. Abi Zayd (Bab al-Jumuran)'] },
]

const ISLAM_ARTICLE_LINKS = [
  'https://muslimskeptic.com/2022/05/30/muslim-marriage-crisis-diagnosis/',
  'https://muslimskeptic.com/2022/04/11/are-cryptocurrencies-halal-understanding-bitcoin-blockchain-and-the-sharia/',
  'https://muslimskeptic.com/2022/03/08/how-the-us-neutralizes-muslim-leaders-the-case-of-ahmed-omar-abu-ali/',
  'https://muslimskeptic.com/2022/03/08/%d9%83%d9%8a%d9%81-%d8%aa%d8%ad%d9%8a%d9%91%d8%af-%d8%a3%d9%85%d8%b1%d9%8a%d9%83%d8%a7-%d8%a3%d8%a6%d9%85%d9%91%d8%a9%d9%8e-%d8%a7%d9%84%d9%85%d8%b3%d9%84%d9%85%d9%8a%d9%86-%d9%82%d8%b6%d9%8a/',
  'https://muslimskeptic.com/2022/01/30/the-paradise-of-the-disbelievers-on-guantanamo/',
  'https://muslimskeptic.com/2022/01/03/the-us-sends-muslim-activist-to-country-that-tortured-him/',
  'https://muslimskeptic.com/2021/12/31/an-introduction-to-islamic-medicine-hikmah/',
  'https://muslimskeptic.com/2021/11/25/a-step-by-step-guide-to-avoid-accountability-for-war-crimes-afghanistan-edition/',
  'https://muslimskeptic.com/2021/11/23/the-french-algerian-war-sixty-years-on-a-legacy-of-terror/',
  'https://muslimskeptic.com/2021/11/17/us-evacuates-elite-killing-squad-that-murdered-countless-muslims/',
  'https://muslimskeptic.com/2021/11/15/social-media-surveillance-and-targeting-muslims-shadowdragon/',
  'https://muslimskeptic.com/2021/11/12/israel-bans-terrorist-human-rights-ngos/',
  'https://muslimskeptic.com/2021/11/09/muslims-sue-fbi-over-discriminatory-spying-reaches-supreme-court/',
  'https://muslimskeptic.com/2022/08/16/who-is-allah/',
  'https://muslimskeptic.com/2022/10/06/why-do-muslims-worship-allah/',
  'https://muslimskeptic.com/2022/11/02/a-brief-introduction-to-islam/',
  'https://muslimskeptic.com/2022/12/15/do-not-underestimate-allah/',
]

const ISLAM_KHUTAB = [
  'Who is Allah? (2020)',
  'Underestimating Allah (2020)',
  'Why Worship Allah? (2021)',
  'The Benefits of Worshiping Allah (2020)',
  'Al-Rahman al-Rahim (2021)',
  'Death (2021)',
  'The Day of Judgment (2021)',
  "'Ibadah wa Isti'anah (2021)",
  'Sirat al-Mustaqim (2021)',
  "Ni'ma, Ghadab, and Dalalah (2021)",
  "The Qur'an",
  'The Obligation of Seeking Knowledge (2020)',
  'The Merits of Knowledge (2020)',
  'The Obligation and Merits of Knowledge (2021)',
  'The Final Prophet Muhammad (2021)',
  'The Final Prophet (2020)',
  'The Name Muhammad (2020)',
  'The Final Messenger (2020)',
  'What is the Sunna? (2020)',
  "The Sunnah of Allah's Messenger (2021)",
  "The Town of Ta'if (2020)",
  'The Battle of Badr (2020)',
  "Ta'if and Badr (2021)",
  'The Din of Islam',
  'Allegiance and Disavowal',
  'The Purpose of Life',
  'The Covenant with Allah and His Right',
  'Disbelief',
  'Associative Polytheism',
  'Hypocrisy',
  'Paradise',
  'Hellfire',
  'Acting upon Knowledge',
  'Sincere Intentions',
  'Proselytizing',
  'Patience',
  'Arabic Language',
  'Al-Hakim',
  'Al-Haqq',
  'Al-Rabb',
  'Al-Malik al-Malak',
  'Al-Qadir',
  "Al-'Alim",
  'Al-Qudus',
  'Al-Salam',
  "Al-Mu'min",
  'Al-Muhaymin',
  "Al-'Aziz",
  'Al-Mutakabbir al-Jabbar al-Qahhar',
  "Al-Khaliq, Al-Bari', al-Musawwir",
  "Al-Raziq, al-Razzaq, al-Wahhab",
  'Al-Fattah',
  "Al-Qabid al-Basit, al-Khafid al-Rafi'",
  "Al-Mu'izz al-Mudhill",
]

const ISLAM_CREDENTIAL_GROUPS = [
  { title: "Qur'an", items: ["Ijaza in the Ten Qira'at", 'Ijazah in Four Qira’at', "Ijaza in Hafs 'an 'Asim", "Ijaza in Al-Fawa'id al-Mu'tabarah", 'Ijaza in Tafsir (al-Fawz al-Kabir)', "Ijaza in Taysir al-Latif al-Mannan li al-Sa'di", 'Ijaza in Muqadimma ibn Juzayy al-Kalbi', "Ijaza in Muqaddimma fi Usul al-Tafsir li ibn Taymiyyah", "Certificate in the History of the Qur'an", 'Certificates in Illustrated Tajwid I & II'] },
  { title: 'Sunnah', items: ['Ijaza in Muwatta Imam Malik & Muwatta imam al-Shaybani', 'Ijaza in the Six Sunnan', 'Ijaza in al-Turfa fi nadhm Alqab al-Hadith', "Ijaza in al-Urjuza al-Mi'iyyah", 'Ijaza in Qurra al-Absar', "Ijaza in al-Arba'un al-Nawawiyyah"] },
  { title: "Iman - Athari", items: ['Certificate in Islamic Theology (2 years)', "Ijazah in al-'Aqidah al-Kabura li b. 'Azuz", "Ijaza in al-Sawa'iq al-Ilahiyyah", 'Ijaza in Nawaqid al-Islam', 'Usul al-Sunnah by Ibn Abi Zamanin', "Ijazah in Ha'iyyah b. Abi Dawud al-Sijistani", "Ijazah in Tas'hil al-Wusul ila Thalatha al-Usul"] },
  { title: 'Islam - Maliki / Hanbali', items: ["Ijazah in the Science of Fiqh and Ijtihad (Nur al-Anwar)", 'Ijazah in Kitab al-Siyam from Mukhtasar Khalil', "Certificate in Furu' al-Fiqh (4 years)", 'Ijazah in Risalah b. Abi Zayd', "Ijazah in Murshid al-Mu'in", "Ijaza in Sullam al-Wusul min 'Ilm al-Usul", 'Ijazah in al-Waghlisiyyah'] },
  { title: 'Ihsan', items: ['Degree in Hikmah (Islamic medicine)', 'Ijazah in Wasiyya li ibn Qudama', 'Ijazah in al-Nasiha al-Kafiyyah'] },
]

const ISLAM_TEACHERS = [
  "Shaykh 'Uthman Khan",
  "Shaykh al-Hasan b. 'Ali al-Kettani",
  'Shaykh Mustapha Umar',
  'Shaykha Asiya Akyurt',
  'Shaykha Khadija Akyurt',
  'Shaykh Yusuf b. al-Sadiq al-Hanbali',
  'Ustadh Tom Facchine',
  "Ustadh 'Abd al-Muhaymin Priester",
]

const ISLAM_MEMORIZING = [
  { title: "Qur'an in Hafs", items: [] },
  { title: 'Arabic', items: ["Nazhm al-Ajrumiyya - 'Ubayd Rabbihi al-Shinqiti", "Mulha al-I'rab"] },
  { title: 'Usul al-Din', items: ["Risala fi Asl al-Din - Mohammad b. 'Abd al-Wah'hab", "Al-Arba'un - Abu Zakariyya Yahya ibn Sharaf al-Nawawi", "Risala fi Usul al-Din - Abu Ja'far al-Tahawi"] },
  { title: "Athari 'Aqida", items: ["Thalatha al-Usul & Al-Usul al-Thalatha - Mohammad b. 'Abd al-Wah'hab", "Muqadimma Al-Murshid al-Mu'in - Al-Hasan b. 'Ali al-Kittani"] },
  { title: "Ash'ari 'Aqida", items: ["Muqaddima Al-Murshid al-Mu'in - 'Abd al-Wahid b. 'Ashir"] },
  { title: 'Usul al-Fiqh', items: ['Al-Nazhm al-Saghir fi Mukhtasar al-Tahrir - Amir Bahjat', 'Sullam al-Wusul li al-Daruri min al-Usul'] },
  { title: 'Maliki Fiqh', items: ["Al-Murshid al-Mu'in - 'Abd al-Wahid b. 'Ashir", 'Al-Muqaddimah Al-Waghlisiyah'] },
  { title: 'Hanbali Fiqh', items: ['Al-Bulbul'] },
  { title: 'Tazkiyya', items: ["Mathara al-Qulub - Mohamad Mawlud"] },
  { title: 'Manhaj', items: ["Al-Ha'iyya - Abu Bakr b. Abi Dawud al-Sijistani"] },
  { title: 'Adab', items: ['Falah al-Manzilayn fi Birr al-Walidayn - Mohamad Mawlud', 'Maharim al-Lisan - Mohamad Mawlud'] },
  { title: 'Sira', items: ["Al-Urjuza al-Mi'iyya - Ibn Abi al-'Izz al-Hanafi", 'Qurra al-Absar', 'Nadhm al-Maghazi'] },
  { title: 'Tajwid', items: ['Tuhfa al-Atfal', 'Qasidat al-Khaqaniyyah', 'Al-Jazariyya'] },
  { title: 'Mustalah & Usul al-Hadith', items: ['Al-Turfa'] },
  { title: 'Hadith Compilations', items: ["Al-Jami' fi al-Adhkar - Nasr al-Din al-Albani"] },
]

const DEFAULT_IMAGE_SELECTIONS = {
  heroPortrait: 'aliPortrait',
  heroSlideDefault: 'bitcoinBookCover',
  topMovieCard: 'movieImage1',
  restaurantCarousel1: 'foodImage1',
  restaurantCarousel2: 'foodImage2',
  restaurantCarousel3: 'foodImage3',
  cardPlaying: 'currentGameCover',
  cardReading: 'salafismCover',
  cardFavoriteBooks: 'favoriteBooksCover',
  cardFavoriteGames: 'favoriteGameCover',
  cardWatching: 'currentShowCover',
  cardFavoriteShows: 'favoriteShowCover',
  cardTopMovies: 'movieImage1',
  cardFavoriteRestaurants: 'foodImage4',
  cardInstagram: 'aliPortrait',
  cardIslamicBlog: 'aliPortrait',
  cardPhilosophyBlog: 'mastersDegree',
  cardHumanitiesBlog: 'blockchainCert',
}


const CARD_ICONS = {
  youtube: { src: youtubeIcon, alt: 'YouTube icon' },
  github: { src: githubIcon, alt: 'GitHub icon' },
  movie: { src: letterboxdIcon, alt: 'Letterboxd icon' },
  restaurant: { src: beliIcon, alt: 'Beli icon' },
  playing: { src: stashIcon, alt: 'Stash icon' },
  reading: { src: storyGraphIcon, alt: 'StoryGraph icon' },
  reddit: { src: redditIcon, alt: 'Reddit icon' },
}

const getImageSrc = (selections, key) => IMAGE_LIBRARY[selections[key]]?.src ?? aliPortrait

const heroSlideImageMap = {
  movie: 'topMovieCard',
  reading: 'cardReading',
  'favorite-books': 'cardFavoriteBooks',
  playing: 'cardPlaying',
  'favorite-games': 'cardFavoriteGames',
  watching: 'cardWatching',
  'favorite-shows': 'cardFavoriteShows',
  instagram: 'cardInstagram',
  reddit: 'heroSlideDefault',
  'islamic-blog': 'cardIslamicBlog',
  'philosophy-blog': 'cardPhilosophyBlog',
  'humanities-blog': 'cardHumanitiesBlog',
}

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME ?? ''
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? ''

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeRestaurantSlide, setActiveRestaurantSlide] = useState(0)
  const [activeIjazatSlide, setActiveIjazatSlide] = useState(0)
  const [activeSecularSlide, setActiveSecularSlide] = useState(0)
  const [activeHeroPortrait, setActiveHeroPortrait] = useState(0)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [imageSelections, setImageSelections] = useState(DEFAULT_IMAGE_SELECTIONS)

  const isAdminRoute = window.location.pathname === '/admin'
  const isProfessionalRoute = window.location.pathname === '/professional'
  const isBlogRoute = window.location.pathname === '/blog'
  const isIslamRoute = window.location.pathname === '/islam'

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_CAROUSEL_SLIDES.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRestaurantSlide((current) => (current + 1) % 3)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [])

  const heroPortraits = useMemo(() => {
    const selectedPortrait = getImageSrc(imageSelections, 'heroPortrait')
    const orderedPortraits = selfPortraits.filter((portrait) => portrait.src !== selectedPortrait)

    return [
      { id: 'selectedHeroPortrait', label: 'Selected Hero Portrait', src: selectedPortrait },
      ...orderedPortraits,
    ]
  }, [imageSelections])

  useEffect(() => {
    if (heroPortraits.length <= 1) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveHeroPortrait((current) => (current + 1) % heroPortraits.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [heroPortraits])

  useEffect(() => {
    setActiveHeroPortrait(0)
  }, [heroPortraits])

  const cycleIndex = (setter, currentIndex, direction, length) => {
    setter((currentIndex + direction + length) % length)
  }

  const heroSlides = useMemo(
    () =>
      HERO_CAROUSEL_SLIDES.map((slide) => ({
        ...slide,
        image:
          slide.cardId === 'movie'
            ? TOP_MOVIE_CARD.image ?? getImageSrc(imageSelections, 'topMovieCard')
            : getImageSrc(imageSelections, heroSlideImageMap[slide.cardId] ?? 'heroSlideDefault'),
      })),
    [imageSelections],
  )

  const restaurantCarouselImages = useMemo(
    () => [
      getImageSrc(imageSelections, 'restaurantCarousel1'),
      getImageSrc(imageSelections, 'restaurantCarousel2'),
      getImageSrc(imageSelections, 'restaurantCarousel3'),
    ],
    [imageSelections],
  )

  const ijazatGallery = useMemo(() => ijazatImages, [])
  const secularGallery = useMemo(() => secularImages, [])

  const activeHeroItem = heroSlides[activeSlide]
  const activeHeroPortraitImage = heroPortraits[activeHeroPortrait]?.src ?? getImageSrc(imageSelections, 'heroPortrait')

  const renderSectionLabel = (label, cardId) => {
    const icon = CARD_ICONS[cardId]

    return (
      <p className="section-label section-label-with-icon">
        {icon ? <img src={icon.src} alt={icon.alt} className={['social-icon', cardId === 'github' ? 'social-icon-github' : ''].filter(Boolean).join(' ')} /> : null}
        <span>{label}</span>
      </p>
    )
  }

  const adminControls = [
    { key: 'heroPortrait', label: 'Hero Portrait' },
    { key: 'heroSlideDefault', label: 'Main Carousel Card Image' },
    { key: 'topMovieCard', label: 'Top Card: Movie Review' },
    { key: 'restaurantCarousel1', label: 'Restaurant Carousel Image 1' },
    { key: 'restaurantCarousel2', label: 'Restaurant Carousel Image 2' },
    { key: 'restaurantCarousel3', label: 'Restaurant Carousel Image 3' },
    { key: 'cardPlaying', label: "Card: What I'm Playing" },
    { key: 'cardReading', label: 'Card: What I Am Reading' },
    { key: 'cardFavoriteBooks', label: 'Card: My Favorite Books' },
    { key: 'cardFavoriteGames', label: 'Card: My Favorite Video Games' },
    { key: 'cardWatching', label: 'Card: What Show I Am Currently Watching' },
    { key: 'cardFavoriteShows', label: 'Card: My Favorite Shows' },
    { key: 'cardTopMovies', label: 'Card: My Top 100 Movies' },
    { key: 'cardFavoriteRestaurants', label: 'Card: My Favorite Restaurants' },
    { key: 'cardInstagram', label: 'Card: Instagram' },
    { key: 'cardIslamicBlog', label: 'Card: Islamic Blog' },
    { key: 'cardPhilosophyBlog', label: 'Card: Philosophy Blog' },
    { key: 'cardHumanitiesBlog', label: 'Card: Humanities Blog' },
  ]

  const handleAdminLogin = (event) => {
    event.preventDefault()
    if (ADMIN_USERNAME && ADMIN_PASSWORD && adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true)
      setAdminError('')
      setAdminPassword('')
      return
    }

    setAdminError('Invalid admin credentials.')
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    setIsAdminMode(false)
    setAdminUsername('')
    setAdminPassword('')
    setAdminError('')
  }

  const contentCardImageMap = {
    playing: 'cardPlaying',
    reading: 'cardReading',
    'favorite-books': 'cardFavoriteBooks',
    'favorite-games': 'cardFavoriteGames',
    watching: 'cardWatching',
    'favorite-shows': 'cardFavoriteShows',
    instagram: 'cardInstagram',
    'islamic-blog': 'cardIslamicBlog',
    'philosophy-blog': 'cardPhilosophyBlog',
    'humanities-blog': 'cardHumanitiesBlog',
  }

  if (isIslamRoute) {
    return (
      <main className="page blog-page">
        <a href="#islam-main" className="skip-link">
          Skip to the content
        </a>

        <section className="blog-hero">
          <div>
            <p className="professional-kicker">Islamic Writing</p>
            <h1>Abu Lut</h1>
            <p className="blog-lead">
              Research, study, teaching, and writing focused on tawhid, qira'at, hadith, fiqh, theology, and tazkiyya.
            </p>
            <p className="blog-lead">
              Lineage: Ali bin Shukri bin Mohammad Amin bin Abd al-Rahman bin Khalil bin Salim al-Hindi
            </p>
            <div className="professional-hero-actions">
              <a href="/">Back to portfolio</a>
              <a href="/professional">Professional</a>
              <a href="/blog">Blog</a>
              <a href="https://www.youtube.com/watch?v=reIL-x_tf2w" target="_blank" rel="noreferrer">
                Watch recent lesson
              </a>
            </div>
          </div>
          <img className="professional-hero-image" src={getImageSrc(imageSelections, 'cardIslamicBlog')} alt="Islamic writing" />
        </section>

        <section className="gallery-section">
          <div className="section-header-row">
            <h2>Ijazat Gallery</h2>
          </div>
          <div className="gallery-carousel">
            <div className="carousel-stage">
              <button
                type="button"
                className="carousel-nav"
                aria-label="Previous ijazat image"
                onClick={() => cycleIndex(setActiveIjazatSlide, activeIjazatSlide, -1, ijazatGallery.length)}
              >
                &lt;
              </button>
              <article className="gallery-card carousel-card">
                <img src={ijazatGallery[activeIjazatSlide].image} alt={ijazatGallery[activeIjazatSlide].title} />
                <div className="carousel-card-copy">
                  <p className="section-label">
                    Credential {activeIjazatSlide + 1} / {ijazatGallery.length}
                  </p>
                  <h3>{ijazatGallery[activeIjazatSlide].title}</h3>
                  <p>{ijazatGallery[activeIjazatSlide].description}</p>
                </div>
              </article>
              <button
                type="button"
                className="carousel-nav"
                aria-label="Next ijazat image"
                onClick={() => cycleIndex(setActiveIjazatSlide, activeIjazatSlide, 1, ijazatGallery.length)}
              >
                &gt;
              </button>
            </div>
            <div className="carousel-thumbs" role="tablist" aria-label="Ijazat gallery thumbnails">
              {ijazatGallery.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  className={`thumb-button${index === activeIjazatSlide ? ' active' : ''}`}
                  onClick={() => setActiveIjazatSlide(index)}
                  aria-label={`View ${item.title}`}
                  aria-pressed={index === activeIjazatSlide}
                >
                  <img src={item.image} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <div id="islam-main" className="blog-layout">
          <section className="blog-section">
            <h2>Accomplished</h2>
            <ul className="professional-qualifications-grid">
              {ISLAM_ACCOMPLISHMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="professional-hero-actions islam-hero-actions">
              <a href="#islam-studies">Islamic Studies</a>
              <a href="#islam-contact">Contact</a>
              <a href="https://www.youtube.com/watch?v=reIL-x_tf2w" target="_blank" rel="noreferrer">
                Learn More
              </a>
            </div>
          </section>

          <section id="islam-studies" className="blog-section">
            <h2>Islamic Studies</h2>
            {ISLAM_STUDY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="professional-pillars">
              {ISLAM_PAGE_TOPICS.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Completed Courses</h2>
            <div className="professional-post-grid islam-course-grid">
              {ISLAM_COMPLETED_COURSES.map((courseGroup) => (
                <article key={courseGroup.provider} className="professional-panel">
                  <h3>{courseGroup.provider}</h3>
                  <ul className="professional-link-list">
                    {courseGroup.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Planned Study Path</h2>
            <div className="professional-two-column">
              {ISLAM_FUTURE_GOALS.map((goalGroup) => (
                <article key={goalGroup.heading} className="professional-panel">
                  <h3>{goalGroup.heading}</h3>
                  <ul className="professional-link-list">
                    {goalGroup.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Self-Studied</h2>
            <p>
              This is not exhaustive, but it outlines the major reading tracks and independent study areas currently
              undertaken.
            </p>
            <div className="professional-post-grid islam-study-grid">
              {ISLAM_SELF_STUDIED.map((group) => (
                <article key={group.group} className="professional-panel">
                  <h3>{group.group}</h3>
                  {group.sections.map((section) => (
                    <div key={section.title} className="islam-subsection">
                      <p className="professional-kicker">{section.title}</p>
                      <ul className="professional-link-list">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Notes, Works, and Reading Tracks</h2>
            <div className="professional-two-column">
              {ISLAM_NOTES_AND_WORKS.map((group) => (
                <article key={group.title} className="professional-panel">
                  <h3>{group.title}</h3>
                  <ul className="professional-link-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="blog-section">
            <h2>Islamic Articles</h2>
            <ul className="professional-link-list">
              {ISLAM_ARTICLE_LINKS.map((link) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="blog-section">
            <h2>Khutab</h2>
            <p>Experienced public speaker and khatib.</p>
            <ul className="professional-qualifications-grid">
              {ISLAM_KHUTAB.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="blog-section">
            <h2>Credentials by Discipline</h2>
            <div className="professional-post-grid islam-course-grid">
              {ISLAM_CREDENTIAL_GROUPS.map((group) => (
                <article key={group.title} className="professional-panel">
                  <h3>{group.title}</h3>
                  <ul className="professional-link-list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="blog-section blog-links-section">
            <article className="blog-link-panel">
              <h2>My Shuyukh &amp; Teachers</h2>
              <ul className="professional-link-list">
                {ISLAM_TEACHERS.map((teacher) => (
                  <li key={teacher}>{teacher}</li>
                ))}
              </ul>
            </article>

            <article className="blog-link-panel">
              <h2>Mutun Currently Memorizing</h2>
              {ISLAM_MEMORIZING.map((group) => (
                <div key={group.title} className="islam-subsection">
                  <p className="professional-kicker">{group.title}</p>
                  {group.items.length ? (
                    <ul className="professional-link-list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>In progress.</p>
                  )}
                </div>
              ))}
            </article>
          </section>

          <section id="islam-contact" className="blog-section">
            <h2>Contact</h2>
            <div className="professional-two-column">
              <article className="professional-panel">
                <h3>Phone</h3>
                <p>(703) 963-2483</p>
              </article>
              <article className="professional-panel">
                <h3>Location</h3>
                <p>Badr Community Center of Dumfries</p>
              </article>
            </div>
            <div className="professional-hero-actions">
              <a href="mailto:ali@aliamin.info">Email: ali@aliamin.info</a>
              <a href="https://www.youtube.com/@AliSMAmin" target="_blank" rel="noreferrer">
                Listen to khutab
              </a>
            </div>
          </section>
        </div>
      </main>
    )
  }

  if (isBlogRoute) {
    return (
      <main className="page blog-page">
        <a href="#blog-main" className="skip-link">
          Skip to the content
        </a>

        <section className="blog-hero">
          <div>
            <p className="professional-kicker">Writing</p>
            <h1>Ali Amin&apos;s Blog</h1>
            <p className="blog-lead">
              Essays, notes, and research across Islam, philosophy, humanities, legal tech, and cultivated life.
            </p>
            <div className="professional-hero-actions">
              <a href="/">Back to portfolio</a>
              <a href="/professional">Professional</a>
              <a href="https://aliamin.info/" target="_blank" rel="noreferrer">
                Main site
              </a>
            </div>
          </div>
          <img className="professional-hero-image" src={getImageSrc(imageSelections, 'cardIslamicBlog')} alt="Ali Amin blog" />
        </section>

        <div id="blog-main" className="blog-layout">
          <section className="blog-section">
            <h2>Featured Writing</h2>
            <div className="blog-grid">
              {BLOG_PAGE_POSTS.map((post) => (
                <article key={post.title} className="blog-card">
                  <p className="professional-kicker">{post.section}</p>
                  <h3>{post.title}</h3>
                  <p className="blog-date">{post.date}</p>
                  <p>{post.excerpt}</p>
                  <a href={post.link} target="_blank" rel="noreferrer">
                    Read more
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="blog-section blog-links-section">
            <article className="blog-link-panel">
              <h2>Publications</h2>
              <ul className="professional-link-list">
                <li>
                  <a href="https://aliamin.info/" target="_blank" rel="noreferrer">
                    Ali&apos;s IT &amp; Software Blog
                  </a>
                </li>
                <li>
                  <a href="https://asaphilosophy.wordpress.com" target="_blank" rel="noreferrer">
                    ASA Philosophy
                  </a>
                </li>
                <li>
                  <a href="https://asahumanities.wordpress.com" target="_blank" rel="noreferrer">
                    ASA Humanities
                  </a>
                </li>
                <li>
                  <a href="https://maqhali.wordpress.com/" target="_blank" rel="noreferrer">
                    Maqhali Tea &amp; Coffee
                  </a>
                </li>
              </ul>
            </article>

            <article className="blog-link-panel">
              <h2>Topics</h2>
              <div className="professional-pillars">
                {['Islam', 'Philosophy', 'Humanities', 'Legal Tech', 'AI', 'Blockchain', 'Coffee', 'Tea'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </section>
        </div>
      </main>
    )
  }

  if (isProfessionalRoute) {
    return (
      <main className="page professional-page">
        <a href="#professional-main" className="skip-link">
          Skip to the content
        </a>

        <section className="professional-hero">
          <div className="professional-hero-copy">
            <p className="professional-kicker">The Right Candidate</p>
            <h1>&apos;Alī Amīn</h1>
            <div className="professional-highlight-list" aria-label="Professional highlights">
              {PROFESSIONAL_HIGHLIGHTS.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="professional-hero-actions">
              <a href="/">About Ali</a>
              <a href="#latest-research">Latest Research and Blog</a>
              <a href="https://aliamin.info/" target="_blank" rel="noreferrer">
                Ali&apos;s IT &amp; Software Blog
              </a>
            </div>
          </div>
          <img className="professional-hero-image" src={getImageSrc(imageSelections, 'heroPortrait')} alt="Ali Amin" />
        </section>

        <div id="professional-main" className="professional-layout">
          <section id="latest-research" className="professional-section">
            <h2>Latest Research and Blog</h2>
            <div className="professional-post-grid">
              {PROFESSIONAL_POSTS.map((post) => (
                <article key={post.title} className="professional-post-card">
                  <h3>{post.title}</h3>
                  <p className="professional-meta">
                    {post.author}
                    <span>•</span>
                    {post.date}
                    <span>•</span>
                    {post.category}
                    <span>•</span>
                    {post.comments}
                  </p>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="professional-section professional-github-section">
            <div>
              <h2>Github Contributions</h2>
              <p>AliSAmin&apos;s Github Contributions</p>
            </div>
            <a href="https://github.com/AliSMAmin" target="_blank" rel="noreferrer" className="professional-github-chart">
              <img src="https://ghchart.rshah.org/AliSMAmin" alt="AliSAmin GitHub contribution chart" />
            </a>
          </section>

          <section className="professional-section professional-two-column">
            <article className="professional-panel">
              <h2>Qualifications</h2>
              <p>Certificates</p>
              <p>Click to view Ali Amin&apos;s certificates.</p>
              <a href="https://www.credential.net/profile/aliamin512539/wallet" target="_blank" rel="noreferrer">
                credential.net/profile/aliamin512539/wallet
              </a>
              <div className="professional-mini-topics">
                <span>Instructing and teaching</span>
                <span>Investing &amp; crypto</span>
                <span>Watch me</span>
                <span>Teach</span>
              </div>
            </article>

            <article className="professional-panel">
              <h2>Summary</h2>
              <p>
                Highly talented: solutions architect, DevOps software engineer, and technical engineering manager.
              </p>
              <p>
                Solutions architect for software, blockchain, and cloud-based systems. Solidity smart-contract, Golang,
                Python, ChatGPT API, and Linux engineer with integrated DevOps and business-management experience.
              </p>
              <p>
                Wide experience across software development, secure technical solutions, subject-matter expertise,
                client-facing work, and written documentation. Assisted clients in saving hundreds of thousands of
                dollars through secure and efficient solutions.
              </p>
            </article>
          </section>

          <section className="professional-section">
            <div className="professional-stats">
              {PROFESSIONAL_STATS.map((stat) => (
                <article key={stat.label} className="professional-stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="professional-section professional-two-column">
            <article className="professional-panel">
              <h2>Technical Papers Written</h2>
              <ul className="professional-link-list">
                {PROFESSIONAL_DOCUMENTS.map((item) => (
                  <li key={item.title}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <article className="professional-panel">
              <h2>Education</h2>
              <ul className="professional-link-list">
                {PROFESSIONAL_QUALIFICATIONS.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2>Experience</h2>
              <p>
                Software, blockchain, cloud, Linux, Python, Go, business management, technical writing, research, and
                legal-tech product thinking.
              </p>
            </article>
          </section>

          <section className="professional-section">
            <div className="professional-pillars">
              {['Blockchain?', 'The Cloud?', 'Linux?', 'Python?', 'Go?'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <section className="professional-section">
            <h2>Certificates and Qualifications</h2>
            <ul className="professional-qualifications-grid">
              {PROFESSIONAL_QUALIFICATIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="professional-section">
            <h2>Curricula Vitae</h2>
            <p>Experience my projects: a portfolio demonstrating Amin&apos;s multidisciplinary talents.</p>
            <div className="professional-project-grid">
              {PROFESSIONAL_PROJECTS.map((project) => (
                <article key={project.title} className="professional-project-card">
                  <p className="professional-project-index">{project.index}</p>
                  <h3>{project.title}</h3>
                  <ul>
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a href="/">more</a>
                </article>
              ))}
            </div>
          </section>

          <section className="professional-section professional-story-section">
            <h2>Unlocking Success in the World of Technology: The Journey of Ali Amin</h2>
            <p>
              In the ever-evolving landscape of technology, Ali Amin stands out as a multidisciplinary builder
              leveraging engineering depth, research fluency, and strategic thinking to drive meaningful change.
            </p>
            <p>
              From early work as a Python developer in Virginia to blockchain consulting, DevOps engineering, and
              architecture leadership, his portfolio reflects consistent adaptability across complex technical domains.
            </p>
            <p>
              As a blockchain consultant, Ali has helped organizations explore secure, practical implementations that
              streamline operations, improve trust, and support long-term digital transformation.
            </p>
            <p>
              As a DevOps engineer and Linux specialist, he has promoted collaboration between development and
              operations teams, faster delivery cycles, stronger infrastructure discipline, and improved product quality.
            </p>
            <p>
              Looking forward, Ali remains committed to building useful systems through his own tech initiatives,
              including JuristAI, with a focus on democratizing access to legal services and supporting justice through
              technology.
            </p>
            <p>
              Featured on:{' '}
              <a href="https://getelastech.com/blockchain/" target="_blank" rel="noreferrer">
                getelastech.com/blockchain
              </a>
            </p>
          </section>

          <section className="professional-section">
            <h2>References</h2>
            <div className="professional-testimonial-grid">
              {PROFESSIONAL_TESTIMONIALS.map((item) => (
                <blockquote key={item.attribution} className="professional-testimonial">
                  <p>{item.quote}</p>
                  <footer>{item.attribution}</footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="professional-section">
            <p className="professional-kicker">Hardware • Networking • Software • Business Management</p>
            <h2>What I Know</h2>
            <p>My expertise and platform proficiencies:</p>
            <ul className="professional-skills-grid">
              {PROFESSIONAL_SKILLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="professional-section professional-contact">
            <h2>Contact</h2>
            <div className="professional-hero-actions">
              <a href="mailto:ali@aliamin.info">ali@aliamin.info</a>
              <a href="https://www.linkedin.com/in/ali-juristai/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://wa.me/15714126731" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href="/">Back to portfolio</a>
            </div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      {isAdminRoute ? (
        <section className="admin-panel" aria-label="Admin image manager">
          <div className="admin-panel-header">
            <h2>Admin Image Manager</h2>
            {isAdminAuthenticated ? (
              <div className="admin-actions">
                <button type="button" onClick={() => setIsAdminMode((current) => !current)}>
                  {isAdminMode ? 'Hide controls' : 'Show controls'}
                </button>
                <button type="button" onClick={handleAdminLogout}>
                  Logout admin
                </button>
              </div>
            ) : null}
          </div>

          {!isAdminAuthenticated ? (
            <form className="admin-login" onSubmit={handleAdminLogin}>
              <label>
                <span>Username</span>
                <input
                  type="email"
                  value={adminUsername}
                  onChange={(event) => setAdminUsername(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>
              <button type="submit">Login as admin</button>
              {adminError ? <p className="admin-error">{adminError}</p> : null}
            </form>
          ) : null}

          {isAdminAuthenticated && isAdminMode ? (
            <div className="admin-grid">
              {adminControls.map((control) => (
                <label key={control.key}>
                  <span>{control.label}</span>
                  <select
                    value={imageSelections[control.key]}
                    onChange={(event) =>
                      setImageSelections((current) => ({ ...current, [control.key]: event.target.value }))
                    }
                  >
                    {IMAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <header className="hero">
        <div className="hero-portrait-shell">
          <img
            key={activeHeroPortraitImage}
            className="hero-portrait"
            src={activeHeroPortraitImage}
            alt="Ali Shukri Amin portrait"
          />
        </div>
        <h1>Ali Shukri Amin&apos;s Portfolio</h1>
        <p className="hero-description">
          Ṭālib al-&apos;Ilm • Muwahhid 🇸🇩 • Tech CEO • Mensa member • MS IT Management
          • Political prisoner during the Syrian civil war • 5'11" • 180lbs
          • Weight-lifting • Martial Arts • Specialities: Qira&apos;āt, Hadīth, Aqīda, Fiqh, Ihsān
          • Interests: Philosophy, Psychology, Geopolitics, MENA, literature, movies, fine dining, coffee, tea, fashion, motorcycling, literature, poetry, art
        </p>
        <div className="hero-contact-links" aria-label="Contact and social links">
          <a href="https://wa.me/15714126731" target="_blank" rel="noreferrer">
            <img src={whatsappIcon} alt="" aria-hidden="true" className="contact-icon" /> WhatsApp: +1 571 412 6731
          </a>
          <a href="https://www.linkedin.com/in/ali-juristai/" target="_blank" rel="noreferrer">
            <img src={linkedinIcon} alt="" aria-hidden="true" className="contact-icon" /> LinkedIn
          </a>
          <a href="mailto:ali@aliamin.info">
            <span aria-hidden="true">✉</span> ali@aliamin.info
          </a>
          <a
            href="https://www.instagram.com/alishukriamin/"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            aria-label="Instagram"
            title="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/watch?v=reIL-x_tf2w"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            aria-label="YouTube"
            title="YouTube"
          >
            <img src={youtubeIcon} alt="" aria-hidden="true" className="contact-icon" /> YouTube
          </a>
        </div>
      </header>

      <section className="main-carousel" aria-label="Main content carousel">
        <img src={activeHeroItem.image} alt={activeHeroItem.title} />
        <div>
          <p className="section-label">Main Carousel</p>
          <h2>{activeHeroItem.title}</h2>
          <p>{activeHeroItem.description}</p>
          <a href={activeHeroItem.link} target="_blank" rel="noreferrer">
            {activeHeroItem.cta}
          </a>
          <div className="dot-row" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={index === activeSlide ? 'dot active' : 'dot'}
                onClick={() => setActiveSlide(index)}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="card-grid top-grid" aria-label="Top cards">
        <article className="card youtube-card">
          {renderSectionLabel('Most Recent Islamic YouTube Video', 'youtube')}
          <iframe
            src="https://www.youtube.com/embed/reIL-x_tf2w"
            title="Most recent Islamic YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </article>

        <article className="card github-card">
          <div className="github-card-links" aria-label="Site pages">
            <a href="/professional" className="github-card-button" aria-label="Open professional page">
              Professional
            </a>
          </div>
          {renderSectionLabel('GitHub Contributions', 'github')}
          <a href="https://github.com/AliSMAmin" target="_blank" rel="noreferrer">
            <img
              src="https://ghchart.rshah.org/AliSMAmin"
              alt="Ali Shukri Amin GitHub contribution chart"
            />
          </a>
          <img
            src="https://camo.githubusercontent.com/c966e6549a477ccfda0662ba936145716368d536e756f6e44e4485bd6eef75da/68747470733a2f2f6769746875622d726561646d652d73747265616b2d73746174732e6865726f6b756170702e636f6d2f3f757365723d416c69534d416d696e267468656d653d746f6b796f6e6967687426686964655f626f726465723d74727565"
            alt="Ali Shukri Amin GitHub streak stats"
            className="github-streak"
          />
        </article>
      </section>

      <section className="gallery-section">
        <div className="section-header-row">
          <h2>Ijazat Gallery</h2>
          <a href="/islam" className="section-header-button">
            Islam
          </a>
        </div>
        <div className="gallery-carousel">
          <div className="carousel-stage">
            <button
              type="button"
              className="carousel-nav"
              aria-label="Previous ijazat image"
              onClick={() => cycleIndex(setActiveIjazatSlide, activeIjazatSlide, -1, ijazatGallery.length)}
            >
              &lt;
            </button>
            <article className="gallery-card carousel-card">
              <img src={ijazatGallery[activeIjazatSlide].image} alt={ijazatGallery[activeIjazatSlide].title} />
              <div className="carousel-card-copy">
                <p className="section-label">
                  Credential {activeIjazatSlide + 1} / {ijazatGallery.length}
                </p>
                <h3>{ijazatGallery[activeIjazatSlide].title}</h3>
                <p>{ijazatGallery[activeIjazatSlide].description}</p>
              </div>
            </article>
            <button
              type="button"
              className="carousel-nav"
              aria-label="Next ijazat image"
              onClick={() => cycleIndex(setActiveIjazatSlide, activeIjazatSlide, 1, ijazatGallery.length)}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Secular Accomplishments Gallery</h2>
        <div className="gallery-carousel">
          <div className="carousel-stage">
            <button
              type="button"
              className="carousel-nav"
              aria-label="Previous secular credential"
              onClick={() => cycleIndex(setActiveSecularSlide, activeSecularSlide, -1, secularGallery.length)}
            >
              &lt;
            </button>
            <article className="gallery-card carousel-card">
              <img src={secularGallery[activeSecularSlide].image} alt={secularGallery[activeSecularSlide].title} />
              <div className="carousel-card-copy">
                <p className="section-label">
                  Credential {activeSecularSlide + 1} / {secularGallery.length}
                </p>
                <h3>{secularGallery[activeSecularSlide].title}</h3>
                <p>{secularGallery[activeSecularSlide].description}</p>
              </div>
            </article>
            <button
              type="button"
              className="carousel-nav"
              aria-label="Next secular credential"
              onClick={() => cycleIndex(setActiveSecularSlide, activeSecularSlide, 1, secularGallery.length)}
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      <section className="card-grid top-grid" aria-label="Movies and dining">
        <article className="card movie-card">
          {renderSectionLabel(TOP_MOVIE_CARD.label, 'movie')}
          <img src={TOP_MOVIE_CARD.image ?? getImageSrc(imageSelections, 'topMovieCard')} alt={TOP_MOVIE_CARD.title} className="card-image" />
          <h3>{TOP_MOVIE_CARD.title}</h3>
          <p>{TOP_MOVIE_CARD.description}</p>
          <a href={TOP_MOVIE_CARD.link} target="_blank" rel="noreferrer">
            {TOP_MOVIE_CARD.cta}
          </a>
        </article>

        <article className="card long-card top-movies-card">
          <p className="section-label">My Top 100 Movies</p>
          <img src={TOP_MOVIES_LIST_CARD.image ?? getImageSrc(imageSelections, 'cardTopMovies')} alt={TOP_MOVIES_LIST_CARD.title} className="card-image" />
          <h3>{TOP_MOVIES_LIST_CARD.title}</h3>
          <p>{TOP_MOVIES_LIST_CARD.description}</p>
          <a href={TOP_MOVIES_LIST_CARD.link} target="_blank" rel="noreferrer">
            {TOP_MOVIES_LIST_CARD.cta}
          </a>
        </article>

        <article className="card restaurant-card">
          {renderSectionLabel('Most Recent Restaurant Review', 'restaurant')}
          <img
            src={restaurantCarouselImages[activeRestaurantSlide]}
            alt="Restaurant review image"
            className="restaurant-carousel-image"
          />
          <h3>Oyamel Cocina in D.C.</h3>
          <a href="https://beliapp.co/app/aliflaneur" target="_blank" rel="noreferrer">
            View full dining review
          </a>
        </article>

        <article className="card long-card favorite-restaurants-card">
          <p className="section-label">My Favorite Restaurants</p>
          <img
            src={getImageSrc(imageSelections, 'cardFavoriteRestaurants')}
            alt="My favorite restaurants"
            className="card-image"
          />
          <h3>My Favorite Restaurants</h3>
          <p>Favorite dining spots and comfort picks I keep returning to.</p>
          <details className="restaurants-dropdown">
            <summary>Restaurants - Been</summary>
            <ol className="restaurants-list">
              {RESTAURANTS_BEEN.map((restaurant) => (
                <li key={restaurant}>{restaurant}</li>
              ))}
            </ol>
          </details>
          <a href="https://beliapp.co/app/aliflaneur" target="_blank" rel="noreferrer">
            Explore favorite restaurants
          </a>
        </article>
      </section>

      <section className="card-grid multi" aria-label="Content cards">
        {CURRENT_FAVORITES_CARDS.map((card) => (
          <article
            key={card.id}
            className={['card', 'current-favorite-card', `content-card-${card.id}`].join(' ')}
          >
            <p className="section-label">{card.label}</p>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <a href={card.link} target="_blank" rel="noreferrer">
              {card.cta}
            </a>
          </article>
        ))}
        {CONTENT_CARDS.filter((card) => !['youtube', 'github', 'restaurant'].includes(card.id))
          .sort((a, b) => {
            const aIndex = CONTENT_LAYOUT_ORDER.indexOf(a.id)
            const bIndex = CONTENT_LAYOUT_ORDER.indexOf(b.id)
            const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex
            const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex
            return safeA - safeB
          })
          .map((card) => (
          <article
            key={card.id}
            className={[
              'card',
              ['favorite-books', 'favorite-games', 'favorite-shows'].includes(card.id) ? 'long-card' : '',
              `content-card-${card.id}`,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {renderSectionLabel(card.label, card.id)}
            {card.id !== 'reddit' ? (
              <img src={getImageSrc(imageSelections, contentCardImageMap[card.id])} alt={card.title} className="inline-card-image" />
            ) : null}
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {['islamic-blog', 'philosophy-blog', 'humanities-blog'].includes(card.id) ? (
              <a href="/blog" className="section-header-button content-card-button">
                Blog
              </a>
            ) : null}
            <a href={card.link} target="_blank" rel="noreferrer">
              {card.cta}
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App



