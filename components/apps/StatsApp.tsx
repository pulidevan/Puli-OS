import React from 'react';
import { TrendingUp, Users, Globe, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Q1', val: 4000 },
  { name: 'Q2', val: 3000 },
  { name: 'Q3', val: 2000 },
  { name: 'Q4', val: 2780 },
  { name: 'Q5', val: 1890 },
  { name: 'Q6', val: 2390 },
];

export const StatsApp: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#E0F7FA] p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase">Trained</span>
                <Users size={20} />
            </div>
            <div>
                <span className="text-4xl font-bold block">2,000+</span>
                <span className="text-xs text-gray-600">Students & Pros</span>
            </div>
        </div>
        <div className="bg-[#FFF9C4] p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase">Impact</span>
                <TrendingUp size={20} />
            </div>
            <div>
                <span className="text-4xl font-bold block">12 Cr+</span>
                <span className="text-xs text-gray-600">Revenue Generated</span>
            </div>
        </div>
        <div className="bg-[#E1BEE7] p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase">Reach</span>
                <Globe size={20} />
            </div>
            <div>
                <span className="text-4xl font-bold block">60M+</span>
                <span className="text-xs text-gray-600">Impressions</span>
            </div>
        </div>
      </div>

      <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-sm font-bold uppercase mb-4 flex items-center gap-2">
            <Eye size={16} />
            Engagement Metrics (Simulation)
        </h3>
        <div className="h-48 w-full bg-black/5 border border-black p-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" tick={{fontSize: 10, fontFamily: 'Space Mono'}} stroke="#000" />
                    <YAxis tick={{fontSize: 10, fontFamily: 'Space Mono'}} stroke="#000" />
                    <Tooltip 
                        contentStyle={{ 
                            background: '#fff', 
                            border: '2px solid black', 
                            fontFamily: 'Space Mono',
                            fontSize: '12px',
                            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                        }} 
                        cursor={{fill: 'rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="val">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#666'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
