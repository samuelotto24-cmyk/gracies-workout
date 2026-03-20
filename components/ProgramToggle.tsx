'use client';

import { cn } from '@/lib/utils';

interface ProgramToggleProps {
  value: '3day' | '5day';
  onChange: (value: '3day' | '5day') => void;
}

export default function ProgramToggle({ value, onChange }: ProgramToggleProps) {
  const baseClass = 'rounded-full px-5 py-2 text-sm font-sans font-medium transition-all duration-200';

  return (
    <div className="flex justify-center px-4">
      <div
        className="inline-flex items-center rounded-full bg-blush p-1 gap-1"
        role="group"
        aria-label="Workout program"
      >
        <button
          type="button"
          onClick={() => onChange('3day')}
          aria-pressed={value === '3day'}
          className={cn(
            baseClass,
            value === '3day'
              ? 'bg-mauve text-white shadow-sm'
              : 'bg-transparent text-pink-dusty hover:text-mauve'
          )}
        >
          3-Day Beginner
        </button>
        <button
          type="button"
          onClick={() => onChange('5day')}
          aria-pressed={value === '5day'}
          className={cn(
            baseClass,
            value === '5day'
              ? 'bg-mauve text-white shadow-sm'
              : 'bg-transparent text-pink-dusty hover:text-mauve'
          )}
        >
          5-Day Advanced
        </button>
      </div>
    </div>
  );
}
