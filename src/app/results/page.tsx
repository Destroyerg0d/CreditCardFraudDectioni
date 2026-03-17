"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Trophy, Target, TrendingUp, Award } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import MetricCard from "@/components/MetricCard";
import { rocData, confusionMatrices, modelPerformance } from "@/lib/data";

function ConfusionMatrix({
  name,
  data,
  color,
}: {
  name: string;
  data: { tp: number; tn: number; fp: number; fn: number };
  color: string;
}) {
  return (
    <div className="glass rounded-xl p-5">
      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        {name}
      </h4>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="bg-green-500/15 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-400">True Neg</div>
          <div className="text-lg font-bold text-green-400">{data.tn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        </div>
        <div className="bg-red-500/15 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-400">False Pos</div>
          <div className="text-lg font-bold text-red-400">{data.fp}</div>
        </div>
        <div className="bg-red-500/15 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-400">False Neg</div>
          <div className="text-lg font-bold text-red-400">{data.fn}</div>
        </div>
        <div className="bg-green-500/15 rounded-lg p-3 text-center">
          <div className="text-xs text-slate-400">True Pos</div>
          <div className="text-lg font-bold text-green-400">{data.tp}</div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const xgb = modelPerformance.xgboost;

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          badge="Results"
          title="Performance Analysis"
          subtitle="Comprehensive evaluation of all four ML models on fraud detection metrics."
        />

        {/* Winner Banner */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-12 glow-blue relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-10 h-10 text-amber-400" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-amber-400 font-medium mb-1">Best Performing Model</p>
              <h3 className="text-2xl font-bold mb-2">XGBoost</h3>
              <p className="text-sm text-slate-400">
                XGBoost achieved the highest performance across all metrics with 98% precision,
                96% recall, 97% F1-score, and 99% ROC-AUC.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="text-center px-4 py-2 rounded-lg bg-amber-500/10">
                <div className="text-2xl font-bold text-amber-400">98%</div>
                <div className="text-xs text-slate-400">Precision</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-amber-500/10">
                <div className="text-2xl font-bold text-amber-400">96%</div>
                <div className="text-xs text-slate-400">Recall</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-amber-500/10">
                <div className="text-2xl font-bold text-amber-400">97%</div>
                <div className="text-xs text-slate-400">F1-Score</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg bg-amber-500/10">
                <div className="text-2xl font-bold text-amber-400">99%</div>
                <div className="text-xs text-slate-400">ROC-AUC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <MetricCard label="Best Precision" value={98} color="blue" icon={<Target className="w-5 h-5 text-blue-400" />} />
          <MetricCard label="Best Recall" value={96} color="green" icon={<TrendingUp className="w-5 h-5 text-green-400" />} />
          <MetricCard label="Best F1-Score" value={97} color="purple" icon={<Award className="w-5 h-5 text-purple-400" />} />
          <MetricCard label="Best ROC-AUC" value={99} color="amber" icon={<Trophy className="w-5 h-5 text-amber-400" />} />
        </div>

        {/* ROC Curve */}
        <div className="glass rounded-xl p-6 mb-12">
          <h3 className="font-semibold text-lg mb-4">ROC Curves</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="fpr"
                stroke="#94a3b8"
                fontSize={12}
                label={{ value: "False Positive Rate", position: "insideBottom", offset: -5, fill: "#94a3b8" }}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                label={{ value: "True Positive Rate", angle: -90, position: "insideLeft", fill: "#94a3b8" }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
              />
              <Legend />
              <Line type="monotone" dataKey="tpr_lr" name="Logistic Regression (0.97)" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="tpr_svm" name="SVM (0.98)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="tpr_rf" name="Random Forest (0.99)" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="tpr_xgb" name="XGBoost (0.99)" stroke="#f59e0b" strokeWidth={3} dot={false} />
              {/* Diagonal reference */}
              <Line
                type="linear"
                dataKey="fpr"
                name="Random (0.50)"
                stroke="#475569"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Confusion Matrices */}
        <SectionHeader title="Confusion Matrices" subtitle="Detailed classification results for each model." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <ConfusionMatrix name="Logistic Regression" data={confusionMatrices.logisticRegression} color="#3b82f6" />
          <ConfusionMatrix name="SVM" data={confusionMatrices.svm} color="#8b5cf6" />
          <ConfusionMatrix name="Random Forest" data={confusionMatrices.randomForest} color="#22c55e" />
          <ConfusionMatrix name="XGBoost" data={confusionMatrices.xgboost} color="#f59e0b" />
        </div>

        {/* Key Findings */}
        <div className="glass rounded-xl p-6 sm:p-8">
          <h3 className="font-semibold text-lg mb-6">Key Findings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "SMOTE Significantly Improves Detection",
                desc: "Applying SMOTE to balance the dataset dramatically improved recall across all models, especially for ensemble methods.",
              },
              {
                title: "Ensemble Models Outperform Others",
                desc: "Random Forest and XGBoost consistently outperformed Logistic Regression and SVM across all evaluation metrics.",
              },
              {
                title: "XGBoost Is the Best Model",
                desc: "XGBoost achieved the highest precision (98%), recall (96%), F1-score (97%), and ROC-AUC (99%).",
              },
              {
                title: "V14 Is the Most Important Feature",
                desc: "Feature importance analysis shows V14, V4, and V12 as the top predictors of fraudulent transactions.",
              },
            ].map((finding, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5">
                <h4 className="font-semibold text-sm mb-2 text-blue-400">{finding.title}</h4>
                <p className="text-sm text-slate-400">{finding.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
