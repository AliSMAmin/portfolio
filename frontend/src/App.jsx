import { useEffect, useMemo, useState } from 'react'
import './App.css'

import aliPortrait from './assets/PicturesOfAli/8.0.jpg'
import aliSuitPortrait from './assets/PicturesOfAli/8.7 (8.7) Suit (Editted).jpg'
import bitcoinBookCover from './assets/Publications/Is Bitcoin Halal.jpg'
import enderalCover from './assets/Games/Enderal.jpg'
import salafismCover from './assets/CurrentReads/understanding-salafism-9781786078483_hr-923828085.jpg'
import ijazaUsulSunnah from './assets/Ijazat/Ijazah in Usul al-Sunnah.png'
import ijazaShahadah from './assets/Ijazat/Shahadah.png'
import ijazaQiraat from './assets/Ijazat/Qira\'āt 101 - Ali Amin.png'
import awsCert from './assets/secularDiplomas/AWS-SAA.png'
import blockchainCert from './assets/secularDiplomas/Certified Blockchain Expert.png'
import mastersDegree from './assets/secularDiplomas/mastersdegree.png'

const IMAGE_LIBRARY = {
  aliPortrait: { label: 'Ali Portrait', src: aliPortrait },
  aliSuitPortrait: { label: 'Ali Suit Portrait', src: aliSuitPortrait },
  bitcoinBookCover: { label: 'Is Bitcoin Halal (Publication)', src: bitcoinBookCover },
  enderalCover: { label: 'Enderal (Game)', src: enderalCover },
  salafismCover: { label: 'Salafism: Between Fact and Fiction', src: salafismCover },
  ijazaUsulSunnah: { label: 'Ijazah in Usul al-Sunnah', src: ijazaUsulSunnah },
  ijazaShahadah: { label: 'Shahadah', src: ijazaShahadah },
  ijazaQiraat: { label: 'Qira\'āt 101', src: ijazaQiraat },
  awsCert: { label: 'AWS-SAA', src: awsCert },
  blockchainCert: { label: 'Certified Blockchain Expert', src: blockchainCert },
  mastersDegree: { label: 'Masters Degree', src: mastersDegree },
}

const IMAGE_OPTIONS = Object.entries(IMAGE_LIBRARY).map(([value, data]) => ({
  value,
  label: data.label,
}))

const HERO_CAROUSEL_SLIDES = [
  {
    id: 'slide-youtube',
    title: 'Latest Islamic YouTube Lecture',
    description:
      'Are Sufis Mushrik or Are Salafis Extremists? A new analysis of Istighātha & Tawassul.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
    cta: 'Watch now',
  },
  {
    id: 'slide-movie',
    title: 'Most Recent Movie Review',
    description:
      'Resurrection (2025): “A rebellion against the ephemeral nature of life.” ★★★★★',
    link: 'https://letterboxd.com/',
    cta: 'Read review',
  },
  {
    id: 'slide-reading',
    title: 'What I am Reading',
    description: 'Salafism: Between Fact and Fiction by Yasir Qadhi.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
    cta: 'See reading profile',
  },
  {
    id: 'slide-restaurant',
    title: 'Most Recent Restaurant Review',
    description: 'Featured dining update from Oyamel Cocina in Washington, D.C.',
    link: 'https://beliapp.co/app/aliflaneur',
    cta: 'View review',
  },
]

const TOP_MOVIE_CARD = {
  label: 'Most Recent Movie Review',
  title: 'Resurrection (2025)',
  description:
    '★★★★★ · Seen at the National Museum of Asian Art, Freer Gallery. A rebellion against the ephemeral nature of life.',
  link: 'https://letterboxd.com/',
  cta: 'Open movie profile',
}

const CONTENT_CARDS = [
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

const DEFAULT_IMAGE_SELECTIONS = {
  heroPortrait: 'aliPortrait',
  heroSlideYoutube: 'bitcoinBookCover',
  heroSlideMovie: 'aliPortrait',
  heroSlideReading: 'salafismCover',
  heroSlideRestaurant: 'bitcoinBookCover',
  topMovieCard: 'aliSuitPortrait',
  restaurantCarousel1: 'bitcoinBookCover',
  restaurantCarousel2: 'salafismCover',
  restaurantCarousel3: 'aliPortrait',
  cardPlaying: 'enderalCover',
  cardReading: 'salafismCover',
  cardInstagram: 'aliPortrait',
  cardReddit: 'aliSuitPortrait',
  cardIslamicBlog: 'ijazaUsulSunnah',
  cardPhilosophyBlog: 'mastersDegree',
  cardHumanitiesBlog: 'blockchainCert',
  ijazat1: 'ijazaUsulSunnah',
  ijazat2: 'ijazaShahadah',
  ijazat3: 'ijazaQiraat',
  secular1: 'mastersDegree',
  secular2: 'blockchainCert',
  secular3: 'awsCert',
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
    () => [
      { ...HERO_CAROUSEL_SLIDES[0], image: getImageSrc(imageSelections, 'heroSlideYoutube') },
      { ...HERO_CAROUSEL_SLIDES[1], image: getImageSrc(imageSelections, 'heroSlideMovie') },
      { ...HERO_CAROUSEL_SLIDES[2], image: getImageSrc(imageSelections, 'heroSlideReading') },
      { ...HERO_CAROUSEL_SLIDES[3], image: getImageSrc(imageSelections, 'heroSlideRestaurant') },
    ],
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

  const ijazatGallery = useMemo(
    () => [
      {
        title: 'Ijazat Certificate I',
        description: 'Classical studies milestone and transmission credential.',
        image: getImageSrc(imageSelections, 'ijazat1'),
      },
      {
        title: 'Ijazat Certificate II',
        description: 'Advanced textual study and authorized chain of learning.',
        image: getImageSrc(imageSelections, 'ijazat2'),
      },
      {
        title: 'Ijazat Certificate III',
        description: 'Specialized credential in Islamic thought and commentary.',
        image: getImageSrc(imageSelections, 'ijazat3'),
      },
    ],
    [imageSelections],
  )

  const secularGallery = useMemo(
    () => [
      {
        title: 'Publishing & Writing',
        description: 'Books, essays, and cross-disciplinary long-form analysis.',
        image: getImageSrc(imageSelections, 'secular1'),
      },
      {
        title: 'Film & Cultural Critique',
        description: 'Reviews across cinema, aesthetics, and public philosophy.',
        image: getImageSrc(imageSelections, 'secular2'),
      },
      {
        title: 'Technology & Research',
        description: 'Product, legal-tech, and AI-adjacent projects and collaborations.',
        image: getImageSrc(imageSelections, 'secular3'),
      },
    ],
    [imageSelections],
  )

  const activeHeroItem = heroSlides[activeSlide]

  const adminControls = [
    { key: 'heroPortrait', label: 'Hero Portrait' },
    { key: 'heroSlideYoutube', label: 'Hero Slide: YouTube' },
    { key: 'heroSlideMovie', label: 'Hero Slide: Movie' },
    { key: 'heroSlideReading', label: 'Hero Slide: Reading' },
    { key: 'heroSlideRestaurant', label: 'Hero Slide: Restaurant' },
    { key: 'topMovieCard', label: 'Top Card: Movie Review' },
    { key: 'restaurantCarousel1', label: 'Restaurant Carousel Image 1' },
    { key: 'restaurantCarousel2', label: 'Restaurant Carousel Image 2' },
    { key: 'restaurantCarousel3', label: 'Restaurant Carousel Image 3' },
    { key: 'cardPlaying', label: "Card: What I'm Playing" },
    { key: 'cardReading', label: 'Card: What I Am Reading' },
    { key: 'cardInstagram', label: 'Card: Instagram' },
    { key: 'cardReddit', label: 'Card: Reddit' },
    { key: 'cardIslamicBlog', label: 'Card: Islamic Blog' },
    { key: 'cardPhilosophyBlog', label: 'Card: Philosophy Blog' },
    { key: 'cardHumanitiesBlog', label: 'Card: Humanities Blog' },
    { key: 'ijazat1', label: 'Ijazat Gallery 1' },
    { key: 'ijazat2', label: 'Ijazat Gallery 2' },
    { key: 'ijazat3', label: 'Ijazat Gallery 3' },
    { key: 'secular1', label: 'Secular Gallery 1' },
    { key: 'secular2', label: 'Secular Gallery 2' },
    { key: 'secular3', label: 'Secular Gallery 3' },
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
    reddit: 'cardReddit',
    'islamic-blog': 'cardIslamicBlog',
    'philosophy-blog': 'cardPhilosophyBlog',
    'humanities-blog': 'cardHumanitiesBlog',
  }

  return (
    <main className="page">
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

      <section className="card-grid three-up" aria-label="Top cards">
        <article className="card youtube-card">
          <p className="section-label">Most Recent Islamic YouTube Video</p>
          <img src={getImageSrc(imageSelections, 'heroSlideYoutube')} alt="YouTube card cover" className="card-image" />
          <iframe
            src="https://www.youtube.com/embed/reIL-x_tf2w"
            title="Most recent Islamic YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </article>

        <article className="card github-card">
          <p className="section-label">GitHub Contributions</p>
          <img src={getImageSrc(imageSelections, 'heroPortrait')} alt="GitHub card cover" className="card-image" />
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

        <article className="card">
          <p className="section-label">{TOP_MOVIE_CARD.label}</p>
          <img src={getImageSrc(imageSelections, 'topMovieCard')} alt={TOP_MOVIE_CARD.title} className="card-image" />
          <h3>{TOP_MOVIE_CARD.title}</h3>
          <p>{TOP_MOVIE_CARD.description}</p>
          <a href={TOP_MOVIE_CARD.link} target="_blank" rel="noreferrer">
            {TOP_MOVIE_CARD.cta}
          </a>
        </article>
      </section>

      <section className="card-grid multi" aria-label="Content cards">
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

        {CONTENT_CARDS.map((card) => (
          <article key={card.id} className="card">
            <p className="section-label">{card.label}</p>
            <img src={getImageSrc(imageSelections, contentCardImageMap[card.id])} alt={card.title} className="inline-card-image" />
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
