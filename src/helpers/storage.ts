export const storage = {
  setItem: (name: string, data: any) => {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    return localStorage.setItem(name, data);
  },
  getItem: (name: string, isString?: boolean) => {
    const value = localStorage.getItem(name);
    return value ? (isString ? value : JSON.parse(value)) : null;
  },
  removeItem: (name: string) => localStorage.removeItem(name),
  removeItems: (names: string[]) =>
    names.forEach((name) => localStorage.removeItem(name)),
  clear: () => localStorage.clear(),
};
