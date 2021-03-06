import { WeatherReport } from 'helpers/Store';

export const reports: WeatherReport[] = [
  {
    location: {
      name: 'Tokyo',
      region: 'Tokyo',
      country: 'Japan',
      lat: 35.69,
      lon: 139.69,
      tz_id: 'Asia/Tokyo',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 20:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 20:45',
      temp_c: 17,
      temp_f: 62.6,
      is_day: 0,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
        code: 1003,
      },
      wind_mph: 9.4,
      wind_kph: 15.1,
      wind_degree: 90,
      wind_dir: 'E',
      pressure_mb: 1015,
      pressure_in: 29.97,
      precip_mm: 0,
      precip_in: 0,
      humidity: 68,
      cloud: 25,
      feelslike_c: 17,
      feelslike_f: 62.6,
      vis_km: 10,
      vis_miles: 6,
      uv: 1,
      gust_mph: 12.3,
      gust_kph: 19.8,
      air_quality: {
        co: 1201.5999755859375,
        no2: 94.5999984741211,
        o3: 0,
        so2: 108.69999694824219,
        pm2_5: 22.200000762939453,
        pm10: 32.5,
        'us-epa-index': 2,
        'gb-defra-index': 2,
      },
    },
    last_refresh: 1636027045757,
    is_favorite: true,
    id: 'tokyo-tokyo-3569-13969',
    notes: {
      'existing-note-1': { id: 'existing-note-1', body: 'The note body' },
    },
  },
  {
    location: {
      name: 'Delhi',
      region: 'Delhi',
      country: 'India',
      lat: 28.67,
      lon: 77.22,
      tz_id: 'Asia/Kolkata',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 17:26',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 17:15',
      temp_c: 24,
      temp_f: 75.2,
      is_day: 1,
      condition: {
        text: 'Overcast',
        icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
        code: 1009,
      },
      wind_mph: 3.8,
      wind_kph: 6.1,
      wind_degree: 290,
      wind_dir: 'WNW',
      pressure_mb: 1013,
      pressure_in: 29.91,
      precip_mm: 0,
      precip_in: 0,
      humidity: 57,
      cloud: 0,
      feelslike_c: 23.7,
      feelslike_f: 74.7,
      vis_km: 1.2,
      vis_miles: 0,
      uv: 8,
      gust_mph: 4.9,
      gust_kph: 7.9,
      air_quality: {
        co: 1642.199951171875,
        no2: 45.900001525878906,
        o3: 89.4000015258789,
        so2: 21.899999618530273,
        pm2_5: 183.39999389648438,
        pm10: 239.6999969482422,
        'us-epa-index': 5,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027045722,
    is_favorite: true,
    id: 'delhi-delhi-2867-7722',
    notes: {},
  },
  {
    location: {
      name: 'Shanghai',
      region: 'Shanghai',
      country: 'China',
      lat: 31.01,
      lon: 121.41,
      tz_id: 'Asia/Shanghai',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 19:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 19:45',
      temp_c: 19,
      temp_f: 66.2,
      is_day: 0,
      condition: {
        text: 'Light rain',
        icon: '//cdn.weatherapi.com/weather/64x64/night/296.png',
        code: 1183,
      },
      wind_mph: 13.6,
      wind_kph: 22,
      wind_degree: 130,
      wind_dir: 'SE',
      pressure_mb: 1018,
      pressure_in: 30.06,
      precip_mm: 0,
      precip_in: 0,
      humidity: 73,
      cloud: 75,
      feelslike_c: 19,
      feelslike_f: 66.2,
      vis_km: 10,
      vis_miles: 6,
      uv: 1,
      gust_mph: 15.9,
      gust_kph: 25.6,
      air_quality: {
        co: 500.70001220703125,
        no2: 49.400001525878906,
        o3: 63.70000076293945,
        so2: 48.20000076293945,
        pm2_5: 27.5,
        pm10: 42.20000076293945,
        'us-epa-index': 2,
        'gb-defra-index': 3,
      },
    },
    last_refresh: 1636027045722,
    is_favorite: false,
    id: 'shanghai-shanghai-3101-12141',
    notes: {},
  },
  {
    location: {
      name: 'Sao Paulo',
      region: 'Sao Paulo',
      country: 'Brazil',
      lat: -23.53,
      lon: -46.62,
      tz_id: 'America/Sao_Paulo',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 8:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 08:45',
      temp_c: 18,
      temp_f: 64.4,
      is_day: 1,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003,
      },
      wind_mph: 3.8,
      wind_kph: 6.1,
      wind_degree: 90,
      wind_dir: 'E',
      pressure_mb: 1014,
      pressure_in: 29.94,
      precip_mm: 0,
      precip_in: 0,
      humidity: 88,
      cloud: 75,
      feelslike_c: 18,
      feelslike_f: 64.4,
      vis_km: 8,
      vis_miles: 4,
      uv: 5,
      gust_mph: 4.9,
      gust_kph: 7.9,
      air_quality: {
        co: 627.5,
        no2: 13.899999618530273,
        o3: 1.2999999523162842,
        so2: 11.199999809265137,
        pm2_5: 15,
        pm10: 34.20000076293945,
        'us-epa-index': 1,
        'gb-defra-index': 2,
      },
    },
    last_refresh: 1636027045774,
    is_favorite: false,
    id: 'sao-paulo-sao-paulo-2353-4662',
    notes: {},
  },
  {
    location: {
      name: 'Mexico City',
      region: 'The Federal District',
      country: 'Mexico',
      lat: 19.43,
      lon: -99.13,
      tz_id: 'America/Mexico_City',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 5:56',
    },
    data: {
      last_updated_epoch: 1636025400,
      last_updated: '2021-11-04 05:30',
      temp_c: 12.2,
      temp_f: 54,
      is_day: 0,
      condition: {
        text: 'Clear',
        icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
        code: 1000,
      },
      wind_mph: 2,
      wind_kph: 3.2,
      wind_degree: 28,
      wind_dir: 'NNE',
      pressure_mb: 1017,
      pressure_in: 30.02,
      precip_mm: 0,
      precip_in: 0,
      humidity: 42,
      cloud: 10,
      feelslike_c: 12.8,
      feelslike_f: 55,
      vis_km: 10,
      vis_miles: 6,
      uv: 1,
      gust_mph: 3.6,
      gust_kph: 5.8,
      air_quality: {
        co: 587.5,
        no2: 32.900001525878906,
        o3: 2.5999999046325684,
        so2: 21,
        pm2_5: 36,
        pm10: 44.900001525878906,
        'us-epa-index': 2,
        'gb-defra-index': 4,
      },
    },
    last_refresh: 1636027045772,
    is_favorite: false,
    id: 'mexico-city-the-federal-district-1943-99',
    notes: {},
  },
  {
    location: {
      name: 'Dhaka',
      region: '',
      country: 'Bangladesh',
      lat: 23.72,
      lon: 90.41,
      tz_id: 'Asia/Dhaka',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 17:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 17:45',
      temp_c: 29.9,
      temp_f: 85.8,
      is_day: 0,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
        code: 1000,
      },
      wind_mph: 8.9,
      wind_kph: 14.4,
      wind_degree: 341,
      wind_dir: 'NNW',
      pressure_mb: 1010,
      pressure_in: 29.82,
      precip_mm: 0,
      precip_in: 0,
      humidity: 43,
      cloud: 0,
      feelslike_c: 30.3,
      feelslike_f: 86.5,
      vis_km: 10,
      vis_miles: 6,
      uv: 7,
      gust_mph: 10.3,
      gust_kph: 16.6,
      air_quality: {
        co: 540.7000122070312,
        no2: 5,
        o3: 150.1999969482422,
        so2: 7.800000190734863,
        pm2_5: 98.19999694824219,
        pm10: 116.30000305175781,
        'us-epa-index': 4,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027045774,
    is_favorite: false,
    id: 'dhaka-2372-9041',
    notes: {},
  },
  {
    location: {
      name: 'Cairo',
      region: 'Al Qahirah',
      country: 'Egypt',
      lat: 30.05,
      lon: 31.25,
      tz_id: 'Africa/Cairo',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 13:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 13:45',
      temp_c: 27,
      temp_f: 80.6,
      is_day: 1,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        code: 1000,
      },
      wind_mph: 17.4,
      wind_kph: 28.1,
      wind_degree: 20,
      wind_dir: 'NNE',
      pressure_mb: 1018,
      pressure_in: 30.06,
      precip_mm: 0,
      precip_in: 0,
      humidity: 45,
      cloud: 0,
      feelslike_c: 26.9,
      feelslike_f: 80.5,
      vis_km: 10,
      vis_miles: 6,
      uv: 8,
      gust_mph: 18.8,
      gust_kph: 30.2,
      air_quality: {
        co: 253.6999969482422,
        no2: 10,
        o3: 90.80000305175781,
        so2: 29.600000381469727,
        pm2_5: 13,
        pm10: 32.70000076293945,
        'us-epa-index': 1,
        'gb-defra-index': 2,
      },
    },
    last_refresh: 1636027045900,
    is_favorite: true,
    id: 'cairo-al-qahirah-3005-3125',
    notes: {},
  },
  {
    location: {
      name: 'Beijing',
      region: 'Beijing',
      country: 'China',
      lat: 39.93,
      lon: 116.39,
      tz_id: 'Asia/Shanghai',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 19:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 19:45',
      temp_c: 9,
      temp_f: 48.2,
      is_day: 0,
      condition: {
        text: 'Mist',
        icon: '//cdn.weatherapi.com/weather/64x64/night/143.png',
        code: 1030,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 140,
      wind_dir: 'SE',
      pressure_mb: 1017,
      pressure_in: 30.03,
      precip_mm: 0,
      precip_in: 0,
      humidity: 93,
      cloud: 0,
      feelslike_c: 9,
      feelslike_f: 48.2,
      vis_km: 3.1,
      vis_miles: 1,
      uv: 1,
      gust_mph: 1.6,
      gust_kph: 2.5,
      air_quality: {
        co: 9185.7998046875,
        no2: 219.39999389648438,
        o3: 0,
        so2: 370,
        pm2_5: 902.4000244140625,
        pm10: 1131.199951171875,
        'us-epa-index': 6,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027045757,
    is_favorite: true,
    id: 'beijing-beijing-3993-11639',
    notes: {},
  },
  {
    location: {
      name: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
      lat: 18.98,
      lon: 72.83,
      tz_id: 'Asia/Kolkata',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 17:26',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 17:15',
      temp_c: 32,
      temp_f: 89.6,
      is_day: 1,
      condition: {
        text: 'Overcast',
        icon: '//cdn.weatherapi.com/weather/64x64/day/122.png',
        code: 1009,
      },
      wind_mph: 10.5,
      wind_kph: 16.9,
      wind_degree: 290,
      wind_dir: 'WNW',
      pressure_mb: 1007,
      pressure_in: 29.74,
      precip_mm: 0,
      precip_in: 0,
      humidity: 49,
      cloud: 50,
      feelslike_c: 36.1,
      feelslike_f: 96.9,
      vis_km: 3,
      vis_miles: 1,
      uv: 8,
      gust_mph: 17.7,
      gust_kph: 28.4,
      air_quality: {
        co: 707.5999755859375,
        no2: 19.700000762939453,
        o3: 147.3000030517578,
        so2: 19.600000381469727,
        pm2_5: 117.69999694824219,
        pm10: 145.3000030517578,
        'us-epa-index': 4,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027046020,
    is_favorite: false,
    id: 'mumbai-maharashtra-1898-7283',
    notes: {},
  },
  {
    location: {
      name: 'Osaka-Shi',
      region: 'Osaka',
      country: 'Japan',
      lat: 34.69,
      lon: 135.5,
      tz_id: 'Asia/Tokyo',
      localtime_epoch: 1636027046,
      localtime: '2021-11-04 20:57',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 20:45',
      temp_c: 15,
      temp_f: 59,
      is_day: 0,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
        code: 1003,
      },
      wind_mph: 5.6,
      wind_kph: 9,
      wind_degree: 330,
      wind_dir: 'NNW',
      pressure_mb: 1017,
      pressure_in: 30.03,
      precip_mm: 0,
      precip_in: 0,
      humidity: 63,
      cloud: 25,
      feelslike_c: 14,
      feelslike_f: 57.2,
      vis_km: 10,
      vis_miles: 6,
      uv: 1,
      gust_mph: 14.5,
      gust_kph: 23.4,
      air_quality: {
        co: 343.79998779296875,
        no2: 43.5,
        o3: 16.5,
        so2: 17.600000381469727,
        pm2_5: 4.400000095367432,
        pm10: 6.800000190734863,
        'us-epa-index': 1,
        'gb-defra-index': 1,
      },
    },
    last_refresh: 1636027046168,
    is_favorite: false,
    id: 'osaka-shi-osaka-3469-1355',
    notes: {},
  },
  {
    location: {
      name: 'Karachi',
      region: 'Sindh',
      country: 'Pakistan',
      lat: 24.87,
      lon: 67.05,
      tz_id: 'Asia/Karachi',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 16:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 16:45',
      temp_c: 32,
      temp_f: 89.6,
      is_day: 1,
      condition: {
        text: 'Mist',
        icon: '//cdn.weatherapi.com/weather/64x64/day/143.png',
        code: 1030,
      },
      wind_mph: 9.4,
      wind_kph: 15.1,
      wind_degree: 220,
      wind_dir: 'SW',
      pressure_mb: 1011,
      pressure_in: 29.85,
      precip_mm: 0,
      precip_in: 0,
      humidity: 21,
      cloud: 0,
      feelslike_c: 30.2,
      feelslike_f: 86.3,
      vis_km: 4,
      vis_miles: 2,
      uv: 9,
      gust_mph: 7.2,
      gust_kph: 11.5,
      air_quality: {
        co: 1295.0999755859375,
        no2: 31.200000762939453,
        o3: 220.3000030517578,
        so2: 32.900001525878906,
        pm2_5: 96.4000015258789,
        pm10: 125.80000305175781,
        'us-epa-index': 4,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027046179,
    is_favorite: false,
    id: 'karachi-sindh-2487-6705',
    notes: {},
  },
  {
    location: {
      name: 'Chongqing',
      region: 'Chongqing',
      country: 'China',
      lat: 29.56,
      lon: 106.55,
      tz_id: 'Asia/Shanghai',
      localtime_epoch: 1636026967,
      localtime: '2021-11-04 19:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 19:45',
      temp_c: 17,
      temp_f: 62.6,
      is_day: 0,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
        code: 1003,
      },
      wind_mph: 11.9,
      wind_kph: 19.1,
      wind_degree: 10,
      wind_dir: 'N',
      pressure_mb: 1011,
      pressure_in: 29.85,
      precip_mm: 0,
      precip_in: 0,
      humidity: 94,
      cloud: 25,
      feelslike_c: 17,
      feelslike_f: 62.6,
      vis_km: 9,
      vis_miles: 5,
      uv: 4,
      gust_mph: 5.1,
      gust_kph: 8.3,
      air_quality: {
        co: 1842.5,
        no2: 50.70000076293945,
        o3: 0,
        so2: 71.5,
        pm2_5: 181.60000610351562,
        pm10: 203.5,
        'us-epa-index': 5,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027046180,
    is_favorite: false,
    id: 'chongqing-chongqing-2956-10655',
    notes: {},
  },
  {
    location: {
      name: 'Istanbul',
      region: 'Istanbul',
      country: 'Turkey',
      lat: 41.02,
      lon: 28.96,
      tz_id: 'Europe/Istanbul',
      localtime_epoch: 1636026968,
      localtime: '2021-11-04 14:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 14:45',
      temp_c: 21,
      temp_f: 69.8,
      is_day: 1,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        code: 1000,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 210,
      wind_dir: 'SSW',
      pressure_mb: 1021,
      pressure_in: 30.15,
      precip_mm: 0,
      precip_in: 0,
      humidity: 69,
      cloud: 0,
      feelslike_c: 21,
      feelslike_f: 69.8,
      vis_km: 10,
      vis_miles: 6,
      uv: 6,
      gust_mph: 3.8,
      gust_kph: 6.1,
      air_quality: {
        co: 307.1000061035156,
        no2: 13.399999618530273,
        o3: 59.400001525878906,
        so2: 12.399999618530273,
        pm2_5: 17.799999237060547,
        pm10: 22.299999237060547,
        'us-epa-index': 2,
        'gb-defra-index': 2,
      },
    },
    last_refresh: 1636027046148,
    is_favorite: false,
    id: 'istanbul-istanbul-4102-2896',
    notes: {},
  },
  {
    location: {
      name: 'Buenos Aires',
      region: 'Distrito Federal',
      country: 'Argentina',
      lat: -34.59,
      lon: -58.67,
      tz_id: 'America/Argentina/Buenos_Aires',
      localtime_epoch: 1636026968,
      localtime: '2021-11-04 8:56',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 08:45',
      temp_c: 21,
      temp_f: 69.8,
      is_day: 1,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003,
      },
      wind_mph: 8.1,
      wind_kph: 13,
      wind_degree: 60,
      wind_dir: 'ENE',
      pressure_mb: 1010,
      pressure_in: 29.83,
      precip_mm: 0,
      precip_in: 0,
      humidity: 88,
      cloud: 75,
      feelslike_c: 21,
      feelslike_f: 69.8,
      vis_km: 10,
      vis_miles: 6,
      uv: 5,
      gust_mph: 6.3,
      gust_kph: 10.1,
      air_quality: {
        co: 287.1000061035156,
        no2: 6.900000095367432,
        o3: 5.099999904632568,
        so2: 1.399999976158142,
        pm2_5: 1.2999999523162842,
        pm10: 1.899999976158142,
        'us-epa-index': 1,
        'gb-defra-index': 1,
      },
    },
    last_refresh: 1636027046145,
    is_favorite: false,
    id: 'buenos-aires-distrito-federal-3459-5867',
    notes: {},
  },
  {
    location: {
      name: 'Kolkata',
      region: 'West Bengal',
      country: 'India',
      lat: 22.57,
      lon: 88.37,
      tz_id: 'Asia/Kolkata',
      localtime_epoch: 1636026968,
      localtime: '2021-11-04 17:26',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 17:15',
      temp_c: 29,
      temp_f: 84.2,
      is_day: 0,
      condition: {
        text: 'Mist',
        icon: '//cdn.weatherapi.com/weather/64x64/night/143.png',
        code: 1030,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 320,
      wind_dir: 'NW',
      pressure_mb: 1010,
      pressure_in: 29.83,
      precip_mm: 0,
      precip_in: 0,
      humidity: 55,
      cloud: 25,
      feelslike_c: 30.4,
      feelslike_f: 86.8,
      vis_km: 3.2,
      vis_miles: 1,
      uv: 8,
      gust_mph: 7.8,
      gust_kph: 12.6,
      air_quality: {
        co: 1482,
        no2: 38.400001525878906,
        o3: 140.1999969482422,
        so2: 42,
        pm2_5: 291.70001220703125,
        pm10: 365.79998779296875,
        'us-epa-index': 6,
        'gb-defra-index': 10,
      },
    },
    last_refresh: 1636027046232,
    is_favorite: false,
    id: 'kolkata-west-bengal-2257-8837',
    notes: {},
  },
  {
    location: {
      name: 'Kansas City',
      region: 'Missouri',
      country: 'United States of America',
      lat: 39.1,
      lon: -94.58,
      tz_id: 'America/Chicago',
      localtime_epoch: 1636027079,
      localtime: '2021-11-04 6:57',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 06:45',
      temp_c: 5.6,
      temp_f: 42.1,
      is_day: 0,
      condition: {
        text: 'Overcast',
        icon: '//cdn.weatherapi.com/weather/64x64/night/122.png',
        code: 1009,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 80,
      wind_dir: 'E',
      pressure_mb: 1026,
      pressure_in: 30.29,
      precip_mm: 0,
      precip_in: 0,
      humidity: 62,
      cloud: 100,
      feelslike_c: 4.2,
      feelslike_f: 39.5,
      vis_km: 16,
      vis_miles: 9,
      uv: 1,
      gust_mph: 8.9,
      gust_kph: 14.4,
      air_quality: {
        co: 383.8999938964844,
        no2: 25,
        o3: 26.799999237060547,
        so2: 0.8999999761581421,
        pm2_5: 7,
        pm10: 8.199999809265137,
        'us-epa-index': 1,
        'gb-defra-index': 1,
      },
    },
    last_refresh: 1636027078765,
    is_favorite: false,
    id: 'kansas-city-missouri-391-9458',
    notes: {},
  },
  {
    location: {
      name: 'Tripoli',
      region: 'Tarabulus',
      country: 'Libya',
      lat: 32.89,
      lon: 13.18,
      tz_id: 'Africa/Tripoli',
      localtime_epoch: 1636027256,
      localtime: '2021-11-04 14:00',
    },
    data: {
      last_updated_epoch: 1636026300,
      last_updated: '2021-11-04 13:45',
      temp_c: 35.6,
      temp_f: 96.1,
      is_day: 1,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
        code: 1000,
      },
      wind_mph: 18.8,
      wind_kph: 30.2,
      wind_degree: 212,
      wind_dir: 'SSW',
      pressure_mb: 1011,
      pressure_in: 29.84,
      precip_mm: 0,
      precip_in: 0,
      humidity: 14,
      cloud: 0,
      feelslike_c: 33.9,
      feelslike_f: 93,
      vis_km: 10,
      vis_miles: 6,
      uv: 9,
      gust_mph: 21.7,
      gust_kph: 34.9,
      air_quality: {
        co: 260.3999938964844,
        no2: 4.300000190734863,
        o3: 83.69999694824219,
        so2: 3.200000047683716,
        pm2_5: 63.099998474121094,
        pm10: 277.5,
        'us-epa-index': 3,
        'gb-defra-index': 8,
      },
    },
    last_refresh: 1636027255911,
    is_favorite: false,
    id: 'tripoli-tarabulus-3289-1318',
    notes: {},
  },
  {
    location: {
      name: 'Cabool',
      region: 'Kabol',
      country: 'Afghanistan',
      lat: 34.52,
      lon: 69.18,
      tz_id: 'Asia/Kabul',
      localtime_epoch: 1636027326,
      localtime: '2021-11-04 16:32',
    },
    data: {
      last_updated_epoch: 1636023600,
      last_updated: '2021-11-04 15:30',
      temp_c: 15.3,
      temp_f: 59.5,
      is_day: 1,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003,
      },
      wind_mph: 4.3,
      wind_kph: 6.8,
      wind_degree: 78,
      wind_dir: 'ENE',
      pressure_mb: 1012,
      pressure_in: 29.88,
      precip_mm: 0,
      precip_in: 0,
      humidity: 23,
      cloud: 26,
      feelslike_c: 15.3,
      feelslike_f: 59.5,
      vis_km: 10,
      vis_miles: 6,
      uv: 5,
      gust_mph: 4.9,
      gust_kph: 7.9,
      air_quality: {
        co: 1869.199951171875,
        no2: 3.5999999046325684,
        o3: 176,
        so2: 1.2000000476837158,
        pm2_5: 41.900001525878906,
        pm10: 48.70000076293945,
        'us-epa-index': 3,
        'gb-defra-index': 4,
      },
    },
    last_refresh: 1636027326077,
    is_favorite: false,
    id: 'cabool-kabol-3452-6918',
    notes: {},
  },
];
