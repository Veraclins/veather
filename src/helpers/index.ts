import { ReportLocation, WeatherReport } from 'helpers/weather';

export const formatNumber = (value: number | string, decimalPlaces = 2) => {
  const number = Number(value) || 0;
  return number.toFixed(decimalPlaces);
};
export const roundToTwo = (numb: number) =>
  Math.round((numb + Number.EPSILON) * 100) / 100;

export const createRandomString = (length = 5): string => {
  let result = '';
  const characterSet = '0123456789abcdefghijklmnopqrstuvwxyz';
  for (let i = length; i > 0; i--) {
    result += characterSet[Math.floor(Math.random() * characterSet.length)];
  }
  return result;
};

export const slugify = (string: string, length = 20) => {
  string = string.toLowerCase();

  string = string
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+|-+$/g, ''); // trim dashes from start and end of text
  return string.trim().substr(0, length);
};

export const createUniqueId = (string: string) =>
  `${slugify(string)}-${createRandomString()}`;

export const createReportId = (location: ReportLocation): string => {
  let string = `${location.name}-${location.region}-${location.lat}-${location.lon}`;

  return slugify(string, 40);
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor = 500
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export const compareReportAscending = (a: WeatherReport, b: WeatherReport) => {
  if (a.location.name < b.location.name) {
    return -1;
  } else if (b.location.name < a.location.name) {
    return 1;
  }
  return 0;
};

export const cities = [
  {
    rank: 1,
    Name: 'Tokyo',
    Country: 'Japan',
    Population: 37339804,
  },
  {
    rank: 2,
    Name: 'Delhi',
    Country: 'India',
    Population: 31181376,
  },
  {
    rank: 3,
    Name: 'Shanghai',
    Country: 'China',
    Population: 27795702,
  },
  {
    rank: 4,
    Name: 'Sao Paulo',
    Country: 'Brazil',
    Population: 22237472,
  },
  {
    rank: 5,
    Name: 'Mexico City',
    Country: 'Mexico',
    Population: 21918936,
  },
  {
    rank: 6,
    Name: 'Dhaka',
    Country: 'Bangladesh',
    Population: 21741090,
  },
  {
    rank: 7,
    Name: 'Cairo',
    Country: 'Egypt',
    Population: 21322750,
  },
  {
    rank: 8,
    Name: 'Beijing',
    Country: 'China',
    Population: 20896820,
  },
  {
    rank: 9,
    Name: 'Mumbai',
    Country: 'India',
    Population: 20667656,
  },
  {
    rank: 10,
    Name: 'Osaka',
    Country: 'Japan',
    Population: 19110616,
  },
  {
    rank: 11,
    Name: 'Karachi',
    Country: 'Pakistan',
    Population: 16459472,
  },
  {
    rank: 12,
    Name: 'Chongqing',
    Country: 'China',
    Population: 16382376,
  },
  {
    rank: 13,
    Name: 'Istanbul',
    Country: 'Turkey',
    Population: 15415197,
  },
  {
    rank: 14,
    Name: 'Buenos Aires',
    Country: 'Argentina',
    Population: 15257673,
  },
  {
    rank: 15,
    Name: 'Kolkata',
    Country: 'India',
    Population: 14974073,
  },
  {
    rank: 16,
    Name: 'Kinshasa',
    Country: 'DR Congo',
    Population: 14970460,
  },
  {
    rank: 17,
    Name: 'Lagos',
    Country: 'Nigeria',
    Population: 14862111,
  },
  {
    rank: 18,
    Name: 'Manila',
    Country: 'Philippines',
    Population: 14158573,
  },
  {
    rank: 19,
    Name: 'Tianjin',
    Country: 'China',
    Population: 13794450,
  },
  {
    rank: 20,
    Name: 'Guangzhou',
    Country: 'China',
    Population: 13635397,
  },
];
