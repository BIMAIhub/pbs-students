import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/pbsData';
import { BlogPost } from '../types';
import { Clock, BookOpen, ArrowRight, X, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>AEC & BIM INSIGHTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Our Newest & Most-Read <span className="text-emerald-600">Blog Posts</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Stay updated with modern ISO 19650 BIM workflows, MEP modeling techniques, and AEC career tips.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to high-reliability BIM architecture image if blocked
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Article Full View Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 relative my-8 space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900">{selectedPost.title}</h2>
                <div className="text-xs text-slate-500 font-medium">
                  By {selectedPost.author} • {selectedPost.date} • {selectedPost.readTime}
                </div>
              </div>

              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-56 object-cover rounded-2xl border border-slate-200"
              />

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
                <p className="font-semibold text-slate-900">
                  {selectedPost.summary}
                </p>
                <p>
                  At Pragmatic BIM Solution, our 15 years of AEC engineering handling has demonstrated that digital transformation relies on structured 3D BIM data. Whether coordinating complex MEP chiller plant rooms or establishing BIM Execution Plans (BEP) for high-rise developments, adopting ISO 19650 standards prevents costly site rework.
                </p>
                <p>
                  Key workflows include establishing shared parameters, setting up clash detective rules in Navisworks Manage, and leveraging Dynamo Python scripts for automated sheet and parameter tagging.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
