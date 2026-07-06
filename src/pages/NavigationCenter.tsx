import { useState } from 'react';
import { Map as MapIcon, Navigation2, Clock, AlertTriangle, Accessibility, Loader2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import toast from 'react-hot-toast';

export default function NavigationCenter() {
  const [activeTab, setActiveTab] = useState<'map' | 'routes'>('map');
  const [isGenerating, setIsGenerating] = useState(false);
  const [routeGenerated, setRouteGenerated] = useState(false);
  const [startLocation, setStartLocation] = useState('North Entrance (Gate A)');
  const [endLocation, setEndLocation] = useState('Section 120, Row G');
  const [requireAccessible, setRequireAccessible] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const handleGenerateRoute = () => {
    setIsGenerating(true);
    // Simulate API call for route generation
    setTimeout(() => {
      setIsGenerating(false);
      setRouteGenerated(true);
      toast.success('Optimal route generated successfully!');
      setActiveTab('map'); // Switch to map view to show the generated route
    }, 1500);
  };

  const handleMarkerClick = (id: string, name: string) => {
    setActiveMarker(id);
    toast.success(`Selected: ${name}`, { id: 'marker-toast' });
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 h-[calc(100vh-4rem)]">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapIcon className="text-emerald-400" /> Smart Navigation
          </h1>
          <p className="text-slate-400 text-sm">Real-time stadium routing and congestion awareness</p>
        </div>
        <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5" role="tablist" aria-label="Navigation modes">
          <button
            role="tab"
            aria-selected={activeTab === 'map'}
            onClick={() => setActiveTab('map')}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              activeTab === 'map' ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Interactive Map
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'routes'}
            onClick={() => setActiveTab('routes')}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              activeTab === 'routes' ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            Route Planner
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* Sidebar */}
        <div className={cn("lg:col-span-1 flex-col gap-4 overflow-y-auto pr-2", activeTab === 'routes' ? "flex" : "hidden lg:flex")}>
          
          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Navigation2 className="w-5 h-5 text-blue-400" />
              Find Your Way
            </h3>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="start-location" className="text-xs text-slate-400 mb-1 block">Current Location</label>
                <select id="start-location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all">
                  <option>North Entrance (Gate A)</option>
                  <option>South Plaza</option>
                  <option>Parking Lot C</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="end-location" className="text-xs text-slate-400 mb-1 block">Destination</label>
                <select id="end-location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 transition-all">
                  <option>Section 120, Row G</option>
                  <option>VIP Lounge</option>
                  <option>Merchandise Store East</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="accessible" checked={requireAccessible} onChange={(e) => setRequireAccessible(e.target.checked)} className="rounded border-white/20 bg-black/40 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                <label htmlFor="accessible" className="text-sm text-slate-300 flex items-center gap-1.5 cursor-pointer">
                  <Accessibility className="w-4 h-4" aria-hidden="true" /> Require Accessible Route
                </label>
              </div>

              <button 
                onClick={handleGenerateRoute}
                disabled={isGenerating}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing Density...
                  </>
                ) : (
                  'Generate Route'
                )}
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
        <div className={cn("lg:col-span-3 glass-panel rounded-2xl border border-white/10 overflow-hidden relative min-h-[400px]", activeTab === 'map' ? "block" : "hidden lg:block")}>
          <APIProvider apiKey={(import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || "dummy_key_for_demo"}>
            <Map
              defaultCenter={{lat: 40.8296, lng: -74.0816}} // MetLife Stadium approx
              defaultZoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId="DEMO_MAP_ID"
            >
              <AdvancedMarker position={{lat: 40.8300, lng: -74.0810}} onClick={() => handleMarkerClick('gate-a', 'North Entrance (Gate A)')}>
                <Pin background={activeMarker === 'gate-a' ? '#34d399' : '#0f172a'} borderColor="#10b981" glyphColor="#fff" />
              </AdvancedMarker>
              <AdvancedMarker position={{lat: 40.8290, lng: -74.0820}} onClick={() => handleMarkerClick('sec-120', 'Section 120, Row G')}>
                <Pin background={activeMarker === 'sec-120' ? '#34d399' : '#0f172a'} borderColor="#10b981" glyphColor="#fff" />
              </AdvancedMarker>
            </Map>
          </APIProvider>

          <AnimatePresence>
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10"
              >
                <div className="bg-slate-900/90 border border-emerald-500/30 p-6 rounded-2xl flex flex-col items-center shadow-2xl">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
                  <div className="text-white font-medium mb-1">Generating Route</div>
                  <div className="text-slate-400 text-sm">Analyzing live crowd density...</div>
                  
                  {/* Skeleton for loading */}
                  <div className="w-48 space-y-2 mt-4 relative overflow-hidden">
                    <div className="h-2 bg-slate-700/50 rounded overflow-hidden relative w-full">
                       <motion.div 
                         className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                         animate={{ x: ['-100%', '100%'] }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                       />
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded overflow-hidden relative w-3/4 mx-auto">
                       <motion.div 
                         className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                         animate={{ x: ['-100%', '100%'] }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
                       />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {routeGenerated && (
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-emerald-500/30 flex items-center gap-4 pointer-events-auto shadow-2xl shadow-emerald-900/20">
                <div className="text-center px-2">
                  <div className="text-2xl font-bold text-white">8<span className="text-sm font-normal text-emerald-400">min</span></div>
                  <div className="text-[10px] text-slate-400 uppercase">Est. Walk</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center px-2">
                  <div className="text-lg font-bold text-white">Gate A</div>
                  <div className="text-[10px] text-emerald-400 uppercase">Recommended (Lowest Traffic)</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
