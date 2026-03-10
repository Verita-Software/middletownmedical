export interface LocationItem {
  id: string;
  slug: string;
  name: string;
  address: string;
  county: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface LocationService {
  name: string;
  description?: string;
  phone?: string;
  hours?: string;
}

export interface LocationDetail {
  overview: string;
  hours?: string;
  /** Optional image URL from Middletown Medical (location photo). */
  imageUrl?: string;
  specialties: string[];
  services: LocationService[];
}
