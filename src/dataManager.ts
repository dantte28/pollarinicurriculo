import { PortfolioData } from './types';
import { defaultPortfolioData } from './defaultData';

const STORAGE_KEY = 'portfolio_data';

export const dataManager = {
  get(): PortfolioData {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Automatically migrate the placeholder photo to the new local image if it hasn't been changed
        if (parsed?.personal?.photo === 'https://picsum.photos/seed/thais/400/400') {
          parsed.personal.photo = defaultPortfolioData.personal.photo;
          // Optionally save it back, or just return it amended:
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse stored portfolio data', e);
      }
    }
    return defaultPortfolioData;
  },

  save(data: PortfolioData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch a custom event to notify other parts of the app
    window.dispatchEvent(new CustomEvent('portfolioDataChanged', { detail: data }));
  },

  exportJSON(data: PortfolioData): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  async importJSON(file: File): Promise<PortfolioData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve(data);
        } catch (e) {
          reject(new Error('Invalid JSON file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  async convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
};
