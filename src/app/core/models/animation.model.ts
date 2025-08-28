// Animation related models
export interface AnimationConfig {
  enableAOS: boolean;
  enableParallax: boolean;
  enableTypewriter: boolean;
  duration: number;
  easing: string;
}

export interface CounterAnimation {
  target: number;
  current: number;
  duration: number;
  isAnimating: boolean;
}

export interface SkillBarAnimation {
  skill: string;
  percentage: number;
  isAnimated: boolean;
}

export interface TypewriterConfig {
  strings: string[];
  speed: number;
  backSpeed: number;
  loop: boolean;
  showCursor: boolean;
}

export interface ParallaxConfig {
  speed: number;
  direction: 'up' | 'down' | 'left' | 'right';
  enabled: boolean;
}