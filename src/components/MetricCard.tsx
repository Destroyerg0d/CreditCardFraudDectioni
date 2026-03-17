"use client";

import { useEffect, useState } from "react";

export default function MetricCard({
  label,
  value,
  suffix = "%",
  color = "blue",
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setDisplayed(Math.round(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    green: "from-green-500/20 to-green-600/5 border-green-500/20",
    purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
    amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    red: "from-red-500/20 to-red-600/5 border-red-500/20",
  };

  return (
    <div
      className={`rounded-xl p-6 bg-gradient-to-br ${colorMap[color] || colorMap.blue} border backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">{label}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold">
        {displayed}
        {suffix}
      </div>
    </div>
  );
}
