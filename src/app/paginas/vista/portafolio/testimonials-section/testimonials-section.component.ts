import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription, interval } from 'rxjs';

import { PortfolioService } from '../../../../core/services/portfolio.service';
import { TestimonialsData, Testimonial } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.css'
})
export class TestimonialsSectionComponent implements OnInit, OnDestroy {

  // Data
  testimonialsData: TestimonialsData | null = null;
  isLoading = true;

  // Carousel state
  currentIndex = 0;
  autoPlayInterval?: Subscription;
  isAutoPlaying = true;

  private platformId = inject(PLATFORM_ID);
  private portfolioService = inject(PortfolioService);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.loadTestimonialsData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.stopAutoPlay();
  }

  private loadTestimonialsData(): void {
    const sub = this.portfolioService.getTestimonialsData().subscribe({
      next: (data) => {
        this.testimonialsData = data;
        this.isLoading = false;
        
        // Start auto-play after data is loaded
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.startAutoPlay(), 2000);
        }
      },
      error: (error) => {
        console.error('Error loading testimonials data:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  // Carousel navigation
  next(): void {
    if (!this.testimonialsData) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.testimonialsData.testimonials.length;
    this.resetAutoPlay();
  }

  previous(): void {
    if (!this.testimonialsData) return;
    
    this.currentIndex = this.currentIndex === 0 
      ? this.testimonialsData.testimonials.length - 1 
      : this.currentIndex - 1;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  // Auto-play functionality
  private startAutoPlay(): void {
    if (!isPlatformBrowser(this.platformId) || !this.isAutoPlaying) return;
    
    this.autoPlayInterval = interval(5000).subscribe(() => {
      this.next();
    });
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      this.autoPlayInterval.unsubscribe();
      this.autoPlayInterval = undefined;
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    if (this.isAutoPlaying) {
      setTimeout(() => this.startAutoPlay(), 1000);
    }
  }

  toggleAutoPlay(): void {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  // Get star array for rating display
  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => index < rating);
  }

  // Get current testimonial
  get currentTestimonial(): Testimonial | null {
    if (!this.testimonialsData || this.testimonialsData.testimonials.length === 0) {
      return null;
    }
    return this.testimonialsData.testimonials[this.currentIndex];
  }
}
