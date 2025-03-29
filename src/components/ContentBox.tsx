import clsx from 'clsx';
import type { IconType } from 'react-icons/lib';
import type { BoxProps } from './Box';

type Variant = 'default' | 'filled';

export type ContentBoxProps = BoxProps & {
  action?: React.ReactNode;
  classNames?: { body?: string; icon?: string };
  icon?: IconType;
  title: string;
  children: React.ReactNode;
  variant?: Variant;
};

const headerVariantMap: Record<Variant, string> = {
  default: '',
  filled: 'bg-purple-500',
};

export const ContentBox = ({
  action,
  icon: Icon,
  title,
  children,
  className,
  classNames,
  variant = 'default',
  ...props
}: ContentBoxProps) => (
  <div className={clsx('border flex flex-col border-purple-500', className)} {...props}>
    <div className={clsx('border-b border-purple-500', headerVariantMap[variant])}>
      <div className="p-1">
        <div className="flex items-center">
          <div className={'flex-1 flex items-center space-x-1'}>
            {Icon && <Icon className={classNames?.icon} />}
            <span className="flex-1 ">{title}</span>
          </div>
          {action}
        </div>
      </div>
    </div>
    <div className={clsx('p-1 flex-1', classNames?.body)}>{children}</div>
  </div>
);
