// Testimonial models
export interface TestimonialsData {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  stats: TestimonialStats;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  project?: string;
  date: string;
}

export interface TestimonialStats {
  averageRating: number;
  totalReviews: number;
  repeatClients: number;
}

export interface Rating {
  stars: number;
  count: number;
}