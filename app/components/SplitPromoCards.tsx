'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SplitPromoCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Desktop Interactions (>= 1000px)
      mm.add('(min-width: 1000px)', () => {
        if (
          !stickyRef.current ||
          !headerRef.current ||
          !cardContainerRef.current ||
          cardsRef.current.length < 3
        )
          return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * 3.5}px`,
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
          },
        });

        // 1. Set Initial States via GSAP to prevent style jumps
        gsap.set(headerRef.current, { y: 40, opacity: 0 });
        gsap.set(cardContainerRef.current, { width: '75%', gap: '0px' });
        gsap.set(cardsRef.current[0], { borderRadius: '20px 0 0 20px' });
        gsap.set(cardsRef.current[1], { borderRadius: '0px' });
        gsap.set(cardsRef.current[2], { borderRadius: '0 20px 20px 0' });

        // 2. Animate Header Fade & Card Container Shrinking (0 -> 1.0)
        tl.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, 0);

        tl.to(cardContainerRef.current, {
          width: '60%',
          duration: 1,
          ease: 'power2.out',
        }, 0);

        // 3. Animate Gap Spread & Border Radius matching (1.0 -> 2.2)
        tl.to(cardContainerRef.current, {
          gap: '24px',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 0.8);

        tl.to(cardsRef.current, {
          borderRadius: '20px',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 0.8);

        // 4. Smooth 3D Rotation Y with flicker prevention
        tl.to(cardsRef.current, {
          rotationY: 180,
          duration: 2.2,
          stagger: 0.2,
          ease: 'power2.inOut',
          force3D: true,
        }, 1.8);

        // 5. Multi-axis split offsets
        tl.to([cardsRef.current[0], cardsRef.current[2]], {
          y: 35,
          rotationZ: (i) => (i === 0 ? -12 : 12),
          duration: 2.2,
          ease: 'power2.inOut',
        }, 1.8);
      });

      // Tablet & Mobile Layout Cleanup (< 1000px)
      mm.add('(max-width: 999px)', () => {
        cardsRef.current.forEach((el) => el?.removeAttribute('style'));
        cardContainerRef.current?.removeAttribute('style');
        headerRef.current?.removeAttribute('style');
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full select-none overflow-x-hidden bg-[#0f0f0f] text-white font-['InstrumentS',_Georgia,_serif]"
    >
      {/* Safe top header buffer zone */}
      <div className="w-full h-16 min-[1000px]:h-24 bg-[#0f0f0f]" />

      {/* Empty Intro Spacer Section */}
      <section className="relative w-full h-[20vh] bg-[#0f0f0f]" />

      {/* Sticky Scroll Animation Core - Centered inside viewports with extra bottom padding space */}
      <section
        ref={stickyRef}
        className="relative flex flex-col justify-center items-center h-auto min-[1000px]:h-screen py-16 px-8 min-[1000px]:py-20 min-[1000px]:px-0 gap-12 min-[1000px]:gap-12"
      >
        <div className="relative w-full z-20">
          <h1
            ref={headerRef}
            className="font-montserrat text-center text-3xl sm:text-5xl mt-10 sm:mt-20 font-medium leading-[1.2] will-change-[transform,opacity]"
          >
            Exclusive Discounts <span className="italic text-red-600">at M Baazar</span>
          </h1>
        </div>

        {/* Card Platform - Increased perspective depth and cleared item overflow boundaries */}
        <div
          ref={cardContainerRef}
          className="relative w-full min-[1000px]:w-[75%] flex flex-col min-[1000px]:flex-row justify-center items-center mx-auto gap-8 min-[1000px]:gap-0 [perspective:2000px] [transform-style:preserve-3d] will-change-[width,gap] overflow-visible pb-16"
        >
          {/* Card 1 - Membership */}
          <div
            ref={(el) => { if (el) cardsRef.current[0] = el; }}
            className="relative w-full max-w-[400px] min-[1000px]:max-w-none min-[1000px]:flex-1 aspect-[5/7] mx-auto [transform-style:preserve-3d] origin-top-center transition-all duration-500 group"
          >
            {/* FRONT */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] overflow-hidden rounded-inherit z-10 [transform:rotateY(0deg)]">
              <img src="/imgs/1.jpg" alt="M Baazar Gold Card" className="w-full h-full object-cover block transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* BACK - Platinum/Gold Theme */}
            {/* BACK - Premium Gold Card */}
            <div className="absolute inset-0 w-full h-full min-[1000px]:h-full min-h-[180px] mt-4 min-[1000px]:mt-0 [backface-visibility:visible] min-[1000px]:[backface-visibility:hidden] min-[1000px]:[-webkit-backface-visibility:hidden] overflow-hidden rounded-[20px] min-[1000px]:rounded-inherit [transform:none] min-[1000px]:[transform:rotateY(180deg)] text-[#1b1405]">

              {/* Gold Base */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#fff6c7_0%,#f8de7e_12%,#d4af37_35%,#b8860b_60%,#f5d76e_80%,#fff1b3_100%)]" />

              {/* Metallic Reflection */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.7)_45%,transparent_70%)]" />

              {/* Premium Pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Logo Area */}
              <div className="relative z-10 flex justify-between items-start p-5 md:p-7">
                <div>
                  <p className="text-[10px] tracking-[0.35em] font-black uppercase text-[#7a5600]">
                    Premium Member
                  </p>
                </div>

                <span className="font-mono font-bold text-[#7a5600] text-xs">
                  #GOLD
                </span>
              </div>

              {/* Center Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-[58%] px-4 md:px-8">

                <h2 className="text-2xl md:text-[2rem] leading-none font-black tracking-tight text-[#7b5200]">
                  GOLD
                </h2>

                <h3 className="mt-1 text-2xl md:text-3xl font-serif italic text-center font-medium text-[#4f3500]">
                  Membership Card
                </h3>

                <div className="w-20 h-[2px] bg-[#8d6a0a]/30 rounded-full my-3 md:my-5" />

                <p className="uppercase text-[10px] md:text-xs tracking-[0.3em] font-black text-[#7a5600]">
                  2X Reward Points
                </p>

                <p className="mt-2 text-[10px] md:text-[11px] text-center text-[#5f4709] max-w-[220px]">
                  Priority access, member-only offers, early sale previews and premium shopping rewards.
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-7 pb-4 md:pb-6">

                <div className="flex justify-between items-end border-t border-[#8f6b0f]/20 pt-3 md:pt-4">

                  <div>
                    <p className="text-[8px] tracking-[0.25em] font-bold text-[#8f6b0f] uppercase">
                      Member Since
                    </p>
                    <p className="font-mono font-bold text-sm text-[#5a4000]">
                      2025
                    </p>
                  </div>

                  {/* EMV Chip */}
                  <div className="relative w-10 h-8 rounded-md border border-[#8f6b0f]/30 bg-gradient-to-br from-[#f5d76e] to-[#c79c25] overflow-hidden">
                    <div className="absolute left-0 right-0 top-2 h-[1px] bg-[#8f6b0f]/30" />
                    <div className="absolute left-0 right-0 top-4 h-[1px] bg-[#8f6b0f]/30" />
                    <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-[#8f6b0f]/30" />
                    <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#8f6b0f]/30" />
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Mega Sale */}
          <div
            ref={(el) => { if (el) cardsRef.current[1] = el; }}
            className="relative w-full max-w-[400px] min-[1000px]:max-w-none min-[1000px]:flex-1 aspect-[5/7] mx-auto [transform-style:preserve-3d] origin-top-center transition-all duration-500 group"
          >
            {/* FRONT */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] overflow-hidden rounded-inherit z-10 [transform:rotateY(0deg)]">
              <img src="/imgs/2.jpg" alt="Mega Sale" className="w-full h-full object-cover block transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* BACK - Luxury Red / Bold Promo Theme */}
            <div className="absolute inset-0 w-full h-full min-[1000px]:h-full min-h-[180px] mt-4 min-[1000px]:mt-0 [backface-visibility:visible] min-[1000px]:[backface-visibility:hidden] min-[1000px]:[-webkit-backface-visibility:hidden] overflow-hidden rounded-[20px] min-[1000px]:rounded-inherit [transform:none] min-[1000px]:[transform:rotateY(180deg)] flex flex-col justify-between p-5 md:p-7 bg-gradient-to-br from-[#990d07] via-[#bd1911] to-[#e12a21] text-white border border-red-400/20 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]">
              {/* Header Details */}
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                  <span className="w-fit px-2 py-0.5 bg-white/10 border border-white/20 text-red-100 rounded-full font-sans font-bold tracking-widest text-[8px] uppercase">
                    Seasonal Event
                  </span>
                  <h3 className="text-red-200 uppercase tracking-[0.15em] text-[10px] font-sans font-black mt-1">PROMOTION PASS</h3>
                </div>
                <span className="font-mono text-xs font-bold text-red-300/70">#02</span>
              </div>

              {/* Core Content */}
              <div className="my-auto flex flex-col items-center text-center px-2">
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-sans font-bold text-red-200/90 mb-1">THE ANNUAL</p>
                <p className="text-3xl md:text-4xl font-black tracking-tighter font-sans uppercase text-white drop-shadow-md">
                  Mega Sale
                </p>
                <div className="w-8 h-[1px] bg-white/40 my-2 md:my-3" />
                <div className="bg-black/15 backdrop-blur-sm border border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
                  <p className="text-sm md:text-base font-black tracking-wide text-white font-sans">
                    UPTO 50% OFF
                  </p>
                  <p className="text-[8px] md:text-[9px] font-semibold text-red-200 uppercase tracking-wider mt-0.5">On New Arrivals</p>
                </div>
              </div>

              {/* Footer / Authentic Details */}
              <div className="flex justify-between items-end w-full pt-3 md:pt-4 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold tracking-widest uppercase text-red-300">ACCESS CODE</span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white">MB-MEGA50</span>
                </div>
                {/* Minimalist Barcode Block for retail authenticity */}
                <div className="flex items-end gap-[1.5px] h-6 opacity-40">
                  <div className="w-[1px] h-full bg-white" /><div className="w-[2px] h-full bg-white" /><div className="w-[1px] h-5 bg-white" /><div className="w-[3px] h-full bg-white" /><div className="w-[1px] h-4 bg-white" /><div className="w-[2px] h-full bg-white" /><div className="w-[1px] h-full bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Welcome Voucher */}
          <div
            ref={(el) => { if (el) cardsRef.current[2] = el; }}
            className="relative w-full max-w-[400px] min-[1000px]:max-w-none min-[1000px]:flex-1 aspect-[5/7] mx-auto [transform-style:preserve-3d] origin-top-center transition-all duration-500 group"
          >
            {/* FRONT */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] overflow-hidden rounded-inherit z-10 [transform:rotateY(0deg)]">
              <img src="/imgs/3.jpg" alt="Voucher Offer" className="w-full h-full object-cover block transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* BACK - Matte Dark / Emerald Luxury Accent Theme */}
            <div className="absolute inset-0 w-full h-full min-[1000px]:h-full min-h-[180px] mt-4 min-[1000px]:mt-0 [backface-visibility:visible] min-[1000px]:[backface-visibility:hidden] min-[1000px]:[-webkit-backface-visibility:hidden] overflow-hidden rounded-[20px] min-[1000px]:rounded-inherit [transform:none] min-[1000px]:[transform:rotateY(180deg)] flex flex-col justify-between p-5 md:p-7 bg-gradient-to-br from-[#1e2022] via-[#121314] to-[#090a0a] text-white border border-emerald-500/20 shadow-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent">
              {/* Header Details */}
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                  <span className="w-fit px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-sans font-bold tracking-widest text-[8px] uppercase">
                    New Member
                  </span>
                  <h3 className="text-zinc-400 uppercase tracking-[0.15em] text-[10px] font-sans font-black mt-1">WELCOME GIFT</h3>
                </div>
                <span className="font-mono text-xs font-bold text-zinc-600">#03</span>
              </div>

              {/* Core Content */}
              <div className="my-auto flex flex-col items-center text-center px-2">
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-emerald-400 font-sans mb-1">VALUED COUPON</p>
                <p className="text-3xl md:text-4xl font-medium tracking-tight font-serif italic text-zinc-100">
                  Voucher Offer
                </p>
                <div className="w-12 h-[2px] bg-emerald-500/30 my-2 md:my-4 rounded-full" />
                <p className="text-xs md:text-sm font-bold text-zinc-200 font-sans tracking-wide">
                  SHOP FOR <span className="text-white font-extrabold">₹1500</span> GET <span className="text-emerald-400 font-extrabold text-[10px] md:text-base bg-emerald-500/10 px-1 md:px-1.5 py-0.5 rounded border border-emerald-500/20">₹500</span>
                </p>
              </div>

              {/* Footer / Authentic Details */}
              <div className="flex justify-between items-end w-full pt-3 md:pt-4 border-t border-zinc-800">
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold tracking-widest uppercase text-zinc-500">SECURITY CODE</span>
                  <span className="text-[10px] font-mono font-bold text-zinc-300">WLC-500-CRED</span>
                </div>
                {/* Clean Geometric Hologram Mimic badge */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
                  <div className="w-3 h-3 rounded-full bg-zinc-900 border border-emerald-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empty Outro Spacer Section */}
      <section className="relative w-full h-[30vh] bg-[#0f0f0f]" />
    </div>
  );
}