import { act, fireEvent, render, screen, waitFor } from 'test-utils';
import App from 'App';
import { reports } from 'test-data';
import * as weatherApi from 'helpers/weather';
import userEvent from '@testing-library/user-event';
import Store from 'helpers/Store';

describe('Data store class', () => {
  const newNote = 'A new note that will be saved';
  const report = { ...reports[0] };
  const dataStore = new Store();
  const singleReportData = {
    current: report.data,
    location: report.location,
  };

  const manyReportData = reports.slice(0, 3).map((rep) => ({
    current: rep.data,
    location: rep.location,
  }));

  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };
    global.localStorage = localStorageMock;
    dataStore.clearState();
  });
  it('saves a report', async () => {
    dataStore.addReport(singleReportData);
    const data = dataStore.getState()[0];
    expect(data).toHaveProperty('id');
  });
  it('saves multiple reports', async () => {
    dataStore.addManyReports(manyReportData);
    const data = dataStore.getState();
    expect(data).toHaveLength(manyReportData.length);
  });
  it('updates a report', async () => {
    dataStore.addManyReports(manyReportData);
    const report = dataStore.getState()[0];

    dataStore.addReport({
      id: report.id,
      current: reports[4].data,
      location: report.location,
    });

    const data = dataStore.getState().find((rep) => rep.id === report.id);

    expect(data?.data.humidity).toEqual(reports[4].data.humidity);
  });
  it('deletes a report', async () => {
    dataStore.addManyReports(manyReportData);
    const report = dataStore.getState()[0];
    dataStore.deleteReport(report.id!);
    const data = dataStore.getState();

    expect(data).toHaveLength(manyReportData.length - 1);
  });
  it('should fail when you try to delete a non-existing report', async () => {
    dataStore.addManyReports(manyReportData);
    const t = () => dataStore.deleteReport('random-text');

    expect(t).toThrowError();
  });
  it('favorites a report', async () => {
    dataStore.addManyReports(manyReportData);
    const report = dataStore.getState()[0];
    dataStore.toggleReportFavorite(report.id!);
    const all = dataStore.getState();
    const data = all.find((rep) => rep.id === report.id);

    expect(data?.is_favorite).toEqual(true);
  });
  it('adds a note to a report', async () => {
    dataStore.addManyReports(manyReportData);
    const report = dataStore.getState()[0];
    dataStore.addOrEditReportNote(report.id!, {
      id: '',
      body: newNote,
    });
    const all = dataStore.getState();
    const data = all.find((rep) => rep.id === report.id);

    expect(data).toBeDefined();

    expect(Object.values(data!.notes)).toHaveLength(1);
  });
  it('updates a note to a report', async () => {
    dataStore.addManyReports(manyReportData);
    const report = dataStore.getState()[0];
    const note = dataStore.addOrEditReportNote(report.id!, {
      id: '',
      body: newNote,
    });
    const all = dataStore.getState();
    let data = all.find((rep) => rep.id === report.id);
    expect(data!.notes[note.id].body).toEqual(newNote);
    const updated = newNote + ' and edited';
    dataStore.addOrEditReportNote(report.id!, {
      id: note.id,
      body: updated,
    });
    const allNew = dataStore.getState();
    data = allNew.find((rep) => rep.id === report.id);
    expect(data!.notes[note.id].body).toEqual(updated);
  });
  it('deletes a note to a report', async () => {
    dataStore.addManyReports(manyReportData);
    const report = dataStore.getState()[0];
    const note = dataStore.addOrEditReportNote(report.id!, {
      id: '',
      body: newNote,
    });
    const all = dataStore.getState();
    let data = all.find((rep) => rep.id === report.id);
    expect(Object.values(data!.notes)).toHaveLength(1);
    dataStore.deleteReportNote(report.id!, note.id);
    const allNew = dataStore.getState();
    data = allNew.find((rep) => rep.id === report.id);
    expect(Object.values(data!.notes)).toHaveLength(0);
  });
});
