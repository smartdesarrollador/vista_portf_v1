import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ContactFormData } from '../models/portfolio.model';

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Send contact form
  sendContactForm(formData: ContactFormData): Observable<ContactResponse> {
    if (environment.portfolio.useMockData) {
      return this.mockSendContactForm(formData);
    }
    
    // TODO: Replace with actual HTTP call
    return this.http.post<ContactResponse>(`${this.apiUrl}/portfolio/contact`, formData);
  }

  // Subscribe to newsletter
  subscribeNewsletter(email: string): Observable<ContactResponse> {
    if (environment.portfolio.useMockData) {
      return this.mockSubscribeNewsletter(email);
    }
    
    // TODO: Replace with actual HTTP call
    return this.http.post<ContactResponse>(`${this.apiUrl}/newsletter/subscribe`, { email });
  }

  // Download CV/Resume
  downloadResume(): Observable<Blob> {
    if (environment.portfolio.useMockData) {
      return this.mockDownloadResume();
    }
    
    // TODO: Replace with actual HTTP call
    return this.http.get(`${this.apiUrl}/portfolio/resume/download`, {
      responseType: 'blob'
    });
  }

  // Get contact statistics (for admin)
  getContactStats(): Observable<any> {
    if (environment.portfolio.useMockData) {
      return this.mockGetContactStats();
    }
    
    // TODO: Replace with actual HTTP call
    return this.http.get(`${this.apiUrl}/admin/contact-stats`);
  }

  // Validate email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number
  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s|-|\(|\)/g, ''));
  }

  // Format phone number
  formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
  }

  // Mock implementations
  private mockSendContactForm(formData: ContactFormData): Observable<ContactResponse> {
    console.log('Mock: Sending contact form', formData);
    
    // Simulate network delay
    return of({
      success: true,
      message: 'Mensaje enviado correctamente. Te responderé pronto!',
      data: {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      }
    }).pipe(delay(1500));
  }

  private mockSubscribeNewsletter(email: string): Observable<ContactResponse> {
    console.log('Mock: Newsletter subscription', email);
    
    return of({
      success: true,
      message: 'Suscripción exitosa al newsletter!',
      data: { email }
    }).pipe(delay(800));
  }

  private mockDownloadResume(): Observable<Blob> {
    console.log('Mock: Downloading resume');
    
    // Create a mock PDF blob
    const content = 'Mock Resume Content - Alex Rivera CV';
    const blob = new Blob([content], { type: 'application/pdf' });
    
    return of(blob).pipe(delay(500));
  }

  private mockGetContactStats(): Observable<any> {
    return of({
      totalContacts: 156,
      thisMonth: 23,
      responseRate: 95,
      averageResponseTime: '4 horas',
      popularTopics: [
        { topic: 'Desarrollo Web', count: 45 },
        { topic: 'Consultoría', count: 32 },
        { topic: 'UI/UX Design', count: 28 },
        { topic: 'Colaboración', count: 51 }
      ]
    }).pipe(delay(600));
  }

  // Utility methods for form handling
  sanitizeInput(input: string): string {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }

  generateContactId(): string {
    return 'contact_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  }

  // Rate limiting check (client-side basic check)
  private lastSubmissionTime = 0;
  private readonly MIN_SUBMISSION_INTERVAL = 60000; // 1 minute

  canSubmitForm(): boolean {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    
    if (timeSinceLastSubmission >= this.MIN_SUBMISSION_INTERVAL) {
      this.lastSubmissionTime = now;
      return true;
    }
    
    return false;
  }

  getTimeUntilNextSubmission(): number {
    const now = Date.now();
    const timeSinceLastSubmission = now - this.lastSubmissionTime;
    const timeRemaining = this.MIN_SUBMISSION_INTERVAL - timeSinceLastSubmission;
    
    return Math.max(0, timeRemaining);
  }
}