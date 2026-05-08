import React, { useEffect, useRef } from 'react';
import gsap, { Power0 } from 'gsap';

interface BackgroundCanvasProps {
  bgImage?: string;
  particleCount?: number;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ 
  bgImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/redLightBg.jpg',
  particleCount = 105 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseProps = useRef({ x: 0, y: 0 });
  const particles = useRef<any[]>([]);
  const images = useRef<{ bg: HTMLImageElement; lights: HTMLImageElement[] }>({
    bg: new Image(),
    lights: [new Image(), new Image(), new Image()],
  });

  const speed = 0.15;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = (canvas.width = window.innerWidth);
    let ch = (canvas.height = window.innerHeight);

    mouseProps.current = { x: cw / 2, y: ch / 2 };

    const rand = (min = 0, max = 1) => min + (max - min) * Math.random();

    class Particle {
      index: number;
      img: HTMLImageElement;
      x: number;
      y: number;
      progress: number;
      opacity: number;
      scale: number;
      size: number;
      dur: number;
      rot: number;

      constructor(index: number) {
        this.index = index;
        this.img = images.current.lights[index % 3];
        this.x = this.y = this.progress = this.opacity = this.scale = 1;
        this.size = 25 + 400 * ((index + 1) / particleCount);
        if (index > particleCount * 0.96) this.size *= 4;

        this.dur = (2 - 1 * ((index + 1) / particleCount)) / speed;
        this.rot = -rand(3, 5);
        if (index % 3 === 0) this.rot = -this.rot;
      }

      draw() {
        if (!ctx) return;
        const offsetX = -(mouseProps.current.x - cw / 2) * (this.size / 1000);
        const offsetY = -(mouseProps.current.y - ch / 2) * (this.size / 1000);
        const size = this.size * this.scale;

        ctx.save();
        ctx.translate(this.x + offsetX, this.y + offsetY);
        ctx.rotate(this.rot * this.progress);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
    }

    const setParticle = (p: Particle, replay: boolean = false) => {
      gsap.killTweensOf(p);
      const tl = gsap.timeline()
        .fromTo(p, {
          x: rand(-p.size / 2, cw + p.size),
          y: rand(-p.size / 2, ch + p.size),
          progress: 0,
          scale: () => (p.index % 2 === 0 ? 0.8 : rand(2.5, 5)),
        }, {
          duration: p.dur,
          x: '+=' + String(rand(-100, 100)),
          y: '+=' + String(rand(-50, 50)),
          scale: () => (p.index % 2 === 0 ? rand(2.5, 5) : 0.8),
          progress: 1,
          ease: Power0.easeNone,
          onComplete: () => setParticle(p, true),
        }, 0)
        .fromTo(p, {
          opacity: 0
        }, {
          duration: p.dur / 4,
          opacity: 1,
          yoyo: true,
          repeat: 3,
          ease: 'power4.in'
        }, 0);

      if (!replay) tl.seek(p.dur * rand());
    };

    const init = () => {
      particles.current.forEach(p => gsap.killTweensOf(p));
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        const p = new Particle(i);
        particles.current.push(p);
        setParticle(p);
      }
    };

    // Load lights first then initial bg
    images.current.lights[0].src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/blurLight1.png';
    images.current.lights[1].src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/blurLight2.png';
    images.current.lights[2].src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/721952/blurLight3.png';

    let imagesLoaded = 0;
    const totalLights = 3;
    const onLightLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === totalLights) {
        init();
      }
    };
    images.current.lights.forEach(img => (img.onload = onLightLoad));

    const tickerUpdate = () => {
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(images.current.bg, 0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particleCount; i++) {
        if (particles.current[i]) particles.current[i].draw();
      }
    };

    gsap.ticker.add(tickerUpdate);

    const handleResize = () => {
      cw = (canvas.width = window.innerWidth);
      ch = (canvas.height = window.innerHeight);
      init(); // Re-init on resize to fix positions
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Smoother, fluid-like easing with long duration
      gsap.to(mouseProps.current, {
        duration: 8,
        x: e.clientX,
        y: e.clientY,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      particles.current.forEach(p => gsap.killTweensOf(p));
    };
  }, [particleCount]);

  useEffect(() => {
    images.current.bg.src = bgImage;
  }, [bgImage]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 bg-black"
    />
  );
};

export default BackgroundCanvas;
