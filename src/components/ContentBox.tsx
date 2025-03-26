import clsx from 'clsx';
import type { IconType } from 'react-icons/lib';
import type { BoxProps } from './Box';

export type ContentBoxProps = BoxProps & {
  action?: React.ReactNode;
  classNames?: { body?: string; icon?: string };
  icon?: IconType;
  title: string;
  children: React.ReactNode;
};

export const ContentBox = ({
  action,
  icon: Icon,
  title,
  children,
  className,
  classNames,
  ...props
}: ContentBoxProps) => (
  <div className={`border flex flex-col border-purple-500 ${className}`} {...props}>
    <div className="border-b border-purple-500">
      <div className="p-1">
        <div className="flex items-center">
          <div className="flex-1 flex items-center space-x-1">
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
