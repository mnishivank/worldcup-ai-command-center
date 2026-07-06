import { useEffect, useState } from 'react';
import { Leaf, Droplets, Zap, Recycle } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function SustainabilityDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics/sustainability')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  const COLORS = ['#10b981', '#f59e0b', '#64748b'];

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Leaf className="text-teal-400" /> Sustainability
        </h1>
        <p className="text-slate-400">Tracking resource consumption and carbon footprint in real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Energy Usage', value: '42.5 MWh', target: 'Target: <50', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { label: 'Water Saved', value: '120k Gal', target: 'Recycled Greywater', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Waste Diversion', value: '78%', target: 'Target: 85%', icon: Recycle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-6"
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-xs text-slate-500">{stat.target}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 h-[350px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Weekly Energy Profile</h3>
          <div className="flex-1 min-h-0">
            {data?.energy ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.energy} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">Loading data...</div>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 h-[350px] flex flex-col">
          <h3 className="text-lg font-semibold mb-6">Waste Distribution</h3>
          <div className="flex-1 min-h-0 relative">
            {data?.waste ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.waste}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.waste.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">Loading data...</div>
            )}
            
            {/* Custom Legend */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-4">
              {data?.waste?.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-slate-300">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
