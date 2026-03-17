"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Brain, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { modelPerformance, comparisonData } from "@/lib/data";

const models = Object.values(modelPerformance);

const radarData = [
  { metric: "Precision", lr: 93, svm: 95, rf: 97, xgb: 98 },
  { metric: "Recall", lr: 91, svm: 93, rf: 95, xgb: 96 },
  { metric: "F1-Score", lr: 92, svm: 94, rf: 96, xgb: 97 },
  { metric: "ROC-AUC", lr: 97, svm: 98, rf: 99, xgb: 99 },
];

export default function ModelsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          badge="Machine Learning"
          title="Model Comparison"
          subtitle="Four supervised learning algorithms trained and evaluated on SMOTE-balanced credit card transaction data."
        />

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {models.map((m) => (
            <div
              key={m.name}
              className="glass rounded-xl overflow-hidden transition-all hover:border-blue-500/20"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpanded(expanded === m.name ? null : m.name)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${m.color}20` }}
                    >
                      <Brain className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{m.name}</h3>
                      <p className="text-xs text-slate-400">{m.description}</p>
                    </div>
                  </div>
                  {expanded === m.name ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Metric bars */}
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["Precision", m.precision],
                      ["Recall", m.recall],
                      ["F1-Score", m.f1Score],
                      ["ROC-AUC", m.rocAuc],
                    ] as const
                  ).map(([label, val]) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{label}</span>
                        <span className="font-mono">{(val * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${val * 100}%`,
                            backgroundColor: m.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {expanded === m.name && (
                <div className="px-6 pb-6 border-t border-white/5 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Advantages
                      </h4>
                      <ul className="space-y-1">
                        {m.pros.map((p) => (
                          <li key={p} className="text-xs text-slate-400 flex items-start gap-1.5">
                            <span className="text-green-400 mt-0.5">+</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" /> Limitations
                      </h4>
                      <ul className="space-y-1">
                        {m.cons.map((c) => (
                          <li key={c} className="text-xs text-slate-400 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">-</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Charts */}
        <SectionHeader
          badge="Visualization"
          title="Performance Charts"
          subtitle="Visual comparison of all four models across key metrics."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">Metric Comparison</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="metric" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0.85, 1]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Legend />
                <Bar dataKey="lr" name="Logistic Regression" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="svm" name="SVM" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rf" name="Random Forest" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="xgb" name="XGBoost" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-4">Model Radar</h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={12} />
                <PolarRadiusAxis stroke="#334155" domain={[85, 100]} fontSize={10} />
                <Radar name="Logistic Regression" dataKey="lr" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Radar name="SVM" dataKey="svm" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                <Radar name="Random Forest" dataKey="rf" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} />
                <Radar name="XGBoost" dataKey="xgb" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Table */}
        <div className="glass rounded-xl p-6 mt-8 overflow-x-auto">
          <h3 className="font-semibold mb-4">Performance Summary</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Model</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">Precision</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">Recall</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">F1-Score</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">ROC-AUC</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-medium flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                    {m.name}
                  </td>
                  <td className="text-center py-3 px-4">{(m.precision * 100).toFixed(0)}%</td>
                  <td className="text-center py-3 px-4">{(m.recall * 100).toFixed(0)}%</td>
                  <td className="text-center py-3 px-4">{(m.f1Score * 100).toFixed(0)}%</td>
                  <td className="text-center py-3 px-4">{(m.rocAuc * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
