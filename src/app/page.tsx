"use client";

import Link from "next/link";
import {
  Shield,
  Brain,
  BarChart3,
  Database,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Lock,
  ChevronRight,
} from "lucide-react";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "4 ML Algorithms",
    desc: "Logistic Regression, SVM, Random Forest, and XGBoost trained and compared.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "SMOTE Balancing",
    desc: "Synthetic oversampling to handle extreme class imbalance (0.17% fraud rate).",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "99% ROC-AUC",
    desc: "XGBoost achieves near-perfect fraud detection with minimal false positives.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "98% Precision",
    desc: "Highest precision among models, reducing false fraud alerts.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "96% Recall",
    desc: "Captures the vast majority of actual fraudulent transactions.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "PCA-Anonymized",
    desc: "28 anonymized features via PCA for privacy-preserving analysis.",
  },
];

const workflow = [
  { step: "01", title: "Data Collection", desc: "284,807 transactions loaded" },
  { step: "02", title: "Preprocessing", desc: "Feature scaling & normalization" },
  { step: "03", title: "SMOTE Balancing", desc: "Synthetic minority oversampling" },
  { step: "04", title: "Model Training", desc: "4 ML algorithms trained" },
  { step: "05", title: "Evaluation", desc: "Precision, Recall, F1, ROC-AUC" },
  { step: "06", title: "Best Model", desc: "XGBoost selected as winner" },
];

export default function Home() {
  return (
    <div className="grid-bg">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              B.Tech Major Project | Shreyansh Srivastava
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Credit Card{" "}
              <span className="gradient-text">Fraud Detection</span>
              <br />
              Using Machine Learning
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Detecting fraudulent transactions in imbalanced datasets using
              SMOTE and ensemble learning. Achieving 99% ROC-AUC with XGBoost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Try Fraud Detection Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/results"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10"
              >
                View Results
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            <MetricCard label="Transactions" value={284807} suffix="" color="blue" />
            <MetricCard label="Best ROC-AUC" value={99} color="green" />
            <MetricCard label="Best F1-Score" value={97} color="purple" />
            <MetricCard label="Models Tested" value={4} suffix="" color="amber" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="Key Features"
          title="What This Project Covers"
          subtitle="A comprehensive machine learning approach to credit card fraud detection, from data preprocessing to model evaluation."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass rounded-xl p-6 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 transition-all">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeader
          badge="Methodology"
          title="System Workflow"
          subtitle="The step-by-step process from raw data to fraud detection."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflow.map((w, i) => (
            <div key={i} className="glass rounded-xl p-6 relative overflow-hidden">
              <span className="absolute top-4 right-4 text-5xl font-bold text-white/5">
                {w.step}
              </span>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm mb-4">
                {w.step}
              </div>
              <h3 className="font-semibold text-lg mb-1">{w.title}</h3>
              <p className="text-sm text-slate-400">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass rounded-2xl p-8 sm:p-12 text-center glow-blue">
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Test It Yourself
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Try the interactive fraud detection demo. Enter transaction
            parameters and see how the ML models classify transactions in
            real-time.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all shadow-lg shadow-blue-500/25"
          >
            Launch Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
