import React, { useState, useEffect } from 'react';

export default function AliDashboard() {
  const [activeSection, setActiveSection] = useState('all');

  // Mock data - in production, this comes from your API
  const dashboardData = {
    youtube: {
      latest: {
        title: "The Philosophy of Islamic Legal Theory",
        thumbnail: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=450&fit=crop",
        views: "2.3K",
        date: "2 days ago",
        url: "#"
      }
    },
    reddit: {
      latest: [
        {
          title: "The intersection of AI and Islamic jurisprudence",
          subreddit: "philosophy",
          upvotes: 234,
          comments: 45,
          date: "5h ago"
        },
        {
          title: "Building legal tech tools for access to justice",
          subreddit: "technology",
          upvotes: 189,
          comments: 32,
          date: "1d ago"
        }
      ]
    },
    instagram: {
      latest: [
        { image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop", date: "1d ago" },
        { image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&h=400&fit=crop", date: "3d ago" },
        { image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=400&fit=crop", date: "5d ago" },
        { image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=400&fit=crop", date: "1w ago" }
      ]
    },
    letterboxd: {
      latest: [
        { title: "The Godfather", rating: 5, poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", year: 1972 },
        { title: "Parasite", rating: 4.5, poster: "https://images.unsplash.com/photo-1574267432644-f610a91a8f41?w=300&h=450&fit=crop", year: 2019 },
        { title: "Dune", rating: 4, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop", year: 2021 }
      ]
    },
    storygraph: {
      current: {
        title: "The Incoherence of the Philosophers",
        author: "Al-Ghazali",
        progress: 65,
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop"
      }
    },
    beli: {
      latest: [
        { name: "Sakura Sushi", rating: 4.5, cuisine: "Japanese", date: "3d ago", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop" },
        { name: "Le Diplomate", rating: 5, cuisine: "French", date: "1w ago", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop" }
      ]
    },
    ijazah: {
      latest: {
        title: "Ijazah in Warsh Recitation",
        institution: "Dar al-Hadith",
        date: "Jan 2024",
        description: "Chain of transmission through Imam Nafi'"
      }
    },
    blog: {
      latest: {
        title: "On the Nature of Legal AI and Ethical Constraints",
        excerpt: "As we build tools that automate legal reasoning, we must grapple with fundamental questions about justice, bias, and human dignity...",
        date: "1 week ago",
        readTime: "8 min"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50">
      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Header */}
      <header className="relative border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-900">Ali Amin</h1>
              <p className="text-stone-600 mt-1">Legal Tech × Philosophy × Faith</p>
            </div>
            <div className="flex gap-4">
              {['GitHub', 'LinkedIn', 'Email'].map(link => (
                <a key={link} href="#" className="text-stone-600 hover:text-teal-700 transition-colors text-sm font-medium">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* About Card - spans 3 columns */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">About</h2>
              <p className="text-stone-700 leading-relaxed mb-6">
                Building at the intersection of technology, Islamic scholarship, and human flourishing. 
                Currently exploring how AI can enhance access to justice while working through classical 
                Islamic legal philosophy.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Legal Tech', 'Philosophy', 'Islamic Studies', 'AI Ethics'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Current Reading - spans 2 columns */}
            <div className="lg:col-span-2 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 shadow-sm text-white">
              <div className="flex items-start gap-4">
                <div className="w-20 h-28 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                  <img src={dashboardData.storygraph.current.cover} alt="Book cover" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-teal-100 text-sm font-medium mb-2">Currently Reading</p>
                  <h3 className="font-serif font-bold text-lg mb-1">{dashboardData.storygraph.current.title}</h3>
                  <p className="text-teal-100 text-sm mb-3">{dashboardData.storygraph.current.author}</p>
                  <div className="bg-teal-500/30 rounded-full h-2 overflow-hidden">
                    <div className="bg-white h-full" style={{width: `${dashboardData.storygraph.current.progress}%`}}></div>
                  </div>
                  <p className="text-teal-100 text-xs mt-2">{dashboardData.storygraph.current.progress}% complete</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest YouTube Video - Featured */}
        <section className="mb-12">
          <h2 className="text-xl font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
            <span className="text-red-600">▶</span> Latest Video
          </h2>
          <a href={dashboardData.youtube.latest.url} className="block group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img 
                    src={dashboardData.youtube.latest.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-medium rounded">
                      {dashboardData.youtube.latest.views} views
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3 group-hover:text-teal-700 transition-colors">
                    {dashboardData.youtube.latest.title}
                  </h3>
                  <p className="text-stone-600 text-sm">{dashboardData.youtube.latest.date}</p>
                </div>
              </div>
            </div>
          </a>
        </section>

        {/* Bento Grid - Mixed Content */}
        <section className="grid lg:grid-cols-6 gap-6 mb-12">
          {/* Reddit Activity - 2 cols */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="text-orange-600">●</span> Reddit
            </h3>
            <div className="space-y-4">
              {dashboardData.reddit.latest.map((post, i) => (
                <div key={i} className="pb-4 border-b border-stone-100 last:border-0">
                  <h4 className="font-medium text-stone-900 text-sm mb-2 leading-snug">{post.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span>r/{post.subreddit}</span>
                    <span>↑ {post.upvotes}</span>
                    <span>💬 {post.comments}</span>
                    <span className="ml-auto">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Grid - 2 cols */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="text-pink-600">◆</span> Instagram
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {dashboardData.instagram.latest.map((post, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <img 
                    src={post.image} 
                    alt={`Instagram post ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Blog Post - 2 cols */}
          <div className="lg:col-span-2 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-6 shadow-sm text-white">
            <h3 className="font-serif font-bold mb-4 flex items-center gap-2">
              <span>✍️</span> Latest Essay
            </h3>
            <h4 className="font-serif font-bold text-xl mb-3 leading-snug">{dashboardData.blog.latest.title}</h4>
            <p className="text-amber-100 text-sm mb-4 leading-relaxed">{dashboardData.blog.latest.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-amber-100">
              <span>{dashboardData.blog.latest.date}</span>
              <span>·</span>
              <span>{dashboardData.blog.latest.readTime} read</span>
            </div>
          </div>
        </section>

        {/* Movies & Dining */}
        <section className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Letterboxd */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="text-green-600">🎬</span> Recently Watched
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {dashboardData.letterboxd.latest.map((film, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 shadow-sm">
                    <img 
                      src={film.poster} 
                      alt={film.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-stone-900 text-xs mb-1">{film.title}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={`text-xs ${j < film.rating ? 'text-amber-500' : 'text-stone-300'}`}>★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beli Restaurants */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="text-amber-600">🍽️</span> Recent Dining
            </h3>
            <div className="space-y-4">
              {dashboardData.beli.latest.map((restaurant, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900 mb-1">{restaurant.name}</h4>
                    <p className="text-stone-600 text-sm mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={`${j < restaurant.rating ? 'text-amber-500' : 'text-stone-300'}`}>★</span>
                        ))}
                      </div>
                      <span>·</span>
                      <span>{restaurant.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-2xl p-8 shadow-lg text-white">
          <h2 className="text-2xl font-serif font-bold mb-6">Recent Achievement</h2>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-2xl">
              ☪️
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold mb-2">{dashboardData.ijazah.latest.title}</h3>
              <p className="text-teal-100 mb-3">{dashboardData.ijazah.latest.institution} · {dashboardData.ijazah.latest.date}</p>
              <p className="text-teal-200 text-sm">{dashboardData.ijazah.latest.description}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-stone-600 text-sm">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="mt-2">Ali's Digital Portfolio · Virginia, US</p>
        </div>
      </footer>
    </div>
  );
}
