import { cn } from '@/lib/utils';

export function StackOverflowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      width="24"
      height="24"
      viewBox="0 0 32 37"
      fill="currentColor"
    >
      <path d="M29.237 36.338H2.733V23.585h3.958v8.804h18.588v-8.804h3.958v12.753zM7.962 19.632l19.492 4.365 1.05-3.83-19.49-4.365-1.052 3.83zm2.526-7.005L28.09 18.57l2.103-3.32-17.602-5.943-2.103 3.32zm5.257-6.52L24.12 11.05l3.155-2.613-11.38-8.125-3.155 2.613zm10.932-5.46L15.3 6.965l3.958 1.838 11.38-8.126-3.958-1.838zM2.733 19.632h26.504V15.67H2.733v3.962z"></path>
    </svg>
  );
}
