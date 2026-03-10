import { useEffect, useMemo, useState } from 'react'
import './App.css'
import letterboxdData from './data/letterboxd.json'
import redditData from './data/reddit.json'

import aliPortrait from './assets/PicturesOfAli/9.3 (edit).jpg'
import aliSuitPortrait from './assets/PicturesOfAli/8.7 (8.7) Suit (Editted).jpg'
import bitcoinBookCover from './assets/Publications/Is Bitcoin Halal.jpg'
import enderalCover from './assets/Games/CurrentlyPlaying/Enderal.jpg'
import salafismCover from './assets/Books/CurrentReads/understanding-salafism-9781786078483_hr-923828085.jpg'
import awsCert from './assets/secularDiplomas/AWS-SAA.png'
import blockchainCert from './assets/secularDiplomas/Certified Blockchain Expert.png'
import mastersDegree from './assets/secularDiplomas/mastersdegree.png'
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
  import.meta.glob('./assets/Ijazat/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
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
  .map(([path, src], index) => ({
    title: `Ijazat Credential ${index + 1}`,
    description: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ') ?? 'Ijazat credential',
    image: typeof src === 'string' ? src : src?.default,
  }))

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
  import.meta.glob('./assets/secularDiplomas/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
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
  .map(([path, src], index) => ({
    title: `Credential ${index + 1}`,
    description: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ') ?? 'Professional credential',
    image: typeof src === 'string' ? src : src?.default,
  }))

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
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminError, setAdminError] = useState('')
  const [imageSelections, setImageSelections] = useState(DEFAULT_IMAGE_SELECTIONS)

  const isAdminRoute = window.location.pathname === '/admin'

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

  const renderSectionLabel = (label, cardId) => {
    const icon = CARD_ICONS[cardId]

    return (
      <p className="section-label section-label-with-icon">
        {icon ? <img src={icon.src} alt={icon.alt} className="social-icon" /> : null}
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
        <img className="hero-portrait" src={getImageSrc(imageSelections, 'heroPortrait')} alt="Ali Shukri Amin" />
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
          <a href="https://beliapp.co/app/aliflaneur" target="_blank" rel="noreferrer">
            Explore favorite restaurants
          </a>
        </article>
      </section>

      <section className="card-grid multi" aria-label="Content cards">
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
            <a href={card.link} target="_blank" rel="noreferrer">
              {card.cta}
            </a>
          </article>
        ))}
      </section>

      <section className="gallery-section">
        <h2>Ijazat Gallery</h2>
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
    </main>
  )
}

export default App



