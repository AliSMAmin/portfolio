import { useEffect, useState } from 'react'
import './App.css'

import aliPortrait from './assets/recentPicOfAli.jpg'
import bitcoinBookCover from './assets/Is Bitcoin Halal.jpg'
import enderalCover from './assets/Enderal.jpg'
import salafismCover from './assets/understanding-salafism-9781786078483_hr-923828085.jpg'

const HERO_CAROUSEL_SLIDES = [
  {
    id: 'slide-youtube',
    title: 'Latest Islamic YouTube Lecture',
    description:
      'Are Sufis Mushrik or Are Salafis Extremists? A new analysis of Istighātha & Tawassul.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
    cta: 'Watch now',
    image: 'https://img.youtube.com/vi/reIL-x_tf2w/hqdefault.jpg',
  },
  {
    id: 'slide-movie',
    title: 'Most Recent Movie Review',
    description:
      'Resurrection (2025): “A rebellion against the ephemeral nature of life.” ★★★★★',
    link: 'https://letterboxd.com/',
    cta: 'Read review',
    image: aliPortrait,
  },
  {
    id: 'slide-reading',
    title: 'What I am Reading',
    description: 'Salafism: Between Fact and Fiction by Yasir Qadhi.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
    cta: 'See reading profile',
    image: salafismCover,
  },
  {
    id: 'slide-restaurant',
    title: 'Most Recent Restaurant Review',
    description: 'Featured dining update from Oyamel Cocina in Washington, D.C.',
    link: 'https://beliapp.co/app/aliflaneur',
    cta: 'View review',
    image: bitcoinBookCover,
  },
]

const RESTAURANT_CAROUSEL_IMAGES = [bitcoinBookCover, salafismCover, aliPortrait]

const IJAZAT_GALLERY = [
  {
    title: 'Ijazat Certificate I',
    description: 'Classical studies milestone and transmission credential.',
    image: salafismCover,
  },
  {
    title: 'Ijazat Certificate II',
    description: 'Advanced textual study and authorized chain of learning.',
    image: bitcoinBookCover,
  },
  {
    title: 'Ijazat Certificate III',
    description: 'Specialized credential in Islamic thought and commentary.',
    image: aliPortrait,
  },
]

const SECULAR_GALLERY = [
  {
    title: 'Publishing & Writing',
    description: 'Books, essays, and cross-disciplinary long-form analysis.',
    image: bitcoinBookCover,
  },
  {
    title: 'Film & Cultural Critique',
    description: 'Reviews across cinema, aesthetics, and public philosophy.',
    image: aliPortrait,
  },
  {
    title: 'Technology & Research',
    description: 'Product, legal-tech, and AI-adjacent projects and collaborations.',
    image: enderalCover,
  },
]

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeRestaurantSlide, setActiveRestaurantSlide] = useState(0)
  const [activeIjazatSlide, setActiveIjazatSlide] = useState(0)
  const [activeSecularSlide, setActiveSecularSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_CAROUSEL_SLIDES.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRestaurantSlide((current) => (current + 1) % RESTAURANT_CAROUSEL_IMAGES.length)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [])

  const activeHeroItem = HERO_CAROUSEL_SLIDES[activeSlide]

  const cycleIndex = (setter, currentIndex, direction, length) => {
    setter((currentIndex + direction + length) % length)
  }

  return (
    <main className="page">
      <header className="hero">
        <img className="hero-portrait" src={aliPortrait} alt="Ali Shukri Amin" />
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
            {HERO_CAROUSEL_SLIDES.map((slide, index) => (
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

        <article className="card">
          <p className="section-label">Most Recent Movie Review</p>
          <h3>Resurrection (2025)</h3>
          <p>
            ★★★★★ · Seen at the National Museum of Asian Art, Freer Gallery. A rebellion
            against the ephemeral nature of life.
          </p>
          <a href="https://letterboxd.com/" target="_blank" rel="noreferrer">
            Open movie profile
          </a>
        </article>
      </section>

      <section className="card-grid multi" aria-label="Content cards">
        <article className="card restaurant-card">
          <p className="section-label">Most Recent Restaurant Review</p>
          <img
            src={RESTAURANT_CAROUSEL_IMAGES[activeRestaurantSlide]}
            alt="Restaurant review image"
            className="restaurant-carousel-image"
          />
          <h3>Oyamel Cocina in D.C.</h3>
          <a href="https://beliapp.co/app/aliflaneur" target="_blank" rel="noreferrer">
            View full dining review
          </a>
        </article>

        <article className="card">
          <p className="section-label">What I&apos;m Playing</p>
          <img src={enderalCover} alt="Enderal: Forgotten Stories" className="inline-card-image" />
          <h3>Enderal: Forgotten Stories</h3>
          <p>Current game focus with roleplay and worldbuilding-heavy progression.</p>
          <a href="https://stash.games/users/alishukriamin" target="_blank" rel="noreferrer">
            View game profile
          </a>
        </article>

        <article className="card">
          <p className="section-label">What I Am Reading</p>
          <h3>Salafism: Between Fact and Fiction</h3>
          <p>Yasir Qadhi · current active read.</p>
          <a href="https://app.thestorygraph.com/profile/alishukriamin" target="_blank" rel="noreferrer">
            View reading tracker
          </a>
        </article>

        <article className="card">
          <p className="section-label">Most Recent Instagram Post</p>
          <h3>Instagram Update</h3>
          <a href="https://www.instagram.com/alishukriamin/" target="_blank" rel="noreferrer">
            Open Instagram
          </a>
        </article>

        <article className="card">
          <p className="section-label">Most Recent Reddit Post</p>
          <h3>Latest Reddit Activity</h3>
          <a href="https://www.reddit.com/user/aibnsamin1/" target="_blank" rel="noreferrer">
            Open Reddit
          </a>
        </article>

        <article className="card">
          <p className="section-label">Recent Islamic Blog Post</p>
          <h3>Are Sufis Mushrik or Are Salafis Extremists?</h3>
          <a href="https://www.youtube.com/watch?v=reIL-x_tf2w" target="_blank" rel="noreferrer">
            Read / Watch
          </a>
        </article>

        <article className="card">
          <p className="section-label">Recent Philosophy Blog Post</p>
          <h3>ASA Philosophy</h3>
          <a href="https://asaphilosophy.wordpress.com" target="_blank" rel="noreferrer">
            Open philosophy blog
          </a>
        </article>

        <article className="card">
          <p className="section-label">Recent Humanities Blog Post</p>
          <h3>ASA Humanities</h3>
          <a href="https://asahumanities.wordpress.com" target="_blank" rel="noreferrer">
            Open humanities blog
          </a>
        </article>
      </section>

      <section className="gallery-section">
        <h2>Ijazat Gallery</h2>
        <div className="gallery-carousel">
          <button
            type="button"
            className="carousel-nav"
            onClick={() =>
              cycleIndex(setActiveIjazatSlide, activeIjazatSlide, -1, IJAZAT_GALLERY.length)
            }
          >
            ‹
          </button>
          <article className="gallery-card carousel-card">
            <img src={IJAZAT_GALLERY[activeIjazatSlide].image} alt={IJAZAT_GALLERY[activeIjazatSlide].title} />
            <h3>{IJAZAT_GALLERY[activeIjazatSlide].title}</h3>
            <p>{IJAZAT_GALLERY[activeIjazatSlide].description}</p>
          </article>
          <button
            type="button"
            className="carousel-nav"
            onClick={() =>
              cycleIndex(setActiveIjazatSlide, activeIjazatSlide, 1, IJAZAT_GALLERY.length)
            }
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
            onClick={() =>
              cycleIndex(setActiveSecularSlide, activeSecularSlide, -1, SECULAR_GALLERY.length)
            }
          >
            ‹
          </button>
          <article className="gallery-card carousel-card">
            <img src={SECULAR_GALLERY[activeSecularSlide].image} alt={SECULAR_GALLERY[activeSecularSlide].title} />
            <h3>{SECULAR_GALLERY[activeSecularSlide].title}</h3>
            <p>{SECULAR_GALLERY[activeSecularSlide].description}</p>
          </article>
          <button
            type="button"
            className="carousel-nav"
            onClick={() =>
              cycleIndex(setActiveSecularSlide, activeSecularSlide, 1, SECULAR_GALLERY.length)
            }
          >
            ›
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
