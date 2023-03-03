export function Content({
  children,
  title,
}: {
  children: string | React.ReactNode;
  title: string;
}) {
  return (
    <div className="">
      <div className="font-bold mb-1">{title}</div>
      <div>{children}</div>
    </div>
  );
}
