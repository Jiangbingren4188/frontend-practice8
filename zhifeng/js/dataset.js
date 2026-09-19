const DATASET = {
  key: 'zhifeng-battles',
  async load() {
    const saved = localStorage.getItem(this.key);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (error) {
        localStorage.removeItem(this.key);
      }
    }
    const response = await fetch('data/battles.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();
    return data.battles;
  },
  save(list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  },
  clear() {
    localStorage.removeItem(this.key);
  }
};
