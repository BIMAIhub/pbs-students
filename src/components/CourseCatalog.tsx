import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/pbsData';
import { 
  Clock, 
  Calendar, 
  Download, 
  ArrowRight, 
  Star, 
  Sparkles,
  BookOpen,
  Check,
  CreditCard
} from 'lucide-react';

interface CourseCatalogProps {
  onSelectCourse: (course: Course) => void;
  onDownloadSyllabus: (course: Course) => void;
  onOpenRegisterModal?: (course: Course) => void;
  filterTerm?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourse,
  onDownloadSyllabus,
  onOpenRegisterModal,
  filterTerm = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Courses' },
    { id: 'Revit', label: 'Autodesk Revit (AR/ST/MEP)' },
    { id: 'Navisworks', label: 'Navisworks Manage & Clash' },
    { id: 'Dynamo', label: 'Dynamo Automation' },
    { id: 'Civil 3D', label: 'Civil 3D Infrastructure' },
    { id: 'AutoCAD', label: 'AutoCAD Essentials' },
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = !filterTerm || 
      course.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(filterTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(filterTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Structured BIM Curriculum</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Find a course to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">fast-forward your career</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Practical, project-centric BIM courses designed by senior engineers with 15+ years of active industry experience.
          </p>

          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-4 py-1.5 rounded-full">
            <Calendar className="w-4 h-4 text-amber-800" />
            <span>Offline Classes strictly on Saturdays & Sundays at Pune Campus</span>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-500 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No courses matched your search</h3>
            <p className="text-sm text-slate-500 mt-1">Try resetting category filters or search query.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:border-emerald-500 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Course Banner Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md"
                      style={{ backgroundColor: course.accentColor }}
                    >
                      {course.category} {course.discipline ? `(${course.discipline})` : ''}
                    </span>
                    {course.badge && (
                      <span className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase shadow-sm">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1 text-xs shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900">{course.rating}</span>
                    <span className="text-slate-500 text-[10px]">({course.reviewsCount})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration} | {course.hours}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{course.batchType}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 text-xs line-clamp-2 mt-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 pt-1">
                    {course.highlights.slice(0, 3).map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price Section */}
                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">₹{(course.discountedPrice || 0).toLocaleString('en-IN')}</span>
                        <span className="text-xs text-slate-400 line-through">₹{(course.originalPrice || 0).toLocaleString('en-IN')}</span>
                      </div>
                      {course.installmentPrice && (
                        <div className="text-[11px] text-emerald-700 font-extrabold mt-0.5">
                          or {course.installmentPrice}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-1 rounded border border-emerald-300">
                      50% OFF
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Course Syllabus</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenRegisterModal) onOpenRegisterModal(course);
                        else onSelectCourse(course);
                      }}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-sm hover:shadow-emerald-200 flex items-center justify-center gap-1 transition-all"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                      <span>Register & Pay</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

