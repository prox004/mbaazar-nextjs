document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const cardContainer = document.querySelector(".card-container");
  const stickyHeader = document.querySelector(".sticky-header h1");

  // window.addEventListener('scroll',(e) => {
  //   document.querySelector('.card-container').scrollIntoView()
  //   console.log("ge")
  // })


  let isGapAnimationCompleted = false;
  let isFlipAnimationCompleted = false;

  function initAnimations() {
    // Kill all existing ScrollTriggers before reinitializing
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const mm = gsap.matchMedia();

    // For smaller screens
    mm.add("(max-width: 999px)", () => {
      document
        .querySelectorAll(".card, .card-container, .sticky-header h1")
        .forEach((el) => (el.style = ""));
      return {};
    });

    // For larger screens
    mm.add("(min-width: 1000px)", () => {
      ScrollTrigger.create({
        trigger: ".sticky",
        start: "top top",
        end: `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,

        onUpdate: (self) => {
          const progress = self.progress;

          // Sticky header fade-in & movement
          if (progress >= 0.1 && progress <= 0.25) {
            const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
            const yValue = gsap.utils.mapRange(0, 1, 40, 0, headerProgress);
            const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

            gsap.set(stickyHeader, {
              y: yValue,
              opacity: opacityValue,
            });
          } else if (progress < 0.1) {
            gsap.set(stickyHeader, { y: 40, opacity: 0 });
          } else if (progress > 0.25) {
            gsap.set(stickyHeader, { y: 0, opacity: 1 });
          }

          // Card container width animation
          if (progress <= 0.25) {
            const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
            gsap.set(cardContainer, { width: `${widthPercentage}%` });
          } else {
            gsap.set(cardContainer, { width: "60%" });
          }

          // Gap & border-radius animation
          if (progress >= 0.35 && !isGapAnimationCompleted) {
            gsap.to(cardContainer, {
              gap: "20px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to(["#card-1", "#card-2", "#card-3"], {
              borderRadius: "20px",
              duration: 0.5,
              ease: "power3.out",
            });

            isGapAnimationCompleted = true;
          } else if (progress < 0.35 && isGapAnimationCompleted) {
            gsap.to(cardContainer, {
              gap: "0px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-1", {
              borderRadius: "20px 0 0 20px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-2", {
              borderRadius: "0px",
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to("#card-3", {
              borderRadius: "0 20px 20px 0",
              duration: 0.5,
              ease: "power3.out",
            });

            isGapAnimationCompleted = false;
          }

          // Flip animation
          if (progress >= 0.6 && !isFlipAnimationCompleted) {
            gsap.to(".card", {
              rotationY: 180,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: 0.1,
            });

            gsap.to(["#card-1", "#card-3"], {
              y: 30,
              rotationZ: (i) => [-15, 15][i],
              duration: 0.75,
              ease: "power3.inOut",
            });
            
            isFlipAnimationCompleted = true;
            setTimeout( () => {
            document.querySelectorAll('.card-front').forEach(card => {  
              card.style.display = 'none';
            }),
            document.querySelectorAll('.card-back').forEach(card => {  
              card.style.display = 'flex';
            }
            )}, 1000);
            
            
          } else if (progress < 0.6 && isFlipAnimationCompleted) {
            gsap.to(".card", {
              rotationY: 0,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: -0.1,
            });

            gsap.to(["#card-1", "#card-3"], {
              y: 0,
              rotationZ: 0,
              duration: 0.75,
              ease: "power3.inOut",
            });

            isFlipAnimationCompleted = false;
            setTimeout( () => {
            document.querySelectorAll('.card-front').forEach(card => {  
              card.style.display = 'block';
            }),
            document.querySelectorAll('.card-back').forEach(card => {  
              card.style.display = 'none';
            }
            )}, 1000);
          }
        },
      });
    });
  }

  // Initialize animations
  initAnimations();

  // Re-initialize on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initAnimations();
    }, 250);
  });
});
