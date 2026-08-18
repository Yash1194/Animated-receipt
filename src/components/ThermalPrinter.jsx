import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { RefreshCw, Scissors, Sparkles, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ThermalPrinter({
  receiptData,
  paperSkin,
  printSpeed = 0.4,
  customStamp,
  onReceiptTorn,
  autoPrintCount
}) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(-100); // % position of translateY
  const [isStamped, setIsStamped] = useState(false);
  const [isTorn, setIsTorn] = useState(false);
  const [status, setStatus] = useState({ title: 'Ready to Print', subtitle: 'Thermal Feed Idle', icon: '⚡', color: 'text-amber-400' });
  const [rollRotation, setRollRotation] = useState(0);

  const paperRef = useRef(null);
  const viewportRef = useRef(null);
  const tornClonesRef = useRef([]);

  // Print steps percentage positions
  const printSteps = [
    { y: -75, pause: 260, label: 'Printing Header...' },
    { y: -58, pause: 220, label: 'Printing Items (1/3)...' },
    { y: -42, pause: 220, label: 'Printing Items (2/3)...' },
    { y: -26, pause: 240, label: 'Printing Items (3/3)...' },
    { y: -14, pause: 220, label: 'Calculating Taxes & Total...' },
    { y: 0, stamp: true, pause: 200, label: 'Applying Invoice Stamp...' }
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
      color: 'text-blue-400'
    });

    let currentStep = 0;

    const executeNextStep = () => {
      if (currentStep < printSteps.length) {
        const step = printSteps[currentStep];
        setPrintProgress(step.y);
        setRollRotation((prev) => prev + 45);

        // Sound effect for motor step
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
          title: 'Payment Complete',
          subtitle: 'Receipt Ready to Tear',
          icon: '✓',
          color: 'text-emerald-400'
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
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f59e0b', '#10b981']
      });
    } catch (e) {}
  };

  // Tear receipt animation & physics calculation
  const tearReceipt = () => {
    if (isPrinting || isTorn) return;
    playTearSound();

    setIsTorn(true);
    setStatus({
      title: 'Receipt Torn & Cut',
      subtitle: 'Archived to Receipt Log',
      icon: '✂',
      color: 'text-purple-400'
    });

    // Notify parent component to log in history gallery
    if (onReceiptTorn) {
      onReceiptTorn({
        ...receiptData,
        paperSkin,
        stamp: customStamp,
        tornAt: new Date().toLocaleTimeString()
      });
    }
  };

  // Auto trigger print on template switch
  useEffect(() => {
    startPrint();
  }, [autoPrintCount]);

  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col items-center select-none">
      {/* Phone / Printer Outer Casing */}
      <div className="w-full bg-[#14171d] rounded-[36px] border-[6px] border-[#222631] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden p-5 md:p-6">
        
        {/* Status Header */}
        <div className="text-center mb-5 z-20">
          <div className={`w-12 h-12 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center mx-auto mb-2 text-xl font-bold transition-all shadow-inner ${status.color}`}>
            {status.icon}
          </div>
          <h2 className="text-base font-bold font-heading tracking-tight text-foreground">
            {status.title}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{status.subtitle}</p>
        </div>

        {/* Viewport & Thermal Mechanism */}
        <div ref={viewportRef} className="relative w-full h-[400px] flex flex-col items-center overflow-hidden rounded-2xl bg-[#0b0c0f] border border-white/5 shadow-inner">
          
          {/* Internal Paper Roll Glass View window */}
          <div className="absolute top-2 left-4 right-4 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between px-4 overflow-hidden backdrop-blur-sm z-20">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full border-2 border-amber-500/40 border-t-amber-400 bg-amber-500/10 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${rollRotation}deg)` }}
              >
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Thermal Roll: 94%
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase">FEED OK</span>
            </div>
          </div>

          {/* Printer Slot Housing */}
          <div className="w-[85%] h-5 bg-[#0a0a0d] rounded-lg p-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] relative z-30 mt-14 border border-amber-500/20">
            <div className="w-full h-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-md shadow-sm opacity-90 relative overflow-hidden">
              {/* Laser Indicator Beam */}
              {isPrinting && (
                <div className="absolute inset-0 bg-cyan-400/40 animate-pulse" />
              )}
            </div>
          </div>

          {/* Thermal Paper Feed Window */}
          <div className="w-[82%] h-full relative z-10 overflow-hidden">
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

            {/* Laser Heat Raster Line (visible during printing) */}
            {isPrinting && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-thermal-scan pointer-events-none z-20" />
            )}
          </div>
        </div>

        {/* Physical Action Buttons */}
        <div className="mt-5 flex gap-3 z-20">
          <button
            onClick={() => {
              playButtonClick();
              startPrint();
            }}
            disabled={isPrinting}
            className="flex-1 py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center justify-center gap-2 border border-border transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isPrinting ? 'animate-spin' : ''}`} />
            <span>Re-print</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              tearReceipt();
            }}
            disabled={isPrinting || isTorn}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-background font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <Scissors className="w-4 h-4" />
            <span>Tear Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
