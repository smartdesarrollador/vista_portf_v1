import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { PortfolioService } from '../../../../core/services/portfolio.service';
import { ProjectsData, Project } from '../../../../core/models/portfolio.model';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css'
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {

  @ViewChild('projectsGrid', { static: false }) projectsGrid?: ElementRef;

  // Data
  projectsData: ProjectsData | null = null;
  filteredProjects: Project[] = [];
  allProjects: Project[] = [];
  isLoading = true;

  // Filter state
  selectedCategory = 'Todos';
  categories: string[] = [];

  // Animation states
  projectsAnimated = false;
  
  // Modal state
  selectedProject: Project | null = null;
  isModalOpen = false;
  selectedImageIndex = 0;

  private platformId = inject(PLATFORM_ID);
  private portfolioService = inject(PortfolioService);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.loadProjectsData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadProjectsData(): void {
    const sub = this.portfolioService.getProjectsData().subscribe({
      next: (data) => {
        this.projectsData = data;
        this.categories = data.categories;
        this.allProjects = [...data.featured, ...data.projects];
        this.filteredProjects = [...this.allProjects];
        this.isLoading = false;
        
        // Initialize animations after data is loaded
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initializeAnimations(), 100);
        }
      },
      error: (error) => {
        console.error('Error loading projects data:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.add(sub);
  }

  private initializeAnimations(): void {
    this.initializeProjectsAnimation();
  }

  private initializeProjectsAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Observe when projects grid comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.projectsAnimated) {
          this.animateProjectCards();
          this.projectsAnimated = true;
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe projects grid
    setTimeout(() => {
      const gridElement = document.querySelector('.projects-grid');
      if (gridElement) {
        observer.observe(gridElement);
      }
    }, 500);
  }

  private animateProjectCards(): void {
    // Animate each project card with staggered timing
    this.filteredProjects.forEach((project, index) => {
      setTimeout(() => {
        const cardElement = document.querySelector(`[data-project-id="${project.id}"]`);
        if (cardElement) {
          cardElement.classList.add('animate-project');
        }
      }, index * 150);
    });
  }

  // Filter projects by category
  filterProjects(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'Todos') {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter(project => project.category === category);
    }

    // Re-animate filtered projects
    setTimeout(() => {
      this.animateProjectCards();
    }, 100);
  }

  // Open project modal
  openProjectModal(project: Project): void {
    this.selectedProject = project;
    this.selectedImageIndex = 0;
    this.isModalOpen = true;
    
    // Prevent body scroll
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  // Close project modal
  closeProjectModal(): void {
    this.isModalOpen = false;
    this.selectedProject = null;
    
    // Restore body scroll
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  // Navigate gallery images
  previousImage(): void {
    if (this.selectedProject && this.selectedProject.gallery) {
      this.selectedImageIndex = 
        this.selectedImageIndex > 0 
          ? this.selectedImageIndex - 1 
          : this.selectedProject.gallery.length - 1;
    }
  }

  nextImage(): void {
    if (this.selectedProject && this.selectedProject.gallery) {
      this.selectedImageIndex = 
        this.selectedImageIndex < this.selectedProject.gallery.length - 1 
          ? this.selectedImageIndex + 1 
          : 0;
    }
  }

  // Get project category icon
  getCategoryIcon(category: string): string {
    const icons = {
      'Frontend': 'fas fa-code',
      'Backend': 'fas fa-server',
      'Full Stack': 'fas fa-layer-group',
      'UI/UX': 'fas fa-palette',
      'Mobile': 'fas fa-mobile-alt'
    };
    return icons[category as keyof typeof icons] || 'fas fa-folder';
  }

  // Get project technology badge color
  getTechBadgeColor(tech: string): string {
    const colors = {
      'Angular': 'bg-red-500',
      'React': 'bg-blue-500',
      'Vue.js': 'bg-green-500',
      'Laravel': 'bg-orange-500',
      'Node.js': 'bg-green-600',
      'TypeScript': 'bg-blue-600',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-indigo-500',
      'PHP': 'bg-purple-500'
    };
    return colors[tech as keyof typeof colors] || 'bg-gray-500';
  }

  // Handle external links
  openExternalLink(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }

  // Handle keyboard events for modal
  onModalKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.closeProjectModal();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }
}
