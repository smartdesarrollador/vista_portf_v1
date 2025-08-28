import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { PortfolioService } from '../../../../core/services/portfolio.service';
import { AnimationService } from '../../../../core/services/animation.service';
import { AboutData } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent implements OnInit, OnDestroy {

  @ViewChild('skillsContainer', { static: false }) skillsContainer?: ElementRef;

  // Data
  aboutData: AboutData | null = null;
  isLoading = true;

  // Animation states
  skillsAnimated = false;

  private platformId = inject(PLATFORM_ID);
  private portfolioService = inject(PortfolioService);
  private animationService = inject(AnimationService);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.loadAboutData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadAboutData(): void {
    const sub = this.portfolioService.getAboutData().subscribe({
      next: (data) => {
        this.aboutData = data;
        this.isLoading = false;
        
        // Initialize animations after data is loaded
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initializeAnimations(), 100);
        }
      },
      error: (error) => {
        console.error('Error loading about data:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  private initializeAnimations(): void {
    // Initialize scroll-based animations
    this.initializeSkillBarsAnimation();
  }

  private initializeSkillBarsAnimation(): void {
    if (!isPlatformBrowser(this.platformId) || !this.aboutData) return;

    // Observe when skills section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.skillsAnimated) {
          this.animateSkillBars();
          this.skillsAnimated = true;
        }
      });
    }, {
      threshold: 0.3
    });

    // Observe skills container
    setTimeout(() => {
      const skillsElement = document.querySelector('.skills-grid');
      if (skillsElement) {
        observer.observe(skillsElement);
      }
    }, 500);
  }

  private animateSkillBars(): void {
    if (!this.aboutData) return;

    // Get all skill categories
    const skillCategories = [
      { name: 'frontend', skills: this.aboutData.skills.frontend },
      { name: 'backend', skills: this.aboutData.skills.backend },
      { name: 'tools', skills: this.aboutData.skills.tools },
      { name: 'methodologies', skills: this.aboutData.skills.methodologies }
    ];

    // Animate each skill category with staggered timing
    skillCategories.forEach((category, categoryIndex) => {
      setTimeout(() => {
        category.skills.forEach((skill, skillIndex) => {
          setTimeout(() => {
            const skillElement = document.querySelector(`[data-skill-category="${category.name}"] [data-skill-index="${skillIndex}"]`);
            const progressBar = skillElement?.querySelector('.skill-progress') as HTMLElement;
            
            if (skillElement && progressBar) {
              skillElement.classList.add('animate-skill');
              
              // Animate progress bar
              const targetWidth = this.getSkillLevel(skill);
              progressBar.style.setProperty('--skill-width', `${targetWidth}%`);
              progressBar.style.width = `${targetWidth}%`;
            }
          }, skillIndex * 100);
        });
      }, categoryIndex * 200);
    });
  }

  // Get skill level for animation (mock data)
  getSkillLevel(skill: string): number {
    const skillLevels: { [key: string]: number } = {
      'Angular': 95,
      'React': 90,
      'Vue.js': 85,
      'TypeScript': 95,
      'Tailwind CSS': 90,
      'SASS': 85,
      'Laravel': 90,
      'Node.js': 85,
      'Python': 80,
      'PostgreSQL': 85,
      'MongoDB': 80,
      'Redis': 75,
      'Docker': 85,
      'AWS': 80,
      'Git': 95,
      'Figma': 85,
      'Photoshop': 75,
      'Webpack': 70,
      'Agile': 90,
      'Scrum': 90,
      'TDD': 85,
      'DevOps': 75,
      'CI/CD': 80
    };

    return skillLevels[skill] || 70;
  }
}
