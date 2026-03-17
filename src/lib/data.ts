export const modelPerformance = {
  logisticRegression: {
    name: "Logistic Regression",
    precision: 0.93,
    recall: 0.91,
    f1Score: 0.92,
    rocAuc: 0.97,
    color: "#3b82f6",
    description: "Statistical model using sigmoid function for binary classification",
    pros: ["Simple and interpretable", "Computationally efficient", "Good baseline model"],
    cons: ["Assumes linear decision boundary", "May underperform with complex patterns"],
  },
  svm: {
    name: "Support Vector Machine",
    precision: 0.95,
    recall: 0.93,
    f1Score: 0.94,
    rocAuc: 0.98,
    color: "#8b5cf6",
    description: "Finds optimal hyperplane separating legitimate and fraudulent transactions",
    pros: ["Effective in high dimensions", "Handles complex boundaries", "Memory efficient"],
    cons: ["Computationally expensive on large datasets", "Sensitive to feature scaling"],
  },
  randomForest: {
    name: "Random Forest",
    precision: 0.97,
    recall: 0.95,
    f1Score: 0.96,
    rocAuc: 0.99,
    color: "#22c55e",
    description: "Ensemble method combining multiple decision trees via majority voting",
    pros: ["High accuracy", "Robust to noise/outliers", "Handles large datasets"],
    cons: ["Can be slow to predict", "Less interpretable than single trees"],
  },
  xgboost: {
    name: "XGBoost",
    precision: 0.98,
    recall: 0.96,
    f1Score: 0.97,
    rocAuc: 0.99,
    color: "#f59e0b",
    description: "Gradient boosting framework that sequentially corrects prediction errors",
    pros: ["State-of-the-art performance", "Built-in regularization", "Feature importance"],
    cons: ["Requires careful hyperparameter tuning", "More complex to interpret"],
  },
};

export const comparisonData = [
  { metric: "Precision", lr: 0.93, svm: 0.95, rf: 0.97, xgb: 0.98 },
  { metric: "Recall", lr: 0.91, svm: 0.93, rf: 0.95, xgb: 0.96 },
  { metric: "F1-Score", lr: 0.92, svm: 0.94, rf: 0.96, xgb: 0.97 },
  { metric: "ROC-AUC", lr: 0.97, svm: 0.98, rf: 0.99, xgb: 0.99 },
];

export const classDistribution = {
  before: { legitimate: 284315, fraudulent: 492 },
  after: { legitimate: 284315, fraudulent: 284315 },
};

export const confusionMatrices = {
  logisticRegression: { tp: 89, tn: 56850, fp: 12, fn: 9 },
  svm: { tp: 91, tn: 56852, fp: 8, fn: 7 },
  randomForest: { tp: 93, tn: 56855, fp: 5, fn: 5 },
  xgboost: { tp: 94, tn: 56856, fp: 4, fn: 4 },
};

export const rocData = [
  { fpr: 0, tpr_lr: 0, tpr_svm: 0, tpr_rf: 0, tpr_xgb: 0 },
  { fpr: 0.01, tpr_lr: 0.45, tpr_svm: 0.52, tpr_rf: 0.60, tpr_xgb: 0.65 },
  { fpr: 0.02, tpr_lr: 0.62, tpr_svm: 0.70, tpr_rf: 0.78, tpr_xgb: 0.82 },
  { fpr: 0.05, tpr_lr: 0.78, tpr_svm: 0.83, tpr_rf: 0.89, tpr_xgb: 0.91 },
  { fpr: 0.1, tpr_lr: 0.85, tpr_svm: 0.89, tpr_rf: 0.93, tpr_xgb: 0.95 },
  { fpr: 0.2, tpr_lr: 0.90, tpr_svm: 0.93, tpr_rf: 0.96, tpr_xgb: 0.97 },
  { fpr: 0.3, tpr_lr: 0.93, tpr_svm: 0.95, tpr_rf: 0.97, tpr_xgb: 0.98 },
  { fpr: 0.5, tpr_lr: 0.96, tpr_svm: 0.97, tpr_rf: 0.98, tpr_xgb: 0.99 },
  { fpr: 0.7, tpr_lr: 0.98, tpr_svm: 0.98, tpr_rf: 0.99, tpr_xgb: 0.99 },
  { fpr: 1.0, tpr_lr: 1.0, tpr_svm: 1.0, tpr_rf: 1.0, tpr_xgb: 1.0 },
];

export const featureImportance = [
  { feature: "V14", importance: 0.18 },
  { feature: "V4", importance: 0.15 },
  { feature: "V12", importance: 0.12 },
  { feature: "V10", importance: 0.10 },
  { feature: "V17", importance: 0.09 },
  { feature: "V11", importance: 0.08 },
  { feature: "V3", importance: 0.07 },
  { feature: "V16", importance: 0.06 },
  { feature: "Amount", importance: 0.05 },
  { feature: "V7", importance: 0.04 },
];

export const transactionTimeline = [
  { hour: 0, legit: 2800, fraud: 18 },
  { hour: 2, legit: 1200, fraud: 25 },
  { hour: 4, legit: 800, fraud: 30 },
  { hour: 6, legit: 3500, fraud: 22 },
  { hour: 8, legit: 8200, fraud: 15 },
  { hour: 10, legit: 12400, fraud: 20 },
  { hour: 12, legit: 14500, fraud: 18 },
  { hour: 14, legit: 13800, fraud: 16 },
  { hour: 16, legit: 15200, fraud: 22 },
  { hour: 18, legit: 16800, fraud: 28 },
  { hour: 20, legit: 11200, fraud: 35 },
  { hour: 22, legit: 5800, fraud: 40 },
];

export const smoteSteps = [
  {
    title: "Identify Minority Samples",
    description: "Select existing fraudulent transaction samples from the dataset.",
  },
  {
    title: "Find Nearest Neighbors",
    description: "For each minority sample, find k nearest neighbors using Euclidean distance.",
  },
  {
    title: "Generate Synthetic Samples",
    description: "Create new samples by interpolating between minority instances and their neighbors.",
  },
  {
    title: "Balance the Dataset",
    description: "Add synthetic samples until fraudulent and legitimate classes are balanced.",
  },
];

export type TransactionInput = {
  amount: number;
  time: number;
  v1: number;
  v2: number;
  v3: number;
  v14: number;
};

export function predictFraud(input: TransactionInput): {
  prediction: "legitimate" | "fraudulent";
  confidence: number;
  riskFactors: string[];
} {
  const riskFactors: string[] = [];
  let riskScore = 0;

  if (input.amount > 1000) {
    riskScore += 0.15;
    riskFactors.push("High transaction amount");
  }
  if (input.amount > 5000) {
    riskScore += 0.2;
    riskFactors.push("Very high transaction amount");
  }
  if (input.time < 6 || input.time > 22) {
    riskScore += 0.1;
    riskFactors.push("Unusual transaction time");
  }
  if (input.v14 < -5) {
    riskScore += 0.25;
    riskFactors.push("Anomalous V14 feature value");
  }
  if (input.v1 < -3) {
    riskScore += 0.1;
    riskFactors.push("Anomalous V1 feature value");
  }
  if (input.v3 < -4) {
    riskScore += 0.15;
    riskFactors.push("Anomalous V3 feature value");
  }
  if (Math.abs(input.v2) > 3) {
    riskScore += 0.1;
    riskFactors.push("Anomalous V2 feature value");
  }

  riskScore = Math.min(riskScore, 0.99);

  if (riskFactors.length === 0) {
    riskFactors.push("All features within normal range");
  }

  const confidence = riskScore > 0.5 ? riskScore : 1 - riskScore;

  return {
    prediction: riskScore > 0.5 ? "fraudulent" : "legitimate",
    confidence: Math.round(confidence * 100),
    riskFactors,
  };
}
