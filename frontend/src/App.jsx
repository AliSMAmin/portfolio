import { useMemo, useState } from 'react'
import './App.css'

const ADMIN_USERNAME = 'aibnsamin@gmail.com'
const ADMIN_PASSWORD = 'Margbarhegel@26'

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
    id: 'amazon-books',
    label: 'Published Books',
    description: 'Author page with your published books and updates.',
    link: 'https://www.amazon.com/stores/Ali-Shukri-Amin/author/B0FDY9Z5M8',
  },
  {
    id: 'storygraph',
    label: "What I'm Reading",
    description: 'Current reads and progress on StoryGraph.',
    link: 'https://app.thestorygraph.com/profile/alishukriamin',
  },
  {
    id: 'beli',
    label: 'Latest Fine Dining',
    description: 'Recent restaurant activity and dining logs on Beli.',
    link: 'https://beliapp.co/app/aliflaneur',
  },
  {
    id: 'stash',
    label: 'Video Games',
    description: 'Games played and tracked on Stash.',
    link: 'https://stash.games/users/alishukriamin',
  },
  {
    id: 'letterboxd',
    label: 'Movies',
    description: 'Latest films watched and reviewed on Letterboxd.',
    link: 'https://letterboxd.com/aibnsamin/',
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'Code, repositories, and ongoing project work.',
    link: 'https://github.com/AliSMAmin',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    description: 'Professional profile, experience, and highlights.',
    link: 'https://www.linkedin.com/in/ali-juristai/',
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

const INITIAL_DEGREES = [
  {
    id: 'degree-1',
    title: 'Degree / Accomplishment Placeholder',
    imageUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    description: 'Replace with your diploma, certificate, or award image.',
  },
]

const INITIAL_ITEMS = [
  {
    id: 'yt-1',
    source: 'youtube',
    type: 'video',
    title: 'Latest YouTube Upload: Building Ethical Legal AI',
    summary: 'A practical talk on human-centered legal technology and why transparency matters.',
    link: 'https://youtube.com/@Alishukriamin',
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
  const [degreesGallery, setDegreesGallery] = useState(INITIAL_DEGREES)
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
  const [galleryType, setGalleryType] = useState('ijazah')

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
      id: `${galleryType}-${Date.now()}`,
      title,
      description,
      imageUrl,
    }

    if (galleryType === 'ijazah') {
      setIjazatGallery((previous) => [newItem, ...previous])
    } else {
      setDegreesGallery((previous) => [newItem, ...previous])
    }

    setGalleryTitle('')
    setGalleryDescription('')
    setGalleryImageUrl('')
  }

  const handleLogout = () => {
    setIsAdminAuthenticated(false)
    setLoginPassword('')
  }

  if (!isAdminAuthenticated) {
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
          <button type="button" className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <h1>Ali&apos;s Unified Portfolio Feed</h1>
        <p>
          Latest activity from YouTube, Reddit, Instagram, books, reading, movies,
          fine dining, and manually curated updates in one dashboard.
        </p>
      </header>

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

      <section className="gallery-section">
        <h2>Secular Degrees & Accomplishments</h2>
        <div className="image-gallery-grid">
          {degreesGallery.map((item) => (
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
        <p>Add new image cards to Islamic ijazat or secular accomplishments.</p>
        <form onSubmit={handleGallerySubmit} className="manual-form">
          <select
            value={galleryType}
            onChange={(event) => setGalleryType(event.target.value)}
          >
            <option value="ijazah">Islamic Ijazah</option>
            <option value="degree">Secular Degree / Accomplishment</option>
          </select>
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
    </main>
  )
}

export default App
