import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  FileText, 
  FolderArchive, 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Code,
  Box,
  BookOpen,
  ArrowDownToLine,
  Check
} from 'lucide-react';
import { DownloadableAsset } from './types';

interface DownloadsVaultTabProps {
  assets: DownloadableAsset[];
  onDownloadAsset: (asset: DownloadableAsset) => void;
}

export const DownloadsVaultTab: React.FC<DownloadsVaultTabProps> = ({
  assets,
  onDownloadAsset
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadAllSuccess, setDownloadAllSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'BIM Models & Datasets', label: 'BIM Models & Datasets' },
    { id: 'PBS Family Library', label: 'PBS Family Library' },
    { id: 'Dynamo Scripts', label: 'Dynamo Automation Scripts' },
    { id: 'ISO 19650 Templates', label: 'ISO 19650 Templates & BEP' },
    { id: 'Notes & Cheatsheets', label: 'Course Notes & Cheatsheets' },
    { id: 'Certificates & Invoices', label: 'Certificates & Transcripts' }
  ];

  const safeAssets = assets || [];

  const filteredAssets = safeAssets.filter((asset) => {
    const titleMatch = (asset.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = (asset.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const formatMatch = (asset.fileFormat || '').toLowerCase().includes(searchTerm.toLowerCase());
    const tagsMatch = Array.isArray(asset.tags) && asset.tags.some(tag => (tag || '').toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSearch = !searchTerm || titleMatch || descMatch || formatMatch || tagsMatch;
    const matchesCat = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSingleDownload = (asset: DownloadableAsset) => {
    setDownloadedIds(prev => ({ ...prev, [asset.id]: true }));
    onDownloadAsset(asset);
  };

  const handleDownloadAllBundle = () => {
    setIsDownloadingAll(true);
    setTimeout(() => {
      setIsDownloadingAll(false);
      setDownloadAllSuccess(true);
      
      // Simulate file download trigger
      const blob = new Blob([
        "PRAGMATIC BIM SOLUTION - COMPLETE STUDENT ASSET BUNDLE (2026)\n\n" +
        "Includes Revit MEP LOD 400 Datasets, Clash Matrix, 200+ Parametric Families, Dynamo Scripts & BEP Templates.\n" +
        "Licensed to: Pravin Yadav (PBS-STU-2026-8492)\n\n" +
        assets.map(a => `- ${a.title} (${a.fileFormat}, ${a.fileSize})`).join("\n")
      ], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PBS_Complete_BIM_Resource_Pack_2026.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setTimeout(() => setDownloadAllSuccess(false), 4000);
    }, 2000);
  };

  const getFormatBadge = (format: string) => {
    switch (format.toUpperCase()) {
      case 'RVT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'NWD':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'DYN':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'RFA':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'XLSX':
      case 'XLS':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'DOCX':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'PDF':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div id="downloads-vault-tab-container" className="space-y-8 pb-16">
      
      {/* Top Banner with Download All Bundle */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
              Student Resource Vault
            </span>
            <span className="text-xs text-emerald-300 font-semibold">
              {assets.length} Downloadable AEC Datasets & Tools
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            All Student Downloadable Data & Software Assets
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            Access lifetime downloadable course files, commercial Revit models, Dynamo computational nodes, ISO 19650 BEP documents, and PBS Parametric RFA libraries.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {downloadAllSuccess ? (
            <div className="px-6 py-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-2xl flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>Complete Bundle Download Started!</span>
            </div>
          ) : (
            <button
              onClick={handleDownloadAllBundle}
              disabled={isDownloadingAll}
              className="w-full md:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-black text-xs rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isDownloadingAll ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Packaging 8.4 GB Archive...</span>
                </>
              ) : (
                <>
                  <FolderArchive className="w-4 h-4" />
                  <span>Download Complete 8.4 GB Course Pack</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Search Controls */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by file name, format (.rvt, .dyn), or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold self-end sm:self-center">
            Showing <strong className="text-slate-900">{filteredAssets.length}</strong> of {assets.length} items
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Download Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => {
          const isDownloaded = downloadedIds[asset.id];

          return (
            <div
              key={asset.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 hover:border-emerald-300"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] border ${getFormatBadge(asset.fileFormat)}`}>
                    .{asset.fileFormat.toUpperCase()}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    {asset.fileSize}
                  </span>
                </div>

                {/* Title and Description */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                    {asset.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    v{asset.version || '2026.1'}
                  </span>
                  {asset.moduleRef && (
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {asset.moduleRef}
                    </span>
                  )}
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {asset.downloadCount || 0} Downloads
                  </span>
                </div>

                {/* Tags */}
                {Array.isArray(asset.tags) && asset.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {asset.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action button */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleSingleDownload(asset)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isDownloaded
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-900 hover:bg-emerald-600 text-white shadow-2xs hover:shadow'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Downloaded (Save Again)</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download File ({asset.fileSize})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssets.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700 text-sm">No downloadable files found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or reset the category filter to view all AEC assets.
          </p>
        </div>
      )}

    </div>
  );
};
