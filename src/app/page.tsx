"use client";

import { useState, useEffect } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroSlider } from "@/sections/HomePageHeroSlider";
import { TrustBadges } from "@/sections/TrustBadges";
import { SafetyCategories } from "@/sections/SafetyCategories";
import { FeaturedProducts } from "@/sections/featuredProducts";
import { PartnersSection } from "@/sections/partners-section";

// ========== ELEGANT SHAPE COMPONENT (same as before) ==========
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/15",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

// ========== UNDER CONSTRUCTION VIEW ==========
function UnderConstructionView({ onShowProgress }: { onShowProgress: () => void }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2); // Launch in 5 days

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: cubicBezier(0.25, 0.4, 0.25, 1),
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/3 via-transparent to-red-500/3 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-orange-500/[0.12]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-red-500/[0.12]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-amber-500/[0.12]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/8 mb-8">
            <Circle className="h-2 w-2 fill-orange-500" />
            <span className="text-sm text-orange-400/80">Nairobi, Kenya</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-b from-white to-white/80">
                Certified Safety Gear
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-300 via-white/90 to-red-300">
                For Nairobi & Nationwide
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg text-white/40 mb-8 font-light max-w-xl mx-auto px-4">
              KEBS-compliant PPE including masks, gloves, bee suits, safety shoes, and high-visibility gear.
            </p>
          </motion.div>

          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-white/40">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-sm text-white/40">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-white/40">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-sm text-white/40">Seconds</div>
              </div>
            </div>
            <button
              onClick={onShowProgress}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition-colors w-full sm:w-auto"
            >
              View Progress
            </button>
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

// ========== REAL HOME PAGE CONTENT ==========
function RealHomePageContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Your real homepage content goes here */}
      <header className=" py-2">
        <HeroSlider />
      </header>
      <TrustBadges />

      <main className="container py-12 w-full mx-auto px-4">
        {/* Trust badges section */}

        {/* Categories section */}
        <SafetyCategories />

      </main>
      <div className="text-center mt-12">
        <FeaturedProducts />
      </div>
      <PartnersSection />
    </div>
  );
}

// ========== MAIN PAGE COMPONENT ==========
export default function HomePage() {
  const [showRealContent, setShowRealContent] = useState(false);

  if (showRealContent) {
    return <RealHomePageContent />;
  }

  return <UnderConstructionView onShowProgress={() => setShowRealContent(true)} />;
}