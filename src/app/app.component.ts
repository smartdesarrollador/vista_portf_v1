import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { environment } from '../environments/environment';

// Import AOS
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Alex Rivera - Developer Portfolio';
  
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Initialize AOS only in browser environment (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAOS();
    }
  }

  private initializeAOS(): void {
    const animations = environment.portfolio.animations;
    
    if (animations.enableAOS) {
      AOS.init({
        duration: animations.duration,
        easing: animations.easing as any,
        once: true, // Only animate once when scrolling down
        offset: 120, // Trigger animations 120px before element comes into view
        delay: 0,
        disable: false, // Disable on mobile if needed
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99
      });
    }
  }
}
