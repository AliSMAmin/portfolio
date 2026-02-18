import { useMemo, useState } from 'react'
import './App.css'

const ADMIN_USERNAME = 'ali+2@juristai.org'
const ADMIN_PASSWORD = 'AtticusDev1234@'

const CATEGORY_ORDER = [
  'all',
  'tech',
  'philosophy',
  'literature',
  'humanities',
  'fashion',
  'dining',
  'maqha',
  'film',
  'martial-arts',
  'motorcycling',
]

const SOURCE_LABELS = {
  reddit: 'Reddit',
  youtube: 'YouTube',
  instagram: 'Instagram',
  manual: 'Manual',
}

const INITIAL_PROFILE_LINKS = [
  {
    id: 'youtube-latest',
    label: 'My Most Recent Youtube Video',
    description: 'Open your latest YouTube upload feed.',
    link: 'https://www.youtube.com/@Alishukriamin',
  },
  {
    id: 'instagram-latest',
    label: 'My Most Recent Instagram Post',
    description: 'Open your latest Instagram activity.',
    link: 'https://www.instagram.com/alishukriamin/',
  },
  {
    id: 'reddit-latest',
    label: 'My Most Recent Reddit Post',
    description: 'Open your newest Reddit posts and comments.',
    link: 'https://www.reddit.com/user/aibnsamin1/',
  },
  {
    id: 'publication-latest',
    label: 'My Most Recent Publication',
    description: 'Open your latest publication and books page.',
    link: 'https://www.amazon.com/stores/Ali-Shukri-Amin/author/B0FDY9Z5M8',
  },
  {
    id: 'reading-current',
    label: 'What I am Currently Reading',
    description: 'Open your StoryGraph reading profile.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
  },
  {
    id: 'restaurant-latest',
    label: 'Latest Restaurant Review',
    description: 'Open your most recent Beli dining review activity.',
    link: 'https://beliapp.co/app/aliflaneur',
  },
  {
    id: 'game-latest',
    label: 'Latest Game Played',
    description: 'Open your newest game activity on Stash.',
    link: 'https://stash.games/users/alishukriamin',
  },
  {
    id: 'islamic-blog-latest',
    label: 'My Most Recent Islamic Blog Post',
    description: 'Are Sufis Mushrik or Are Salafis Extremists? | A New Analysis of Istighātha & Tawassul',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
  },
  {
    id: 'philosophy-blog-latest',
    label: 'My Most Recent Philosophy Blog Post',
    description: 'Open your newest philosophy post.',
    link: 'https://asaphilosophy.wordpress.com',
  },
  {
    id: 'humanities-blog-latest',
    label: 'My Most Recent Humanities Blog Post',
    description: 'Open your latest humanities writing.',
    link: 'https://asahumanities.wordpress.com',
  },
]

const INITIAL_IJAZAT = [
  {
    id: 'ijazah-1',
    title: 'Ijazah Placeholder',
    imageUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    description: 'Replace with your actual ijazah image and details.',
  },
]

const INITIAL_ITEMS = [
  {
    id: 'yt-1',
    source: 'youtube',
    type: 'video',
    title: 'Are Sufis Mushrik or Are Salafis Extremists? | A New Analysis of Istighātha & Tawassul',
    summary: 'Latest featured lecture exploring Istighātha and Tawassul with a new analysis.',
    link: 'https://www.youtube.com/watch?v=reIL-x_tf2w',
    publishedAt: '2026-02-15T15:20:00Z',
    tags: ['tech', 'humanities'],
  },
  {
    id: 'rd-1',
    source: 'reddit',
    type: 'post',
    title: 'Reddit Post: Thoughts on AI, Justice, and Access',
    summary: 'Discussion around practical legal tooling for underserved communities.',
    link: 'https://reddit.com/user/aibnsamin1',
    publishedAt: '2026-02-15T12:35:00Z',
    tags: ['tech', 'philosophy'],
  },
  {
    id: 'ig-1',
    source: 'instagram',
    type: 'image',
    title: 'Instagram: New coffee ritual at maqha',
    summary: 'A photo set featuring tea and coffee tasting notes.',
    link: 'https://instagram.com/alishukriamin',
    publishedAt: '2026-02-14T10:00:00Z',
    tags: ['maqha', 'dining'],
  },
  {
    id: 'manual-1',
    source: 'manual',
    type: 'entry',
    title: 'Bookshelf update: Newly published titles now live on Amazon',
    summary: 'Published books are now visible via your Amazon author page in the hub.',
    link: 'https://www.amazon.com/stores/Ali-Shukri-Amin/author/B0FDY9Z5M8',
    publishedAt: '2026-02-15T18:10:00Z',
    tags: ['literature', 'humanities'],
  },
  {
    id: 'manual-2',
    source: 'manual',
    type: 'entry',
    title: 'Reading tracker: StoryGraph profile synced',
    summary: 'Current reading list and progress are linked from your unified dashboard.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
    publishedAt: '2026-02-14T20:45:00Z',
    tags: ['literature', 'philosophy'],
  },
]

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate))

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [profileLinks, setProfileLinks] = useState(INITIAL_PROFILE_LINKS)
  const [ijazatGallery, setIjazatGallery] = useState(INITIAL_IJAZAT)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSource, setActiveSource] = useState('all')
  const [manualTitle, setManualTitle] = useState('')
  const [manualSummary, setManualSummary] = useState('')
  const [manualTags, setManualTags] = useState('')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  const [galleryTitle, setGalleryTitle] = useState('')
  const [galleryDescription, setGalleryDescription] = useState('')
  const [galleryImageUrl, setGalleryImageUrl] = useState('')

  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isAdminRoute = normalizedPath === '/admin'

  const filteredItems = useMemo(() => {
    return [...items]
      .filter((item) => activeSource === 'all' || item.source === activeSource)
      .filter(
        (item) => activeCategory === 'all' || item.tags.includes(activeCategory),
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  }, [activeCategory, activeSource, items])

  const latestBySource = useMemo(() => {
    return ['youtube', 'reddit', 'instagram', 'manual'].map((source) => {
      const latest = [...items]
        .filter((item) => item.source === source)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0]

      return { source, latest }
    })
  }, [items])

  const handleManualSubmit = (event) => {
    event.preventDefault()

    const title = manualTitle.trim()
    const summary = manualSummary.trim()
    const tags = manualTags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)

    if (!title || !summary) {
      return
    }

    setItems((previous) => [
      {
        id: `manual-${Date.now()}`,
        source: 'manual',
        type: 'entry',
        title,
        summary,
        link: '#',
        publishedAt: new Date().toISOString(),
        tags: tags.length > 0 ? tags : ['humanities'],
      },
      ...previous,
    ])

    setManualTitle('')
    setManualSummary('')
    setManualTags('')
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true)
      setLoginError('')
      return
    }

    setLoginError('Invalid admin credentials.')
  }

  const handleProfileLinkChange = (id, field, value) => {
    setProfileLinks((previous) =>
      previous.map((resource) =>
        resource.id === id ? { ...resource, [field]: value } : resource,
      ),
    )
  }

  const handleGallerySubmit = (event) => {
    event.preventDefault()

    const title = galleryTitle.trim()
    const description = galleryDescription.trim()
    const imageUrl = galleryImageUrl.trim()

    if (!title || !imageUrl) {
      return
    }

    const newItem = {
      id: `ijazah-${Date.now()}`,
      title,
      description,
      imageUrl,
    }

    setIjazatGallery((previous) => [newItem, ...previous])

    setGalleryTitle('')
    setGalleryDescription('')
    setGalleryImageUrl('')
  }

  const handleLogout = () => {
    setIsAdminAuthenticated(false)
    setLoginPassword('')
  }

  if (isAdminRoute && !isAdminAuthenticated) {
    return (
      <main className="login-page">
        <section className="login-card">
          <p className="eyebrow">AliHub Admin</p>
          <h1>Admin Login</h1>
          <p>Only the admin can access manual controls and content updates.</p>
          <form onSubmit={handleLoginSubmit} className="manual-form">
            <input
              type="email"
              value={loginUsername}
              onChange={(event) => setLoginUsername(event.target.value)}
              placeholder="Username"
              autoComplete="username"
            />
            <input
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
            {loginError ? <p className="error-text">{loginError}</p> : null}
            <button type="submit">Login as Admin</button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-top-row">
          <p className="eyebrow">AliHub — single pane of glass</p>
          {isAdminRoute ? (
            <button type="button" className="logout-button" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <a className="logout-button" href="/admin">
              Admin
            </a>
          )}
        </div>
        <a
          className="github-banner-link"
          href="https://github.com/AliSMAmin"
          target="_blank"
          rel="noreferrer"
          aria-label="Ali GitHub profile"
        >
          <img
            className="github-banner"
            src="https://camo.githubusercontent.com/c966e6549a477ccfda0662ba936145716368d536e756f6e44e4485bd6eef75da/68747470733a2f2f6769746875622d726561646d652d73747265616b2d73746174732e6865726f6b756170702e636f6d2f3f757365723d416c69534d416d696e267468656d653d746f6b796f6e6967687426686964655f626f726465723d74727565"
            alt="Ali GitHub stats banner"
          />
        </a>

        <h1>Ali&apos;s Unified Portfolio Feed</h1>
        <p>
          Latest activity from YouTube, Reddit, Instagram, books, reading, movies,
          fine dining, and manually curated updates in one dashboard.
        </p>
      </header>

      <section className="default-highlights" aria-label="Default featured updates">
        <article className="highlight-card">
          <p className="highlight-label">Carousel slide 1</p>
          <h2>Is Bitcoin Halal?: Cryptocurrencies, Blockchain, and the Shari'a</h2>
          <p className="highlight-meta">by Ali Amin</p>
          <p>
            Ali Shukri Amin&apos;s work, &quot;Is Bitcoin Halal?&quot; explores the permissibility
            of cryptocurrencies, particularly Bitcoin, within Islamic law. The
            discussion delves into Islamic concepts such as Shari&apos;a, Fiqh, and
            Fatwa, as well as economic principles and the mechanics of modern
            financial systems.
          </p>
          <p className="highlight-note">To buy, select a Format:</p>
        </article>

        <div className="highlight-grid">
          <article className="mini-highlight">
            <h3>Featured Islamic analysis</h3>
            <p className="mini-title">Are Sufis Mushrik or Are Salafis Extremists?</p>
            <a href="https://www.youtube.com/watch?v=reIL-x_tf2w" target="_blank" rel="noreferrer">
              Watch on YouTube
            </a>
          </article>

          <article className="mini-highlight">
            <h3>Currently reading</h3>
            <p className="mini-brand">Oneworld</p>
            <p className="mini-title">Salafism: Between Fact and Fiction</p>
            <p>Yasir Qadhi</p>
          </article>

          <article className="mini-highlight">
            <h3>Recent reviews</h3>
            <p className="mini-title">Resurrection (2025)</p>
            <p>★★★★★ Liked · Watched 15 Feb 2026</p>
            <p>
              Seen at the National Museum of Asian Art, Freer Gallery: The motion
              picture itself is a rebellion against the ephemeral nature of life.
            </p>
          </article>

          <article className="mini-highlight">
            <h3>Most recent fine dining</h3>
            <p className="mini-title">Oyamel Cocina in DC</p>
          </article>

          <article className="mini-highlight">
            <h3>Currently playing</h3>
            <p className="mini-title">Enderal: Forgotten Stories</p>
          </article>
        </div>
      </section>

      <section className="resource-grid" aria-label="Ali profile resources">
        {profileLinks.map((resource) => (
          <article key={resource.id} className="resource-card">
            <h2>{resource.label}</h2>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noreferrer">
              Visit link
            </a>
          </article>
        ))}
      </section>

      <section className="gallery-section">
        <h2>Islamic Ijazat Gallery</h2>
        <div className="image-gallery-grid">
          {ijazatGallery.map((item) => (
            <article key={item.id} className="gallery-card">
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="source-grid">
        {latestBySource.map(({ source, latest }) => (
          <article key={source} className="source-card">
            <p className="chip">{SOURCE_LABELS[source]}</p>
            <h2>{latest ? latest.title : 'No items yet'}</h2>
            <p>{latest ? latest.summary : 'Connect this source to populate data.'}</p>
          </article>
        ))}
      </section>

      <section className="controls">
        <div>
          <h3>Category</h3>
          <div className="pill-row">
            {CATEGORY_ORDER.map((category) => (
              <button
                key={category}
                className={category === activeCategory ? 'pill active' : 'pill'}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Source</h3>
          <div className="pill-row">
            {['all', 'reddit', 'youtube', 'instagram', 'manual'].map((source) => (
              <button
                key={source}
                className={source === activeSource ? 'pill active' : 'pill'}
                onClick={() => setActiveSource(source)}
                type="button"
              >
                {source}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="feed-grid">
        {filteredItems.map((item) => (
          <article key={item.id} className="feed-card">
            <p className="meta">
              {SOURCE_LABELS[item.source]} · {formatDate(item.publishedAt)}
            </p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={`${item.id}-${tag}`} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <a href={item.link} target="_blank" rel="noreferrer">
              Open source
            </a>
          </article>
        ))}
      </section>

      {isAdminRoute ? (
        <>
              <section className="manual-panel">
                <h3>Manual curation</h3>
                <p>Add your own updates so you always stay in control of the narrative.</p>
                <form onSubmit={handleManualSubmit} className="manual-form">
                  <input
                    value={manualTitle}
                    onChange={(event) => setManualTitle(event.target.value)}
                    placeholder="Update title"
                  />
                  <textarea
                    value={manualSummary}
                    onChange={(event) => setManualSummary(event.target.value)}
                    placeholder="Short summary"
                    rows={3}
                  />
                  <input
                    value={manualTags}
                    onChange={(event) => setManualTags(event.target.value)}
                    placeholder="tags,comma,separated"
                  />
                  <button type="submit">Add manual update</button>
                </form>
              </section>

              <section className="manual-panel">
                <h3>Admin: Update Platform Links</h3>
                <p>Edit labels, descriptions, and links for each platform card.</p>
                <div className="admin-resource-list">
                  {profileLinks.map((resource) => (
                    <article key={resource.id} className="resource-editor-card">
                      <input
                        value={resource.label}
                        onChange={(event) =>
                          handleProfileLinkChange(resource.id, 'label', event.target.value)
                        }
                        placeholder="Label"
                      />
                      <textarea
                        rows={2}
                        value={resource.description}
                        onChange={(event) =>
                          handleProfileLinkChange(resource.id, 'description', event.target.value)
                        }
                        placeholder="Description"
                      />
                      <input
                        value={resource.link}
                        onChange={(event) =>
                          handleProfileLinkChange(resource.id, 'link', event.target.value)
                        }
                        placeholder="https://..."
                      />
                    </article>
                  ))}
                </div>
              </section>

              <section className="manual-panel">
                <h3>Admin: Add Gallery Image</h3>
                <p>Add new image cards to Islamic ijazat.</p>
                <form onSubmit={handleGallerySubmit} className="manual-form">
                  <input
                    value={galleryTitle}
                    onChange={(event) => setGalleryTitle(event.target.value)}
                    placeholder="Image title"
                  />
                  <textarea
                    value={galleryDescription}
                    onChange={(event) => setGalleryDescription(event.target.value)}
                    placeholder="Short description"
                    rows={2}
                  />
                  <input
                    value={galleryImageUrl}
                    onChange={(event) => setGalleryImageUrl(event.target.value)}
                    placeholder="https://image-url"
                  />
                  <button type="submit">Add gallery image</button>
                </form>
              </section>
        </>
      ) : null}
    </main>
  )
}

export default App
