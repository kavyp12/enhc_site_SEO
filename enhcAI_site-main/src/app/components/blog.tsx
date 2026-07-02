"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import Link from "next/link";

// Font import via CSS-in-JS
const fontStyles = `
  
  .product-sans {
    font-family: 'Product Sans', sans-serif;
  }
`;

const blogPosts = [
  { 
    id: 7, 
    category: 'industry news',
    title: 'Our Mission to Advance AI Innovation', 
    readTime: '6 min read', 
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2070&q=80', 
    author: { name: 'Kavy Patel' },
    description: 'In our own words, how enhc is pushing the boundaries of artificial intelligence to solve real-world problems...'
  },
  { 
    id: 1, 
    category: 'machine learning', 
    title: 'Demystifying Neural Networks: A Beginner\'s Guide', 
    readTime: '8 min read', 
    imageUrl: '/neural_network.jpg', 
    author: { name: 'Dr. Sarah Chen' },
    description: 'Learn the fundamentals of neural networks and how they power modern AI applications...'
  },
  { 
    id: 2, 
    category: 'data science', 
    title: 'The Art of Feature Engineering: Transforming Data for ML', 
    readTime: '15 min read', 
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', 
    author: { name: 'Johnathan Chen' },
    description: 'Master the techniques and strategies for effective feature engineering in machine learning projects...'
  },
  { 
    id: 3, 
    category: 'tutorials', 
    title: 'Building Your First Image Classifier with PyTorch', 
    readTime: '18 min read', 
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', 
    author: { name: 'Peter Jones' },
    description: 'Step-by-step tutorial to create and train your own image classification model...'
  },
  { 
    id: 4, 
    category: 'industry news', 
    title: 'Generative AI: The State of the Industry in 2025', 
    readTime: '8 min read', 
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80', 
    author: { name: 'Mike Williams' },
    description: 'Exploring the latest developments and trends in generative artificial intelligence...'
  },
  { 
    id: 5, 
    category: 'ai ethics', 
    title: 'Algorithmic Bias: How to Identify and Mitigate It', 
    readTime: '10 min read', 
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', 
    author: { name: 'Emily White' },
    description: 'Understanding and addressing bias in machine learning systems for fair and equitable AI...'
  },
];

export default function Blog() {
  const router = useRouter();

  // Function to generate avatar from initials
  const generateAvatar = (name: string) => {
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  // Use consistent hash function like in blogData.ts
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];
  
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold`}>
      {initials}
    </div>
  );
};

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <section className="bg-[var(--bg-main)] text-[var(--text-main)] w-full py-20 lg:py-28 product-sans">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 flex flex-col justify-between h-full text-left lg:sticky lg:top-28">
            <div>
              <p className="font-semibold tracking-wider text-[var(--text-muted)] product-sans">• Blog</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semi mt-4 leading-tight product-sans">
                The latest from our AI lab
              </h2>
              <button
                onClick={() => router.push("/blogs")}
                className="mt-8 bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 hover:bg-[var(--brand-primary-hover)] transition-colors duration-300 product-sans"
              >
                View the blog <ArrowUpRight size={20} />
              </button>
            </div>
            <div className="flex gap-4 mt-12 lg:mt-16">
              <button className="blog-swiper-prev p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors text-[var(--text-main)] disabled:opacity-40"><ArrowLeft size={24} /></button>
              <button className="blog-swiper-next p-3 rounded-full bg-[var(--bg-card-secondary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors text-[var(--text-main)] disabled:opacity-40"><ArrowRight size={24} /></button>
            </div>
          </div>
          <div className="lg:col-span-8 overflow-hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1.1}
              navigation={{ prevEl: '.blog-swiper-prev', nextEl: '.blog-swiper-next' }}
              breakpoints={{
                640: { slidesPerView: 1.4, spaceBetween: 24 },
                768: { slidesPerView: 1.8, spaceBetween: 28 },
                1024: { slidesPerView: 2.1, spaceBetween: 32 },
              }}
              className="!overflow-visible h-full"
            >
              {blogPosts.map((post) => (
                <SwiperSlide key={post.id} className="h-auto">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="flex flex-col text-left cursor-pointer group h-full"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-72 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                      <span className="absolute top-4 left-4 bg-[var(--bg-main)]/90 backdrop-blur-sm text-[var(--text-main)] text-xs font-medium px-3 py-1.5 rounded-full capitalize">
                        {post.category}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        {generateAvatar(post.author.name)}
                        <div>
                          <p className="text-sm font-medium text-[var(--text-main)]">{post.author.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{post.readTime}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold leading-snug group-hover:text-[var(--brand-accent)] transition-colors product-sans">{post.title}</h3>
                      <p className="text-[var(--text-muted)] mt-2 text-sm leading-relaxed product-sans line-clamp-3">{post.description}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}