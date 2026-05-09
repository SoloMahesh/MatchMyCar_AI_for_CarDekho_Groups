"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export default function LandingPage() {
  const [typedText, setTypedText] = useState("");
  const targetText = "60 Seconds";

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let currentText = "";
    
    const type = () => {
      const fullText = targetText;
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
      
      setTypedText(currentText);
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000; // Wait at the end
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        typeSpeed = 500; // Wait before starting again
      }
      
      setTimeout(type, typeSpeed);
    };
    
    const timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
          {/* Background image & gradient */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/90 via-[#131313]/70 to-[#131313]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(247,93,52,0.15)_0%,transparent_70%)]" />
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="font-[var(--font-body)] text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--color-primary-action)] uppercase mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-[var(--color-primary-action)]"></span>
              Powered by CarDekho Group
              <span className="w-8 h-[1px] bg-[var(--color-primary-action)]"></span>
            </div>
            <h1 className="font-[var(--font-headline)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
              Find Your Perfect Car in{" "}
              <span className="text-[var(--color-primary-action)] drop-shadow-[0_0_30px_rgba(247,93,52,0.5)] inline-block min-w-[280px] md:min-w-[420px] text-left">
                {typedText}
                <span className="animate-pulse inline-block w-[4px] h-[1em] bg-[var(--color-primary-action)] ml-1 align-middle -mt-2"></span>
              </span>
            </h1>
            <p className="font-[var(--font-body)] text-lg md:text-xl text-[var(--color-on-surface-variant)] max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
              Leveraging India's largest auto ecosystem, our AI analyzes your lifestyle and budget to match you with the world's finest automobiles.
            </p>
            <Link
              href="/questionnaire"
              className="btn-primary font-[var(--font-body)] text-sm font-semibold tracking-[0.1em] uppercase px-8 py-4 rounded-full inline-flex items-center gap-3 animate-pulse-glow"
            >
              <span>Start Matching</span>
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                rocket_launch
              </span>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 md:px-16 relative z-10 -mt-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-3 gap-6 stagger-children">
              <GlassCard hover className="p-8 md:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-action)]/10 flex items-center justify-center mb-6 border border-[var(--color-primary-action)]/30">
                  <span className="material-symbols-outlined text-3xl text-[var(--color-primary-action)] icon-fill">
                    memory
                  </span>
                </div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold mb-3">AI Matching</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">
                  Precision algorithms that understand your unique needs and driving style.
                </p>
              </GlassCard>

              <GlassCard hover className="p-8 md:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-action)]/10 flex items-center justify-center mb-6 border border-[var(--color-primary-action)]/30">
                  <span className="material-symbols-outlined text-3xl text-[var(--color-primary-action)] icon-fill">
                    compare_arrows
                  </span>
                </div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold mb-3">Smart Comparison</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">
                  Compare specs, safety ratings, and real-world performance side-by-side.
                </p>
              </GlassCard>

              <GlassCard hover className="p-8 md:p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-action)]/10 flex items-center justify-center mb-6 border border-[var(--color-primary-action)]/30">
                  <span className="material-symbols-outlined text-3xl text-[var(--color-primary-action)] icon-fill">
                    person_check
                  </span>
                </div>
                <h3 className="font-[var(--font-headline)] text-xl font-bold mb-3">Curated For You</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed">
                  A highly personalized, hand-picked list of vehicles perfectly suited for your lifestyle.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* About CarDekho Ecosystem Section */}
        <section className="py-24 px-6 md:px-16 relative z-10 bg-[var(--color-surface-lowest)] border-y border-white/5">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in-up">
                <div className="font-[var(--font-body)] text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary-action)] uppercase mb-2">
                  The Ecosystem
                </div>
                <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                  Backed by India's Leading Auto Tech Group
                </h2>
                <div className="space-y-4 text-[var(--color-on-surface-variant)] text-base leading-relaxed">
                  <p>
                    <strong>CarDekho.com</strong> is India's leading car search venture that helps users buy cars that are right for them. With tie-ups to more than 4,000 car dealers and numerous financial institutions, we facilitate a seamless vehicle purchase experience.
                  </p>
                  <p>
                    Our vision is to construct a complete ecosystem for consumers and car manufacturers. From immersive <strong>Feel The Car 360-degree</strong> views to managing your entire ownership experience—including accessories, insurance, and roadside assistance.
                  </p>
                  <p>
                    Our global presence spans across Southeast Asia and the UAE with <strong>Zigwheels</strong> and <strong>Oto.com</strong>, while <strong>InsuranceDekho</strong> secures your journey.
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-[var(--color-on-surface-variant)] mb-4">Trusted by industry-leading investors:</p>
                  <div className="flex flex-wrap gap-4 items-center opacity-60">
                    <span className="font-[var(--font-headline)] font-bold text-lg text-white">Google Capital</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span className="font-[var(--font-headline)] font-bold text-lg text-white">Sequoia</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span className="font-[var(--font-headline)] font-bold text-lg text-white">Hillhouse</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span className="font-[var(--font-headline)] font-bold text-lg text-white">Ratan Tata</span>
                  </div>
                </div>
              </div>
              
              <div className="relative h-[600px] hidden md:grid grid-cols-2 grid-rows-3 gap-4">
                <div className="row-span-2 col-span-1 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[var(--color-primary-action)]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <img src="/assets/CarDekho_exhibition.avif" alt="CarDekho Exhibition" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="row-span-1 col-span-1 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[var(--color-primary-action)]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <img src="/assets/CEO_of_New_Auto.avif" alt="Visionary Leadership" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="row-span-2 col-span-1 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[var(--color-primary-action)]/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                  <img src="/assets/blog_pic-1.avif" alt="CarDekho Technology" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="row-span-1 col-span-1 rounded-2xl overflow-hidden relative group flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="text-center p-4">
                    <div className="font-[var(--font-headline)] text-4xl font-bold text-[var(--color-primary)] mb-1">4000+</div>
                    <div className="text-xs text-[var(--color-on-surface-variant)] uppercase tracking-wider">Dealer Network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wide Banner Strip */}
        <section className="w-full bg-[var(--color-surface)] border-b border-white/5">
          <div className="w-full max-w-[1440px] mx-auto overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
            <img src="/assets/cardekhogroup_cover.jpeg" alt="CarDekho Ecosystem Banners" className="w-full h-auto object-cover max-h-32" />
          </div>
        </section>

        {/* Sneak Peek / Top AI Matches Section */}
        <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-transparent to-[var(--color-surface-lowest)]">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-12">
              <div className="font-[var(--font-body)] text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary-action)] uppercase mb-2">
                Premium Selection
              </div>
              <h2 className="font-[var(--font-headline)] text-4xl md:text-5xl font-bold tracking-tighter">
                Top AI Matches
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Tata Safari", price: "₹16,19,000", match: 98, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop" },
                { name: "Hyundai Creta", price: "₹11,00,000", match: 94, img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop" },
                { name: "Mahindra XUV700", price: "₹13,99,000", match: 89, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop" },
              ].map((car, i) => (
                <GlassCard key={i} hover className="overflow-hidden group">
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img 
                      src={car.img} 
                      alt={car.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-[14px] ${i === 0 ? "text-[var(--color-primary-action)] icon-fill" : ""}`}>
                        {i === 0 ? "bolt" : "check_circle"}
                      </span>
                      {car.match}% Match
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-[var(--font-headline)] text-2xl font-bold mb-1">{car.name}</h4>
                    <div className="text-[var(--color-on-surface-variant)] text-sm mb-6">{car.price}</div>
                    
                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                      <div className="text-center">
                        <div className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">Mileage</div>
                        <div className="font-semibold text-sm">16.3 kmpl</div>
                      </div>
                      <div className="text-center border-l border-white/10">
                        <div className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">Safety</div>
                        <div className="font-semibold text-sm">5 Star</div>
                      </div>
                      <div className="text-center border-l border-white/10">
                        <div className="text-[10px] text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1">Seating</div>
                        <div className="font-semibold text-sm">7 Seats</div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
