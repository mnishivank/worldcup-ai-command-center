import React, { useState } from 'react';
import { Users, CheckCircle2, Circle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function StaffPortal() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Incident report submitted to Command Center');
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Users className="text-indigo-400" /> Volunteer & Staff Portal
        </h1>
        <p className="text-slate-400">Manage tasks, schedules, and report incidents directly from the field.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Task List */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <h3 className="font-semibold text-lg mb-6 flex justify-between items-center">
            My Tasks
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full border border-indigo-500/30">
              3 Pending
            </span>
          </h3>
          
          <div className="space-y-3">
            {[
              { title: 'Restock Merchandise East', time: '14:00', status: 'pending' },
              { title: 'Crowd Control Gate B', time: '15:30', status: 'pending' },
              { title: 'Assist ADA Patron Section 112', time: 'Immediately', status: 'urgent' },
              { title: 'Morning Briefing', time: '09:00', status: 'done' },
            ].map((task, i) => (
              <div key={i} className={`p-4 rounded-xl border ${
                task.status === 'urgent' ? 'bg-rose-500/10 border-rose-500/30' :
                task.status === 'done' ? 'bg-white/5 border-white/5 opacity-50' : 'bg-indigo-500/10 border-indigo-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {task.status === 'done' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-400" />}
                    <span className={`font-medium ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> {task.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Report */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col">
          <h3 className="font-semibold text-lg mb-6">Report Incident</h3>
          <form onSubmit={handleSubmitReport} className="flex-1 flex flex-col gap-4">
            <div>
              <label htmlFor="incident-type" className="text-sm font-medium text-slate-400 mb-1 block">Incident Type</label>
              <select id="incident-type" required className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50">
                <option>Medical Issue</option>
                <option>Security Concern</option>
                <option>Facility Maintenance</option>
                <option>Crowd Control Needed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="incident-location" className="text-sm font-medium text-slate-400 mb-1 block">Location / Zone</label>
              <input id="incident-location" required type="text" placeholder="e.g. Gate C, Level 2" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50" />
            </div>

            <div>
              <label htmlFor="incident-desc" className="text-sm font-medium text-slate-400 mb-1 block">Description</label>
              <textarea id="incident-desc" required rows={4} placeholder="Briefly describe the situation..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-auto w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report to Command'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
