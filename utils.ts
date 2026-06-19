import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-HT', {
    style: 'currency',
    currency: 'HTG',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).
  format(amount).
  replace('HTG', 'HTG ');
}

export const CARIBBEAN_COLORS = {
  navy: '#0A1628',
  gold: '#F59E0B',
  orange: '#FF6B35',
  teal: '#0D9488',
  white: '#FFFFFF',
  offWhite: '#F9FAFB'
};