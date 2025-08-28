import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';

import { PortfolioService } from '../../../../core/services/portfolio.service';
import { AnimationService } from '../../../../core/services/animation.service';
import { HeroData } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  
  @ViewChild('heroTitle', { static: false }) heroTitle?: ElementRef;
  @ViewChild('statsContainer', { static: false }) statsContainer?: ElementRef;

  // FontAwesome icons
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;

  // Data
  heroData: HeroData | null = null;
  isLoading = true;

  // Animation states
  isTypewriterActive = false;
  currentTypewriterIndex = 0;
  typewriterTexts: string[] = [];

  private platformId = inject(PLATFORM_ID);
  private portfolioService = inject(PortfolioService);
  private animationService = inject(AnimationService);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.loadHeroData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadHeroData(): void {
    const sub = this.portfolioService.getHeroData().subscribe({
      next: (data) => {
        this.heroData = data;
        this.setupTypewriterTexts();
        this.isLoading = false;
        
        // Initialize animations after data is loaded
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initializeAnimations(), 100);
        }
      },
      error: (error) => {
        console.error('Error loading hero data:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  private setupTypewriterTexts(): void {
    if (this.heroData) {
      this.typewriterTexts = [
        this.heroData.role,
        'Desarrollador Frontend Especializado',
        'Creador de Experiencias Digitales',
        'Experto en Angular & Laravel'
      ];
    }
  }

  private initializeAnimations(): void {
    // Animate stats counters
    this.animateStatsCounters();
    
    // Start typewriter effect
    this.startTypewriterAnimation();

    // Initialize parallax and other scroll-based animations
    this.initializeScrollAnimations();
  }

  private animateStatsCounters(): void {
    if (!this.heroData || !isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const counters = [
        {
          element: document.querySelector('.projects-counter') as HTMLElement,
          target: this.heroData!.stats.projectsCompleted,
          duration: 2000
        },
        {
          element: document.querySelector('.experience-counter') as HTMLElement,
          target: this.heroData!.stats.yearsExperience,
          duration: 1500
        },
        {
          element: document.querySelector('.clients-counter') as HTMLElement,
          target: this.heroData!.stats.happyClients,
          duration: 2200
        },
        {
          element: document.querySelector('.technologies-counter') as HTMLElement,
          target: this.heroData!.stats.technologiesMastered,
          duration: 1800
        }
      ].filter(counter => counter.element); // Filter out null elements

      this.animationService.animateCounters(counters);
    }, 1000);
  }

  private startTypewriterAnimation(): void {
    if (!isPlatformBrowser(this.platformId) || this.typewriterTexts.length === 0) return;

    const roleElement = document.querySelector('.hero-role') as HTMLElement;
    if (roleElement) {
      this.isTypewriterActive = true;
      this.rotateTypewriterTexts(roleElement);
    }
  }

  private async rotateTypewriterTexts(element: HTMLElement): Promise<void> {
    for (let i = 0; i < this.typewriterTexts.length; i++) {
      this.currentTypewriterIndex = i;
      
      // Type the text
      await this.animationService.typewriterEffect(element, this.typewriterTexts[i], 80);
      
      // Pause to read
      await this.delay(2500);
      
      // Only backspace if it's not the last text or if we want to loop
      if (i < this.typewriterTexts.length - 1) {
        await this.backspaceText(element, 40);
        await this.delay(500);
      }
    }
    
    this.isTypewriterActive = false;
  }

  private backspaceText(element: HTMLElement, speed: number): Promise<void> {
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

  private initializeScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Parallax effect for background
    const heroBackground = document.querySelector('.hero-background') as HTMLElement;
    if (heroBackground) {
      this.animationService.parallaxScroll([
        { element: heroBackground, speed: 0.5, direction: 'down' }
      ]);
    }
  }

  // Public methods for template
  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  openExternalLink(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }

  downloadCV(): void {
    // TODO: Implement CV download functionality
    console.log('Downloading CV...');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
