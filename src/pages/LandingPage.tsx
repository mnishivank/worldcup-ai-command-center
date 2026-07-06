import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Bot, Map, Activity, Shield, Users, Leaf, Globe2 } from 'lucide-react';

const FEATURES = [
  {
    title: 'AI Fan Assistant',
    description: 'Multilingual GenAI support for instant match schedules and localized stadium FAQs.',
    icon: Bot,
    path: '/assistant',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Smart Navigation',
    description: 'Real-time routing with accessibility options and predicted congestion avoidance.',
    icon: Map,
    path: '/navigation',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Crowd Intelligence',
    description: 'Heatmaps and predictive density metrics for safe and smooth operations.',
    icon: Activity,
    path: '/crowd',
    color: 'from-orange-500 to-amber-500'
  },
  {
    title: 'Operations Command',
    description: 'Unified dashboard with real-time alerts and AI-generated situation summaries.',
    icon: Shield,
    path: '/command',
    color: 'from-rose-500 to-red-500'
  },
  {
    title: 'Sustainability Metrics',
    description: 'Live tracking of energy, water, and waste to ensure an eco-friendly tournament.',
    icon: Leaf,
    path: '/sustainability',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    title: 'Staff Portal',
    description: 'Task management and instant incident reporting for all stadium volunteers.',
    icon: Users,
    path: '/staff',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function LandingPage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-32 sm:pt-32 flex flex-col items-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-sm font-medium text-rose-200 mb-8 border border-rose-500/20">
            <Globe2 className="w-4 h-4" />
            FIFA World Cup 2026 | Next-Gen Operations
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
            The Stadium of the <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">Future</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Elevate the tournament experience with our AI-powered command center. 
            Real-time intelligence, seamless navigation, and predictive operations for fans, staff, and organizers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/command" className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold flex items-center gap-2 hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-900/20 w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
              Enter Command Center <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link to="/assistant" className="px-8 py-4 rounded-xl glass-panel text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all w-full sm:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
              Try AI Assistant <Bot className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Integrated Subsystems</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive suite of tools designed to handle the scale and complexity of the world's largest sporting event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={feature.path} className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-2xl">
                <div className="glass-panel p-8 rounded-2xl h-full hover:bg-white/[0.08] transition-colors border border-white/5 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-slate-200 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 border-t border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Stadiums Integrated', value: '16' },
              { label: 'Live Data Points/s', value: '1.2M' },
              { label: 'AI Interactions', value: '5M+' },
              { label: 'Carbon Offset', value: '45%' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
