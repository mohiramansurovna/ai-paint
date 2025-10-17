export const colorMap = {
  light: {
    ink: '#000000',
    red: '#dc2626',
    blue: '#2563eb',
    green: '#16a34a',
  },
  dark: {
    ink: '#ffffff',
    red: '#fca5a5',
    blue: '#93c5fd',
    green: '#86efac',
  }
} as const;

export type ColorKey = keyof typeof colorMap.light;
export type Theme = keyof typeof colorMap;
