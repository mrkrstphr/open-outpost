import clsx from 'clsx';
import { type DetailedHTMLProps, type HTMLAttributes } from 'react';
import type { IconType } from 'react-icons';
import {
  FiAlertOctagon as DangerIcon,
  FiInfo as InfoIcon,
  FiCheckCircle as SuccessIcon,
  FiAlertTriangle as WarningIcon,
} from 'react-icons/fi';

export type AlertVariant = 'info' | 'warning' | 'danger' | 'success';

const variantToClassMap: Record<AlertVariant, string> = {
  info: 'bg-purple-500 hover:bg-purple-600',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-green-500 hover:bg-green-600',
  warning: 'bg-yellow-500 text-black',
};

const variantToIconMap: Record<AlertVariant, IconType> = {
  info: InfoIcon,
  danger: DangerIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

export type AlertProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  variant?: AlertVariant;
};

export const Alert = ({ children, className, variant = 'info' }: AlertProps) => {
  const Icon = variantToIconMap[variant];

  return (
    <div className={clsx('px-2 py-1 flex items-center space-x-1', className, variantToClassMap[variant])}>
      <Icon /> <span>{children}</span>
    </div>
  );
};
