import gsap from 'gsap';

/* ── Types ── */

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  targetX: number;
  targetY: number;
  /** Speed-based brightness boost */
  speed: number;
  prevX: number;
  prevY: number;
  /** Per-particle hue offset for color variety */
  hueOffset: number;
}

interface HubNode {
  particle: Particle;
  pulsePhase: number;
  ringRadius: number;
  ringAlpha: number;
}

interface DataPacket {
  from: Particle;
  to: Particle;
  progress: number;
  alpha: number;
  size: number;
}

interface MouseRipple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

interface ParticleNetworkOptions {
  particleCount?: number;
  hubCount?: number;
  packetCount?: number;
  connectDistance?: number;
  baseOpacity?: number;
}

const DEFAULTS: Required<ParticleNetworkOptions> = {
  particleCount: 80,
  hubCount: 5,
  packetCount: 18,
  connectDistance: 150,
  baseOpacity: 0.55,
};

/* ── Color palette: Action Blue family with subtle variety ── */
const COLOR_PALETTE_DARK = {
  particle: ['#2997ff', '#4da6ff', '#0071e3', '#66b8ff', '#3399ff'],
  hub: ['#66b8ff', '#4da6ff', '#80ccff'],
  packet: ['#ffffff', '#b3dfff', '#e6f4ff'],
  line: 'rgba(0,102,204,0.10)',
  lineBright: 'rgba(41,151,255,0.25)',
  ripple: 'rgba(41,151,255,0.6)',
};

const COLOR_PALETTE_LIGHT = {
  particle: ['#0066cc', '#0071e3', '#005bb5', '#1a7fd4', '#3388cc'],
  hub: ['#0071e3', '#1a7fd4', '#0066cc'],
  packet: ['#0066cc', '#0071e3', '#1a7fd4'],
  line: 'rgba(0,102,204,0.06)',
  lineBright: 'rgba(0,102,204,0.14)',
  ripple: 'rgba(0,102,204,0.4)',
};

type ColorPalette = typeof COLOR_PALETTE_DARK;

/* ── Particle Network ── */

export class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: Required<ParticleNetworkOptions>;
  private particles: Particle[] = [];
  private hubs: HubNode[] = [];
  private packets: DataPacket[] = [];
  private ripples: MouseRipple[] = [];
  private mouseX = -1000;
  private mouseY = -1000;
  private mouseOnCanvas = false;
  private animFrameId = 0;
  private tweens: gsap.core.Tween[] = [];
  private observer: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private palette: ColorPalette = COLOR_PALETTE_DARK;
  private isDark = true;
  private time = 0;

  constructor(canvas: HTMLCanvasElement, options: ParticleNetworkOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not available');
    this.ctx = ctx;
    this.options = { ...DEFAULTS, ...options };
  }

  /* ═══════════════════════════════════════════
     Lifecycle
     ═══════════════════════════════════════════ */

  init(): void {
    this.readPalette();
    this.resize();
    this.createParticles();
    this.createHubs();
    this.createPackets();
    this.bindEvents();
    this.startThemeObserver();
    this.loop();
  }

  destroy(): void {
    cancelAnimationFrame(this.animFrameId);
    this.tweens.forEach((t) => t.kill());
    this.tweens = [];
    this.particles = [];
    this.hubs = [];
    this.packets = [];
    this.ripples = [];
    this.observer?.disconnect();
    this.resizeObserver?.disconnect();
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseenter', this.onMouseEnter);
    document.removeEventListener('mouseleave', this.onMouseLeave);
  }

  /* ═══════════════════════════════════════════
     Palette & Theme
     ═══════════════════════════════════════════ */

  private readPalette(): void {
    this.isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    this.palette = this.isDark ? COLOR_PALETTE_DARK : COLOR_PALETTE_LIGHT;
  }

  private startThemeObserver(): void {
    this.observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') {
          this.readPalette();
        }
      }
    });
    this.observer.observe(document.documentElement, { attributes: true });
  }

  /* ═══════════════════════════════════════════
     Canvas Sizing
     ═══════════════════════════════════════════ */

  private resize = (): void => {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width;
    const h = rect.height;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  /* ═══════════════════════════════════════════
     Particle Creation
     ═══════════════════════════════════════════ */

  private createParticles(): void {
    const { particleCount } = this.options;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;

    this.particles = Array.from({ length: particleCount }, () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        prevX: x,
        prevY: y,
        radius: 0.8 + Math.random() * 2.5,
        baseAlpha: 0.25 + Math.random() * 0.55,
        targetX: x,
        targetY: y,
        speed: 0,
        hueOffset: Math.random(),
      };
    });
    this.startParticleDrift();
  }

  /* ═══════════════════════════════════════════
     Hub Nodes — Pulsing larger particles
     ═══════════════════════════════════════════ */

  private createHubs(): void {
    const { hubCount } = this.options;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    // Pick random particles to promote to hubs
    const shuffled = [...this.particles].sort(() => Math.random() - 0.5);
    const hubParticles = shuffled.slice(0, hubCount);

    this.hubs = hubParticles.map((p) => {
      p.radius = 2.5 + Math.random() * 2;
      p.baseAlpha = 0.6 + Math.random() * 0.3;
      return {
        particle: p,
        pulsePhase: Math.random() * Math.PI * 2,
        ringRadius: 0,
        ringAlpha: 0,
      };
    });
    this.animateHubPulses();
  }

  private animateHubPulses(): void {
    for (const hub of this.hubs) {
      // Periodic ring pulse
      const pulseHub = (): void => {
        hub.ringRadius = 0;
        hub.ringAlpha = 0.5;
        const tween = gsap.to(hub, {
          ringRadius: 80 + Math.random() * 40,
          ringAlpha: 0,
          duration: 1.5 + Math.random() * 1.5,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(
              () => pulseHub(),
              800 + Math.random() * 2000,
            );
          },
        });
        this.tweens.push(tween);
      };
      // Stagger initial pulses
      setTimeout(() => pulseHub(), hub.pulsePhase * 800);
    }
  }

  /* ═══════════════════════════════════════════
     Data Packets — traveling bright dots
     ═══════════════════════════════════════════ */

  private createPackets(): void {
    const { packetCount } = this.options;
    this.packets = [];

    for (let i = 0; i < packetCount; i++) {
      const a = this.randomParticle();
      const b = this.randomNearby(a);
      this.packets.push({
        from: a,
        to: b,
        progress: Math.random(),
        alpha: 0.6 + Math.random() * 0.4,
        size: 1.2 + Math.random() * 1.8,
      });
    }
    this.animatePackets();
  }

  private randomParticle(): Particle {
    return this.particles[Math.floor(Math.random() * this.particles.length)];
  }

  private randomNearby(from: Particle): Particle {
    // Try to find a nearby particle for more interesting connections
    const nearby = this.particles.filter((p) => {
      if (p === from) return false;
      const dx = p.x - from.x;
      const dy = p.y - from.y;
      return Math.hypot(dx, dy) < this.options.connectDistance * 1.2;
    });
    if (nearby.length > 0) {
      return nearby[Math.floor(Math.random() * nearby.length)];
    }
    // Fallback to any random particle
    const others = this.particles.filter((p) => p !== from);
    return others[Math.floor(Math.random() * others.length)];
  }

  private animatePackets(): void {
    for (const packet of this.packets) {
      this.schedulePacketTravel(packet);
    }
  }

  private schedulePacketTravel(packet: DataPacket): void {
    const duration = 1.2 + Math.random() * 3;
    const tween = gsap.to(packet, {
      progress: 1,
      duration,
      ease: 'power1.inOut',
      onComplete: () => {
        packet.progress = 0;
        packet.from = packet.to;
        packet.to = this.randomNearby(packet.from);
        this.schedulePacketTravel(packet);
      },
    });
    this.tweens.push(tween);
  }

  /* ═══════════════════════════════════════════
     Particle Drift (GSAP-driven)
     ═══════════════════════════════════════════ */

  private startParticleDrift(): void {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const margin = 50;

    for (const p of this.particles) {
      this.scheduleDrift(p, w, h, margin);
    }
  }

  private scheduleDrift(p: Particle, w: number, h: number, margin: number): void {
    const newTargetX = margin + Math.random() * Math.max(w - margin * 2, 1);
    const newTargetY = margin + Math.random() * Math.max(h - margin * 2, 1);
    const duration = 3 + Math.random() * 7;

    const tween = gsap.to(p, {
      targetX: newTargetX,
      targetY: newTargetY,
      duration,
      ease: 'sine.inOut',
      onComplete: () => this.scheduleDrift(p, w, h, margin),
    });
    this.tweens.push(tween);
  }

  /* ═══════════════════════════════════════════
     Events
     ═══════════════════════════════════════════ */

  private bindEvents(): void {
    this.resizeObserver = new ResizeObserver(() => this.resize());
    if (this.canvas.parentElement) {
      this.resizeObserver.observe(this.canvas.parentElement);
    }
    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
    this.canvas.parentElement?.addEventListener('mouseenter', this.onMouseEnter);
    this.canvas.parentElement?.addEventListener('mouseleave', this.onMouseLeave);
  }

  private onMouseMove = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    const prevX = this.mouseX;
    const prevY = this.mouseY;
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;

    // Create ripple on significant mouse movement
    const moveDist = Math.hypot(this.mouseX - prevX, this.mouseY - prevY);
    if (moveDist > 40 && this.mouseOnCanvas) {
      this.ripples.push({
        x: this.mouseX,
        y: this.mouseY,
        radius: 0,
        alpha: 0.5,
      });
      // Animate ripple expansion
      const ripple = this.ripples[this.ripples.length - 1];
      const tween = gsap.to(ripple, {
        radius: 120,
        alpha: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => {
          const idx = this.ripples.indexOf(ripple);
          if (idx >= 0) this.ripples.splice(idx, 1);
        },
      });
      this.tweens.push(tween);
    }
  };

  private onMouseEnter = (): void => {
    this.mouseOnCanvas = true;
  };

  private onMouseLeave = (): void => {
    this.mouseOnCanvas = false;
    this.mouseX = -1000;
    this.mouseY = -1000;
  };

  /* ═══════════════════════════════════════════
     Render Loop
     ═══════════════════════════════════════════ */

  private loop = (): void => {
    this.animFrameId = requestAnimationFrame(this.loop);
    this.render();
  };

  private render(): void {
    const { ctx, canvas, particles, options, palette } = this;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    this.time += 0.016; // ~60fps increment

    // Theme-aware fade-clear for subtle motion trail
    ctx.fillStyle = this.isDark ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
    ctx.fillRect(0, 0, w, h);

    const lerpFactor = 0.03;

    // ── Update particles ──
    for (const p of particles) {
      p.prevX = p.x;
      p.prevY = p.y;
      p.x += (p.targetX - p.x) * lerpFactor;
      p.y += (p.targetY - p.y) * lerpFactor;
      p.speed = Math.hypot(p.x - p.prevX, p.y - p.prevY);

      // Mouse repulsion/attraction (stronger, more visible)
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 250 && dist > 0 && this.mouseOnCanvas) {
        // Attract with stronger force near cursor, gentle repulsion further out
        const force = dist < 80
          ? 0.002 * (1 - dist / 80)   // Strong attraction when close
          : -0.0004 * (1 - (dist - 80) / 170); // Gentle repulsion in outer ring
        p.x += dx * force;
        p.y += dy * force;
      }
    }

    // ── Draw connections ──
    const maxDist = options.connectDistance;
    // Collect connections for data packets to use
    const activeConnections: Array<[Particle, Particle, number]> = [];

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          activeConnections.push([a, b, dist]);
          const alpha = (1 - dist / maxDist) * options.baseOpacity;
          // Brighter lines for closer particles
          const isBright = dist < maxDist * 0.35;
          ctx.strokeStyle = isBright ? palette.lineBright : palette.line;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = isBright ? 0.7 : 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // ── Draw data packets on connections ──
    for (const packet of this.packets) {
      const { from, to, progress, alpha, size } = packet;
      const px = from.x + (to.x - from.x) * progress;
      const py = from.y + (to.y - from.y) * progress;

      // Glow halo
      ctx.shadowColor = palette.packet[0];
      ctx.shadowBlur = 6 + size * 2;
      ctx.fillStyle = palette.packet[Math.floor(Math.random() * palette.packet.length)];
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(px, py, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
      // Bright core
      ctx.shadowBlur = 3;
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = alpha * 0.9;
      ctx.beginPath();
      ctx.arc(px, py, size * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── Draw mouse ripples ──
    for (const ripple of this.ripples) {
      if (ripple.alpha <= 0.01) continue;
      ctx.strokeStyle = palette.ripple;
      ctx.globalAlpha = ripple.alpha;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // ── Draw hub ring pulses ──
    for (const hub of this.hubs) {
      if (hub.ringAlpha <= 0.01) continue;
      const { particle: p } = hub;
      ctx.strokeStyle = palette.hub[0];
      ctx.globalAlpha = hub.ringAlpha * 0.4;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, hub.ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // ── Draw particles (glowing) ──
    for (const p of particles) {
      const alpha = p.baseAlpha * options.baseOpacity;
      const speedBoost = Math.min(p.speed * 3, 0.3);
      const isHub = this.hubs.some((h) => h.particle === p);

      // Particle color from palette (mix based on hueOffset + time)
      const colorIdx = Math.floor((p.hueOffset + this.time * 0.3) % 1 * palette.particle.length) % palette.particle.length;
      const color = isHub
        ? palette.hub[Math.floor(Math.random() * palette.hub.length)]
        : palette.particle[colorIdx];

      // Glow
      ctx.shadowColor = color;
      ctx.shadowBlur = isHub ? 12 : 5 + speedBoost * 8;
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha + speedBoost;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Bright core for larger particles
      if (p.radius > 1.5) {
        ctx.shadowBlur = 2;
        ctx.fillStyle = isHub ? '#ffffff' : 'rgba(255,255,255,0.5)';
        ctx.globalAlpha = (alpha + speedBoost) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── Draw hub cross-connections (brighter) ──
    for (let i = 0; i < this.hubs.length; i++) {
      for (let j = i + 1; j < this.hubs.length; j++) {
        const a = this.hubs[i].particle;
        const b = this.hubs[j].particle;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist * 1.8) {
          const alpha = (1 - dist / (maxDist * 1.8)) * 0.35;
          ctx.strokeStyle = palette.lineBright;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.shadowColor = palette.hub[0];
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // ── Cursor glow ──
    if (this.mouseOnCanvas) {
      const glowGrad = ctx.createRadialGradient(
        this.mouseX, this.mouseY, 0,
        this.mouseX, this.mouseY, 80,
      );
      glowGrad.addColorStop(0, 'rgba(41,151,255,0.06)');
      glowGrad.addColorStop(0.5, 'rgba(41,151,255,0.03)');
      glowGrad.addColorStop(1, 'rgba(41,151,255,0)');
      ctx.fillStyle = glowGrad;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(this.mouseX, this.mouseY, 80, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reset
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}
