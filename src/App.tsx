/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  Layers, 
  Cpu, 
  Workflow, 
  Monitor, 
  ShieldCheck, 
  ChevronRight, 
  AlertTriangle, 
  Zap, 
  Globe, 
  Database, 
  Cloud, 
  Lock, 
  Eye, 
  RefreshCw, 
  Satellite, 
  Radio, 
  Wind,
  Menu,
  X,
  FileText,
  LayoutDashboard,
  Network,
  Settings,
  Bell,
  Search,
  User,
  ArrowRight,
  CheckCircle2,
  Info,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ARCHITECTURE_LAYERS, MOCK_SENSORS, DATA_FLOW_STEPS, REGIONS, EMERGENCY_PROTOCOLS } from './constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

interface NavItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 w-full transition-all duration-200 group relative",
      active ? "text-[#00ff9d] bg-[#00ff9d]/5" : "text-white/50 hover:text-white hover:bg-white/5"
    )}
  >
    {active && <motion.div layoutId="nav-active" className="absolute left-0 top-0 bottom-0 w-1 bg-[#00ff9d]" />}
    <Icon size={18} className={cn("transition-transform group-hover:scale-110", active && "text-[#00ff9d]")} />
    <span className="font-display text-sm font-medium tracking-wide uppercase">{label}</span>
  </button>
);

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  trend?: string;
  status?: 'normal' | 'warning' | 'critical';
}

const StatCard = ({ label, value, unit, trend, status }: StatCardProps) => (
  <div className="glass p-4 border-l-2 border-l-[#00ff9d]/30">
    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{label}</div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-display font-bold tracking-tight">{value}</span>
      <span className="text-xs font-mono text-white/30">{unit}</span>
    </div>
    {trend && (
      <div className={cn("text-[10px] font-mono mt-2 flex items-center gap-1", trend.startsWith('+') ? "text-[#00ff9d]" : "text-[#ff4e00]")}>
        {trend.startsWith('+') ? <Zap size={10} /> : <AlertTriangle size={10} />}
        {trend}
      </div>
    )}
  </div>
);

interface SensorRowProps {
  sensor: typeof MOCK_SENSORS[0];
  key?: string | number;
}

const SensorRow = ({ sensor }: SensorRowProps) => (
  <div className="grid grid-cols-5 gap-4 p-3 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
    <div className="text-xs font-mono text-[#00ff9d]">{sensor.id}</div>
    <div className="text-xs font-medium">{sensor.type}</div>
    <div className="text-xs font-mono">{sensor.value} {sensor.unit}</div>
    <div className="text-xs text-white/50">{sensor.location}</div>
    <div className="flex justify-end">
      <span className={cn(
        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter",
        sensor.status === 'Normal' ? "bg-[#00ff9d]/10 text-[#00ff9d]" : "bg-[#ff4e00]/10 text-[#ff4e00]"
      )}>
        {sensor.status}
      </span>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'intro' | 'dashboard' | 'architecture' | 'rfp' | 'flow' | 'exports' | 'protocols'>('intro');
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [selectedLayer, setSelectedLayer] = useState(ARCHITECTURE_LAYERS[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [savedExports, setSavedExports] = useState<any[]>([]);

  const fetchExports = async () => {
    try {
      const response = await fetch('/api/exports');
      const data = await response.json();
      setSavedExports(data);
    } catch (error) {
      console.error("Failed to fetch exports", error);
    }
  };

  useEffect(() => {
    if (activeTab === 'exports') {
      fetchExports();
    }
  }, [activeTab]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const chartData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      time: i,
      value: 40 + Math.random() * 20 + (i > 15 ? 30 : 0),
      threshold: 75
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-[#00ff9d]/30 selection:text-[#00ff9d]">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 glass sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#00ff9d] rounded-sm flex items-center justify-center">
            <ShieldCheck className="text-black" size={20} />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight uppercase">Aegis <span className="text-[#00ff9d]/70 font-light">Mission Control</span></h1>
            <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">GCP Disaster Architecture Framework</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Active Region</div>
            <select 
              value={selectedRegion.id}
              onChange={(e) => {
                const region = REGIONS.find(r => r.id === e.target.value);
                if (region) setSelectedRegion(region);
              }}
              className="bg-white/5 border border-white/10 text-xs font-mono text-[#00ff9d] rounded px-2 py-1 outline-none focus:border-[#00ff9d]/50"
            >
              {REGIONS.map(region => (
                <option key={region.id} value={region.id} className="bg-[#080808] text-white">
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">System Status</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
              <span className="text-xs font-mono text-[#00ff9d]">Operational</span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Current Time</div>
            <div className="text-xs font-mono">{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 flex flex-col bg-[#080808]">
          <div className="p-6">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">Navigation</div>
            <nav className="space-y-1">
              <NavItem icon={Info} label="Overview" active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} />
              <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <NavItem icon={Layers} label="Architecture" active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')} />
              <NavItem icon={Network} label="Data Flow" active={activeTab === 'flow'} onClick={() => setActiveTab('flow')} />
              <NavItem icon={ShieldCheck} label="Emergency Protocols" active={activeTab === 'protocols'} onClick={() => setActiveTab('protocols')} />
              <NavItem icon={Database} label="Saved Exports" active={activeTab === 'exports'} onClick={() => setActiveTab('exports')} />
              <NavItem icon={FileText} label="RFP Document" active={activeTab === 'rfp'} onClick={() => setActiveTab('rfp')} />
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-white/5">
            <div className="glass p-4 rounded-lg border border-[#00ff9d]/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-[#ff4e00]" />
                <span className="text-[10px] font-mono text-[#ff4e00] uppercase tracking-widest">Active Alert</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">Flood risk detected in Sector 4. Autonomous agents standby.</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto grid-bg relative">
          <div className="scanline" />
          
          <AnimatePresence mode="wait">
            {activeTab === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-full flex flex-col"
              >
                {/* Hero Section */}
                <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center px-6 lg:px-12 py-20 overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent z-10" />
                    <img 
                      src="https://picsum.photos/seed/satellite-earth/1920/1080?blur=2" 
                      alt="Earth from Satellite" 
                      className="w-full h-full object-cover opacity-30"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="relative z-20 max-w-5xl w-full mx-auto">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-12 bg-[#00ff9d]" />
                        <span className="text-xs font-mono text-[#00ff9d] uppercase tracking-[0.4em]">Project Aegis</span>
                      </div>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.9] mb-8">
                        The Future of <br />
                        <span className="text-[#00ff9d]">Disaster Intelligence</span>
                      </h1>
                      <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10 font-light">
                        A high-availability, autonomous framework built on Google Cloud Platform to predict, monitor, and respond to global environmental crises with sub-second precision.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button 
                          onClick={() => setActiveTab('dashboard')}
                          className="px-8 py-4 bg-[#00ff9d] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#00ff9d]/80 transition-all flex items-center gap-3 group"
                        >
                          Launch Mission Control
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                          onClick={() => setActiveTab('architecture')}
                          className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                        >
                          Explore Architecture
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Core Pillars */}
                <section className="bg-[#080808]">
                  <div className="max-w-7xl mx-auto p-12 lg:p-20 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#00ff9d]/10 flex items-center justify-center text-[#00ff9d] mb-6">
                        <Zap size={24} />
                      </div>
                      <h3 className="text-xl font-display font-bold uppercase tracking-tight">Predictive Precision</h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        Leveraging Vertex AI and deep learning transformers to analyze petabytes of historical data, providing 94%+ accuracy in disaster forecasting.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#00ff9d]/10 flex items-center justify-center text-[#00ff9d] mb-6">
                        <Workflow size={24} />
                      </div>
                      <h3 className="text-xl font-display font-bold uppercase tracking-tight">Autonomous Response</h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        Agentic workflows powered by Gemini 1.5 Pro trigger immediate municipal protocols, rerouting resources and alerting citizens without human latency.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-[#00ff9d]/10 flex items-center justify-center text-[#00ff9d] mb-6">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="text-xl font-display font-bold uppercase tracking-tight">Global Resilience</h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        Multi-regional GCP deployment ensures 99.999% uptime, keeping the command center operational even during catastrophic infrastructure failures.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Vision Statement */}
                <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                  <h2 className="text-4xl font-display font-bold uppercase tracking-tighter mb-8 italic">
                    "Our mission is to reduce disaster response time from hours to milliseconds, saving lives through the power of planetary-scale intelligence."
                  </h2>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-8 bg-white/20" />
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Aegis Strategic Vision 2026</span>
                    <div className="h-px w-8 bg-white/20" />
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Real-time <span className="text-[#00ff9d]">Observability</span></h2>
                    <p className="text-white/50 text-sm mt-1">Live telemetry from global sensor networks and satellite feeds.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={async () => {
                        try {
                          const exportData = {
                            title: `Disaster Telemetry Export - ${new Date().toISOString()}`,
                            content: {
                              timestamp: new Date().toISOString(),
                              region: selectedRegion.name,
                              sensors: selectedRegion.sensors,
                              metrics: {
                                activeSensors: 12482,
                                confidence: 94.2,
                                throughput: 1.2
                              }
                            }
                          };

                          // 1. Save to Backend (Keep JSON for system storage)
                          const response = await fetch('/api/export', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(exportData)
                          });
                          const data = await response.json();

                          // 2. Convert to CSV for local download
                          const headers = ["ID", "Type", "Value", "Unit", "Status", "Location"];
                          const rows = selectedRegion.sensors.map(s => [
                            s.id,
                            s.type,
                            s.value,
                            s.unit,
                            s.status,
                            s.location
                          ]);
                          
                          const csvContent = [
                            headers.join(","),
                            ...rows.map(r => r.join(","))
                          ].join("\n");

                          // 3. Trigger Local Download (CSV)
                          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                          const url = window.URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = `aegis-telemetry-${new Date().getTime()}.csv`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          window.URL.revokeObjectURL(url);

                          if (data.success) {
                            alert(`Success: Data saved to system and downloaded as CSV to your device.`);
                          }
                        } catch (error) {
                          console.error("Export failed", error);
                          alert("Failed to export data.");
                        }
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-widest transition-colors"
                    >
                      Export Data
                    </button>
                    <button 
                      onClick={() => setActiveTab('protocols')}
                      className="px-4 py-2 bg-[#ff4e00] hover:bg-[#ff4e00]/80 text-white text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Emergency Protocol
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard label="Active Sensors" value="12,482" unit="units" trend="+124 today" />
                  <StatCard label="Prediction Confidence" value="94.2" unit="%" trend="+0.4%" />
                  <StatCard label="Data Throughput" value="1.2" unit="GB/s" trend="+15%" />
                  <StatCard label="Agent Response Time" value="420" unit="ms" trend="-12ms" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Chart */}
                  <div className="lg:col-span-2 glass p-6 border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Activity size={18} className="text-[#00ff9d]" />
                        <h3 className="font-display font-bold uppercase tracking-wider">Seismic Activity Feed</h3>
                      </div>
                      <div className="flex gap-4 text-[10px] font-mono">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#00ff9d]" /> Live Feed</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#ff4e00]" /> Threshold</div>
                      </div>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="time" hide />
                          <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#080808', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }}
                            itemStyle={{ color: '#00ff9d' }}
                          />
                          <Area type="monotone" dataKey="value" stroke="#00ff9d" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                          <Line type="monotone" dataKey="threshold" stroke="#ff4e00" strokeDasharray="5 5" dot={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Sensor List */}
                  <div className="glass border border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio size={16} className="text-[#00ff9d]" />
                        <h3 className="font-display font-bold uppercase tracking-wider text-sm">Critical Sensors</h3>
                      </div>
                      <span className="text-[10px] font-mono text-white/30">4 Active Warnings</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {selectedRegion.sensors.map(sensor => (
                        <SensorRow key={sensor.id} sensor={sensor} />
                      ))}
                    </div>
                    <button className="p-3 text-center text-[10px] font-mono text-white/30 hover:text-white transition-colors uppercase tracking-widest border-t border-white/10">View All Sensors</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 space-y-8"
              >
                <div className="max-w-5xl mx-auto">
                  <div className="mb-12 text-center">
                    <h2 className="text-4xl font-display font-bold tracking-tighter uppercase mb-2">System <span className="text-[#00ff9d]">Architecture</span></h2>
                    <p className="text-white/50 max-w-2xl mx-auto">A multi-layered, highly available framework built on Google Cloud Platform for mission-critical disaster management.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    {ARCHITECTURE_LAYERS.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => setSelectedLayer(layer)}
                        className={cn(
                          "p-6 text-left transition-all duration-300 border group relative overflow-hidden",
                          selectedLayer.id === layer.id 
                            ? "bg-[#00ff9d]/5 border-[#00ff9d] glow-accent" 
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        )}
                      >
                        <div className={cn(
                          "mb-4 p-3 inline-block rounded-lg transition-colors",
                          selectedLayer.id === layer.id ? "bg-[#00ff9d] text-black" : "bg-white/5 text-white/50 group-hover:text-white"
                        )}>
                          <layer.icon size={24} />
                        </div>
                        <h3 className="font-display font-bold uppercase tracking-wide mb-1">{layer.title}</h3>
                        <p className="text-[11px] text-white/50 line-clamp-2">{layer.description}</p>
                        {selectedLayer.id === layer.id && (
                          <motion.div layoutId="active-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#00ff9d]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedLayer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="glass p-8 border border-white/10"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-[#00ff9d]/10 text-[#00ff9d] rounded-lg">
                              <selectedLayer.icon size={32} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-display font-bold uppercase tracking-tight">{selectedLayer.title}</h3>
                              <p className="text-[#00ff9d] text-xs font-mono uppercase tracking-widest">Layer Specification v2.4</p>
                            </div>
                          </div>
                          
                          <p className="text-white/70 leading-relaxed mb-8">{selectedLayer.description}</p>

                          <div className="space-y-6">
                            <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] border-b border-white/10 pb-2">Core Technologies</h4>
                            <div className="space-y-4">
                              {selectedLayer.technologies.map((tech, idx) => (
                                <div key={idx} className="flex gap-4">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] mt-1.5 shrink-0" />
                                  <div>
                                    <div className="text-sm font-bold text-white">{tech.name}</div>
                                    <div className="text-xs text-white/50">{tech.role}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="bg-black/40 p-6 border border-white/5 rounded-xl">
                            <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Implementation Details</h4>
                            <ul className="space-y-4">
                              {selectedLayer.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-xs text-white/70 leading-relaxed">
                                  <ChevronRight size={14} className="text-[#00ff9d] mt-0.5 shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-6 border border-[#00ff9d]/20 bg-[#00ff9d]/5 rounded-xl">
                            <div className="flex items-center gap-2 mb-3">
                              <Zap size={16} className="text-[#00ff9d]" />
                              <span className="text-xs font-bold uppercase tracking-widest text-[#00ff9d]">Architectural Benefit</span>
                            </div>
                            <p className="text-xs text-white/80 italic leading-relaxed">
                              "This layer ensures 99.99% availability and horizontal scalability, allowing the system to ingest petabytes of satellite data without performance degradation."
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'flow' && (
              <motion.div
                key="flow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="p-8 flex items-center justify-center min-h-[calc(100vh-64px)]"
              >
                <div className="max-w-4xl w-full">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold tracking-tighter uppercase mb-2">Data <span className="text-[#00ff9d]">Lifecycle</span></h2>
                    <p className="text-white/50">End-to-end flow from raw telemetry to autonomous response.</p>
                  </div>

                  <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0 hidden md:block" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                      {DATA_FLOW_STEPS.map((step, idx) => (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex flex-col items-center text-center group"
                        >
                          <div className="w-16 h-16 rounded-full bg-[#080808] border border-white/10 flex items-center justify-center mb-4 group-hover:border-[#00ff9d] transition-colors relative">
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00ff9d] text-black text-[10px] font-bold flex items-center justify-center border-2 border-[#050505]">
                              {step.step}
                            </div>
                            {idx === 0 && <Satellite size={24} className="text-[#00ff9d]" />}
                            {idx === 1 && <RefreshCw size={24} className="text-[#00ff9d]" />}
                            {idx === 2 && <Database size={24} className="text-[#00ff9d]" />}
                            {idx === 3 && <Cpu size={24} className="text-[#00ff9d]" />}
                            {idx === 4 && <Zap size={24} className="text-[#00ff9d]" />}
                          </div>
                          <h4 className="font-display font-bold uppercase tracking-wider text-sm mb-1">{step.label}</h4>
                          <div className="text-[10px] font-mono text-[#00ff9d] uppercase mb-2">{step.service}</div>
                          <p className="text-[10px] text-white/40 leading-relaxed px-2">{step.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-24 glass p-8 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-xl font-display font-bold uppercase mb-4">MLOps Pipeline <span className="text-[#00ff9d]">(Vertex AI)</span></h3>
                        <div className="space-y-4">
                          {[
                            { label: 'Data Extraction', status: 'Completed' },
                            { label: 'Data Validation', status: 'Completed' },
                            { label: 'Model Training', status: 'In Progress', active: true },
                            { label: 'Model Evaluation', status: 'Pending' },
                            { label: 'Deployment', status: 'Pending' }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-2 h-2 rounded-full",
                                  item.status === 'Completed' ? "bg-[#00ff9d]" : item.active ? "bg-[#00ff9d] animate-pulse" : "bg-white/20"
                                )} />
                                <span className="text-xs font-medium">{item.label}</span>
                              </div>
                              <span className={cn(
                                "text-[10px] font-mono uppercase tracking-widest",
                                item.status === 'Completed' ? "text-[#00ff9d]" : item.active ? "text-[#00ff9d]" : "text-white/20"
                              )}>{item.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="p-6 bg-black/40 border border-white/5 rounded-xl">
                          <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Agentic Decision Logic</h4>
                          <div className="space-y-4 font-mono text-[11px] text-[#00ff9d]/70">
                            <div className="flex gap-2">
                              <span className="text-white/30">01</span>
                              <span>IF prediction_confidence {'>'} 0.85 AND impact_zone == 'URBAN'</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-white/30">02</span>
                              <span className="pl-4">THEN trigger_workflow('EVACUATION_PLAN_A')</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-white/30">03</span>
                              <span className="pl-4">AND notify_agency('NDMA')</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-white/30">04</span>
                              <span>ELSE monitor_and_alert('LOCAL_AUTHORITIES')</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-[#ff4e00]/5 border border-[#ff4e00]/20 rounded-xl">
                          <Info size={20} className="text-[#ff4e00]" />
                          <p className="text-[11px] text-white/70 italic">"Autonomous agents use Gemini 1.5 Pro for multi-modal reasoning, analyzing both sensor data and satellite imagery simultaneously."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'protocols' && (
              <motion.div
                key="protocols"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="p-8 space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Emergency <span className="text-[#ff4e00]">Protocols</span></h2>
                    <p className="text-white/50 text-sm mt-1">Standardized autonomous response workflows for mission-critical scenarios.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {EMERGENCY_PROTOCOLS.map((protocol) => (
                    <div key={protocol.id} className="glass p-6 border border-white/10 hover:border-[#ff4e00]/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest",
                          protocol.level === 'Critical' ? "bg-[#ff4e00]/20 text-[#ff4e00]" : 
                          protocol.level === 'High' ? "bg-yellow-500/20 text-yellow-500" : "bg-blue-500/20 text-blue-500"
                        )}>
                          {protocol.level}
                        </div>
                        <span className="text-[10px] font-mono text-white/30">{protocol.id}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold uppercase tracking-tight mb-2">{protocol.title}</h3>
                      <div className="text-[10px] font-mono text-[#ff4e00] uppercase tracking-widest mb-4">Trigger: {protocol.trigger}</div>
                      
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest border-b border-white/5 pb-1">Response Steps</h4>
                        {protocol.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-3 text-xs text-white/70 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4e00] mt-1.5 shrink-0" />
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass p-8 border border-[#ff4e00]/20 bg-[#ff4e00]/5 rounded-xl max-w-2xl mx-auto text-center">
                  <AlertTriangle size={32} className="text-[#ff4e00] mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold uppercase mb-2">Autonomous Override</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    Protocols are automatically triggered by the Agentic Decision Layer. Manual override requires Level-4 Government Authorization.
                  </p>
                  <button className="px-6 py-3 bg-[#ff4e00] hover:bg-[#ff4e00]/80 text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                    Request Manual Override
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'exports' && (
              <motion.div
                key="exports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-display font-bold tracking-tight uppercase">Saved <span className="text-[#00ff9d]">Documents</span></h2>
                    <p className="text-white/50 text-sm mt-1">Historical telemetry exports saved to the system database.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {savedExports.length === 0 ? (
                    <div className="glass p-12 text-center border border-white/10">
                      <Database className="mx-auto text-white/20 mb-4" size={48} />
                      <p className="text-white/40 font-mono text-sm">No documents found in system storage.</p>
                    </div>
                  ) : (
                    savedExports.map((exp) => (
                      <div key={exp.id} className="glass p-6 border border-white/10 hover:border-[#00ff9d]/30 transition-all group">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <FileText size={16} className="text-[#00ff9d]" />
                              <h3 className="font-display font-bold text-lg uppercase tracking-tight">{exp.title}</h3>
                            </div>
                            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                              Saved on: {new Date(exp.created_at).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors">
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                try {
                                  const parsed = JSON.parse(exp.content);
                                  const sensors = parsed.content.sensors || [];
                                  
                                  const headers = ["ID", "Type", "Value", "Unit", "Status", "Location"];
                                  const rows = sensors.map((s: any) => [
                                    s.id,
                                    s.type,
                                    s.value,
                                    s.unit,
                                    s.status,
                                    s.location
                                  ]);
                                  
                                  const csvContent = [
                                    headers.join(","),
                                    ...rows.map((r: any) => r.join(","))
                                  ].join("\n");

                                  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                  const url = window.URL.createObjectURL(blob);
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.download = `${exp.title.replace(/\s+/g, '-').toLowerCase()}.csv`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  window.URL.revokeObjectURL(url);
                                } catch (e) {
                                  console.error("Failed to parse export for CSV download", e);
                                  // Fallback to JSON if CSV conversion fails
                                  const blob = new Blob([exp.content], { type: 'application/json' });
                                  const url = window.URL.createObjectURL(blob);
                                  const link = document.createElement('a');
                                  link.href = url;
                                  link.download = `${exp.title.replace(/\s+/g, '-').toLowerCase()}.json`;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  window.URL.revokeObjectURL(url);
                                }
                              }}
                              className="p-2 bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 border border-[#00ff9d]/20 rounded transition-colors text-[#00ff9d]"
                              title="Download as CSV"
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-black/40 rounded border border-white/5">
                          <pre className="text-[10px] font-mono text-[#00ff9d]/70 overflow-x-auto">
                            {JSON.stringify(JSON.parse(exp.content), null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'rfp' && (
              <motion.div
                key="rfp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 max-w-4xl mx-auto"
              >
                <div className="bg-white text-black p-12 shadow-2xl space-y-12 font-serif">
                  <div className="border-b-4 border-black pb-8 flex justify-between items-start">
                    <div>
                      <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2">Technical Proposal</h2>
                      <p className="text-xl font-medium italic">AI Disaster Prediction & Autonomous Response System</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold uppercase tracking-widest">Document ID</div>
                      <div className="text-lg font-mono">GCP-AEGIS-2026-001</div>
                    </div>
                  </div>

                  <section className="space-y-6">
                    <h3 className="text-2xl font-bold uppercase border-b border-black/20 pb-2">1. Executive Summary</h3>
                    <p className="leading-relaxed text-lg">
                      The proposed system, <strong>Aegis</strong>, is a next-generation disaster management framework designed for the National Disaster Management Authority. Leveraging Google Cloud's Vertex AI and distributed data processing, Aegis provides real-time forecasting and autonomous response capabilities to mitigate the impact of floods, earthquakes, and cyclones.
                    </p>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-2xl font-bold uppercase border-b border-black/20 pb-2">2. Technology Justification</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg">Vertex AI</h4>
                        <p className="text-sm leading-relaxed">Vertex AI provides a unified platform for the entire ML lifecycle. Vertex AI Pipelines allow for reproducible, automated model retraining, ensuring that forecasting models adapt to changing climate patterns.</p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-lg">BigQuery & Dataflow</h4>
                        <p className="text-sm leading-relaxed">The combination of Dataflow for stream processing and BigQuery for serverless analytics enables the system to process petabytes of historical data alongside real-time sensor feeds with sub-second latency.</p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-2xl font-bold uppercase border-b border-black/20 pb-2">3. Disaster Recovery & Availability</h3>
                    <p className="leading-relaxed">
                      Aegis is deployed across multiple Google Cloud regions (e.g., us-central1, europe-west1, asia-east1) with active-active load balancing. In the event of a regional failure, Cloud DNS and Global Load Balancing automatically reroute traffic to the nearest healthy region, ensuring 99.999% system uptime during critical disaster events.
                    </p>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-2xl font-bold uppercase border-b border-black/20 pb-2">4. Cost Optimization Strategy</h3>
                    <ul className="list-disc pl-6 space-y-3 text-sm">
                      <li><strong>BigQuery Slot Reservations:</strong> Predictable pricing for large-scale analytical queries.</li>
                      <li><strong>Cloud Run Auto-scaling:</strong> Zero cost during idle periods; scales to thousands of instances during disasters.</li>
                      <li><strong>Storage Lifecycle Management:</strong> Automatically move older satellite imagery to Coldline/Archive storage classes.</li>
                      <li><strong>Preemptible VMs:</strong> Used for non-critical model training batches to reduce compute costs by up to 80%.</li>
                    </ul>
                  </section>

                  <div className="pt-12 border-t border-black/10 flex justify-between items-center italic text-sm text-black/50">
                    <span>Confidential - For Government Use Only</span>
                    <span>Page 1 of 42</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer / Status Bar */}
      <footer className="h-8 border-t border-white/10 bg-[#080808] flex items-center justify-between px-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" />
            <span>GCP Region: {selectedRegion.gcpRegion}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" />
            <span>Vertex AI: Connected</span>
          </div>
        </div>
        <div>
          &copy; 2026 Aegis Systems - National Disaster Management Authority
        </div>
      </footer>
    </div>
  );
}
