'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  when: string; // For events: "Friday, Jan 20, 6-8pm", for articles: "January 15, 2024"
  category: 'volunteer-opportunities' | 'free-events' | 'uoft-organizations' | 'other-news';
  source?: string;
  tags?: string[];
  details?: string;
  where?: string;
  freeFood?: boolean;
  org?: string;
  newsletterUrl?: string;
};



// Sample data - replace with actual data source
const sampleNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Title',
    summary: 'description goes here',
    url: '#',
    when: 'date',
    category: 'volunteer-opportunities',
    source: 'source',
    where: 'location'
  },
  {
    id: '2',
    title: 'Title',
    summary: 'description goes here',
    url: '#',
    when: 'date',
    category: 'free-events',
    source: 'source',
    where: 'location',
    freeFood: true
  },
  {
    id: '3',
    title: 'Title',
    summary: 'description goes here',
    url: '#',
    when: 'date',
    category: 'uoft-organizations',
    org: 'organization',
    source: 'source'
  },
  {
    id: '4',
    title: 'Title',
    summary: 'description goes here',
    url: '#',
    when: 'date',
    category: 'other-news',
    source: 'source'
  }
];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoryLabels = {
    'all': 'All',
    'volunteer-opportunities': 'Volunteer Opportunities',
    'free-events': 'Free Events',
    'uoft-organizations': 'Events from UofT Organizations',
    'other-news': 'News Articles'
  };

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') {
      return sampleNewsItems;
    }
    return sampleNewsItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="min-h-[80vh] w-full">
      <div className="mx-auto w-full max-w-[900px] px-5 sm:px-6 md:px-8 py-10">
        <h1 className="font-semibold tracking-tight text-[clamp(24px,6vw,44px)]">
          News
        </h1>
        <p className="text-black mt-1 text-sm sm:text-base">
          Posts, volunteer opportunities, free‑food events, and updates from UofT organizations.
        </p>

        <div className="mt-6 mb-8">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
          >
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredNews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No items found for the selected category.
            </p>
          ) : (
                         filteredNews.map((item, index) => (
               <div key={item.id}>
                 <Link href={item.url} className="block group cursor-pointer">
                   <div className="py-6 flex gap-4">
                     <div className="w-32 h-32 flex-shrink-0">
                       <img 
                         src="/news image placeholder.jpg" 
                         alt="news placeholder" 
                         className="w-full h-full object-cover"
                       />
                     </div>
                     
                     <div className="flex-1">
                       <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:underline transition-all">
                         {item.title}
                       </h3>
                       
                       <span className="inline-block px-3 py-1 rounded text-xs font-medium bg-gray-200 text-black mb-3">
                         {categoryLabels[item.category as keyof typeof categoryLabels]}
                       </span>
                       
                       <p className="text-gray-600 mb-3">{item.summary}</p>
                       
                       <p className="text-sm text-black">
                         <strong>Tags:</strong> location, time, event type, organization
                       </p>
                     </div>
                   </div>
                 </Link>
                 {index < filteredNews.length - 1 && (
                   <hr className="border-black" />
                 )}
               </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
