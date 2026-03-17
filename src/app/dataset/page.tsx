"use client";

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
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Database,
  ArrowRight,
  Layers,
  Scale,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import {
  classDistribution,
  featureImportance,
  transactionTimeline,
  smoteSteps,
} from "@/lib/data";

const pieDataBefore = [
  { name: "Legitimate", value: 99.83, color: "#3b82f6" },
  { name: "Fraudulent", value: 0.17, color: "#ef4444" },
];

const pieDataAfter = [
  { name: "Legitimate", value: 50, color: "#3b82f6" },
  { name: "Fraudulent", value: 50, color: "#22c55e" },
];

const datasetFeatures = [
  { name: "Time", type: "Float", desc: "Seconds elapsed from first transaction" },
  { name: "V1-V28", type: "Float", desc: "PCA-transformed anonymized features" },
  { name: "Amount", type: "Float", desc: "Transaction amount in dollars" },
  { name: "Class", type: "Integer", desc: "0 = Legitimate, 1 = Fraudulent" },
];

export default function DatasetPage() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          badge="Dataset"
          title="Data Analysis & SMOTE"
          subtitle="Exploring the credit card transaction dataset and how SMOTE addresses the extreme class imbalance problem."
        />

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <MetricCard label="Total Transactions" value={284807} suffix="" color="blue" icon={<Database className="w-5 h-5 text-blue-400" />} />
          <MetricCard label="Legitimate" value={284315} suffix="" color="green" />
          <MetricCard label="Fraudulent" value={492} suffix="" color="red" />
          <MetricCard label="Features" value={31} suffix="" color="purple" icon={<Layers className="w-5 h-5 text-purple-400" />} />
        </div>

        {/* Dataset Features Table */}
        <div className="glass rounded-xl p-6 mb-12">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Dataset Features
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {datasetFeatures.map((f) => (
                  <tr key={f.name} className="border-b border-white/5">
                    <td className="py-3 px-4 font-mono text-blue-400">{f.name}</td>
                    <td className="py-3 px-4 text-slate-300">{f.type}</td>
                    <td className="py-3 px-4 text-slate-400">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Class Imbalance - Before and After SMOTE */}
        <SectionHeader
          badge="SMOTE"
          title="Handling Class Imbalance"
          subtitle="The dataset has only 0.17% fraudulent transactions. SMOTE generates synthetic minority samples to balance the classes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Before SMOTE */}
          <div className="glass rounded-xl p-6 glow-red">
            <h3 className="font-semibold mb-2 text-center text-red-400">Before SMOTE</h3>
            <p className="text-xs text-slate-400 text-center mb-4">Severely Imbalanced</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieDataBefore}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieDataBefore.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center text-xs text-slate-400 mt-2">
              {classDistribution.before.legitimate.toLocaleString()} legit vs {classDistribution.before.fraudulent.toLocaleString()} fraud
            </div>
          </div>

          {/* After SMOTE */}
          <div className="glass rounded-xl p-6 glow-green">
            <h3 className="font-semibold mb-2 text-center text-green-400">After SMOTE</h3>
            <p className="text-xs text-slate-400 text-center mb-4">Balanced Dataset</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieDataAfter}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieDataAfter.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center text-xs text-slate-400 mt-2">
              {classDistribution.after.legitimate.toLocaleString()} legit vs {classDistribution.after.fraudulent.toLocaleString()} fraud
            </div>
          </div>
        </div>

        {/* SMOTE Steps */}
        <div className="glass rounded-xl p-6 mb-12">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            How SMOTE Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smoteSteps.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-white/5 rounded-xl p-5 h-full">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm mb-3">
                    {i + 1}
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-400">{s.description}</p>
                </div>
                {i < smoteSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-5 h-5 text-blue-400/50 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
            <p className="text-sm text-slate-400">
              <strong className="text-blue-400">Formula:</strong>{" "}
              x<sub>new</sub> = x<sub>i</sub> + &lambda; &times; (x<sub>nn</sub> - x<sub>i</sub>)
              &nbsp;&nbsp;where &lambda; &isin; [0, 1]
            </p>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">Top Feature Importance (XGBoost)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                <YAxis type="category" dataKey="feature" stroke="#94a3b8" fontSize={12} width={60} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">Transaction Timeline (by Hour)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={transactionTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} label={{ value: "Hour", position: "insideBottom", offset: -5, fill: "#94a3b8" }} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                />
                <Area type="monotone" dataKey="legit" name="Legitimate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Area type="monotone" dataKey="fraud" name="Fraudulent" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
