import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSectionComponent } from '../portafolio/hero-section/hero-section.component';
import { AboutSectionComponent } from '../portafolio/about-section/about-section.component';
import { ServicesSectionComponent } from '../portafolio/services-section/services-section.component';
import { ProjectsSectionComponent } from '../portafolio/projects-section/projects-section.component';
import { TestimonialsSectionComponent } from '../portafolio/testimonials-section/testimonials-section.component';
import { ContactSectionComponent } from '../portafolio/contact-section/contact-section.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeroSectionComponent,
    AboutSectionComponent,
    ServicesSectionComponent,
    ProjectsSectionComponent,
    TestimonialsSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {}
