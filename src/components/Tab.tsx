import clsx from 'clsx';

export function Tab({
  active = false,
  children,
  onClick,
}: {
  active?: boolean;
  children: string | React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        'cursor-pointer text-white py-0.5 px-2 text-sm hover:bg-purple-400',
        !active && 'bg-stone-500',
        active && 'bg-purple-400'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
