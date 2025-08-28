import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { PortfolioService } from '../../../../core/services/portfolio.service';
import { ServicesData, Service } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.css'
})
export class ServicesSectionComponent implements OnInit, OnDestroy {

  // Data
  servicesData: ServicesData | null = null;
  isLoading = true;

  // Animation state
  cardsAnimated = false;

  private platformId = inject(PLATFORM_ID);
  private portfolioService = inject(PortfolioService);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.loadServicesData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadServicesData(): void {
    const sub = this.portfolioService.getServicesData().subscribe({
      next: (data) => {
        this.servicesData = data;
        this.isLoading = false;
        
        // Initialize animations after data is loaded
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initializeAnimations(), 100);
        }
      },
      error: (error) => {
        console.error('Error loading services data:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  private initializeAnimations(): void {
    this.initializeCardAnimations();
  }

  private initializeCardAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Observe when services cards come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.cardsAnimated) {
          this.animateServiceCards();
          this.cardsAnimated = true;
        }
      });
    }, {
      threshold: 0.2
    });

    // Observe services grid
    setTimeout(() => {
      const servicesGrid = document.querySelector('.services-grid');
      if (servicesGrid) {
        observer.observe(servicesGrid);
      }
    }, 500);
  }

  private animateServiceCards(): void {
    if (!this.servicesData) return;

    // Animate each service card with staggered timing
    this.servicesData.services.forEach((service, index) => {
      setTimeout(() => {
        const cardElement = document.querySelector(`[data-service-id="${service.id}"]`);
        if (cardElement) {
          cardElement.classList.add('animate-card');
        }
      }, index * 200);
    });
  }

  // Get service icon classes
  getServiceIconClass(service: Service): string {
    const iconClasses = {
      1: 'fas fa-code text-blue-500',
      2: 'fas fa-server text-green-500',
      3: 'fas fa-palette text-purple-500'
    };
    return iconClasses[service.id as keyof typeof iconClasses] || 'fas fa-cog text-gray-500';
  }

  // Handle service card interaction
  onServiceCardClick(service: Service): void {
    // TODO: Implement service detail modal or navigation
    console.log('Service clicked:', service.title);
  }
}
