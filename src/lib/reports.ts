export const REPORTS = [
  {
    slug: 'jeju-city-black-pork',
    title: 'Jeju City Black Pork Analysis',
    category: 'Culinary',
  },
  {
    slug: 'seogwipo-seafood',
    title: 'Seogwipo Seafood Market Report',
    category: 'Culinary',
  },
  {
    slug: 'jeju-east-coast-cafes',
    title: 'East Coast Cafe Density',
    category: 'Hospitality',
  },
  {
    slug: 'jeju-west-coast',
    title: 'West Coast Tourism Data',
    category: 'Tourism',
  },
  {
    slug: 'hallasan-region',
    title: 'Hallasan Region Culinary Map',
    category: 'Culinary',
  },
  {
    slug: 'jeju-airport-corridor',
    title: 'Airport Corridor Restaurant Index',
    category: 'Culinary',
  },
  {
    slug: 'seasonal-trends',
    title: 'Seasonal Culinary Trends',
    category: 'Analytics',
  },
  {
    slug: 'algorithm-spread',
    title: 'Algorithm Spread Analysis',
    category: 'Analytics',
  },
] as const;

export type ReportSlug = (typeof REPORTS)[number]['slug'];

export const DISTRICT_REPORTS: Record<string, ReportSlug> = {
  'jeju-city': 'jeju-city-black-pork',
  seogwipo: 'seogwipo-seafood',
  'east-coast': 'jeju-east-coast-cafes',
  'west-coast': 'jeju-west-coast',
  hallasan: 'hallasan-region',
  airport: 'jeju-airport-corridor',
};
