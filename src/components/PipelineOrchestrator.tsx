"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STEPS = [
  "Target Analyst",
  "Simulation Engine",
  "Affinity Scorer",
  "Safety & Toxicity",
  "Insights Reporter",
];

interface PipelineOrchestratorProps {
  status: "idle" | "running" | "completed";
}

export default function PipelineOrchestrator({ status }: PipelineOrchestratorProps) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (status === "idle") {
      setActiveStep(-1);
    } else if (status === "running") {
      setActiveStep(0);
      
      // Simulate stepping through the pipeline
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= STEPS.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 800); // 800ms per step

      return () => clearInterval(interval);
    } else if (status === "completed") {
      setActiveStep(STEPS.length); // All steps completed
    }
  }, [status]);

  return (
    <div className="glass-panel p-6 w-full flex flex-col space-y-6">
      <h3 className="text-xl font-semibold text-slate-200 mb-2">AI Screening Pipeline</h3>
      
      <div className="relative flex flex-col space-y-4">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-800 -z-10" />
        
        {STEPS.map((step, index) => {
          const isActive = index === activeStep && status === "running";
          const isPast = index < activeStep || status === "completed";
          const isPending = index > activeStep && status !== "completed";

          return (
            <div key={step} className="flex items-center space-x-4">
              <div className="relative">
                {isPast ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-brand-teal bg-slate-950 rounded-full"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="text-brand-indigo bg-slate-950 rounded-full"
                  >
                    <Loader2 className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <div className="text-slate-600 bg-slate-950 rounded-full">
                    <CircleDashed className="w-8 h-8" />
                  </div>
                )}
              </div>
              
              <div className={cn(
                "transition-colors duration-300",
                isPast ? "text-slate-200" : isActive ? "text-brand-teal font-medium" : "text-slate-500"
              )}>
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
