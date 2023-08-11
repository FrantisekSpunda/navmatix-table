import { cn } from 'utils'
import React from 'react'
import { AddIcon } from 'types'

export interface IconProps extends AddIcon, React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean

  children?: undefined
  onClick?: () => void
}

export const Icon: React.FC<IconProps> = React.memo(({ className, active, name, activeName, type = '', activeType, ...props }) => {
  if (activeName === undefined) activeName = name
  if (type === 'filled') type = ''
  if (activeType === 'filled') activeType = '' as any
  if (activeType === undefined) activeType = type as any

  const realName = React.useMemo(() => (active ? activeName : name), [active, activeName, name])
  const realType = React.useMemo(() => (active ? activeType : type), [active, activeType, type])

  return (
    <i {...props} className={cn(`material-icons${realType && '-' + realType}`, className)}>
      {realName}
    </i>
  )
})
