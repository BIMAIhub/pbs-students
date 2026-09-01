import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Layers, 
  Eye, 
  EyeOff, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Download, 
  Sliders, 
  Box, 
  Cpu, 
  Activity,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../../utils/soundEffects';

interface Bim3DModelViewerModalProps {
  onClose: () => void;
}

interface BimClash {
  id: string;
  name: string;
  itemA: string;
  itemB: string;
  gridLocation: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  status: 'Open' | 'Resolved' | 'Approved';
  x: number; // percentage in viewer
  y: number;
}

export const Bim3DModelViewerModal: React.FC<Bim3DModelViewerModalProps> = ({ onClose }) => {
  // Layer toggles
  const [layers, setLayers] = useState({
    architecture: true,
    structure: true,
    hvac: true,
    plumbing: true,
    electrical: true,
    clashPins: true,
  });

  const [lodLevel, setLodLevel] = useState<'300' | '350' | '400' | '500'>('400');
  const [selectedClash, setSelectedClash] = useState<BimClash | null>(null);
  const [rotationAngle, setRotationAngle] = useState(35);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeSection, setActiveSection] = useState<'3D' | 'Section-X' | 'Plan-L1'>('3D');
  const [isRotating, setIsRotating] = useState(false);
  const [selectedElement, setSelectedElement] = useState<{
    family: string;
    type: string;
    system: string;
    size: string;
    elevation: string;
    flowRate?: string;
  } | null>({
    family: 'M_Rectangular_Duct_Supply',
    type: '600x400 mm Supply Air with 25mm Fiberglass Liner',
    system: 'Supply Air - AHU-04 Level 2',
    size: '600 mm x 400 mm',
    elevation: '+3,450 mm AFF (Above Finished Floor)',
    flowRate: '1,850 CFM @ 2.4 m/s'
  });

  const clashes: BimClash[] = [
    {
      id: 'CLASH-01',
      name: 'HVAC Duct vs Structural UB 457x191',
      itemA: 'Supply Duct 600x400 (AHU-04)',
      itemB: 'Universal Beam UB 457x191x67',
      gridLocation: 'Grid C-4 / Level 2',
      severity: 'Critical',
      status: 'Open',
      x: 48,
      y: 42
    },
    {
      id: 'CLASH-02',
      name: 'Chilled Water Pipe vs Cable Tray',
      itemA: 'CHW Supply 150mm Dia',
      itemB: '300mm Perforated Cable Tray',
      gridLocation: 'Grid D-2 / Level 2 Corridor',
      severity: 'Moderate',
      status: 'Resolved',
      x: 62,
      y: 55
    },
    {
      id: 'CLASH-03',
      name: 'Fire Sprinkler Branch vs Waste Pipe',
      itemA: 'Sprinkler 32mm Branch Line',
      itemB: '100mm Soil & Waste Stack',
      gridLocation: 'Grid B-1 / Riser 03',
      severity: 'Minor',
      status: 'Open',
      x: 32,
      y: 65
    }
  ];

  // Auto rotation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle(prev => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRotating]);

  const toggleLayer = (layerKey: keyof typeof layers) => {
    soundFx.playClick();
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleExportClashReport = () => {
    soundFx.playSuccess();
    const content = `PRAGMATIC BIM SOLUTION - FEDERATED CLASH DETECTION AUDIT REPORT
Project: Commercial Tower B+G+12 (LOD 400 Coordination)
Student Investigator: Pravin Yadav (PBS-STU-2026-8492)
Date: September 2026
Accreditation: ISO 19650-2 Information Production Matrix

Clash Summary:
- Total Clashes Detected: ${clashes.length}
- Critical Clashes (Hard Interference): 1
- Resolved Clashes: 1
- Open Clashes: 2

Detailed Clash Log:
${clashes.map((c, i) => `${i + 1}. [${c.id}] ${c.name}
   - Item A: ${c.itemA}
   - Item B: ${c.itemB}
   - Location: ${c.gridLocation}
   - Severity: ${c.severity} | Status: ${c.status}`).join('\n\n')}

Certified by: PBS BIM Coordination Lab
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PBS_LOD400_Clash_Audit_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-950 text-slate-100 w-full max-w-6xl h-[92vh] rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">Interactive 3D BIM Model Inspector</h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  LOD {lodLevel} Federated
                </span>
                <span className="bg-teal-500/20 text-teal-400 border border-teal-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Revit 2026 Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Model: PBS_Commercial_Tower_Coordination_V4.rvt • Active Mesh: 48,290 Elements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportClashReport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Clash Log</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Viewer Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          
          {/* Left / Center 3D Interactive Canvas */}
          <div className="flex-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative flex items-center justify-center overflow-hidden p-6 select-none">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            {/* Viewport Control Pill Bar (Top Left) */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-800 text-xs">
              {(['3D', 'Section-X', 'Plan-L1'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveSection(mode);
                  }}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    activeSection === mode 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Rotation & Zoom Controls (Top Right) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  isRotating ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
                title="Toggle Auto Rotation"
              >
                <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isRotating ? 'Rotating' : 'Orbit'}</span>
              </button>

              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.8))}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* 3D Isometric BIM Model Rendering Stage */}
            <div 
              className="relative w-full max-w-2xl h-[420px] sm:h-[480px] flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Central Isometric Structural Floor Slab */}
              {layers.structure && (
                <div className="absolute w-80 h-80 rounded-3xl bg-slate-800/80 border-2 border-slate-600 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-sm flex items-center justify-center transform -rotate-45">
                  <div className="grid grid-cols-4 grid-rows-4 w-full h-full p-4 gap-2 opacity-40">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border border-slate-500/50 rounded-lg flex items-center justify-center text-[8px] font-mono text-slate-400">
                        C-{i+1}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Core & Enclosure */}
              {layers.architecture && (
                <div className="absolute w-72 h-72 rounded-2xl border-2 border-dashed border-teal-500/50 bg-teal-950/20 transform -rotate-45 pointer-events-none animate-pulse">
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-teal-400 font-bold bg-teal-900/60 px-1.5 py-0.5 rounded">
                    LOD {lodLevel} Arch Envelope
                  </div>
                </div>
              )}

              {/* HVAC Rectangular & Round Ductwork Layers */}
              {layers.hvac && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Supply Duct Loop */}
                  <div 
                    onClick={() => {
                      setSelectedElement({
                        family: 'M_Rectangular_Duct_Supply',
                        type: '600x400 mm Supply Air with 25mm Fiberglass Liner',
                        system: 'Supply Air - AHU-04 Level 2',
                        size: '600 mm x 400 mm',
                        elevation: '+3,450 mm AFF',
                        flowRate: '1,850 CFM @ 2.4 m/s'
                      });
                    }}
                    className="w-96 h-12 bg-gradient-to-r from-cyan-600/90 via-cyan-500 to-blue-600/90 rounded-xl shadow-lg border border-cyan-300 flex items-center justify-between px-4 transform -rotate-12 cursor-pointer pointer-events-auto hover:brightness-125 transition-all group"
                  >
                    <span className="text-[10px] font-mono font-bold text-white tracking-wider flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-200 animate-ping" />
                      HVAC Supply 600x400
                    </span>
                    <span className="text-[9px] font-mono bg-black/40 px-2 py-0.5 rounded text-cyan-200">
                      1,850 CFM
                    </span>
                  </div>

                  {/* Return Air Duct */}
                  <div className="w-72 h-10 bg-gradient-to-r from-blue-700/80 to-indigo-600/80 rounded-xl shadow-md border border-blue-400/60 flex items-center px-4 transform rotate-45 cursor-pointer pointer-events-auto hover:brightness-125 transition-all">
                    <span className="text-[9px] font-mono font-bold text-blue-200">
                      Return Air Duct 450x300
                    </span>
                  </div>
                </div>
              )}

              {/* Plumbing & Hydronics Piping Layer */}
              {layers.plumbing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    onClick={() => {
                      setSelectedElement({
                        family: 'M_Pipe_Chilled_Water',
                        type: '150mm Carbon Steel Schedule 40',
                        system: 'CHW Supply - Chiller 02',
                        size: '150 mm Ø (6 Inch)',
                        elevation: '+3,600 mm AFF',
                        flowRate: '450 GPM @ 1.8 m/s'
                      });
                    }}
                    className="w-80 h-5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full shadow-lg border border-emerald-300 flex items-center px-3 transform rotate-75 cursor-pointer pointer-events-auto hover:brightness-125 transition-all"
                  >
                    <span className="text-[8px] font-mono font-bold text-slate-900">
                      CHW Supply 150mm Ø
                    </span>
                  </div>
                </div>
              )}

              {/* Electrical Cable Trays & Conduits */}
              {layers.electrical && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    onClick={() => {
                      setSelectedElement({
                        family: 'M_Cable_Tray_Perforated',
                        type: '300x50 mm Hot-Dip Galvanized',
                        system: 'LV Power Distribution - DB-L2-01',
                        size: '300 mm x 50 mm',
                        elevation: '+3,750 mm AFF'
                      });
                    }}
                    className="w-72 h-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg shadow-md border-2 border-amber-300 flex items-center px-3 transform -rotate-60 cursor-pointer pointer-events-auto hover:brightness-125 transition-all"
                  >
                    <span className="text-[8px] font-mono font-bold text-slate-950">
                      LV Cable Tray 300x50
                    </span>
                  </div>
                </div>
              )}

              {/* Interactive Clash Point Markers */}
              {layers.clashPins && clashes.map(clash => (
                <div
                  key={clash.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedClash(clash);
                  }}
                  className="absolute z-30 cursor-pointer pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    top: `${clash.y}%`,
                    left: `${clash.x}%`
                  }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-125 border-2 ${
                    clash.severity === 'Critical'
                      ? 'bg-rose-600 border-rose-300 animate-bounce'
                      : clash.status === 'Resolved'
                      ? 'bg-emerald-600 border-emerald-300'
                      : 'bg-amber-600 border-amber-300'
                  }`}>
                    {clash.status === 'Resolved' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="absolute left-1/2 -top-7 -translate-x-1/2 bg-slate-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {clash.id} ({clash.severity})
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Floating Stats Pill */}
            <div className="absolute bottom-4 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-xs">
              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mesh FPS: <strong className="text-white font-mono">60.0</strong></span>
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>Rotation: <strong className="text-white font-mono">{rotationAngle}°</strong></span>
                </span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Coordinates: <strong className="text-white font-mono">X: 124.50 | Y: 89.20 | Z: +3.45m</strong></span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">LOD Level:</span>
                {(['300', '350', '400', '500'] as const).map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundFx.playClick();
                      setLodLevel(lvl);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      lodLevel === lvl
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Layer Controls & Parametric Inspector */}
          <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col p-5 overflow-y-auto space-y-6">
            
            {/* Discipline Layer Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Federated Disciplines</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">5 Active</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'hvac', label: 'HVAC Air', color: 'bg-cyan-500' },
                  { key: 'plumbing', label: 'Plumbing / CHW', color: 'bg-emerald-500' },
                  { key: 'electrical', label: 'Electrical', color: 'bg-amber-500' },
                  { key: 'structure', label: 'Structural Beams', color: 'bg-slate-500' },
                  { key: 'architecture', label: 'Arch Enclosure', color: 'bg-teal-500' },
                  { key: 'clashPins', label: 'Clash Pinpoints', color: 'bg-rose-500' },
                ].map(item => {
                  const isVisible = layers[item.key as keyof typeof layers];
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggleLayer(item.key as keyof typeof layers)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                        isVisible
                          ? 'bg-slate-800/90 border-slate-700 text-white'
                          : 'bg-slate-950/40 border-slate-800/50 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color} ${isVisible ? '' : 'opacity-30'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Element Parametric Property Box */}
            {selectedElement && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Revit BIM Element Data</span>
                  </h4>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                    Parametric
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Family Name:</span>
                    <span className="font-mono text-slate-200 font-bold">{selectedElement.family}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">System Classification:</span>
                    <span className="text-cyan-300 font-medium">{selectedElement.system}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Size / Dimension:</span>
                      <span className="font-mono text-white font-bold">{selectedElement.size}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Elevation AFF:</span>
                      <span className="font-mono text-white font-bold">{selectedElement.elevation}</span>
                    </div>
                  </div>
                  {selectedElement.flowRate && (
                    <div className="pt-1 border-t border-slate-900">
                      <span className="text-slate-500 block text-[10px]">Velocity & Flow Rate:</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedElement.flowRate}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Clash Detection Details Inspector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Navisworks Clash Matrix</span>
                </h4>
                <span className="text-[10px] font-mono text-amber-400 font-bold">3 Points</span>
              </div>

              <div className="space-y-2">
                {clashes.map(clash => (
                  <div
                    key={clash.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedClash(clash);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedClash?.id === clash.id
                        ? 'bg-slate-800 border-emerald-500/80 shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{clash.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        clash.severity === 'Critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : clash.status === 'Resolved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {clash.status} • {clash.severity}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-white">{clash.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">{clash.gridLocation}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
