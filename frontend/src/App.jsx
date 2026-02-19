import { useEffect, useMemo, useState } from 'react'
import './App.css'

import aliPortrait from './assets/PicturesOfAli/8.0.jpg'
import aliSuitPortrait from './assets/PicturesOfAli/8.7 (8.7) Suit (Editted).jpg'
import bitcoinBookCover from './assets/Publications/Is Bitcoin Halal.jpg'
import enderalCover from './assets/Games/Enderal.jpg'
import salafismCover from './assets/CurrentReads/understanding-salafism-9781786078483_hr-923828085.jpg'
import awsCert from './assets/secularDiplomas/AWS-SAA.png'
import blockchainCert from './assets/secularDiplomas/Certified Blockchain Expert.png'
import mastersDegree from './assets/secularDiplomas/mastersdegree.png'

const ijazatImages = Object.entries(
  import.meta.glob('./assets/Ijazat/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    title: `Ijazat Credential ${index + 1}`,
    description: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ') ?? 'Ijazat credential',
    image: src,
  }))

const secularImages = Object.entries(
  import.meta.glob('./assets/secularDiplomas/*.{png,jpg,jpeg,JPG,JPEG,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], index) => ({
    title: `Credential ${index + 1}`,
    description: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ') ?? 'Professional credential',
    image: src,
  }))

const IMAGE_LIBRARY = {
  aliPortrait: { label: 'Ali Portrait', src: aliPortrait },
  aliSuitPortrait: { label: 'Ali Suit Portrait', src: aliSuitPortrait },
  bitcoinBookCover: { label: 'Is Bitcoin Halal (Publication)', src: bitcoinBookCover },
  enderalCover: { label: 'Enderal (Game)', src: enderalCover },
  salafismCover: { label: 'Salafism: Between Fact and Fiction', src: salafismCover },
  awsCert: { label: 'AWS-SAA', src: awsCert },
  blockchainCert: { label: 'Certified Blockchain Expert', src: blockchainCert },
  mastersDegree: { label: 'Masters Degree', src: mastersDegree },
}

const IMAGE_OPTIONS = Object.entries(IMAGE_LIBRARY).map(([value, data]) => ({
  value,
  label: data.label,
}))

const TOP_MOVIE_CARD = {
  id: 'movie',
  label: 'Most Recent Movie Review',
  title: 'Resurrection (2025)',
  description:
    '★★★★★ · Seen at the National Museum of Asian Art, Freer Gallery. A rebellion against the ephemeral nature of life.',
  link: 'https://letterboxd.com/',
  cta: 'Open movie profile',
}

const CONTENT_CARDS = [
  {
    id: 'youtube',
    label: 'Most Recent Islamic YouTube Video',
    title: 'Are Sufis Mushrik or Are Salafis Extremists?',
    description: 'Are Sufis Mushrik or Are Salafis Extremists? A new analysis of Istighātha & Tawassul.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
    cta: 'Watch now',
  },
  {
    id: 'github',
    label: 'GitHub Contributions',
    title: 'AliSMAmin GitHub Activity',
    description: 'Contribution chart and streak stats from my public profile.',
    link: 'https://github.com/AliSMAmin',
    cta: 'Open GitHub',
  },
  {
    id: 'restaurant',
    label: 'Most Recent Restaurant Review',
    title: 'Oyamel Cocina in D.C.',
    description: 'Featured dining update from Oyamel Cocina in Washington, D.C.',
    link: 'https://beliapp.co/app/aliflaneur',
    cta: 'View full dining review',
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
    id: 'reading',
    label: 'What I Am Reading',
    title: 'Salafism: Between Fact and Fiction',
    description: 'Yasir Qadhi · current active read.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
    cta: 'View reading tracker',
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
  title: card.label,
  description: card.description,
  link: card.link,
  cta: card.cta,
}))

const DEFAULT_IMAGE_SELECTIONS = {
  heroPortrait: 'aliPortrait',
  heroSlideDefault: 'bitcoinBookCover',
  topMovieCard: 'aliSuitPortrait',
  restaurantCarousel1: 'bitcoinBookCover',
  restaurantCarousel2: 'salafismCover',
  restaurantCarousel3: 'aliPortrait',
  cardPlaying: 'enderalCover',
  cardReading: 'salafismCover',
  cardInstagram: 'aliPortrait',
  cardIslamicBlog: 'aliPortrait',
  cardPhilosophyBlog: 'mastersDegree',
  cardHumanitiesBlog: 'blockchainCert',
}

const getImageSrc = (selections, key) => IMAGE_LIBRARY[selections[key]]?.src ?? aliPortrait

const ADMIN_USERNAME = 'ali+2@juristai.org'
const ADMIN_PASSWORD = 'AtticusDev1234@'

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
    () => HERO_CAROUSEL_SLIDES.map((slide) => ({ ...slide, image: getImageSrc(imageSelections, 'heroSlideDefault') })),
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

  const adminControls = [
    { key: 'heroPortrait', label: 'Hero Portrait' },
    { key: 'heroSlideDefault', label: 'Main Carousel Card Image' },
    { key: 'topMovieCard', label: 'Top Card: Movie Review' },
    { key: 'restaurantCarousel1', label: 'Restaurant Carousel Image 1' },
    { key: 'restaurantCarousel2', label: 'Restaurant Carousel Image 2' },
    { key: 'restaurantCarousel3', label: 'Restaurant Carousel Image 3' },
    { key: 'cardPlaying', label: "Card: What I'm Playing" },
    { key: 'cardReading', label: 'Card: What I Am Reading' },
    { key: 'cardInstagram', label: 'Card: Instagram' },
    { key: 'cardIslamicBlog', label: 'Card: Islamic Blog' },
    { key: 'cardPhilosophyBlog', label: 'Card: Philosophy Blog' },
    { key: 'cardHumanitiesBlog', label: 'Card: Humanities Blog' },
  ]

  const handleAdminLogin = (event) => {
    event.preventDefault()
    if (adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
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
          <p className="section-label">Most Recent Islamic YouTube Video</p>
          <iframe
            src="https://www.youtube.com/embed/reIL-x_tf2w"
            title="Most recent Islamic YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </article>

        <article className="card github-card">
          <p className="section-label">GitHub Contributions</p>
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
          <p className="section-label">{TOP_MOVIE_CARD.label}</p>
          <img src={getImageSrc(imageSelections, 'topMovieCard')} alt={TOP_MOVIE_CARD.title} className="card-image" />
          <h3>{TOP_MOVIE_CARD.title}</h3>
          <p>{TOP_MOVIE_CARD.description}</p>
          <a href={TOP_MOVIE_CARD.link} target="_blank" rel="noreferrer">
            {TOP_MOVIE_CARD.cta}
          </a>
        </article>

        <article className="card restaurant-card">
          <p className="section-label">Most Recent Restaurant Review</p>
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
      </section>

      <section className="card-grid multi" aria-label="Content cards">
        {CONTENT_CARDS.filter((card) => !['youtube', 'github', 'restaurant'].includes(card.id)).map((card) => (
          <article key={card.id} className="card">
            <p className="section-label">{card.label}</p>
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
          <button
            type="button"
            className="carousel-nav"
            onClick={() => cycleIndex(setActiveIjazatSlide, activeIjazatSlide, -1, ijazatGallery.length)}
          >
            ‹
          </button>
          <article className="gallery-card carousel-card">
            <img src={ijazatGallery[activeIjazatSlide].image} alt={ijazatGallery[activeIjazatSlide].title} />
            <h3>{ijazatGallery[activeIjazatSlide].title}</h3>
            <p>{ijazatGallery[activeIjazatSlide].description}</p>
          </article>
          <button
            type="button"
            className="carousel-nav"
            onClick={() => cycleIndex(setActiveIjazatSlide, activeIjazatSlide, 1, ijazatGallery.length)}
          >
            ›
          </button>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Secular Accomplishments Gallery</h2>
        <div className="gallery-carousel">
          <button
            type="button"
            className="carousel-nav"
            onClick={() => cycleIndex(setActiveSecularSlide, activeSecularSlide, -1, secularGallery.length)}
          >
            ‹
          </button>
          <article className="gallery-card carousel-card">
            <img src={secularGallery[activeSecularSlide].image} alt={secularGallery[activeSecularSlide].title} />
            <h3>{secularGallery[activeSecularSlide].title}</h3>
            <p>{secularGallery[activeSecularSlide].description}</p>
          </article>
          <button
            type="button"
            className="carousel-nav"
            onClick={() => cycleIndex(setActiveSecularSlide, activeSecularSlide, 1, secularGallery.length)}
          >
            ›
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
