import '../css/Button.css'
import React from 'react'

interface ButtonProps extends React.ComponentProps<'button'> {
  color?: 'primary' | 'secondary' | 'error'
  asLink?: boolean
}

function Button({
  children,
  type,
  color = 'primary',
  asLink = false,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      className={`button button-color--${color} ${
        asLink ? 'button-type--link' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
