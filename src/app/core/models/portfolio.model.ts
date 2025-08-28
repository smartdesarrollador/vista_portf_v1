// Portfolio main models
export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  description: string;
  profileImage: string;
  backgroundVideo?: string;
  socialLinks: SocialLinks;
  stats: Stats;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  instagram?: string;
}

export interface Stats {
  projectsCompleted: number;
  yearsExperience: number;
  happyClients: number;
  technologiesMastered: number;
}

export interface AboutData {
  title: string;
  subtitle: string;
  story: string;
  skills: SkillCategories;
  certifications: Certification[];
  timeline: TimelineItem[];
}

export interface SkillCategories {
  frontend: string[];
  backend: string[];
  tools: string[];
  methodologies: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
}

export interface ServicesData {
  title: string;
  subtitle: string;
  services: Service[];
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  popular?: boolean;
}

export interface ContactData {
  title: string;
  subtitle: string;
  contactInfo: ContactInfo;
  form: ContactForm;
  socialLinks: SocialLinks;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  timezone: string;
  availability: string;
}

export interface ContactForm {
  fields: string[];
  budgetRanges: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget: string;
  timeline: string;
  message: string;
  phone?: string;
}

// Projects Section Models
export interface ProjectsData {
  title: string;
  subtitle: string;
  featured: Project[];
  categories: string[];
  projects: Project[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  technologies: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  completionDate?: string;
  duration?: string;
  isFeatured?: boolean;
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

// Testimonials Section Models
export interface TestimonialsData {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  stats: {
    averageRating: number;
    totalReviews: number;
    repeatClients: number;
    happyClients: number;
    completedProjects: number;
    yearsExperience: number;
  };
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  project: string;
  date: string;
  clientImage: string;
  clientName: string;
  clientPosition: string;
  clientCompany: string;
  projectDate: string;
  projectName: string;
  isVerified: boolean;
}

// Blog Section Models
export interface BlogData {
  title: string;
  subtitle: string;
  featured: BlogPost;
  posts: BlogPost[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: number;
  publishDate: string;
  tags: string[];
  isFeatured?: boolean;
}