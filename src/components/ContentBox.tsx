import { BoxProps } from './Box';

export type ContentBoxProps = BoxProps & {
  action?: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

export const ContentBox = ({ action, title, children, className, ...props }: ContentBoxProps) => (
  <div className={`border border-purple-500 ${className}`} {...props}>
    <div className="border-b border-purple-500">
      <div className="p-1">
        <div className="flex items-center">
          <strong className="flex-1">{title}</strong>
          {action}
        </div>
      </div>
    </div>
    <div className="p-1">{children}</div>
  </div>
);
