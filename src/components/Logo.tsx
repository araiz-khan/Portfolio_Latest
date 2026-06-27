import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useId } from 'react';

export default function Logo({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <motion.div
      layoutId="main-logo"
      className={cn(
        'inline-flex items-center justify-center rounded-md p-1',
        className
      )}
    >
      <svg
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
        <path
          d="M26 124 L58 30 L90 124"
          stroke={`url(#${gradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M120 30 L120 124"
          stroke={`url(#${gradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M120 80 L172 30"
          stroke={`url(#${gradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M120 80 L174 124"
          stroke={`url(#${gradientId})`}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}