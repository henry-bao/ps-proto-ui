export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type SourceType =
    | 'Telegram'
    | 'Twitter'
    | 'Facebook'
    | 'Reddit'
    | 'News Media'
    | 'OSINT Reports'
    | 'Local Sources';
export type WeaponCategory =
    | 'Assault Rifle'
    | 'Battle Rifle'
    | 'Pistol'
    | 'Submachine Gun'
    | 'Light Machine Gun'
    | 'Sniper Rifle'
    | 'Shotgun';
export type VerificationType = 'Unverified' | 'Partially Verified' | 'Verified' | 'Disputed';

export interface WeaponEntry {
    id: number;
    image: string;
    title: string;
    source: SourceType;
    location: string;
    timestamp: string;
    confidence: ConfidenceLevel;
    verified: VerificationType;
    category: WeaponCategory;
    calibre: string;
    manufacturer?: string;
    countryOfOrigin?: string;
    yearOfManufacture?: string;
    operationalStatus?: string;
    description: string;
    sourceUrl?: string;
    sourceDate: string;
    verifiedBy?: string[];
    relatedEntries?: number[];
    tags: string[];
}

export interface FilterValues {
    location: string;
    year: string;
    category: string;
    source: string;
    confidence: string;
    verification: string;
    manufacturer: string;
    countryOfOrigin: string;
    calibre: string;
    operationalStatus: string;
    dateRange: string;
}

export interface FilterSectionProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    count?: string;
}
