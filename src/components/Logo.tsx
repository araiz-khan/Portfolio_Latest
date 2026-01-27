import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Logo({ className }: { className?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradientClass = mounted && theme === 'dark' 
    ? 'from-blue-500 to-purple-600' 
    : 'from-blue-700 to-purple-800';

  return (
    // layoutId is the magic key. Components with the same ID will morph into each other.
    <motion.div
      layoutId="main-logo"
      className={cn(
        'flex items-center justify-center rounded-md p-1',
        className
      )}
    >
      <span className={cn('font-black bg-gradient-to-r bg-clip-text text-transparent', gradientClass)}>
        AK
      </span>
    </motion.div>
  );
}