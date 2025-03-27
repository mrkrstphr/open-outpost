import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { Link, type LinkProps } from 'react-router';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'warning';

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantToClassMap: Record<ButtonVariant, string> = {
  primary: 'bg-purple-500 hover:bg-purple-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-green-500 hover:bg-green-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600',
  outline: 'border border-white hover:bg-white hover:!text-purple-500 active:bg-white !active:text-purple-500',
};

export const Button = ({ className, children, type = 'button', variant = 'primary', ...props }: ButtonProps) => (
  <button
    type={type}
    className={clsx('text-white py-0.5 px-1 cursor-pointer', variantToClassMap[variant], className)}
    {...props}
  >
    {children}
  </button>
);

export type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
};

export const ButtonLink = ({ className, children, variant = 'primary', ...props }: ButtonLinkProps) => (
  <Link
    className={clsx(
      '!text-white py-0.5 px-1 cursor-pointer hover:!no-underline',
      variantToClassMap[variant],
      className
    )}
    {...props}
  >
    {children}
  </Link>
);
