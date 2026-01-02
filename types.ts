export interface NavItem {
  label: string;
  href: string;
}

export interface CareerMilestone {
  year: number;
  title: string;
  description: string;
  type: 'success' | 'learning';
}

export interface CoreValue {
  id: string;
  title: string;
  subtitle: string;
  orgDefinition: string;
  myDefinition: string;
  icon: any;
  color: string;
}

export interface StrengthData {
  subject: string;
  A: number;
  fullMark: number;
}