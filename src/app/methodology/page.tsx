"use client";

import {
  BookOpen,
  Database,
  Scale,
  Brain,
  BarChart3,
  CheckCircle2,
  ArrowDown,
  Code2,
  Cpu,
  HardDrive,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const methodologySteps = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Collection",
    content:
      "The dataset consists of 284,807 anonymized credit card transactions with 31 features. Features V1-V28 are PCA-transformed for privacy, along with Time, Amount, and Class (0=legitimate, 1=fraud).",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Data Preprocessing",
    content:
      "Data cleaning to remove missing/inconsistent values. Feature scaling via z-score normalization ensures all features contribute equally. The Amount and Time features are standardized to match the PCA-transformed feature ranges.",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "SMOTE Balancing",
    content:
      "SMOTE (Synthetic Minority Over-sampling Technique) generates synthetic fraudulent samples by interpolating between existing minority class neighbors. This balances the dataset from 0.17% to 50% fraud rate.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Model Training",
    content:
      "Four algorithms are trained: Logistic Regression (baseline), SVM (hyperplane separation), Random Forest (ensemble of decision trees), and XGBoost (gradient boosting). 80/20 train-test split with hyperparameter tuning.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Evaluation",
    content:
      "Models evaluated using Precision (false alarm rate), Recall (fraud catch rate), F1-Score (balanced measure), and ROC-AUC (overall performance). Confusion matrices provide detailed classification breakdowns.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Model Selection",
    content:
      "XGBoost selected as the best model with 98% precision, 96% recall, 97% F1-score, and 99% ROC-AUC. Its gradient boosting approach and built-in regularization proved most effective for fraud detection.",
  },
];

const algorithms = [
  {
    name: "Logistic Regression",
    formula: "P(Y=1|X) = 1 / (1 + e^(-z))",
    description:
      "Uses the sigmoid function to map linear combinations of features to fraud probability. Simple, interpretable baseline.",
    keyPoints: ["Binary classification via sigmoid", "Probabilistic output", "Linear decision boundary"],
  },
  {
    name: "Support Vector Machine",
    formula: "min ||w||^2 / 2  s.t.  yi(w·xi + b) >= 1",
    description:
      "Finds the optimal hyperplane that maximizes the margin between legitimate and fraudulent transactions in high-dimensional space.",
    keyPoints: ["Maximum margin classifier", "Kernel trick for non-linearity", "Effective in high dimensions"],
  },
  {
    name: "Random Forest",
    formula: "y = mode(h1(x), h2(x), ..., hB(x))",
    description:
      "Ensemble of decision trees, each trained on a random subset. Final prediction via majority voting reduces overfitting.",
    keyPoints: ["Bagging ensemble", "Majority voting", "Feature importance ranking"],
  },
  {
    name: "XGBoost",
    formula: "Obj = Σ L(yi, ŷi) + Σ Ω(fk)",
    description:
      "Sequential gradient boosting where each tree corrects the errors of the previous. Includes L1/L2 regularization.",
    keyPoints: ["Gradient boosting", "Built-in regularization", "Sequential error correction"],
  },
];

const techStack = [
  { name: "Python", purpose: "Programming Language" },
  { name: "Jupyter Notebook", purpose: "Development Environment" },
  { name: "Pandas", purpose: "Data Manipulation" },
  { name: "NumPy", purpose: "Numerical Computation" },
  { name: "Scikit-learn", purpose: "ML Algorithms" },
  { name: "Matplotlib", purpose: "Data Visualization" },
  { name: "Seaborn", purpose: "Statistical Visualization" },
  { name: "Imbalanced-learn", purpose: "SMOTE Implementation" },
];

export default function MethodologyPage() {
  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          badge="Methodology"
          title="Research Methodology"
          subtitle="The systematic approach used to build the credit card fraud detection system, from data collection to model evaluation."
        />

        {/* Workflow */}
        <div className="max-w-3xl mx-auto mb-16">
          {methodologySteps.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    {step.icon}
                  </div>
                  {i < methodologySteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-blue-500/20 my-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Algorithms Detail */}
        <SectionHeader
          badge="Algorithms"
          title="Machine Learning Algorithms"
          subtitle="Detailed breakdown of the four supervised learning algorithms used in this study."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {algorithms.map((algo) => (
            <div key={algo.name} className="glass rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">{algo.name}</h3>
              <div className="font-mono text-sm text-blue-400 bg-blue-500/5 rounded-lg p-3 mb-3 border border-blue-500/10">
                {algo.formula}
              </div>
              <p className="text-sm text-slate-400 mb-4">{algo.description}</p>
              <div className="flex flex-wrap gap-2">
                {algo.keyPoints.map((kp) => (
                  <span
                    key={kp}
                    className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-slate-300"
                  >
                    {kp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <SectionHeader
          badge="Technology"
          title="Technology Stack"
          subtitle="The tools and libraries used to implement the fraud detection system."
        />
        <div className="glass rounded-xl p-6 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div key={t.name} className="p-4 rounded-lg bg-white/5 text-center">
                <h4 className="font-semibold text-sm mb-1">{t.name}</h4>
                <p className="text-xs text-slate-400">{t.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Hardware Requirements
            </h3>
            <div className="space-y-3">
              {[
                ["Processor", "Intel Core / equivalent"],
                ["RAM", "8 GB or higher"],
                ["Storage", "256 GB SSD"],
                ["OS", "Windows 10 / Linux"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center p-2.5 rounded-lg bg-white/5">
                  <span className="text-sm text-slate-400">{k}</span>
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Future Work
            </h3>
            <ul className="space-y-3">
              {[
                "Real-time fraud detection system integration",
                "Handling concept drift in evolving fraud patterns",
                "Deep learning approaches (ANN, RNN, CNN)",
                "Explainable AI for transparent fraud decisions",
                "Federated learning for privacy-preserving training",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <ArrowDown className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 rotate-[-90deg]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Info */}
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">About This Project</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            This is a B.Tech (Computer Science & Engineering) Minor Project at Amity University, Uttar Pradesh.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-xs text-slate-400">Student</p>
              <p className="font-semibold text-sm">Shreyansh Srivastava</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-xs text-slate-400">Faculty Guide</p>
              <p className="font-semibold text-sm">Mr. Pradeep Kumar Kushwaha</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-xs text-slate-400">Enrollment</p>
              <p className="font-semibold text-sm">A41105222069</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
