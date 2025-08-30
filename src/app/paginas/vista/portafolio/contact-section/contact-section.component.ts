import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
})
export class ContactSectionComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  formSubmitted = false;

  // Mock data based on the plan
  contactData = {
    title: '¿Trabajamos juntos?',
    subtitle: 'Estoy disponible para nuevos proyectos y colaboraciones',
    contactInfo: {
      email: 'sistemadesignstyle@gmail.com',
      phone: '+51 955365043',
      location: 'Lima, Perú',
      timezone: 'PST (UTC-8)',
      availability: 'Disponible para proyectos',
    },
    form: {
      fields: ['name', 'email', 'company', 'budget', 'timeline', 'message'],
      budgetRanges: [
        '< $1,000',
        '$1,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000+',
      ],
    },
    socialLinks: {
      github: 'https://github.com/alexrivera',
      linkedin: 'https://linkedin.com/in/alexrivera',
      twitter: 'https://twitter.com/alexrivera_dev',
      instagram: 'https://instagram.com/alexrivera.dev',
    },
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      budget: [''],
      timeline: [''],
      message: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);

        // Here you would typically send the data to your backend service
        // For now, we'll just show a success message
        this.formSubmitted = true;
        this.isSubmitting = false;

        // Reset form after successful submission
        setTimeout(() => {
          this.contactForm.reset();
          this.formSubmitted = false;
        }, 3000);
      }, 2000); // Simulate network delay
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
