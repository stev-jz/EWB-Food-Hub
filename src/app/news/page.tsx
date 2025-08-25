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
    title: 'Food Bank Volunteer Opportunity',
    summary: 'Help distribute food to students in need. No experience required.',
    url: '#',
    when: 'Saturdays 10am-2pm',
    category: 'volunteer-opportunities',
    source: 'Campus Food Bank',
    where: 'Student Centre'
  },
  {
    id: '2',
    title: 'Free Pizza Night',
    summary: 'Join us for free pizza and networking with fellow students.',
    url: '#',
    when: 'Friday, Jan 20, 6-8pm',
    category: 'free-events',
    source: 'Engineering Society',
    where: 'Bahen Centre',
    freeFood: true
  },
  {
    id: '3',
    title: 'UofT Sustainability Initiative',
    summary: 'Learn about campus sustainability programs and get involved.',
    url: '#',
    when: 'January 18, 2024',
    category: 'uoft-organizations',
    org: 'Sustainability Office',
    source: 'UofT Sustainability'
  },
  {
    id: '4',
    title: 'Milk Prices Drop 15% Across Ontario',
    summary: 'Provincial dairy board announces significant price reduction affecting grocery stores and campus dining.',
    url: 'https://example.com/milk-prices-ontario',
    when: 'January 12, 2024',
    category: 'other-news',
    source: 'CBC News'
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
        <p className="opacity-80 mt-1 text-sm sm:text-base">
          Posts, volunteer opportunities, free‑food events, and updates from UofT organizations.
        </p>

        <div className="mt-6 mb-8">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white"
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
            filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <Link
                        href={item.url}
                        className="hover:text-orange-400 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-3">{item.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {item.when}
                      </span>
                      {item.source && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {item.source}
                        </span>
                      )}
                      {item.where && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          📍 {item.where}
                        </span>
                      )}
                      {item.freeFood && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          🍕 Free Food
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.category === 'volunteer-opportunities' ? 'bg-green-100 text-green-800' :
                      item.category === 'free-events' ? 'bg-orange-100 text-orange-800' :
                      item.category === 'uoft-organizations' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {categoryLabels[item.category as keyof typeof categoryLabels]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
