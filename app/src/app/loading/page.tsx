"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LOADING_MESSAGES } from "@/lib/constants";

export default function LoadingPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    // 1. Cycle messages every 1.5 seconds for better momentum
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1500);

    // 2. Set minimum display time (4 seconds)
    const minTimer = setTimeout(() => {
      setMinTimePassed(true);
    }, 4000);

    // 3. Initiate API call immediately
    const fetchData = async () => {
      try {
        const prefsStr = localStorage.getItem("matchmycar_prefs");
        if (!prefsStr) {
          setIsDataLoaded(true); // Proceed anyway, results page handles empty
          return;
        }

        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: prefsStr,
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("matchmycar_results", JSON.stringify(data));
          setIsDataLoaded(true);
        } else {
          console.error("API Error");
          setIsDataLoaded(true);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setIsDataLoaded(true);
      }
    };

    fetchData();

    return () => {
      clearInterval(messageInterval);
      clearTimeout(minTimer);
    };
  }, []);

  // 4. Redirect only when both conditions are met
  useEffect(() => {
    if (isDataLoaded && minTimePassed) {
      router.push("/results");
    }
  }, [isDataLoaded, minTimePassed, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] relative">
      <div className="ambient-glow" />

      <div className="glass-card rounded-[32px] w-[340px] md:w-[400px] h-[480px] md:h-[540px] flex flex-col items-center justify-center p-8 relative z-10 animate-scale-in">
        
        {/* Animated Ring */}
        <div className="relative w-32 h-32 mb-12">
          {/* Background circle */}
          <svg className="absolute inset-0 w-full h-full text-white/5" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          
          {/* Rotating segment */}
          <svg className="absolute inset-0 w-full h-full text-[var(--color-primary-action)] animate-spin-slow" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" 
              strokeDasharray="283" strokeDashoffset="200" strokeLinecap="round" 
            />
          </svg>
          
          {/* Tick marks */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-2 bg-[var(--color-on-surface-variant)] absolute top-0" />
            <div className="w-1 h-2 bg-[var(--color-on-surface-variant)] absolute bottom-0" />
            <div className="w-2 h-1 bg-[var(--color-on-surface-variant)] absolute left-0" />
            <div className="w-2 h-1 bg-[var(--color-on-surface-variant)] absolute right-0" />
          </div>

          {/* Center pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary-action)] shadow-[0_0_20px_rgba(247,93,52,0.8)] animate-pulse-glow" />
          </div>
        </div>

        {/* Text */}
        <h1 className="font-[var(--font-headline)] text-2xl font-bold tracking-tighter mb-2">
          MATCHMYCAR AI
        </h1>
        
        <div className="h-12 flex items-center justify-center text-center">
          <p key={messageIndex} className="text-[var(--color-on-surface-variant)] animate-fade-message">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Bottom loading bar segments */}
        <div className="flex gap-2 mt-8 mb-8">
          <div className="h-1 w-10 bg-[var(--color-primary-action)] rounded-full animate-pulse-glow" />
          <div className="h-1 w-10 bg-white/20 rounded-full" />
          <div className="h-1 w-10 bg-white/10 rounded-full" />
        </div>

        <div className="flex items-center gap-2 font-[var(--font-body)] text-[10px] font-semibold tracking-[0.1em] uppercase text-[var(--color-on-surface-variant)]">
          <span className="material-symbols-outlined text-[14px]">memory</span>
          Processing Telemetry
        </div>

      </div>
    </div>
  );
}
