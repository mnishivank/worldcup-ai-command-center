import { useState } from 'react';
import { Map, Navigation2, Clock, AlertTriangle, Accessibility } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function NavigationCenter() {
  const [activeTab, setActiveTab] = useState<'map' | 'routes'>('map');

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 h-[calc(100vh-4rem)]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="text-emerald-400" /> Smart Navigation
          </h1>
          <p className="text-slate-400 text-sm">Real-time stadium routing and congestion awareness</p>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('map')}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              activeTab === 'map' ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Interactive Map
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
              activeTab === 'routes' ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Route Planner
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
          
          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Navigation2 className="w-5 h-5 text-blue-400" />
              Find Your Way
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Current Location</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50">
                  <option>North Entrance (Gate A)</option>
                  <option>South Plaza</option>
                  <option>Parking Lot C</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Destination</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50">
                  <option>Section 120, Row G</option>
                  <option>VIP Lounge</option>
                  <option>Merchandise Store East</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="accessible" className="rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-emerald-500/20" />
                <label htmlFor="accessible" className="text-sm text-slate-300 flex items-center gap-1.5">
                  <Accessibility className="w-4 h-4" /> Require Accessible Route
                </label>
              </div>

              <button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Generate Route
              </button>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4 flex-1">
            <h3 className="font-semibold flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-4 h-4" /> Live Congestion
            </h3>
            
            <div className="space-y-3">
              {[
                { area: 'Gate B Security', status: 'High Traffic', delay: '+15 mins', color: 'text-red-400' },
                { area: 'East Concourse', status: 'Moderate', delay: '+5 mins', color: 'text-amber-400' },
                { area: 'South Plaza', status: 'Clear', delay: 'No delay', color: 'text-emerald-400' },
              ].map((alert, i) => (
                <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm">{alert.area}</span>
                    <span className={cn("text-xs font-semibold", alert.color)}>{alert.status}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> {alert.delay}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-white/10 overflow-hidden relative min-h-[400px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-900/80">
            <Map className="w-16 h-16 text-emerald-500/30 mb-4" />
            <h2 className="text-xl font-bold mb-2">Interactive Map Loading...</h2>
            <p className="text-slate-400 text-sm max-w-md">
              In a production environment, this would initialize the Google Maps Platform SDK with 
              AdvancedMarkers, indoor floor plans, and real-time polylines for routing.
            </p>
            
            {/* Simulated UI Overlay over Map */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4 pointer-events-auto">
                <div className="text-center px-2">
                  <div className="text-2xl font-bold text-white">8<span className="text-sm font-normal text-slate-400">min</span></div>
                  <div className="text-[10px] text-slate-400 uppercase">Est. Walk</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center px-2">
                  <div className="text-lg font-bold text-white">Gate A</div>
                  <div className="text-[10px] text-slate-400 uppercase">Recommended</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
