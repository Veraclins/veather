export const storage = {
  setItem: (name: string, data: any) => {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    return localStorage.setItem(name, data);
  },
  getItem: (name: string) => {
    const value: any = localStorage.getItem(name);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },
  removeItem: (name: string) => localStorage.removeItem(name),
  removeItems: (names: string[]) =>
    names.forEach((name) => localStorage.removeItem(name)),
  clear: () => localStorage.clear(),
};
