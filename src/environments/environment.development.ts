export const environment = {
  production: false,
  urlDominioApi: 'http://localhost:8000',
  urlRaiz: 'http://localhost:8000/api',
  apiUrl: 'http://localhost:8000/api',
  
  // Portfolio Assets Configuration
  portfolio: {
    assetsPath: '/assets',
    imagesPath: '/assets/images',
    videosPath: '/assets/videos',
    profileImagesPath: '/assets/images/profile',
    projectImagesPath: '/assets/images/projects',
    testimonialImagesPath: '/assets/images/testimonials',
    blogImagesPath: '/assets/images/blog',
    
    // Mock data flag (true = use mock data, false = use API)
    useMockData: true,
    
    // Animation settings
    animations: {
      enableAOS: true,
      enableParallax: true,
      enableTypewriter: true,
      duration: 800,
      easing: 'ease-in-out-cubic'
    },
    
    // SEO Configuration
    seo: {
      siteName: 'Alex Rivera - Developer Portfolio',
      defaultTitle: 'Full Stack Developer & UI/UX Designer',
      defaultDescription: 'Especializado en desarrollo web moderno con Angular, React, Laravel y diseño centrado en el usuario.',
      defaultImage: '/assets/images/og-image.jpg',
      twitterHandle: '@alexrivera_dev'
    }
  }
};
