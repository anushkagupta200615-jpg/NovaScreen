"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Search, Loader2, Library, MessageSquareText, FileText, ChevronRight } from "lucide-react";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  aiSummary: string;
  url: string;
}

interface ResearchCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  customPdbId?: string;
}

export default function ResearchCopilot({ isOpen, onClose, targetId, customPdbId }: ResearchCopilotProps) {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeChatPaperId, setActiveChatPaperId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasSearched(false);
    setPapers([]);
    setActiveChatPaperId(null);
  }, [targetId, customPdbId]);

  const handleFetchResearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, customPdbId }),
      });
      const data = await response.json();
      if (data.papers) {
        setPapers(data.papers);
      }
    } catch (err) {
      console.error("Failed to fetch research papers", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
                  <Library className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-100">AI Research Copilot</h2>
                  <p className="text-xs text-indigo-400 font-medium">Literature & Context</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
              {!hasSearched ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center relative">
                    <BookOpen className="w-10 h-10 text-zinc-600" />
                    <div className="absolute top-0 right-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center animate-bounce">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="max-w-[280px]">
                    <h3 className="text-base font-semibold text-zinc-200 mb-2">Connect to Literature</h3>
                    <p className="text-sm text-zinc-500">
                      Scan ArXiv, PubMed, and Nature for papers relating to your currently selected target to gain contextual insights.
                    </p>
                  </div>
                  <button
                    onClick={handleFetchResearch}
                    className="flex items-center gap-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-6 py-2.5 text-sm font-medium hover:bg-indigo-500/20 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Find Relevant Papers
                  </button>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                  <p className="text-sm text-zinc-400">Scanning academic databases...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-zinc-400">Found {papers.length} Highly Relevant Papers</h3>
                    <button 
                      onClick={handleFetchResearch}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="space-y-4">
                    {papers.map((paper) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={paper.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start gap-3 mb-2">
                            <h4 className="text-sm font-bold text-zinc-200 leading-snug">{paper.title}</h4>
                            <a href={paper.url} className="text-zinc-500 hover:text-indigo-400 transition-colors" title="View Source">
                              <FileText className="w-4 h-4" />
                            </a>
                          </div>
                          <p className="text-xs text-zinc-500 mb-3">
                            {paper.authors.join(", ")} • <span className="text-zinc-400">{paper.journal} ({paper.year})</span>
                          </p>
                          
                          <div className="rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-3 mb-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                              </span>
                              <span className="text-[10px] font-bold text-indigo-400 tracking-wider">AI SUMMARY</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                              {paper.aiSummary}
                            </p>
                          </div>

                          <button 
                            onClick={() => setActiveChatPaperId(activeChatPaperId === paper.id ? null : paper.id)}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 py-2 text-xs font-medium text-zinc-300 transition-colors"
                          >
                            <MessageSquareText className="w-3.5 h-3.5" />
                            {activeChatPaperId === paper.id ? "Close Chat" : "Chat with Paper"}
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeChatPaperId === paper.id ? "rotate-90" : ""}`} />
                          </button>
                        </div>

                        {/* Mock Chat Interface for the specific paper */}
                        <AnimatePresence>
                          {activeChatPaperId === paper.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-zinc-800 bg-zinc-950/50 p-4"
                            >
                              <div className="space-y-3 mb-3">
                                <div className="flex gap-2">
                                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                                    <Library className="w-3 h-3" />
                                  </div>
                                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg rounded-tl-sm p-2.5 text-xs text-zinc-300">
                                    I have read the full text of this paper. What would you like to know about its methodology or findings regarding this target?
                                  </div>
                                </div>
                              </div>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  placeholder="Ask a question..." 
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-3 pr-8 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                                />
                                <div className="absolute right-2 top-2 text-zinc-500 hover:text-indigo-400 cursor-pointer">
                                  <Search className="w-3.5 h-3.5" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
