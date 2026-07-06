import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function CommandCenter() {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecuteAI = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      toast.success('AI recommendations executed across all subsystems.');
    }, 1500);
  };

  const handleAssignTeam = (title: string) => {
    toast.success(`Team assigned to: ${title}`);
  };

  const handleViewCamera = (title: string) => {
    toast('Camera feed not available in demo environment.', { icon: '📹' });
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto bg-red-950/20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2 text-rose-100">
          <ShieldAlert className="text-rose-500" /> Operations Command Center
        </h1>
        <p className="text-rose-200/60">Unified operational overview for incident management and AI tactical response.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Incidents */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg text-rose-100">Active Incidents</h3>
          
          {[
            { level: 'Critical', title: 'Medical Emergency at Sector 4', time: '2 mins ago', icon: AlertTriangle, color: 'text-red-400 bg-red-400/10 border-red-400/20' },
            { level: 'Warning', title: 'Suspicious Package near Gate A', time: '15 mins ago', icon: Zap, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
            { level: 'Resolved', title: 'Turnstile Malfunction Gate C', time: '1 hr ago', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' }
          ].map((incident, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${incident.color} flex items-start gap-4`}
            >
              <div className="p-2 bg-black/20 rounded-lg shrink-0">
                <incident.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm mb-1">{incident.title}</h4>
                  <span className="text-xs opacity-70">{incident.time}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleAssignTeam(incident.title)} className="text-xs bg-black/20 hover:bg-black/40 px-3 py-1 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white">Assign Team</button>
                  <button onClick={() => handleViewCamera(incident.title)} className="text-xs bg-black/20 hover:bg-black/40 px-3 py-1 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white">View Camera</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Tactical Copilot */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl border border-rose-500/20 h-full flex flex-col bg-slate-900/80">
            <h3 className="font-semibold text-lg mb-4 text-rose-200">AI Tactical Summary</h3>
            <div className="flex-1 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                Based on current metrics, the stadium is operating at <strong>Security Level 2 (Elevated)</strong>. 
                The medical incident in Sector 4 requires 2 additional paramedics. 
              </p>
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Recommended Actions</h4>
                <ul className="text-sm text-slate-300 space-y-2 list-disc pl-4">
                  <li>Dispatch Med-Team Alpha to Sector 4.</li>
                  <li>Hold incoming traffic at Gate B temporarily to clear emergency path.</li>
                  <li>Notify local authorities regarding Gate A package.</li>
                </ul>
              </div>
              <button 
                onClick={handleExecuteAI}
                disabled={isExecuting}
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors mt-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {isExecuting ? 'Transmitting Directives...' : 'Execute AI Recommendations'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
