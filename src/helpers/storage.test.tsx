import { storage } from 'helpers/storage';

describe('LocalStorage helper function', () => {
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
    storage.clear();
  });
  it('saves data in local storage', async () => {
    const data = { id: 'random-data', name: 'the name' };
    storage.setItem('data', data);
    expect(localStorage['data']).toBeDefined();
  });
  it('gets data from local storage', async () => {
    const data = { id: 'random-data', name: 'the name' };
    storage.setItem('data', data);
    const loaded = storage.getItem('data');
    expect(loaded.id).toEqual(data.id);
  });
  it('removes data from local storage', async () => {
    const data = { id: 'random-data', name: 'the name' };
    storage.setItem('data', data);
    storage.removeItem('data');
    const loaded = storage.getItem('data');
    expect(loaded).toEqual(null);
  });
  it('removes multiple data from local storage at the same time', async () => {
    const data = { id: 'random-data', name: 'the name' };
    const data2 = { id: 'random-data2', name: 'the name again' };
    const data3 = { id: 'random-data3', name: 'the name third' };
    storage.setItem('data', data);
    storage.setItem('data2', data2);
    storage.setItem('data3', data3);
    storage.removeItems(['data', 'data2', 'data3']);
    const loaded = storage.getItem('data');
    const loaded2 = storage.getItem('data2');
    expect(loaded).toEqual(null);
    expect(loaded2).toEqual(null);
  });
  it('clears all data from local storage at the same time', async () => {
    const data = { id: 'random-data', name: 'the name' };
    const data2 = { id: 'random-data2', name: 'the name again' };
    const data3 = { id: 'random-data3', name: 'the name third' };
    storage.setItem('data', data);
    storage.setItem('data2', data2);
    storage.setItem('data3', data3);
    storage.clear();
    const loaded = storage.getItem('data');
    const loaded2 = storage.getItem('data2');
    const loaded3 = storage.getItem('data3');
    expect(loaded).toEqual(null);
    expect(loaded2).toEqual(null);
    expect(loaded3).toEqual(null);
  });
});
