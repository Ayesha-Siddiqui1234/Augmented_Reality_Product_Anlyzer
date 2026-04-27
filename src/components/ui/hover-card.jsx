// src/components/ui/hover-card.jsx

import { useState, useRef, useEffect } from 'react'

export function HoverCard({ children, openDelay = 200, closeDelay = 150 }) {
  const [open, setOpen] = useState(false)
  const openTimer  = useRef(null)
  const closeTimer = useRef(null)

  const scheduleOpen  = () => { clearTimeout(closeTimer.current); openTimer.current  = setTimeout(() => setOpen(true),  openDelay)  }
  const scheduleClose = () => { clearTimeout(openTimer.current);  closeTimer.current = setTimeout(() => setOpen(false), closeDelay) }

  useEffect(() => () => { clearTimeout(openTimer.current); clearTimeout(closeTimer.current) }, [])

  return (
    <div className="relative inline-block" onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>
      {children?.map
        ? children.map((child, i) =>
            child?.type?.name === 'HoverCardTrigger'
              ? <child.type key={i} {...child.props} />
              : child?.type?.name === 'HoverCardContent'
                ? <child.type key={i} {...child.props} open={open} />
                : child
          )
        : children}
    </div>
  )
}

export function HoverCardTrigger({ children }) {
  return <>{children}</>
}

export function HoverCardContent({
  children, open, side = 'bottom', sideOffset = 8,
  align = 'center', alignOffset = 0, className = '',
}) {
  const posMap = {
    bottom: { top: `calc(100% + ${sideOffset}px)` },
    top:    { bottom: `calc(100% + ${sideOffset}px)` },
    left:   { right: `calc(100% + ${sideOffset}px)`, top: 0 },
    right:  { left:  `calc(100% + ${sideOffset}px)`, top: 0 },
  }
  const isVertical = side === 'top' || side === 'bottom'
  const alignStyles = isVertical
    ? ({ start: { left: alignOffset }, center: { left: '50%', transform: 'translateX(-50%)' }, end: { right: alignOffset } })[align]
    : {}

  return (
    <div
      role="tooltip"
      style={{ ...posMap[side], ...alignStyles, pointerEvents: open ? 'auto' : 'none' }}
      className={`
        absolute z-50 rounded-2xl
        border border-stone-200 dark:border-stone-700
        bg-white dark:bg-stone-900
        shadow-xl dark:shadow-stone-950/50
        transition-all duration-200
        ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
