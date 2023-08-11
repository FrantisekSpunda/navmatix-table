import React from 'react'
import { HTMLProps } from 'react'

export interface InterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean
}

export const IndeterminateCheckbox: React.FC<InterminateCheckboxProps> = ({ indeterminate, className = '', ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />
}
