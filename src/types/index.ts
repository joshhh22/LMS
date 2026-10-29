export * from './database';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  roles?: Array<'admin' | 'teacher' | 'student'>;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

