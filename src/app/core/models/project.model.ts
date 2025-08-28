// Project related models
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
  category: ProjectCategory;
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
  testimonial?: ProjectTestimonial;
}

export type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack' | 'UI/UX' | 'Mobile';

export interface ProjectTestimonial {
  text: string;
  author: string;
  position: string;
  company?: string;
}

export interface ProjectFilter {
  category: string;
  searchTerm: string;
  technologies: string[];
}

export interface ProjectModalData {
  project: Project;
  isOpen: boolean;
}