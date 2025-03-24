import { IconType } from 'react-icons/lib';
import { BoxProps } from './Box';

export type ContentBoxProps = BoxProps & {
  action?: React.ReactNode;
  classNames?: { icon?: string };
  icon?: IconType;
  title: string;
  children: React.ReactNode;
};

export const ContentBox = ({
  action,
  title,
  children,
  className,
  classNames,
  ...props
}: ContentBoxProps) => (
  <div className={`border border-purple-500 ${className}`} {...props}>
    <div className="border-b border-purple-500">
      <div className="p-1">
        <div className="flex items-center">
          <div className="flex-1 flex items-center space-x-1">
            {props.icon && <props.icon className={classNames?.icon} />}
            <span className="flex-1 ">{title}</span>
          </div>
          {action}
        </div>
      </div>
    </div>
    <div className="p-1">{children}</div>
  </div>
);
