"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import MatchBadge from "@/components/ui/MatchBadge";
import Link from "next/link";
import { RecommendResponse } from "@/types";

export default function ResultsPage() {
  const [data, setData] = useState<RecommendResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // 1. Check if we already have pre-fetched results from the loading page
        const cachedResults = localStorage.getItem("matchmycar_results");
        if (cachedResults) {
          setData(JSON.parse(cachedResults));
          setLoading(false);
          // Optional: clear cache after use
          // localStorage.removeItem("matchmycar_results");
          return;
        }

        // 2. Fallback: Normal fetch if cache is empty (e.g. direct refresh)
        const prefsStr = localStorage.getItem("matchmycar_prefs");
        const prefs = prefsStr ? JSON.parse(prefsStr) : {
          budget: "8-12", familySize: "4-5", bodyType: "", fuelType: "", transmission: ""
        };

        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(prefs),
        });
        
        if (res.ok) {
          const resultData = await res.json();
          setData(resultData);
        } else {
          console.error("Failed to fetch recommendations");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading || !data) {
    return <div className="min-h-screen bg-[var(--color-background)]" />; // Avoid flash
  }

  const formatPrice = (priceLakh: number) => {
    return `₹${priceLakh.toFixed(2)} Lakh`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
        <div className="mb-12 animate-fade-in-up">
          <div className="flex items-center gap-2 font-[var(--font-body)] text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary-action)] uppercase mb-3">
            <span className="material-symbols-outlined text-[14px]">memory</span>
            Analysis Complete
          </div>
          <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Your Optimum Cockpits
          </h1>
          <p className="text-[var(--color-on-surface-variant)] text-base md:text-lg max-w-3xl leading-relaxed">
            Based on your selected telemetry preferences, daily commute patterns, and performance requirements, our neural engine has isolated these top 3 matches from a pool of {data.totalCarsAnalyzed} vehicles with a confidence interval &gt; 85%.
          </p>
        </div>

        <div className="space-y-8 stagger-children">
          {data.recommendations.map((rec, i) => {
            const isTopMatch = i === 0;
            return (
              <GlassCard key={rec.car.id} hover className="overflow-hidden p-0 group">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image */}
                  <div className="w-full md:w-5/12 relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                    {/* Placeholder image via Unsplash since we don't have images in DB yet */}
                    <img
                      src={`https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop`}
                      alt={rec.car.model}
                      className={`w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105 ${!isTopMatch ? "grayscale group-hover:grayscale-0" : ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-base)] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 z-10">
                      <MatchBadge percentage={rec.matchPercentage} variant={isTopMatch ? "primary" : "secondary"} />
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="font-[var(--font-headline)] text-3xl md:text-4xl font-bold">
                          {rec.car.make} {rec.car.model} <span className="text-xl font-normal text-[var(--color-on-surface-variant)]">{rec.car.variant}</span>
                        </h2>
                        <div className="font-[var(--font-headline)] text-2xl text-[var(--color-primary)]">
                          {formatPrice(rec.car.exShowroomPrice)}
                        </div>
                      </div>

                      <div className={`border-l-2 pl-4 py-1 mb-8 ${isTopMatch ? "border-[var(--color-primary-action)]" : "border-[var(--color-surface-high)]"}`}>
                        <p className="text-[var(--color-on-surface-variant)] text-sm italic leading-relaxed">
                          "{rec.explanation}"
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div>
                          <div className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1 font-semibold">Mileage</div>
                          <div className="font-[var(--font-headline)] text-xl font-bold">{rec.car.mileage} <span className="text-sm font-normal text-[var(--color-on-surface-variant)]">kmpl</span></div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1 font-semibold">Power</div>
                          <div className="font-[var(--font-headline)] text-xl font-bold">{rec.car.power.split(" ")[0]} <span className="text-sm font-normal text-[var(--color-on-surface-variant)]">bhp</span></div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1 font-semibold">Safety</div>
                          <div className="font-[var(--font-headline)] text-xl font-bold">{rec.car.safetyRating} <span className="text-sm font-normal text-[var(--color-on-surface-variant)]">Star</span></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-8 mb-8 border-t border-white/5 pt-6">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-[var(--color-on-surface)]">
                            <span className="material-symbols-outlined text-[14px]">add</span> Advantages
                          </div>
                          <ul className="space-y-2">
                            {rec.highlightedPros.map((pro, idx) => (
                              <li key={idx} className="text-sm text-[var(--color-on-surface-variant)] flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-primary-action)] mt-2 shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-[var(--color-on-surface)]">
                            <span className="material-symbols-outlined text-[14px]">remove</span> Trade-offs
                          </div>
                          <ul className="space-y-2">
                            {rec.highlightedCons.map((con, idx) => (
                              <li key={idx} className="text-sm text-[var(--color-on-surface-variant)] flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-[var(--color-surface-high)] mt-2 shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
                      <Link
                        href={`/compare?ids=${data.recommendations.map(r => r.car.id).join(",")}`}
                        className="btn-glass px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">compare_arrows</span> Compare
                      </Link>
                      <button
                        className={`${isTopMatch ? "btn-primary" : "btn-glass"} px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2`}
                      >
                        <span className="material-symbols-outlined text-[16px]">bookmark</span> Save
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
