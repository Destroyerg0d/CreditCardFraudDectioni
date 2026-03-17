import { Shield, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
              FraudShield AI
            </div>
            <p className="text-sm text-slate-400">
              Machine learning-based credit card fraud detection system using
              SMOTE and ensemble methods.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <Link href="/demo" className="hover:text-blue-400 transition-colors">Try Demo</Link>
              <Link href="/models" className="hover:text-blue-400 transition-colors">ML Models</Link>
              <Link href="/results" className="hover:text-blue-400 transition-colors">Results</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Project</h4>
            <p className="text-sm text-slate-400 mb-2">
              B.Tech Major Project by Shreyansh Srivastava
            </p>
            <p className="text-sm text-slate-400">
              Amity University, Uttar Pradesh
            </p>
            <a
              href="https://github.com/Destroyerg0d/CreditCardFraudDectioni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub Repository
            </a>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-slate-500">
          &copy; 2026 FraudShield AI. Built for academic research purposes.
        </div>
      </div>
    </footer>
  );
}
