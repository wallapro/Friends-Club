export interface Member {
  id: string;
  name: string;
  planId: string;
  paid: boolean;
  entriesLeft: number;
}

export interface ScheduleItem {
  id: string;
  dayName: string;
  isOpen: boolean;
  hours: string;
}

export interface PricingItem {
  id: string;
  title: string;
  price: string;
  entries: number;
}

export interface ClubData {
  clubName: string;
  welcomeTitle: string;
  welcomeDescription: string;
  announcement: string;
  heroImage?: string;
  schedule: ScheduleItem[];
  pricing: PricingItem[];
  members: Member[];
}
