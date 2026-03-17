"use client";

import { useState } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { predictFraud, type TransactionInput } from "@/lib/data";

const presets = [
  {
    label: "Normal Purchase",
    values: { amount: 45.5, time: 14, v1: -0.5, v2: 0.3, v3: 1.2, v14: -0.8 },
  },
  {
    label: "Suspicious Transaction",
    values: { amount: 3500, time: 2, v1: -2.5, v2: 3.1, v3: -3.8, v14: -4.2 },
  },
  {
    label: "High-Risk Fraud",
    values: { amount: 8900, time: 3, v1: -4.2, v2: 4.5, v3: -6.1, v14: -8.5 },
  },
];

export default function DemoPage() {
  const [input, setInput] = useState<TransactionInput>({
    amount: 100,
    time: 12,
    v1: -1.0,
    v2: 0.5,
    v3: 1.0,
    v14: -1.0,
  });
  const [result, setResult] = useState<ReturnType<typeof predictFraud> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handlePredict = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(predictFraud(input));
      setAnalyzing(false);
    }, 1200);
  };

  const handleReset = () => {
    setInput({ amount: 100, time: 12, v1: -1.0, v2: 0.5, v3: 1.0, v14: -1.0 });
    setResult(null);
  };

  const fields: { key: keyof TransactionInput; label: string; min: number; max: number; step: number; desc: string }[] = [
    { key: "amount", label: "Transaction Amount ($)", min: 0, max: 25000, step: 10, desc: "Dollar amount of the transaction" },
    { key: "time", label: "Time of Day (Hour)", min: 0, max: 23, step: 1, desc: "Hour of the day (0-23)" },
    { key: "v1", label: "Feature V1", min: -10, max: 10, step: 0.1, desc: "PCA-transformed feature V1" },
    { key: "v2", label: "Feature V2", min: -10, max: 10, step: 0.1, desc: "PCA-transformed feature V2" },
    { key: "v3", label: "Feature V3", min: -10, max: 10, step: 0.1, desc: "PCA-transformed feature V3" },
    { key: "v14", label: "Feature V14 (Key Predictor)", min: -20, max: 10, step: 0.1, desc: "Most important fraud indicator" },
  ];

  return (
    <div className="grid-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          badge="Interactive Demo"
          title="Fraud Detection Simulator"
          subtitle="Enter transaction parameters to see how the ML model classifies transactions. Adjust the sliders and features to test different scenarios."
        />

        {/* Presets */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => { setInput(p.values); setResult(null); }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="glass rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Transaction Parameters
            </h3>
            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.key}>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-medium">{f.label}</label>
                    <span className="text-sm font-mono text-blue-400">
                      {f.key === "amount" ? `$${input[f.key].toFixed(2)}` : input[f.key].toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={input[f.key]}
                    onChange={(e) =>
                      setInput({ ...input, [f.key]: parseFloat(e.target.value) })
                    }
                    className="w-full h-2 rounded-full appearance-none bg-white/10 accent-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={handlePredict}
                disabled={analyzing}
                className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Analyze Transaction
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Result Panel */}
          <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              Detection Result
            </h3>
            {!result && !analyzing ? (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Adjust parameters and click Analyze to detect fraud</p>
                </div>
              </div>
            ) : analyzing ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Running ML models...</p>
                </div>
              </div>
            ) : result ? (
              <div className="flex-1">
                {/* Verdict */}
                <div
                  className={`rounded-xl p-6 mb-6 ${
                    result.prediction === "fraudulent"
                      ? "bg-red-500/10 border border-red-500/20 glow-red"
                      : "bg-green-500/10 border border-green-500/20 glow-green"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {result.prediction === "fraudulent" ? (
                      <ShieldAlert className="w-8 h-8 text-red-400" />
                    ) : (
                      <ShieldCheck className="w-8 h-8 text-green-400" />
                    )}
                    <div>
                      <h4
                        className={`text-xl font-bold ${
                          result.prediction === "fraudulent"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {result.prediction === "fraudulent"
                          ? "FRAUDULENT"
                          : "LEGITIMATE"}
                      </h4>
                      <p className="text-sm text-slate-400">
                        Transaction Classification
                      </p>
                    </div>
                  </div>
                  {/* Confidence Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Confidence</span>
                      <span className="font-semibold">{result.confidence}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          result.prediction === "fraudulent"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div>
                  <h4 className="font-semibold mb-3">Risk Factors</h4>
                  <div className="space-y-2">
                    {result.riskFactors.map((rf, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-white/5"
                      >
                        {result.prediction === "fraudulent" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                        )}
                        {rf}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Used */}
                <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p className="text-xs text-slate-400">
                    Classification performed by XGBoost (best performing model).
                    Results are simulated for demonstration purposes.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
