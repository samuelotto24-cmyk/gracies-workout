'use client';

interface ProgramToggleProps {
  value: '3day' | '5day';
  onChange: (value: '3day' | '5day') => void;
}

export default function ProgramToggle({ value, onChange }: ProgramToggleProps) {
  return (
    <div className="flex justify-center px-4">
      <div className="inline-flex items-center rounded-full bg-blush p-1 gap-1">
        <button
          type="button"
          onClick={() => onChange('3day')}
          className={[
            'rounded-full px-5 py-2 text-sm font-sans font-medium transition-all duration-200',
            value === '3day'
              ? 'bg-mauve text-white shadow-sm'
              : 'bg-transparent text-pink-dusty hover:text-mauve',
          ].join(' ')}
        >
          3-Day Beginner
        </button>
        <button
          type="button"
          onClick={() => onChange('5day')}
          className={[
            'rounded-full px-5 py-2 text-sm font-sans font-medium transition-all duration-200',
            value === '5day'
              ? 'bg-mauve text-white shadow-sm'
              : 'bg-transparent text-pink-dusty hover:text-mauve',
          ].join(' ')}
        >
          5-Day Advanced
        </button>
      </div>
    </div>
  );
}
