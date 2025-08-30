import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { 
  HeroData, 
  AboutData, 
  ServicesData, 
  ContactData,
  ProjectsData,
  TestimonialsData,
  BlogData,
  Project,
  Testimonial,
  BlogPost
} from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  
  // Signals for reactive data
  private heroData = signal<HeroData | null>(null);
  private aboutData = signal<AboutData | null>(null);
  private servicesData = signal<ServicesData | null>(null);
  private projectsData = signal<ProjectsData | null>(null);
  private testimonialsData = signal<TestimonialsData | null>(null);
  private blogData = signal<BlogData | null>(null);
  private contactData = signal<ContactData | null>(null);

  constructor() {
    // Initialize with mock data if in development
    if (environment.portfolio.useMockData) {
      this.initializeMockData();
    }
  }

  // Hero Section Methods
  getHeroData(): Observable<HeroData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockHeroData()).pipe(delay(500));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetHeroData();
  }

  // About Section Methods
  getAboutData(): Observable<AboutData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockAboutData()).pipe(delay(300));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetAboutData();
  }

  // Services Section Methods
  getServicesData(): Observable<ServicesData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockServicesData()).pipe(delay(400));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetServicesData();
  }

  // Projects Section Methods
  getProjectsData(): Observable<ProjectsData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockProjectsData()).pipe(delay(600));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetProjectsData();
  }

  getProjects(category?: string): Observable<Project[]> {
    const projectsData = this.getMockProjectsData();
    let projects = [...projectsData.featured, ...projectsData.projects];
    
    if (category && category !== 'Todos') {
      projects = projects.filter(p => p.category === category);
    }
    
    return of(projects).pipe(delay(300));
  }

  getProjectById(id: number): Observable<Project | null> {
    const projectsData = this.getMockProjectsData();
    const allProjects = [...projectsData.featured, ...projectsData.projects];
    const project = allProjects.find(p => p.id === id) || null;
    
    return of(project).pipe(delay(200));
  }

  // Testimonials Section Methods
  getTestimonialsData(): Observable<TestimonialsData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockTestimonialsData()).pipe(delay(400));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetTestimonialsData();
  }

  // Blog Section Methods
  getBlogData(): Observable<BlogData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockBlogData()).pipe(delay(500));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetBlogData();
  }

  getBlogPostBySlug(slug: string): Observable<BlogPost | null> {
    const blogData = this.getMockBlogData();
    const allPosts = [blogData.featured, ...blogData.posts];
    const post = allPosts.find(p => p.slug === slug) || null;
    
    return of(post).pipe(delay(300));
  }

  // Contact Section Methods
  getContactData(): Observable<ContactData> {
    if (environment.portfolio.useMockData) {
      return of(this.getMockContactData()).pipe(delay(200));
    }
    // TODO: Replace with HTTP call to API
    return this.httpGetContactData();
  }

  // Initialize mock data
  private initializeMockData(): void {
    this.heroData.set(this.getMockHeroData());
    this.aboutData.set(this.getMockAboutData());
    this.servicesData.set(this.getMockServicesData());
    this.projectsData.set(this.getMockProjectsData());
    this.testimonialsData.set(this.getMockTestimonialsData());
    this.blogData.set(this.getMockBlogData());
    this.contactData.set(this.getMockContactData());
  }

  // Mock Data Generators
  private getMockHeroData(): HeroData {
    return {
      name: "JEANS ENRIQUE MALON REYNA",
      role: "Full Stack Developer & UI/UX Designer",
      tagline: "Transformo ideas en experiencias digitales excepcionales",
      description: "Especializado en desarrollo web moderno con Angular, React, Laravel y diseño centrado en el usuario. Desde Lima, Perú, ofrezco soluciones tecnológicas innovadoras.",
      profileImage: "assets/foto/perfil.png",
      backgroundVideo: `${environment.portfolio.videosPath}/code-animation.mp4`,
      socialLinks: {
        github: "https://github.com/jeans",
        linkedin: "https://linkedin.com/in/jeans-malon",
        twitter: "https://twitter.com/jeans_dev",
        email: "sistema5000smart@gmail.com"
      },
      stats: {
        projectsCompleted: 50,
        yearsExperience: 5,
        happyClients: 30,
        technologiesMastered: 15
      }
    };
  }

  private getMockAboutData(): AboutData {
    return {
      title: "Sobre Mí",
      subtitle: "Pasión por el código y el diseño",
      story: "Con más de 5 años de experiencia, he trabajado con startups y empresas establecidas creando soluciones web innovadoras. Mi enfoque combina técnicas de desarrollo avanzadas con principios de diseño UX/UI para crear experiencias digitales excepcionales.",
      skills: {
        frontend: ["Angular", "React", "Vue.js", "TypeScript", "Tailwind CSS", "SASS"],
        backend: ["Laravel", "Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
        tools: ["Docker", "AWS", "Git", "Figma", "Photoshop", "Webpack"],
        methodologies: ["Agile", "Scrum", "TDD", "DevOps", "CI/CD"]
      },
      certifications: [
        {
          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          date: "2024",
          credentialId: "AWS-12345"
        },
        {
          name: "Google UX Design Professional",
          issuer: "Google",
          date: "2023",
          credentialId: "GOOGLE-67890"
        }
      ],
      timeline: [
        {
          year: "2024",
          title: "Senior Full Stack Developer",
          company: "TechCorp Inc.",
          description: "Liderando equipos de desarrollo en proyectos de gran escala utilizando Angular y Laravel.",
          technologies: ["Angular 18", "Laravel 10", "AWS", "Docker"]
        },
        {
          year: "2022",
          title: "Frontend Developer",
          company: "Digital Agency",
          description: "Desarrollo de aplicaciones web responsivas y optimización de performance.",
          technologies: ["React", "Next.js", "TypeScript", "Tailwind"]
        }
      ]
    };
  }

  private getMockServicesData(): ServicesData {
    return {
      title: "Servicios",
      subtitle: "Soluciones completas para tu negocio digital",
      services: [
        {
          id: 1,
          icon: "fas fa-code",
          title: "Desarrollo Web Frontend",
          description: "Aplicaciones web modernas con Angular, React y Vue.js",
          features: ["Responsive Design", "PWA", "Performance Optimizado", "SEO Friendly"],
          price: "Desde $800",
          duration: "2-4 semanas",
          popular: true
        },
        {
          id: 2,
          icon: "fas fa-server",
          title: "Desarrollo Backend",
          description: "APIs RESTful robustas con Laravel y Node.js",
          features: ["API REST/GraphQL", "Base de Datos", "Autenticación", "Documentación"],
          price: "Desde $600",
          duration: "1-3 semanas"
        },
        {
          id: 3,
          icon: "fas fa-palette",
          title: "UI/UX Design",
          description: "Diseños atractivos y funcionales centrados en el usuario",
          features: ["Wireframes", "Prototipos", "Design System", "User Testing"],
          price: "Desde $400",
          duration: "1-2 semanas"
        },
        {
          id: 4,
          icon: "fas fa-paint-brush",
          title: "Diseño Gráfico",
          description: "Diseños creativos para fortalecer la identidad visual de tu marca",
          features: ["Logotipos", "Branding", "Material Publicitario", "Diseño Web"],
          price: "Desde $300",
          duration: "1-2 semanas"
        },
        {
          id: 5,
          icon: "fas fa-desktop",
          title: "Instalación de Programas por Remoto",
          description: "Asistencia técnica remota para instalación y configuración de software",
          features: ["Soporte Remoto", "Configuración", "Capacitación", "Mantenimiento"],
          price: "Desde $50",
          duration: "1-2 días"
        },
        {
          id: 6,
          icon: "fas fa-robot",
          title: "Asesoría en Inteligencia Artificial",
          description: "Consultoría especializada en herramientas de IA para pequeñas y medianas empresas",
          features: ["Evaluación de Necesidades", "Implementación IA", "Capacitación", "Optimización de Procesos"],
          price: "Desde $500",
          duration: "1-3 semanas"
        }
      ]
    };
  }

  private getMockProjectsData(): ProjectsData {
    return {
      title: "Proyectos Destacados",
      subtitle: "Algunos trabajos en los que he puesto mi corazón",
      featured: [
        {
          id: 1,
          title: "Tienda Virtual",
          category: "Full Stack",
          description: "Plataforma completa de comercio electrónico con panel administrativo",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          gallery: [
            `${environment.portfolio.projectImagesPath}/ecommerce-1.jpg`,
            `${environment.portfolio.projectImagesPath}/ecommerce-2.jpg`,
            `${environment.portfolio.projectImagesPath}/ecommerce-3.jpg`
          ],
          technologies: ["Angular 18", "Laravel 10", "MySQL", "Tailwind CSS"],
          features: [
            "Carrito de compras avanzado",
            "Panel administrativo completo",
            "Pasarela de pagos integrada",
            "Sistema de inventario"
          ],
          liveUrl: "https://tienda.smartdigitaltec.com",
          githubUrl: "https://github.com/jeans/tienda-virtual",
          client: "SmartDigitalTec",
          completionDate: "2024-03-15",
          duration: "3 meses",
          isFeatured: true,
          testimonial: {
            text: "Jeans entregó exactamente lo que necesitábamos y más.",
            author: "María González",
            position: "CEO, SmartDigitalTec"
          }
        }
      ],
      categories: ["Todos", "Frontend", "Backend", "Full Stack", "UI/UX"],
      projects: [
        {
          id: 2,
          title: "Landing Page",
          category: "Frontend",
          description: "Página de aterrizaje moderna con interfaz atractiva",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
          technologies: ["Angular", "Tailwind CSS", "TypeScript"],
          liveUrl: "https://landingpage.smartdigitaltec.com",
          githubUrl: "https://github.com/jeans/landing-page"
        },
        {
          id: 3,
          title: "Web Informativa",
          category: "UI/UX",
          description: "Sitio web informativo corporativo con diseño profesional",
          image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
          technologies: ["Angular", "Bootstrap", "Tailwind CSS"],
          liveUrl: "https://webinformativa.smartdigitaltec.com",
          githubUrl: "https://github.com/jeans/web-informativa"
        },
        {
          id: 4,
          title: "Blog Corporativo",
          category: "Full Stack",
          description: "Plataforma de blog con sistema de gestión de contenidos",
          image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop",
          technologies: ["Angular", "Laravel", "MySQL", "CKEditor"],
          liveUrl: "https://blog.smartdigitaltec.com",
          githubUrl: "https://github.com/jeans/blog-corporativo"
        },
        {
          id: 5,
          title: "EVV Consultoría",
          category: "Full Stack",
          description: "Plataforma web de consultoría empresarial",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
          technologies: ["Angular", "Laravel", "PostgreSQL", "Tailwind CSS"],
          liveUrl: "https://evv.pe",
          githubUrl: "https://github.com/jeans/evv-consultoria"
        },
        {
          id: 6,
          title: "One Digital Consulting",
          category: "Frontend",
          description: "Plataforma de cursos online con sistema de gestión de aprendizaje",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
          technologies: ["Angular", "Node.js", "MongoDB", "Socket.io"],
          liveUrl: "https://onedigitallconsulting.com",
          githubUrl: "https://github.com/jeans/cursos-online"
        }
      ]
    };
  }

  private getMockTestimonialsData(): TestimonialsData {
    return {
      title: "Lo que dicen mis clientes",
      subtitle: "La confianza es la base de toda relación profesional exitosa",
      testimonials: [
        {
          id: 1,
          text: "Alex no solo entregó un producto excepcional, sino que superó todas nuestras expectativas. Su atención al detalle y profesionalismo son incomparables.",
          author: "Carlos Mendoza",
          position: "CTO",
          company: "StartupTech",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
          rating: 5,
          project: "Plataforma SaaS",
          date: "2024-02-10",
          clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
          clientName: "Carlos Mendoza",
          clientPosition: "CTO",
          clientCompany: "StartupTech",
          projectDate: "2024-02-10",
          projectName: "Plataforma SaaS",
          isVerified: true
        },
        {
          id: 2,
          text: "Trabajar con Alex fue una experiencia increíble. Su capacidad para entender nuestras necesidades y traducirlas en código es impresionante.",
          author: "Laura Martínez",
          position: "Product Manager",
          company: "InnovateCorp",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b586?w=200&h=200&fit=crop&crop=face",
          rating: 5,
          project: "App Móvil",
          date: "2024-01-20",
          clientImage: "https://images.unsplash.com/photo-1494790108755-2616b612b586?w=200&h=200&fit=crop&crop=face",
          clientName: "Laura Martínez",
          clientPosition: "Product Manager",
          clientCompany: "InnovateCorp",
          projectDate: "2024-01-20",
          projectName: "App Móvil",
          isVerified: false
        }
      ],
      stats: {
        averageRating: 4.9,
        totalReviews: 47,
        repeatClients: 85,
        happyClients: 50,
        completedProjects: 100,
        yearsExperience: 5
      }
    };
  }

  private getMockBlogData(): BlogData {
    return {
      title: "Blog & Insights",
      subtitle: "Comparto conocimientos y experiencias del mundo del desarrollo",
      featured: {
        id: 1,
        title: "Las mejores prácticas de Angular 18 en 2024",
        slug: "mejores-practicas-angular-18-2024",
        excerpt: "Descubre las técnicas más avanzadas para optimizar tu aplicación Angular con las últimas características del framework.",
        image: `${environment.portfolio.blogImagesPath}/angular-18-featured.jpg`,
        category: "Frontend",
        readTime: 8,
        publishDate: "2024-03-01",
        tags: ["Angular", "TypeScript", "Performance"],
        isFeatured: true
      },
      posts: [
        {
          id: 2,
          title: "Cómo implementar SSR en Angular de manera eficiente",
          slug: "implementar-ssr-angular-eficiente",
          excerpt: "Guía paso a paso para mejorar el SEO y performance de tu aplicación Angular con Server-Side Rendering.",
          image: `${environment.portfolio.blogImagesPath}/ssr-guide.jpg`,
          category: "Frontend",
          readTime: 12,
          publishDate: "2024-02-15",
          tags: ["Angular", "SSR", "SEO", "Performance"]
        }
      ]
    };
  }

  private getMockContactData(): ContactData {
    return {
      title: "¿Trabajamos juntos?",
      subtitle: "Estoy disponible para nuevos proyectos y colaboraciones",
      contactInfo: {
        email: "sistema5000smart@gmail.com",
        phone: "955365043",
        location: "Lima, Perú",
        timezone: "PET (UTC-5)",
        availability: "Disponible para proyectos"
      },
      form: {
        fields: ["name", "email", "company", "budget", "timeline", "message"],
        budgetRanges: [
          "< $1,000",
          "$1,000 - $5,000", 
          "$5,000 - $10,000",
          "$10,000+"
        ]
      },
      socialLinks: {
        github: "https://github.com/jeans",
        linkedin: "https://linkedin.com/in/jeans-malon",
        twitter: "https://twitter.com/jeans_dev",
        instagram: "https://instagram.com/jeans.dev",
        email: "sistema5000smart@gmail.com"
      }
    };
  }

  // Future API Methods (to be implemented)
  private httpGetHeroData(): Observable<HeroData> {
    // TODO: Implement HTTP call to /api/portfolio/profile
    return of(this.getMockHeroData());
  }

  private httpGetAboutData(): Observable<AboutData> {
    // TODO: Implement HTTP call to /api/portfolio/about
    return of(this.getMockAboutData());
  }

  private httpGetServicesData(): Observable<ServicesData> {
    // TODO: Implement HTTP call to /api/portfolio/services
    return of(this.getMockServicesData());
  }

  private httpGetProjectsData(): Observable<ProjectsData> {
    // TODO: Implement HTTP call to /api/portfolio/projects
    return of(this.getMockProjectsData());
  }

  private httpGetTestimonialsData(): Observable<TestimonialsData> {
    // TODO: Implement HTTP call to /api/portfolio/testimonials
    return of(this.getMockTestimonialsData());
  }

  private httpGetBlogData(): Observable<BlogData> {
    // TODO: Implement HTTP call to /api/portfolio/blog
    return of(this.getMockBlogData());
  }

  private httpGetContactData(): Observable<ContactData> {
    // TODO: Implement HTTP call to /api/portfolio/contact
    return of(this.getMockContactData());
  }
}