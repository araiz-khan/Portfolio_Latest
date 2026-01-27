import { cn } from '@/lib/utils';

export function AKIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-md p-1',
        className
      )}
    >
      <span className="text-5xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        AK
      </span>
    </div>
  );
}
