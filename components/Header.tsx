interface HeaderProps {
  title?: string;
}

export default function Header({
  title = "Gracie's Workout Plan",
}: HeaderProps) {
  return (
    <header className="w-full py-10 px-6 text-center bg-gradient-to-br from-pink-dusty to-mauve">
      <p className="font-sans text-sm font-medium tracking-widest uppercase text-white/70 mb-3">
        🌸 Personal Fitness Journey 🌸
      </p>
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
        {title}
      </h1>
      <p className="font-sans text-sm sm:text-base text-white/80 mt-3">
        Your personal fitness journey
      </p>
    </header>
  );
}
