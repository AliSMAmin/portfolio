import { useMemo, useState } from 'react'
import './App.css'

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

const PROFILE_LINKS = [
  {
    id: 'amazon-books',
    label: 'Published Books',
    description: 'Author page with your published books and updates.',
    link: 'https://www.amazon.com/stores/Ali-Shukri-Amin/author/B0FDY9Z5M8',
  },
  {
    id: 'storygraph',
    label: 'What I\'m Reading',
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
  {
    id: 'manual-3',
    source: 'manual',
    type: 'entry',
    title: 'Film log and reviews available on Letterboxd',
    summary: 'Recent movies watched can be tracked from your Letterboxd page.',
    link: 'https://letterboxd.com/aibnsamin/',
    publishedAt: '2026-02-13T21:25:00Z',
    tags: ['film', 'humanities'],
  },
  {
    id: 'manual-4',
    source: 'manual',
    type: 'entry',
    title: 'Fine dining list linked via Beli',
    summary: 'Latest restaurant activity is now one click from the dashboard.',
    link: 'https://beliapp.co/app/aliflaneur',
    publishedAt: '2026-02-12T08:40:00Z',
    tags: ['dining'],
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
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSource, setActiveSource] = useState('all')
  const [manualTitle, setManualTitle] = useState('')
  const [manualSummary, setManualSummary] = useState('')
  const [manualTags, setManualTags] = useState('')

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

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">AliHub — single pane of glass</p>
        <h1>Ali&apos;s Unified Portfolio Feed</h1>
        <p>
          Latest activity from YouTube, Reddit, Instagram, books, reading, movies,
          fine dining, and manually curated updates in one dashboard.
        </p>
      </header>

      <section className="resource-grid" aria-label="Ali profile resources">
        {PROFILE_LINKS.map((resource) => (
          <article key={resource.id} className="resource-card">
            <h2>{resource.label}</h2>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noreferrer">
              Visit link
            </a>
          </article>
        ))}
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
    </main>
  )
}

export default App
