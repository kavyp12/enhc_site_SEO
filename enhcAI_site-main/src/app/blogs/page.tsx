"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/navbar';
import Footer from '../components/footer';
import JsonLd from '@/app/components/JsonLd';
import { webPageJsonLd, breadcrumbJsonLd } from '@/lib/seo';

type BlogCategory = 'all' | 'machine learning' | 'data science' | 'ai ethics' | 'industry news' | 'tutorials';

interface Author { name: string; }

interface BlogPost {
  id: number;
  category: Exclude<BlogCategory, 'all'>;
  title: string;
  readTime: string;
  imageUrl: string;
  author: Author;
}

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const allBlogPosts: BlogPost[] = [
    { id: 1, category: 'machine learning', title: 'Demystifying Neural Networks: A Beginner\'s Guide', readTime: '8 min read', imageUrl: '/neural_network.jpg', author: { name: 'Dr. Sarah Chen' } },
    { id: 2, category: 'data science', title: 'The Art of Feature Engineering: Transforming Data for ML', readTime: '15 min read', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', author: { name: 'Johnathan Chen' } },
    { id: 3, category: 'tutorials', title: 'Building Your First Image Classifier with PyTorch', readTime: '18 min read', imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', author: { name: 'Peter Jones' } },
    { id: 4, category: 'industry news', title: 'Generative AI: The State of the Industry in 2025', readTime: '8 min read', imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80', author: { name: 'Mike Williams' } },
    { id: 5, category: 'ai ethics', title: 'Algorithmic Bias: How to Identify and Mitigate It', readTime: '10 min read', imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', author: { name: 'Emily White' } },
    { id: 6, category: 'data science', title: 'From Big Data to Smart Data: Strategies for Success', readTime: '9 min read', imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80', author: { name: 'Chris Green' } },
    { id: 7, category: 'industry news', title: 'Our Mission to Advance AI Innovation', readTime: '6 min read', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2070&q=80', author: { name: 'Kavy Patel' } },
];

const categories: BlogCategory[] = ['all', 'machine learning', 'data science', 'ai ethics', 'industry news', 'tutorials'];

const BlogsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<BlogCategory>('all');

  const postCounts = useMemo(() => {
    const counts: { [key in BlogCategory]?: number } = {};
    counts.all = allBlogPosts.length;
    for (const post of allBlogPosts) {
        counts[post.category] = (counts[post.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredPosts = activeFilter === 'all'
    ? allBlogPosts
    : allBlogPosts.filter(post => post.category === activeFilter);

  // Function to generate avatar from initials
  const generateAvatar = (name: string) => {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    
    return (
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-sm font-bold border-2 border-white/20`}>
        {initials}
      </div>
    );
  };

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            type: 'CollectionPage',
            name: 'enhc Blog — AI & Software Insights',
            path: '/blogs',
            description:
              'Articles and tutorials on AI, machine learning, automation and software from enhc.',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blogs' },
          ]),
        ]}
      />
      <Navbar />
      <style jsx>{`
        main, nav, span, button, h3 { font-family: 'Product Sans', sans-serif; }
      `}</style>
      
      <main className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen pt-20 md:pt-24 p-4 sm:p-10 md:p-16">
        <header className="mb-10">
          <span className="text-base text-[var(--text-muted)]">• The Blog</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mt-3">AI &amp; Software Insights</h1>
          <nav className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-4 mt-5">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-2xl sm:text-3xl md:text-4xl font-medium capitalize transition-colors duration-300 ${activeFilter === category ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
              >
                {category === 'all' ? 'explore all' : category}
                <sup className={`text-sm sm:text-base lg:text-lg ml-1 ${activeFilter === category ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}>
                  {postCounts[category] || 0}
                </sup>
              </button>
            ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-10">
          {filteredPosts.map((post) => (
            <Link href={`/blogs/${post.id}`} key={post.id}>
              <article className="group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <div className="flex items-center gap-3">
                      {generateAvatar(post.author.name)}
                      <div>
                        <p className="text-white text-sm font-medium">{post.author.name}</p>
                        <p className="text-gray-300 text-xs">Author</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <span className="text-[var(--text-muted)] text-sm">• {post.readTime}</span>
                        <h3 className="text-[var(--text-main)] text-lg font-medium leading-snug mt-1 transition-colors duration-300 group-hover:text-blue-400">
                            {post.title}
                        </h3>
                    </div>
                    <div className="flex-shrink-0 mt-2">
                        <ArrowIcon className="stroke-[var(--text-muted)] transition-all duration-300 group-hover:stroke-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
        <Footer/>
    </>
  );
};

export default BlogsPage;