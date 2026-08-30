export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'tourist' | 'tour_guide';
  createdAt: Date;
  updatedAt: Date;
}

export interface TouristProfile extends User {
  role: 'tourist';
  nationality?: string;
  phone?: string;
}

export interface TourGuideProfile extends User {
  role: 'tour_guide';
  yearsExperience?: number;
  languages?: string[];
  bio?: string;
}