import React from 'react'
import type { ReactNode } from 'react'

interface GridProps {
  children?: ReactNode
  className?: string
}

interface GridItemProps {
  children?: ReactNode
  cols?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  offset?: number
  className?: string
  withBg?: boolean
}

const Grid = ({ children, className = '' }: GridProps) => {
  return (
    <div className={`w-full inline-block grid-block -mx-1 ${className}`}>{children}</div>
  )
}

const GridItem = ({
  children,
  cols = 12,
  xs = 12,
  sm = cols,
  md = cols,
  lg = md,
  xl = lg,
  offset = 0,
  className = '',
  withBg = false
}: GridItemProps) => {
  return (
    <div
    className={`grid-item px-1 mb-2 float-left w-${xs}/12 min-h-[1rem] sm:w-${sm}/12 md:w-${md}/12 lg:w-${lg}/12 xl:w-${xl}/12 ${
        offset ? `sm:ml-${offset}/12 md:ml-${offset}/12 lg:ml-${offset}/12 xl:ml-${offset}/12` : ''
      } ${className}`}
    >
      <div className={`${withBg ? 'bg-white dark:bg-gray-900 rounded-md p-3' : ''}`}>
      {children}
      </div>
    </div>
  )
}

export { Grid, GridItem }
