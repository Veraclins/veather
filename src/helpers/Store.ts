import { createReportId, createUniqueId } from 'helpers';
import { storage } from 'helpers/storage';

export interface ReportLocation {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
  localtime_epoch: number;
}
export interface Report {
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    'us-epa-index': number;
    'gb-defra-index': number;
  };
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated_epoch: number;
  last_updated: string;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}
export interface Note {
  id: string;
  body: string;
}
export interface APIReport {
  id?: string;
  location: ReportLocation;
  current: Report;
}
export interface WeatherReport {
  id?: string;
  location: ReportLocation;
  data: Report;
  last_refresh: number;
  is_favorite: boolean;
  notes: {
    [id: string]: Note;
  };
}
interface NameOptions {
  name: string;
  lat?: number;
  long?: number;
}
interface CoordOptions {
  name?: string;
  lat: number;
  long: number;
}
export type WeatherFetchOptions = NameOptions | CoordOptions;

interface StoreState {
  [id: string]: WeatherReport;
}
export default class Store {
  private _state: StoreState;
  constructor() {
    this._state = storage.getItem('store') || {};
    this.saveState();
  }

  private set state(value: StoreState) {
    this._state = value;
  }
  private get state() {
    return this._state;
  }

  private async saveState() {
    const state = this.state;
    storage.setItem('store', state);
    return state;
  }

  getState() {
    this.state = storage.getItem('store') || {};
    return Object.values(this.state);
  }
  private saveReport(reportId: string, report: WeatherReport) {
    this.state[reportId] = report;
    return this.saveState();
  }

  private prepReport(report: APIReport) {
    const reportId = report.id || createReportId(report.location);
    const data: WeatherReport = {
      id: reportId,
      last_refresh: Date.now(),
      location: report.location,
      data: report.current,
      notes: {},
      is_favorite: false,
    };
    const existing = this.state[reportId];
    if (existing) {
      data.notes = existing.notes;
      data.is_favorite = existing.is_favorite;
    }

    return data;
  }

  clearState() {
    this.state = {};
    return this.saveState;
  }

  addReport(report: APIReport) {
    const data = this.prepReport(report);
    this.saveReport(data.id!, data);
    return data;
  }
  addManyReports(reports: APIReport[]) {
    const results = reports.map((report) => {
      const data = this.prepReport(report);
      this.state[data.id!] = data;
      return data;
    });

    this.saveState();
    return results;
  }
  deleteReport(reportId: string) {
    const report = this.state[reportId];
    if (!report) {
      throw new Error('No such report found. Please save it first');
    }
    delete this.state[reportId];
    this.saveState();
  }
  toggleReportFavorite(reportId: string) {
    const report = this.state[reportId];
    if (!report) {
      throw new Error('No such report found. Please save it first');
    }
    report.is_favorite = !report.is_favorite;
    this.saveReport(reportId, report);
    return report;
  }
  addOrEditReportNote(reportId: string, note: Note) {
    const report = this.state[reportId];
    if (!report) {
      throw new Error('No such report found. Please save it first');
    }
    if (!note.body) {
      throw new Error('The body of a note cannot be empty');
    }
    if (!note.id) {
      note.id = createUniqueId(note.body);
    }
    report.notes[note.id] = note;
    this.saveReport(reportId, report);
    return note;
  }
  deleteReportNote(reportId: string, noteId: string) {
    const report = this.state[reportId];
    if (!report) {
      throw new Error('No such report found. Please save it first');
    }
    if (!noteId) {
      throw new Error('No such note found');
    }

    delete report.notes[noteId];
    this.saveReport(reportId, report);
  }
}
