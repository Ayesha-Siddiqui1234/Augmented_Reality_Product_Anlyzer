// src/components/ui/slide-button.jsx

export function SlideButton({
  children,
  onClick,
  className = '',
  type = 'button',
  variant = 'dark',
  ...props
}) {
  const base = variant === 'amber'
    ? 'border-amber-400 text-amber-400 before:bg-amber-400 hover:text-stone-900'
    : 'border-stone-900 dark:border-stone-400 text-stone-900 dark:text-stone-100 before:bg-stone-900 dark:before:bg-stone-100 hover:text-white dark:hover:text-stone-900'

  return (
    <button
      type={type}
      onClick={onClick}
      {...props}
      className={`
        relative overflow-hidden
        w-full py-2.5 text-sm font-medium rounded-xl
        border transition-colors duration-300
        before:absolute before:inset-0 before:translate-x-[-101%]
        before:transition-transform before:duration-300 before:ease-in-out
        hover:before:translate-x-0
        ${base}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
