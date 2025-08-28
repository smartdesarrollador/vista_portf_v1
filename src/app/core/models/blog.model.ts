// Blog related models
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
  content?: string;
  image: string;
  category: BlogCategory;
  readTime: number;
  publishDate: string;
  tags: string[];
  author?: Author;
  isFeatured?: boolean;
}

export type BlogCategory = 'Frontend' | 'Backend' | 'DevOps' | 'UI/UX' | 'Career' | 'Tutorial' | 'Opinion';

export interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogFilter {
  category?: string;
  tag?: string;
  searchTerm?: string;
}