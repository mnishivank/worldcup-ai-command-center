import { useEffect, useState } from 'react';
import { Activity, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';

export default function CrowdDashboard() {
  const [data, setData] = useState<any[]>([]);
  const { token, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!token || authLoading) return;
    
    // Fetch mock data from our Express server
    fetch('/api/analytics/crowd', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(d => {
        if (d.data) {
          setData(d.data);
        } else {
          console.error("Failed to load data:", d);
        }
      })
      .catch(console.error);
  }, [token, authLoading]);

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Activity className="text-amber-400" /> Crowd Intelligence
        </h1>
        <p className="text-slate-400">Live density mapping and predictive movement analytics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Occupancy', value: '45,231', trend: '+12%', icon: Users, color: 'text-blue-400' },
          { label: 'Peak Density Zone', value: 'Gate C', sub: '92% Capacity', icon: AlertCircle, color: 'text-rose-400' },
          { label: 'Avg Entry Rate', value: '340/min', trend: '+5%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Predicted Peak', value: '18:30', sub: 'Pre-match rush', icon: Activity, color: 'text-amber-400' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-2xl border border-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              {kpi.trend && (
                <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {kpi.trend}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold mb-1">{kpi.value}</h3>
            <p className="text-sm text-slate-400">{kpi.label}</p>
            {kpi.sub && <p className="text-xs text-slate-500 mt-1">{kpi.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Charts & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Live Gate Flow Rates</h3>
          <div className="flex-1 min-h-0">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="time" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="Gate A" stroke="#3b82f6" fillOpacity={1} fill="url(#colorA)" />
                  <Area type="monotone" dataKey="Gate C" stroke="#f43f5e" fillOpacity={1} fill="url(#colorC)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">Loading data...</div>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" /> AI Insights
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
              <h4 className="font-semibold text-rose-300 text-sm mb-1">Critical Action Needed</h4>
              <p className="text-xs text-rose-200/70 leading-relaxed">
                Gate C density approaching critical threshold (92%). Recommend redirecting incoming traffic from Metro Station North to Gate A.
              </p>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
              <h4 className="font-semibold text-amber-300 text-sm mb-1">Predictive Warning</h4>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Concourse Level 2 East will experience severe congestion in 15 mins due to Halftime break. Dispatch additional stewards to block E4.
              </p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-300 text-sm mb-1">Optimization</h4>
              <p className="text-xs text-blue-200/70 leading-relaxed">
                Merchandise stores 1 and 3 are underutilized. Consider sending a push notification to users in Zone West about short wait times.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
