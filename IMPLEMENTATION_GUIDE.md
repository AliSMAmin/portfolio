# Implementation Guide: Ali's Portfolio Dashboard

## 🎯 Goal
Build a beautiful personal portfolio dashboard that showcases your latest activity across all platforms in one view.

## 📊 Three Implementation Paths

### Path 1: Static Site (Start Here) ⭐
**Best for**: Getting started quickly, full control
**Time**: 1-2 days
**Cost**: $0/month (Vercel free tier)
**Automation**: Manual updates via JSON files

### Path 2: Hybrid (Recommended)
**Best for**: Balance of automation and control
**Time**: 1 week
**Cost**: $0-5/month
**Automation**: Automated for easy platforms, manual for others

### Path 3: Fully Automated
**Best for**: Set it and forget it
**Time**: 2 weeks
**Cost**: $10-15/month (AWS)
**Automation**: Everything updates automatically

---

## 🚀 Path 1: Static Site Implementation

### Step 1: Create Next.js Project

```bash
npx create-next-app@latest ali-portfolio
# Choose:
# ✅ TypeScript: No
# ✅ ESLint: Yes
# ✅ Tailwind: Yes
# ✅ App Router: Yes
# ✅ Import alias: No

cd ali-portfolio
```

### Step 2: Install Dependencies

```bash
npm install gray-matter remark remark-html date-fns
```

### Step 3: Project Structure

```
ali-portfolio/
├── app/
│   ├── layout.js                 # Root layout with fonts
│   ├── page.js                   # Main dashboard
│   └── globals.css               # Global styles
├── components/
│   ├── widgets/
│   │   ├── YouTubeWidget.js      # Latest YouTube video
│   │   ├── RedditWidget.js       # Recent Reddit posts
│   │   ├── InstagramWidget.js    # Instagram grid
│   │   ├── LetterboxdWidget.js   # Movie posters
│   │   ├── StoryGraphWidget.js   # Current book
│   │   ├── BeliWidget.js         # Restaurant reviews
│   │   └── BlogWidget.js         # Latest blog post
│   └── Hero.js                   # Hero section with bio
├── data/
│   ├── youtube.json              # YouTube data
│   ├── reddit.json               # Reddit data
│   ├── instagram.json            # Instagram data
│   ├── letterboxd.json           # Movie data
│   ├── storygraph.json           # Book data
│   ├── beli.json                 # Restaurant data
│   └── bio.json                  # Personal info
├── content/
│   ├── blog/                     # Blog markdown files
│   ├── ijazah/                   # Ijazah markdown files
│   └── achievements/             # Achievements markdown files
├── public/
│   └── images/                   # Static images
└── lib/
    └── content.js                # Helper to read markdown
```

### Step 4: Configure Fonts

Edit `app/layout.js`:

```javascript
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Step 5: Configure Tailwind

Edit `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      colors: {
        sand: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dd',
          300: '#d9d3c8',
          400: '#c7bdb0',
          500: '#b5a798',
          600: '#9d8f7f',
          700: '#7d6f5f',
          800: '#5d5247',
          900: '#3d362f',
        }
      }
    },
  },
  plugins: [],
}
```

### Step 6: Create Data Files

Create `data/youtube.json`:
```json
{
  "latest": {
    "title": "The Philosophy of Islamic Legal Theory",
    "thumbnail": "/images/youtube-latest.jpg",
    "url": "https://youtube.com/watch?v=...",
    "views": "2.3K",
    "date": "2024-02-14",
    "duration": "15:23"
  }
}
```

Create `data/bio.json`:
```json
{
  "name": "Ali Amin",
  "title": "Legal Tech × Philosophy × Faith",
  "bio": "Building at the intersection of technology, Islamic scholarship, and human flourishing.",
  "location": "Virginia, US",
  "tags": ["Legal Tech", "Philosophy", "Islamic Studies", "AI Ethics"],
  "social": {
    "github": "yourusername",
    "linkedin": "yourprofile",
    "email": "your@email.com"
  }
}
```

(Continue with other JSON files for each platform)

### Step 7: Create Widget Components

Create `components/widgets/YouTubeWidget.js`:

```javascript
import Image from 'next/image';

export default function YouTubeWidget({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sand-200 overflow-hidden">
      <a href={data.url} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="relative aspect-video">
          <Image 
            src={data.thumbnail} 
            alt={data.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-medium rounded">
              {data.views} views
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif font-bold text-xl text-stone-900 mb-2 group-hover:text-teal-700 transition-colors">
            {data.title}
          </h3>
          <p className="text-stone-600 text-sm">{data.date}</p>
        </div>
      </a>
    </div>
  );
}
```

(Create similar widgets for other platforms)

### Step 8: Build Main Dashboard

Edit `app/page.js`:

```javascript
import Hero from '@/components/Hero';
import YouTubeWidget from '@/components/widgets/YouTubeWidget';
import RedditWidget from '@/components/widgets/RedditWidget';
// ... import other widgets

// Import data
import bioData from '@/data/bio.json';
import youtubeData from '@/data/youtube.json';
import redditData from '@/data/reddit.json';
// ... import other data

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50">
      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none pattern-overlay" />

      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        {/* Header content */}
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <Hero data={bioData} />

        {/* Featured YouTube Video */}
        <section className="mb-12">
          <h2 className="text-xl font-serif font-bold mb-4">Latest Video</h2>
          <YouTubeWidget data={youtubeData.latest} />
        </section>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-6 gap-6">
          <div className="lg:col-span-2">
            <RedditWidget data={redditData} />
          </div>
          {/* ... other widgets */}
        </div>
      </main>
    </div>
  );
}
```

### Step 9: Add Manual Content Support

Create `lib/content.js`:

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getContentByType(type) {
  const typeDir = path.join(contentDirectory, type);
  const fileNames = fs.readdirSync(typeDir);
  
  const allContent = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(typeDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      ...data,
      content
    };
  });
  
  return allContent.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}
```

Create example content file `content/blog/2024-01-legal-ai.md`:

```markdown
---
title: "On the Nature of Legal AI and Ethical Constraints"
date: "2024-01-15"
excerpt: "As we build tools that automate legal reasoning, we must grapple with fundamental questions..."
readTime: "8 min"
featured: true
---

As we build tools that automate legal reasoning, we must grapple with fundamental questions about justice, bias, and human dignity...

(rest of your blog post)
```

### Step 10: Deploy

```bash
# Build and test locally
npm run dev

# Deploy to Vercel
npm install -g vercel
vercel
```

### Step 11: Update Workflow

To update your dashboard:

1. **Update JSON files** in `data/` directory with latest platform activity
2. **Add new markdown** files for blog posts, ijazahs, etc.
3. **Commit and push** to GitHub
4. **Vercel auto-deploys** your changes

Or create a simple admin script:

```bash
# scripts/update-youtube.js
const fs = require('fs');

const newData = {
  latest: {
    title: "New Video Title",
    thumbnail: "/images/latest.jpg",
    // ... other fields
  }
};

fs.writeFileSync(
  './data/youtube.json',
  JSON.stringify(newData, null, 2)
);

console.log('✅ YouTube data updated!');
```

Then: `node scripts/update-youtube.js && git commit -am "Update YouTube" && git push`

---

## 🔄 Path 2: Hybrid Implementation

### Add Automated Fetchers for Easy Platforms

#### YouTube RSS Fetcher

Create `lib/fetchers/youtube.js`:

```javascript
export async function fetchLatestYouTube(channelId) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const response = await fetch(rssUrl);
  const xml = await response.text();
  
  // Parse XML (use xml2js or similar)
  // Extract latest video
  // Return formatted data
  
  return {
    latest: {
      title: "Parsed title",
      thumbnail: "Parsed thumbnail",
      // ... etc
    }
  };
}
```

#### Add API Route

Create `app/api/refresh/route.js`:

```javascript
import { fetchLatestYouTube } from '@/lib/fetchers/youtube';
import { fetchLatestReddit } from '@/lib/fetchers/reddit';
import fs from 'fs/promises';

export async function GET() {
  try {
    // Fetch from APIs
    const youtubeData = await fetchLatestYouTube(process.env.YOUTUBE_CHANNEL_ID);
    const redditData = await fetchLatestReddit(process.env.REDDIT_USERNAME);
    
    // Update JSON files
    await fs.writeFile('./data/youtube.json', JSON.stringify(youtubeData, null, 2));
    await fs.writeFile('./data/reddit.json', JSON.stringify(redditData, null, 2));
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

#### Add GitHub Action

Create `.github/workflows/update-dashboard.yml`:

```yaml
name: Update Dashboard Data

on:
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours
  workflow_dispatch: # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Fetch latest data
        run: node scripts/fetch-all.js
        env:
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
          REDDIT_CLIENT_ID: ${{ secrets.REDDIT_CLIENT_ID }}
      
      - name: Commit changes
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add data/
          git commit -m "Update platform data" || exit 0
          git push
```

---

## 📝 Maintenance Checklist

### Daily
- [ ] Check if automated fetchers are running (if applicable)
- [ ] Review latest content on dashboard

### Weekly
- [ ] Update manual platforms (Beli, Stash, etc.)
- [ ] Add new blog posts or achievements
- [ ] Check for broken links/images

### Monthly
- [ ] Review and adjust featured content
- [ ] Update bio or tags if needed
- [ ] Check analytics (if added)

---

## 🎨 Customization Tips

### Change Color Scheme
Edit Tailwind config to adjust the warm palette to your preference.

### Adjust Widget Sizes
Modify grid column spans:
- `lg:col-span-2` = 2 columns (1/3 width)
- `lg:col-span-3` = 3 columns (1/2 width)  
- `lg:col-span-4` = 4 columns (2/3 width)
- `lg:col-span-6` = 6 columns (full width)

### Add New Platforms
1. Create widget component
2. Add data JSON file
3. Add to dashboard grid
4. (Optional) Create fetcher

### Reorder Sections
Just drag and drop widget components in `page.js`

---

## 🚀 Launch Checklist

- [ ] All data files populated
- [ ] At least 2-3 blog posts written
- [ ] Bio and tags accurate
- [ ] Images optimized (WebP format)
- [ ] Links tested
- [ ] Mobile responsive checked
- [ ] Custom domain connected (optional)
- [ ] SEO metadata added
- [ ] Analytics added (optional)
- [ ] Shared with friends for feedback!

---

**You're ready to build your digital portfolio!** Start with Path 1 and iterate from there.
