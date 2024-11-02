import React from 'react'
import clsx from 'clsx'

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className, // Added className prop
  ...args
}) => {
  const baseStyles =
    'rounded-lg font-medium focus:outline-none transition-transform duration-100 ease-in-out'

  const sizeStyles = {
    small: 'px-3 py-0.5 text-xs',
    medium: 'px-5 py-1 text-sm',
    large: 'px-6 py-2 text-base',
  }

  const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const hoverEffect = 'transform hover:scale-[1.02]' // Slightly reduced scale effect
  const disabledStyles = 'opacity-50 cursor-not-allowed'

  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        hoverEffect,
        disabled && disabledStyles,
        className // Allow className to override styles
      )}
      disabled={disabled}
      {...args}
    >
      {children}
    </button>
  )
}

export default Button
