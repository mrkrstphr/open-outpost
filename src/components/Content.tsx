export function Content({
  action,
  children,
  title,
}: {
  action?: React.ReactNode;
  children: string | React.ReactNode;
  title: string;
}) {
  return (
    <div className="">
      <div className="flex align-center">
        <div className="font-bold mb-1 flex-1">{title}</div>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}
