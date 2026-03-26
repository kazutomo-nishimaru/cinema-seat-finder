import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Tailwind CSS のクラス名を安全にマージするユーティリティ関数
// clsx で条件分岐を処理し、tailwind-merge でクラスの競合を解決する
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
