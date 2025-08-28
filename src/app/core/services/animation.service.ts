import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AnimationConfig, CounterAnimation, SkillBarAnimation } from '../models/animation.model';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  
  private animationConfig = signal<AnimationConfig>(environment.portfolio.animations);

  constructor() {}

  // Counter Animation
  animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      const current = Math.floor(start);
      element.textContent = current.toString();
      
      if (start >= target) {
        element.textContent = target.toString();
        clearInterval(timer);
      }
    }, 16);
  }

  // Animate multiple counters
  animateCounters(counters: { element: HTMLElement; target: number; duration?: number }[]): void {
    counters.forEach(counter => {
      this.animateCounter(counter.element, counter.target, counter.duration || 2000);
    });
  }

  // Skill Bar Animation
  animateSkillBar(element: HTMLElement, percentage: number): void {
    const progressBar = element.querySelector('.skill-progress') as HTMLElement;
    
    if (progressBar) {
      // Set CSS custom property for the target percentage
      progressBar.style.setProperty('--skill-percentage', `${percentage}%`);
      
      // Trigger animation
      element.classList.add('animate');
      
      // Remove animation class after completion
      setTimeout(() => {
        element.classList.remove('animate');
      }, 2000);
    }
  }

  // Animate multiple skill bars
  animateSkillBars(skillBars: SkillBarAnimation[]): void {
    skillBars.forEach((skill, index) => {
      setTimeout(() => {
        const element = document.querySelector(`[data-skill="${skill.skill}"]`) as HTMLElement;
        if (element) {
          this.animateSkillBar(element, skill.percentage);
        }
      }, index * 200); // Stagger animations
    });
  }

  // Typewriter Effect
  typewriterEffect(element: HTMLElement, text: string, speed: number = 100): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      element.textContent = '';
      
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  // Multiple typewriter texts with rotation
  async rotatingTypewriter(element: HTMLElement, texts: string[], speed: number = 100, pauseDuration: number = 2000): Promise<void> {
    for (const text of texts) {
      await this.typewriterEffect(element, text, speed);
      await this.delay(pauseDuration);
      
      // Clear text with backspace effect
      await this.backspaceEffect(element, speed / 2);
      await this.delay(500);
    }
  }

  // Backspace effect
  private backspaceEffect(element: HTMLElement, speed: number = 50): Promise<void> {
    return new Promise((resolve) => {
      const text = element.textContent || '';
      let i = text.length;
      
      const timer = setInterval(() => {
        if (i > 0) {
          element.textContent = text.substring(0, i - 1);
          i--;
        } else {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  // Scroll-based animations
  onScrollAnimation(callback: (scrollY: number, windowHeight: number) => void): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        callback(scrollY, windowHeight);
      });
    }
  }

  // Parallax effect
  parallaxScroll(elements: { element: HTMLElement; speed: number; direction?: 'up' | 'down' }[]): void {
    this.onScrollAnimation((scrollY) => {
      elements.forEach(({ element, speed, direction = 'up' }) => {
        const yPos = direction === 'up' ? -(scrollY * speed) : (scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Fade in animation on scroll
  fadeInOnScroll(elements: HTMLElement[], threshold: number = 0.1): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: threshold
      });

      elements.forEach(el => observer.observe(el));
    }
  }

  // Stagger animation for lists
  staggerAnimation(elements: HTMLElement[], delay: number = 100, animationClass: string = 'animate-in'): void {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * delay);
    });
  }

  // Pulse animation
  pulseAnimation(element: HTMLElement, duration: number = 1000, iterations: number = 3): void {
    element.style.animation = `pulse ${duration}ms ease-in-out ${iterations}`;
    
    setTimeout(() => {
      element.style.animation = '';
    }, duration * iterations);
  }

  // Bounce animation
  bounceAnimation(element: HTMLElement, duration: number = 600): void {
    element.style.animation = `bounce ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  }

  // Shake animation
  shakeAnimation(element: HTMLElement, duration: number = 500): void {
    element.style.animation = `shake ${duration}ms ease-in-out`;
    
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  }

  // Slide in from direction
  slideIn(element: HTMLElement, direction: 'left' | 'right' | 'up' | 'down', duration: number = 500): void {
    const transforms = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)'
    };

    element.style.transform = transforms[direction];
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      element.style.transform = 'translate(0, 0)';
      element.style.opacity = '1';
    });

    // Clean up styles
    setTimeout(() => {
      element.style.transform = '';
      element.style.opacity = '';
      element.style.transition = '';
    }, duration);
  }

  // Scale animation
  scaleAnimation(element: HTMLElement, fromScale: number = 0, toScale: number = 1, duration: number = 500): void {
    element.style.transform = `scale(${fromScale})`;
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

    requestAnimationFrame(() => {
      element.style.transform = `scale(${toScale})`;
      element.style.opacity = '1';
    });

    setTimeout(() => {
      element.style.transform = '';
      element.style.opacity = '';
      element.style.transition = '';
    }, duration);
  }

  // Rotate animation
  rotateAnimation(element: HTMLElement, degrees: number = 360, duration: number = 1000): void {
    element.style.transition = `transform ${duration}ms ease-in-out`;
    element.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
      element.style.transition = '';
      element.style.transform = '';
    }, duration);
  }

  // Utility function for delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get animation configuration
  getAnimationConfig(): AnimationConfig {
    return this.animationConfig();
  }

  // Update animation configuration
  updateAnimationConfig(config: Partial<AnimationConfig>): void {
    this.animationConfig.update(current => ({ ...current, ...config }));
  }
}