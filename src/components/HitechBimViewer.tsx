import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Box, 
  Cpu, 
  Activity, 
  Eye, 
  EyeOff,
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  Maximize2, 
  RotateCw, 
  ShieldCheck,
  Server,
  Code2,
  Sliders,
  Play,
  Compass,
  Building,
  Target,
  Scan,
  RefreshCw,
  Terminal,
  Volume2
} from 'lucide-react';

interface HitechBimViewerProps {
  onOpenLms?: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const HitechBimViewer: React.FC<HitechBimViewerProps> = ({ onOpenLms, onOpenAuth }) => {
  // Layer states
  const [showArch, setShowArch] = useState(true);
  const [showStruct, setShowStruct] = useState(true);
  const [showMep, setShowMep] = useState(true);
  const [showElec, setShowElec] = useState(true);
  const [showFire, setShowFire] = useState(true);
  const [showClashes, setShowClashes] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState<'shaded' | 'wireframe' | 'xray' | 'thermal'>('shaded');
  const [lodLevel, setLodLevel] = useState<'LOD 200' | 'LOD 300' | 'LOD 400' | 'LOD 500'>('LOD 400');
  const [isLaserScanning, setIsLaserScanning] = useState(true);

  // Simulation states
  const [clashRunning, setClashRunning] = useState(false);
  const [clashFoundCount, setClashFoundCount] = useState(0);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([
    'ISO 19650 CDE connection established: 24ms ping',
    'Autodesk Revit 2026 federated model synchronized',
    'LOD 400 MEP fabrication geometry validated'
  ]);

  const [selectedElement, setSelectedElement] = useState<{
    name: string;
    discipline: string;
    lod: string;
    guid: string;
    status: string;
    parameters: { key: string; val: string }[];
  }>({
    name: 'AHU-04 Primary Supply Air Duct (1200x600)',
    discipline: 'Mechanical HVAC (MEP)',
    lod: 'LOD 400 (Fabrication)',
    guid: '2f9a-8c11-99e2-41b0',
    status: 'Coordinated & Clash-Free',
    parameters: [
      { key: 'Flow Rate', val: '4,250 CFM' },
      { key: 'Velocity', val: '5.8 m/s' },
      { key: 'Insulation', val: '25mm Acoustic Glasswool' },
      { key: 'System', val: 'Supply Air High Pressure' }
    ]
  });

  // Animated Telemetry Counters
  const [elementCount, setElementCount] = useState(148920);
  const [fpsCounter, setFpsCounter] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setElementCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      setFpsCounter(prev => Math.min(60, Math.max(58, 59 + Math.floor(Math.random() * 2))));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleRunClashTest = () => {
    setClashRunning(true);
    setShowClashes(true);
    setDiagnosticLogs(prev => [
      `Navisworks Clash Matrix batch test initiated: MEP vs Structural Steel...`,
      ...prev.slice(0, 4)
    ]);

    setTimeout(() => {
      setClashRunning(false);
      setClashFoundCount(2);
      setSelectedElement({
        name: 'Clash #01: 250mm Chilled Water Pipe vs W24x68 Steel Girder',
        discipline: 'Navisworks MEP / Structural Collision',
        lod: 'Auto-Resolved via 150mm Reroute Offset',
        guid: 'clash-node-8891',
        status: 'Auto-Resolved by PBS Protocol',
        parameters: [
          { key: 'Hard Clash Volume', val: '0.0042 m³' },
          { key: 'Assigned Lead', val: 'Er. Pravin Yadav (PBS)' },
          { key: 'Resolution Action', val: '45° Offset Elbow below girder flange' },
          { key: 'Status', val: 'Approved in Navisworks 2026' }
        ]
      });

      setDiagnosticLogs(prev => [
        `RESOLVED: 2 Hard Clashes isolated & mitigated with 45° offset routing.`,
        `Exported updated .NWD Navisworks coordination report to CDE.`,
        ...prev.slice(0, 3)
      ]);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#050811] border-2 border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl relative text-white cyber-box-glow">
      {/* Background Cyber-Grid & High-Tech Radar Scanner */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Laser Scanning Beam Line */}
      {isLaserScanning && (
        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f59b] to-transparent shadow-[0_0_15px_#00f59b] animate-laser-scan pointer-events-none z-30 opacity-80" />
      )}

      {/* Top Telemetry Header Bar */}
      <div className="bg-[#0b1120]/95 border-b border-emerald-500/30 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 relative z-10 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f59b] animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f59b]" />
          </div>

          <div className="font-mono font-bold tracking-wider text-[#00f59b] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>PBS DIGITAL TWIN ENGINE v4.6</span>
          </div>

          {/* LOD Switcher Pills */}
          <div className="hidden lg:flex items-center bg-slate-900 border border-emerald-500/40 rounded-lg p-0.5 text-[10px] font-mono">
            {(['LOD 200', 'LOD 300', 'LOD 400', 'LOD 500'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLodLevel(lvl)}
                className={`px-2 py-0.5 rounded transition-all ${
                  lodLevel === lvl
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Telemetry Stats */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-300">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-400">FPS:</span>
            <span className="text-emerald-400 font-bold">{fpsCounter}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-400">OBJECTS:</span>
            <span className="text-white font-bold">{elementCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">CLASHES:</span>
            <span className={`font-bold ${clashFoundCount > 0 ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
              {clashFoundCount === 0 ? '0 (RESOLVED)' : `${clashFoundCount} MITIGATED`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-300 font-bold">ISO 19650 SYNC</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D Model Stage Canvas */}
      <div className="relative h-72 sm:h-96 w-full flex items-center justify-center overflow-hidden p-4">
        {/* HUD Corner Tech Brackets */}
        <div className="absolute top-2 left-2 text-emerald-500/50 font-mono text-[10px] pointer-events-none">[ + 00:24:91 ]</div>
        <div className="absolute top-2 right-2 text-emerald-500/50 font-mono text-[10px] pointer-events-none">[ GRID_X: 42.189 ]</div>
        <div className="absolute bottom-2 left-2 text-emerald-500/50 font-mono text-[10px] pointer-events-none">[ ELEV: +14.250m ]</div>
        <div className="absolute bottom-2 right-2 text-emerald-500/50 font-mono text-[10px] pointer-events-none">[ CDE_STATUS: ONLINE ]</div>

        {/* 3D Holographic Model Stage */}
        <motion.div
          animate={isRotating ? { rotateY: [0, 10, -10, 0], rotateX: [20, 24, 18, 20] } : { rotateX: 20 }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          className="relative w-72 sm:w-96 h-56 sm:h-72 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Base ISO Coordinate Radar Grid */}
          <div className="absolute inset-x-0 bottom-0 h-44 border border-emerald-500/40 rounded-3xl bg-emerald-950/30 transform rotateX(60deg) scale-110 shadow-2xl pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[linear-gradient(to_right,#10b98125_1px,transparent_1px),linear-gradient(to_bottom,#10b98125_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="absolute w-36 h-36 rounded-full border border-emerald-500/30 animate-ping opacity-20" />
            <div className="absolute w-20 h-20 rounded-full border border-emerald-500/50" />
          </div>

          {/* LAYER 1: Architectural Envelope & Curtain Wall Glass */}
          <AnimatePresence>
            {showArch && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: viewMode === 'wireframe' ? 0.35 : viewMode === 'xray' ? 0.25 : viewMode === 'thermal' ? 0.6 : 0.85, 
                  scale: 1 
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`absolute inset-4 border-2 rounded-2xl transition-all backdrop-blur-xs shadow-2xl ${
                  viewMode === 'thermal' 
                    ? 'border-purple-400 bg-gradient-to-tr from-purple-900/40 via-pink-600/20 to-blue-900/30' 
                    : 'border-emerald-400/80 bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-transparent'
                }`}
              >
                {/* Floor slabs & curtain grids */}
                <div className="absolute top-1/4 inset-x-0 h-0.5 bg-emerald-400/60 shadow-[0_0_8px_#34d399]" />
                <div className="absolute top-2/4 inset-x-0 h-0.5 bg-emerald-400/60 shadow-[0_0_8px_#34d399]" />
                <div className="absolute top-3/4 inset-x-0 h-0.5 bg-emerald-400/60 shadow-[0_0_8px_#34d399]" />
                <div className="absolute inset-y-0 left-1/3 w-0.5 bg-emerald-400/40" />
                <div className="absolute inset-y-0 right-1/3 w-0.5 bg-emerald-400/40" />

                <span className="absolute top-2 left-2 text-[9px] font-mono text-emerald-300 font-bold bg-slate-950/90 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                  ARCH SHELL ({lodLevel})
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 2: Structural Columns & Steel Trusses */}
          <AnimatePresence>
            {showStruct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-8 border border-blue-400/60 rounded-xl pointer-events-none"
              >
                {/* Structural Columns */}
                <div className="absolute top-0 bottom-0 left-2 w-2.5 bg-blue-500/80 shadow-[0_0_10px_#60a5fa] rounded-xs" />
                <div className="absolute top-0 bottom-0 right-2 w-2.5 bg-blue-500/80 shadow-[0_0_10px_#60a5fa] rounded-xs" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 bg-blue-400 shadow-[0_0_10px_#60a5fa] rounded-xs" />
                
                {/* Cross Bracing */}
                <div className="absolute inset-0 bg-[radial-gradient(#3b82f640_1px,transparent_1px)] bg-[size:12px_12px]" />
                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-blue-300 font-bold bg-slate-950/90 border border-blue-500/40 px-1.5 py-0.5 rounded">
                  STRUCTURAL STEEL (TEKLA/REVIT)
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 3: MEP HVAC Ducts & Piping */}
          <AnimatePresence>
            {showMep && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-6 pointer-events-none"
              >
                {/* Primary HVAC Duct Route */}
                <div className="absolute top-10 left-4 right-10 h-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_12px_#f59e0b] rounded-xs flex items-center justify-around">
                  <div className="w-1.5 h-3 bg-slate-950/60" />
                  <div className="w-1.5 h-3 bg-slate-950/60" />
                  <div className="w-1.5 h-3 bg-slate-950/60" />
                </div>

                {/* Vertical Chilled Water Pipe */}
                <div className="absolute top-6 bottom-8 right-14 w-2.5 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_10px_#06b6d4] rounded-full" />

                {/* Branch Duct with Diffusers */}
                <div className="absolute top-24 left-12 right-20 h-3 bg-amber-400/90 shadow-[0_0_8px_#f59e0b] rounded-xs" />
                <div className="absolute top-26 left-16 w-3 h-3 bg-amber-200 rounded-xs shadow-md" />
                <div className="absolute top-26 left-36 w-3 h-3 bg-amber-200 rounded-xs shadow-md" />

                <span className="absolute top-2 right-2 text-[9px] font-mono text-amber-300 font-bold bg-slate-950/90 border border-amber-500/40 px-1.5 py-0.5 rounded">
                  MEP DUCTWORK (LOD 400)
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 4: Electrical Cable Trays & Fire Sprinklers */}
          <AnimatePresence>
            {showElec && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-10 pointer-events-none"
              >
                {/* Cable Tray */}
                <div className="absolute top-18 left-2 right-6 h-1.5 bg-purple-400 shadow-[0_0_8px_#c084fc] rounded-xs" />
                {/* Fire Sprinkler Main */}
                {showFire && (
                  <div className="absolute top-4 left-6 right-16 h-1 bg-rose-500 shadow-[0_0_8px_#f43f5e] rounded-xs flex justify-between px-4">
                    <div className="w-1 h-2 bg-rose-400" />
                    <div className="w-1 h-2 bg-rose-400" />
                    <div className="w-1 h-2 bg-rose-400" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* LAYER 5: Clash Pinpoints / Radar Nodes */}
          {showClashes && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Clash Pinpoint #1 */}
              <div className="absolute top-14 right-16 z-30">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-rose-500/40 animate-ping absolute -inset-1" />
                  <div className="w-5 h-5 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[9px] font-black text-white shadow-[0_0_15px_#f43f5e]">
                    !
                  </div>
                </div>
              </div>

              {/* Clash Pinpoint #2 */}
              <div className="absolute top-28 left-20 z-30">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-amber-400/40 animate-ping absolute -inset-1" />
                  <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-slate-950">
                    !
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Floating Quick Action Overlay Buttons (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20">
          <button
            onClick={() => setShowArch(!showArch)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
              showArch
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-xs'
                : 'bg-slate-900/80 text-slate-500 border-slate-700'
            }`}
          >
            [1] ARCH
          </button>

          <button
            onClick={() => setShowStruct(!showStruct)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
              showStruct
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/60 shadow-xs'
                : 'bg-slate-900/80 text-slate-500 border-slate-700'
            }`}
          >
            [2] STRUCT
          </button>

          <button
            onClick={() => setShowMep(!showMep)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
              showMep
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-xs'
                : 'bg-slate-900/80 text-slate-500 border-slate-700'
            }`}
          >
            [3] MEP
          </button>

          <button
            onClick={() => setShowElec(!showElec)}
            className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all border ${
              showElec
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-xs'
                : 'bg-slate-900/80 text-slate-500 border-slate-700'
            }`}
          >
            [4] ELEC
          </button>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1 rounded-lg border transition-all ${
              isRotating ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle 3D auto-orbit rotation"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsLaserScanning(!isLaserScanning)}
            className={`p-1 rounded-lg border transition-all ${
              isLaserScanning ? 'bg-[#00f59b]/20 text-[#00f59b] border-[#00f59b]/50' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Laser Scan Line"
          >
            <Scan className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Mode Switcher (Top Right) */}
        <div className="absolute top-3 right-3 flex items-center bg-[#0b1120]/90 border border-slate-700 rounded-xl p-0.5 text-[10px] font-mono z-20">
          <button
            onClick={() => setViewMode('shaded')}
            className={`px-2 py-1 rounded-lg transition-all ${viewMode === 'shaded' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
          >
            SHADED
          </button>
          <button
            onClick={() => setViewMode('wireframe')}
            className={`px-2 py-1 rounded-lg transition-all ${viewMode === 'wireframe' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
          >
            WIRE
          </button>
          <button
            onClick={() => setViewMode('xray')}
            className={`px-2 py-1 rounded-lg transition-all ${viewMode === 'xray' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
          >
            X-RAY
          </button>
          <button
            onClick={() => setViewMode('thermal')}
            className={`px-2 py-1 rounded-lg transition-all ${viewMode === 'thermal' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'}`}
          >
            THERMAL
          </button>
        </div>

        {/* Bottom Left Clash Detection Trigger */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
          <button
            onClick={handleRunClashTest}
            disabled={clashRunning}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 border border-emerald-400/40"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{clashRunning ? 'Analyzing Geometry...' : 'Run Clash Simulation'}</span>
          </button>

          {onOpenLms && (
            <button
              onClick={onOpenLms}
              className="bg-slate-900/90 hover:bg-slate-800 text-emerald-300 font-mono text-xs px-3 py-1.5 rounded-xl border border-emerald-500/40 hidden sm:flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-emerald-400" />
              <span>Launch LMS Lab</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Console Terminal Log Bar */}
      <div className="bg-[#050811] border-t border-slate-800 px-4 py-2 text-[10px] font-mono text-emerald-400/80 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Terminal className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400">TELEMETRY:</span>
        </div>
        <div className="truncate text-slate-300">
          {diagnosticLogs[0]}
        </div>
        <span className="text-[9px] text-slate-500 flex-shrink-0">AUTO-LOGGED</span>
      </div>

      {/* Selected Element Property Inspector Footer */}
      <div className="bg-[#0b1120]/95 border-t border-emerald-500/30 p-3 sm:p-4 text-xs font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-slate-400">INSPECTED OBJECT:</span>
            <span className="text-white font-bold truncate max-w-sm sm:max-w-md">{selectedElement.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              {selectedElement.lod}
            </span>
            <span className="text-slate-400">
              GUID: <strong className="text-slate-200">{selectedElement.guid}</strong>
            </span>
            <span className="text-amber-300 font-bold">
              {selectedElement.status}
            </span>
          </div>
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
          {selectedElement.parameters.map((p, idx) => (
            <div key={idx} className="bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
              <span className="text-slate-500 block">{p.key}:</span>
              <span className="text-emerald-300 font-bold">{p.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
