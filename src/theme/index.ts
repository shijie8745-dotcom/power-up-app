import type { DefaultTheme } from 'styled-components';

export const theme = {
  colors: {
    primary: '#4A90E2',
    yellow: '#FFD93D',
    green: '#6BCB77',
    background: '#F8F9FA',
    text: '#2C3E50',
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    white: '#FFFFFF',
    gray: '#BDC3C7',
    lightGray: '#ECF0F1',
  },
  fonts: {
    chinese: '"PingFang SC", "Microsoft YaHei", sans-serif',
    english: '"Comic Neue", "Comic Sans MS", cursive',
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    xl: '20px',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
} as DefaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      yellow: string;
      green: string;
      background: string;
      text: string;
      success: string;
      warning: string;
      error: string;
      white: string;
      gray: string;
      lightGray: string;
    };
    fonts: {
      chinese: string;
      english: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      xl: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}