"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { Car } from "@/types";

export default function ComparePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const idsParam = urlParams.get("ids");
        
        if (!idsParam) return;
        
        const ids = idsParam.split(",").map(id => parseInt(id, 10));

        const res = await fetch("/api/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });
        
        if (res.ok) {
          const data = await res.json();
          setCars(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, []);

  if (loading || cars.length === 0) {
    return <div className="min-h-screen bg-[var(--color-background)]" />;
  }

  const formatPrice = (priceLakh: number) => `₹${priceLakh.toFixed(2)}L`;

  // Determine "best" in row for highlighting
  const bestMileage = Math.max(...cars.map(c => c.mileage));
  const bestSafety = Math.max(...cars.map(c => c.safetyRating));
  const bestBoot = Math.max(...cars.map(c => c.bootSpace));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-6 md:px-16 max-w-[1440px] mx-auto w-full animate-fade-in-up">
        <div className="mb-12">
          <h1 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Telemetry Comparison
          </h1>
          <p className="text-[var(--color-on-surface-variant)] text-lg max-w-2xl leading-relaxed">
            Analyze key performance indicators and specifications side-by-side. Optimal values are highlighted with precision indicators.
          </p>
        </div>

        {/* Scrollable container for mobile */}
        <div className="w-full overflow-x-auto no-scrollbar pb-8">
          <div className="min-w-[900px]">
            {/* Header Row (Cars) */}
            <div 
              className="grid gap-6 items-end mb-12 z-10 bg-[var(--color-background)] py-4 border-b border-white/10"
              style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
            >
              <div className="font-[var(--font-body)] text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-on-surface-variant)] pb-4">
                Specifications
              </div>
              
              {cars.map((car, i) => (
                <div key={car.id} className="flex flex-col items-center text-center">
                  <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden mb-4 border border-white/5 bg-[var(--color-surface-lowest)]">
                    <img
                      src={`https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop`}
                      alt={car.model}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
                  </div>
                  <h3 className="font-[var(--font-headline)] text-xl font-bold">{car.make} {car.model}</h3>
                  <div className="text-[var(--color-on-surface-variant)] text-sm">{formatPrice(car.exShowroomPrice)}</div>
                </div>
              ))}
            </div>

            {/* Data Rows */}
            <div className="space-y-0">
              {/* Mileage */}
              <div 
                className="grid gap-6 items-center min-h-[64px] py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
              >
                <div className="flex items-center gap-3 font-[var(--font-body)] text-sm font-semibold text-[var(--color-on-surface-variant)] pr-4">
                  <span className="material-symbols-outlined text-[18px]">local_gas_station</span> Mileage
                </div>
                {cars.map((car) => {
                  const isBest = car.mileage === bestMileage;
                  return (
                    <div key={car.id} className="flex justify-center">
                      <div className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium ${isBest ? 'bg-[var(--color-primary-container)]/10 text-[var(--color-primary-action)] border border-[var(--color-primary-action)]/30 shadow-[0_0_15px_rgba(247,93,52,0.1)]' : 'text-[var(--color-on-surface)]'}`}>
                        {isBest && <span className="material-symbols-outlined text-[16px] mr-2 icon-fill">bolt</span>}
                        {car.mileage} kmpl
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Safety */}
              <div 
                className="grid gap-6 items-center min-h-[64px] py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
              >
                <div className="flex items-center gap-3 font-[var(--font-body)] text-sm font-semibold text-[var(--color-on-surface-variant)] pr-4">
                  <span className="material-symbols-outlined text-[18px]">shield</span> Safety Rating
                </div>
                {cars.map((car) => {
                  const isBest = car.safetyRating === bestSafety;
                  return (
                    <div key={car.id} className="flex justify-center">
                      <div className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium ${isBest ? 'bg-[var(--color-primary-container)]/10 text-[var(--color-primary-action)] border border-[var(--color-primary-action)]/30 shadow-[0_0_15px_rgba(247,93,52,0.1)]' : 'text-[var(--color-on-surface)]'}`}>
                        {isBest && <span className="material-symbols-outlined text-[16px] mr-2 icon-fill">verified</span>}
                        {car.safetyRating} Star
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Power */}
              <div 
                className="grid gap-6 items-center min-h-[64px] py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
              >
                <div className="flex items-center gap-3 font-[var(--font-body)] text-sm font-semibold text-[var(--color-on-surface-variant)] pr-4">
                  <span className="material-symbols-outlined text-[18px]">speed</span> Power Output
                </div>
                {cars.map((car) => (
                  <div key={car.id} className="text-center text-sm font-medium text-[var(--color-on-surface)]">
                    {car.power}
                  </div>
                ))}
              </div>

              {/* Boot Space */}
              <div 
                className="grid gap-6 items-center min-h-[64px] py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
              >
                <div className="flex items-center gap-3 font-[var(--font-body)] text-sm font-semibold text-[var(--color-on-surface-variant)] pr-4">
                  <span className="material-symbols-outlined text-[18px]">luggage</span> Boot Space
                </div>
                {cars.map((car) => {
                  const isBest = car.bootSpace === bestBoot;
                  return (
                    <div key={car.id} className="flex justify-center">
                      <div className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium ${isBest ? 'bg-[var(--color-primary-container)]/10 text-[var(--color-primary-action)] border border-[var(--color-primary-action)]/30 shadow-[0_0_15px_rgba(247,93,52,0.1)]' : 'text-[var(--color-on-surface)]'}`}>
                        {isBest && <span className="material-symbols-outlined text-[16px] mr-2 icon-fill">star</span>}
                        {car.bootSpace} L
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Transmission */}
              <div 
                className="grid gap-6 items-center min-h-[64px] py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                style={{ gridTemplateColumns: `200px repeat(${cars.length}, 1fr)` }}
              >
                <div className="flex items-center gap-3 font-[var(--font-body)] text-sm font-semibold text-[var(--color-on-surface-variant)] pr-4">
                  <span className="material-symbols-outlined text-[18px]">settings</span> Transmission
                </div>
                {cars.map((car) => (
                  <div key={car.id} className="text-center text-sm font-medium text-[var(--color-on-surface)]">
                    {car.transmission}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
