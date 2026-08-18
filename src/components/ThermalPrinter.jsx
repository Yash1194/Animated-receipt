import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import ReceiptPaperContent from './ReceiptPaperContent';
import {
  playMotorStep,
  playThermalSizzle,
  playStampThud,
  playTearSound,
  playChaChing,
  playButtonClick
} from '../utils/audio';
import { RefreshCw, Scissors, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function ThermalPrinter({
  receiptData,
  paperSkin,
  printSpeed = 0.4,
  customStamp,
  onReceiptTorn,
  autoPrintCount
}) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(-100);
  const [isStamped, setIsStamped] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [status, setStatus] = useState({ title: 'Thermal Printer Ready', subtitle: 'Motor Standby • 100% Roll', icon: '⚡', color: 'text-lime-600 bg-lime-50 border-lime-200' });
  const [rollRotation, setRollRotation] = useState(0);

  const paperRef = useRef(null);
  const viewportRef = useRef(null);

  // Print steps percentage positions
  const printSteps = [
    { y: -75, pause: 260 },
    { y: -58, pause: 220 },
    { y: -42, pause: 220 },
    { y: -26, pause: 240 },
    { y: -14, pause: 220 },
    { y: 0, stamp: true, pause: 200 }
  ];

  // Start sequential print animation
  const startPrint = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setIsStamped(false);
    setIsTorn(false);
    setPrintProgress(-100);

    setStatus({
      title: 'Printing Transaction...',
      subtitle: 'Real-time motor feed active',
      icon: '⚡',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    });

    let currentStep = 0;

    const executeNextStep = () => {
      if (currentStep < printSteps.length) {
        const step = printSteps[currentStep];
        setPrintProgress(step.y);
        setRollRotation((prev) => prev + 45);

        playMotorStep(currentStep);
        if (currentStep % 2 === 0) playThermalSizzle();

        if (step.stamp) {
          setTimeout(() => {
            setIsStamped(true);
            playStampThud();
            triggerConfetti();
          }, 250);
        }

        currentStep++;
        setTimeout(executeNextStep, step.pause * (printSpeed / 0.4));
      } else {
        setIsPrinting(false);
        playChaChing();
        setStatus({
          title: 'Payment Completed',
          subtitle: 'Ready to Tear & Archive',
          icon: '✓',
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
        });
      }
    };

    setTimeout(executeNextStep, 300);
  };

  // Trigger confetti ink splash on stamp
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 24,
        spread: 50,
        origin: { y: 0.55 },
        colors: ['#84cc16', '#10b981', '#ef4444']
      });
    } catch (e) {}
  };

  // Tear receipt animation & physics calculation
  const tearReceipt = () => {
    if (isPrinting || isTorn) return;
    playTearSound();

    setIsTorn(true);
    setStatus({
      title: 'Receipt Cut & Archived',
      subtitle: 'Log Saved to Database',
      icon: '✂',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    });

    if (onReceiptTorn) {
      onReceiptTorn({
        ...receiptData,
        paperSkin,
        stamp: customStamp,
        tornAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  };

  // Auto trigger print on template switch
  useEffect(() => {
    startPrint();
  }, [autoPrintCount]);

  return (
    <div className="w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[440px] mx-auto flex flex-col items-center select-none transition-all">
      {/* Printer Outer Casing - Bright Dashboard Card Aesthetic */}
      <div className="w-full dashboard-card p-5 sm:p-6 border border-border shadow-xl relative flex flex-col overflow-hidden bg-white">
        
        {/* Status Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-lg font-bold shadow-xs ${status.color}`}>
              {status.icon}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-heading tracking-tight text-foreground">
                {status.title}
              </h3>
              <p className="text-[11px] text-muted-foreground font-medium">{status.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Viewport & Thermal Mechanism */}
        <div ref={viewportRef} className="relative w-full h-[370px] sm:h-[410px] flex flex-col items-center overflow-hidden rounded-2xl bg-[#f8faf9] border border-border/80 shadow-inner">
          
          {/* Internal Paper Roll View Window */}
          <div className="absolute top-2.5 left-3 right-3 h-11 rounded-xl bg-white/90 border border-border flex items-center justify-between px-3.5 shadow-xs backdrop-blur-md z-20">
            <div className="flex items-center gap-2">
              <div
                className="w-6.5 h-6.5 rounded-full border-2 border-lime-500/40 border-t-lime-600 bg-lime-500/10 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${rollRotation}deg)` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-lime-600" />
              </div>
              <span className="text-[11px] font-mono font-bold text-foreground">
                THERMAL ROLL
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">FEED READY</span>
            </div>
          </div>

          {/* Printer Slot Lip */}
          <div className="w-[86%] h-5 bg-[#18221e] rounded-lg p-0.5 shadow-md relative z-30 mt-14 border border-lime-500/30">
            <div className="w-full h-full bg-gradient-to-r from-lime-600 via-lime-400 to-lime-600 rounded-md shadow-sm opacity-95 relative overflow-hidden">
              {isPrinting && (
                <div className="absolute inset-0 bg-white/40 animate-pulse" />
              )}
            </div>
          </div>

          {/* Thermal Paper Feed Window */}
          <div className="w-[83%] h-full relative z-10 overflow-hidden">
            {/* Paper Sheet */}
            <motion.div
              ref={paperRef}
              className="w-full absolute top-0 left-0"
              animate={{
                y: `${isTorn ? -100 : printProgress}%`
              }}
              transition={{
                duration: printSpeed,
                ease: [0.25, 1, 0.5, 1]
              }}
            >
              <ReceiptPaperContent
                data={receiptData}
                paperSkin={paperSkin}
                isStamped={isStamped}
                customStamp={customStamp}
                isTorn={isTorn}
              />
            </motion.div>

            {/* Laser Heat Line */}
            {isPrinting && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-500 to-transparent shadow-[0_0_12px_#84cc16] animate-thermal-scan pointer-events-none z-20" />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3 z-20">
          <button
            onClick={() => {
              playButtonClick();
              startPrint();
            }}
            disabled={isPrinting}
            className="flex-1 py-3 px-4 rounded-2xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center justify-center gap-2 border border-border transition-all disabled:opacity-50 active:scale-[0.98] shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 text-lime-600 ${isPrinting ? 'animate-spin' : ''}`} />
            <span>Re-print</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              tearReceipt();
            }}
            disabled={isPrinting || isTorn}
            className="flex-1 py-3 px-4 rounded-2xl bg-lime-400 hover:bg-lime-500 text-lime-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-lime-400/25 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <Scissors className="w-4 h-4" />
            <span>Tear Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
