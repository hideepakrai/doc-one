"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

interface ChartProps {
  data?: any[];
  type?: "line" | "distribution";
}

const COLORS = ['#0f766e', '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1'];

const defaultLineData = [
  { date: "2026-04-01", count: 12 },
  { date: "2026-04-02", count: 18 },
  { date: "2026-04-03", count: 14 },
  { date: "2026-04-04", count: 22 },
];

const defaultDistributionData = [
  { name: "Booked", value: 18 },
  { name: "Completed", value: 14 },
  { name: "Cancelled", value: 3 },
];

export default function DashboardChart({ data, type = "line" }: ChartProps) {
  const chartData = data ?? (type === "line" ? defaultLineData : defaultDistributionData);

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }} 
            dy={10}
            tickFormatter={(val) => val.split('-').slice(1).join('/')}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }} 
          />
          <Tooltip 
            contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '12px'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#0f766e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorCount)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          animationDuration={1500}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
            contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                fontSize: '12px'
            }} 
        />
        <Legend verticalAlign="bottom" height={36}/>
      </PieChart>
    </ResponsiveContainer>
  );
}
