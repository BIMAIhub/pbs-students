import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BIM_SERVICES, FEATURED_PROJECTS, COMPANY_INFO } from '../data/pbsData';
import { 
  Box, 
  ShieldAlert, 
  FileText, 
  Building2, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Eye, 
  EyeOff, 
  Sliders, 
  ArrowRight, 
  Sparkles,
  PhoneCall,
  Activity,
  Check
} from 'lucide-react';

interface BimServicesSectionProps {
  onOpenConsultancy: () => void;
}

export const BimServicesSection: React.FC<BimServicesSectionProps> = ({
  onOpenConsultancy
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'projects' | 'viewer'>('services');

  // Interactive 3D BIM Viewer Simulator State
  const [layers, setLayers] = useState({
    architecture: true,
    structure: true,
    hvacDucts: true,
    pipingChilledWater: true,
    electricalTrays: true,
    fireSprinklers: true
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box': return Box;
      case 'ShieldAlert': return ShieldAlert;
      case 'FileText': return FileText;
      case 'Building2': return Building2;
      case 'Cpu': return Cpu;
      default: return Box;
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-white text-slate-900 relative">
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
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>AEC CONSULTANCY & SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">BIM Services & Project Portfolio</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            15 years of professional experience delivering 3D Modeling, Clash Coordination, and 2D Shop Drawings for complex projects worldwide.
          </p>
        </motion.div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'services'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              BIM Services Offered
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'projects'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed Projects (Al ULA 45+ Bldgs)
            </button>
            <button
              onClick={() => setActiveTab('viewer')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'viewer'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Interactive 3D BIM Viewer</span>
            </button>
          </div>
        </div>

        {/* TAB 1: BIM Services Grid */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BIM_SERVICES.map((service, idx) => {
              const IconComp = getIcon(service.iconName);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-300 text-emerald-700 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-600 text-xs leading-relaxed">
                      {service.description}
                    </p>

                    <div>
                      <h4 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2">Deliverables</h4>
                      <ul className="space-y-1.5">
                        {service.deliverables.map((del, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={onOpenConsultancy}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Completed Projects Showcase */}
        {activeTab === 'projects' && (
          <div className="space-y-12">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8"
              >
                {/* Left Specs Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                        {project.clientLocation}
                      </span>
                      <span className="text-slate-500 text-xs font-medium">
                        {project.type}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="text-center">
                      <div className="text-2xl font-black text-emerald-600">{project.buildingsModeled}+</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Buildings Modeled</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-amber-600">{project.durationMonths}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Months Effort</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-sky-600">{project.drawingsProduced}+</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Drawings Produced</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-purple-600">{project.engineersInvolved}+</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Engineers Team</div>
                    </div>
                  </div>

                  {/* Scope Highlights */}
                  <div>
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">Services Delivered</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.servicesProvided.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenConsultancy}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Discuss Similar Project with Our Lead Engineers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Image Banner */}
                <div className="lg:col-span-5 relative min-h-[280px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 shadow-md">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      MEP Plant Room & Coordinated Piping
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      Coordinated with Revit, Navisworks Manage, and AutoCAD.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Interactive 3D BIM Model Viewer Simulator */}
        {activeTab === 'viewer' && (
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  Interactive Multi-Discipline 3D BIM Viewer Simulator
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Simulating a coordinated Revit MEP Plant Room model with live clash detection status.
                </p>
              </div>

              {/* Live Clash Matrix Badge */}
              <div className="bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-xl text-xs flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <div>
                  <div className="font-extrabold text-emerald-900">0 ACTIVE CLASHES</div>
                  <div className="text-[10px] text-emerald-700">Navisworks Coordination Verified</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Layer Toggles Panel */}
              <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  Toggle BIM Layers
                </h4>

                <div className="space-y-2">
                  <button
                    onClick={() => toggleLayer('architecture')}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      layers.architecture ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>Architectural Walls & Slab</span>
                    {layers.architecture ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    onClick={() => toggleLayer('structure')}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      layers.structure ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>Structural Columns & Beams</span>
                    {layers.structure ? <Eye className="w-4 h-4 text-amber-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    onClick={() => toggleLayer('hvacDucts')}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      layers.hvacDucts ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>HVAC Air Ducts (Supply/Return)</span>
                    {layers.hvacDucts ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    onClick={() => toggleLayer('pipingChilledWater')}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      layers.pipingChilledWater ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>Chilled Water Pipes & Pumps</span>
                    {layers.pipingChilledWater ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    onClick={() => toggleLayer('electricalTrays')}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      layers.electricalTrays ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>Electrical Cable Trays & Panels</span>
                    {layers.electricalTrays ? <Eye className="w-4 h-4 text-purple-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>

                  <button
                    onClick={() => toggleLayer('fireSprinklers')}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                      layers.fireSprinklers ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <span>Fire Sprinkler Mains & Heads</span>
                    {layers.fireSprinklers ? <Eye className="w-4 h-4 text-rose-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>

                <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">ISO 19650 LOD 400 Standards:</span>
                  <p>All fittings, insulation thicknesses, and maintenance access clearances are strictly embedded.</p>
                </div>
              </div>

              {/* Visual 3D Canvas Representation */}
              <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 h-96 relative overflow-hidden flex items-center justify-center p-6 text-white">
                
                {/* Simulated 3D Isometric BIM Canvas */}
                <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4 text-center">
                  
                  {/* Visual SVG 3D Model Schematic Layering */}
                  <div className="relative w-72 h-48 border border-emerald-500/30 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                    
                    {/* Architectural Slab */}
                    {layers.architecture && (
                      <div className="absolute inset-x-2 bottom-2 h-4 bg-slate-700/80 rounded border border-slate-500 flex items-center justify-center text-[9px] text-slate-300 font-mono">
                        ARCH SLAB LOD 300
                      </div>
                    )}

                    {/* Structural Columns */}
                    {layers.structure && (
                      <div className="absolute inset-x-6 top-8 bottom-8 flex justify-between pointer-events-none">
                        <div className="w-4 bg-amber-600/60 border border-amber-400 rounded-sm" />
                        <div className="w-4 bg-amber-600/60 border border-amber-400 rounded-sm" />
                      </div>
                    )}

                    {/* HVAC Ducts */}
                    {layers.hvacDucts && (
                      <div className="absolute top-10 inset-x-8 h-8 bg-sky-500/40 border border-sky-400 rounded flex items-center justify-center text-[9px] text-sky-200 font-bold">
                        SUPPLY DUCT 1200x600
                      </div>
                    )}

                    {/* Piping */}
                    {layers.pipingChilledWater && (
                      <div className="absolute top-22 inset-x-4 h-3 bg-blue-500/70 border border-blue-300 rounded-full flex items-center justify-center text-[8px] text-white">
                        CHW PIPING 200mm ø
                      </div>
                    )}

                    {/* Electrical */}
                    {layers.electricalTrays && (
                      <div className="absolute top-28 inset-x-12 h-2.5 bg-purple-500/70 border border-purple-300 rounded flex items-center justify-center text-[7px] text-white">
                        CABLE TRAY 600mm
                      </div>
                    )}

                    {/* Fire Sprinklers */}
                    {layers.fireSprinklers && (
                      <div className="absolute top-5 inset-x-10 h-1.5 bg-rose-500/80 rounded-full flex justify-around">
                        <div className="w-1.5 h-3 bg-rose-400 rounded-b" />
                        <div className="w-1.5 h-3 bg-rose-400 rounded-b" />
                        <div className="w-1.5 h-3 bg-rose-400 rounded-b" />
                      </div>
                    )}

                    {!layers.architecture && !layers.structure && !layers.hvacDucts && !layers.pipingChilledWater && !layers.electricalTrays && !layers.fireSprinklers && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                        Turn on layers to view 3D BIM element interaction
                      </div>
                    )}

                  </div>

                  <div className="text-xs text-slate-400 max-w-sm">
                    <span className="text-emerald-400 font-bold">Pragmatic BIM Quality Check:</span> Click layers on the left to simulate multi-discipline clash resolution.
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
