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
import { RefreshCw, Scissors } from 'lucide-react';

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
  const [status, setStatus] = useState({ title: 'Ready to Print', subtitle: 'Thermal Motor Idle', icon: '⚡', color: 'text-amber-400' });
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
          title: 'Payment Successful',
          subtitle: 'Ready to Tear',
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
        particleCount: 20,
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
      title: 'Receipt Cut & Torn',
      subtitle: 'Saved to History Log',
      icon: '✂',
      color: 'text-purple-400'
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
    <div className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[410px] mx-auto flex flex-col items-center select-none transition-all">
      {/* Phone / Printer Outer Casing */}
      <div className="w-full bg-[#12151b] rounded-[32px] sm:rounded-[36px] border-[5px] sm:border-[6px] border-[#20242f] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden p-4 sm:p-5">
        
        {/* Status Header */}
        <div className="text-center mb-4 z-20">
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-secondary/80 border border-border flex items-center justify-center mx-auto mb-1.5 text-lg font-bold transition-all shadow-inner ${status.color}`}>
            {status.icon}
          </div>
          <h2 className="text-sm sm:text-base font-bold font-heading tracking-tight text-foreground">
            {status.title}
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">{status.subtitle}</p>
        </div>

        {/* Viewport & Thermal Mechanism */}
        <div ref={viewportRef} className="relative w-full h-[360px] sm:h-[400px] flex flex-col items-center overflow-hidden rounded-2xl bg-[#090a0d] border border-white/5 shadow-inner">
          
          {/* Internal Paper Roll View Window */}
          <div className="absolute top-2 left-3 right-3 h-10 sm:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between px-3 overflow-hidden backdrop-blur-sm z-20">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border-2 border-amber-500/40 border-t-amber-400 bg-amber-500/10 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${rollRotation}deg)` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Paper Roll OK
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase">ONLINE</span>
            </div>
          </div>

          {/* Printer Slot Lip */}
          <div className="w-[86%] h-4.5 bg-[#09090c] rounded-lg p-0.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)] relative z-30 mt-12 border border-amber-500/20">
            <div className="w-full h-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-md shadow-sm opacity-90 relative overflow-hidden">
              {isPrinting && (
                <div className="absolute inset-0 bg-cyan-400/40 animate-pulse" />
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-thermal-scan pointer-events-none z-20" />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2.5 z-20">
          <button
            onClick={() => {
              playButtonClick();
              startPrint();
            }}
            disabled={isPrinting}
            className="flex-1 py-2.5 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 border border-border transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isPrinting ? 'animate-spin' : ''}`} />
            <span>Re-print</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              tearReceipt();
            }}
            disabled={isPrinting || isTorn}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-background font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Tear Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
