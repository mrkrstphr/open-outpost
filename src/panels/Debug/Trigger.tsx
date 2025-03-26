import { lazy, useState } from 'react';
import { VscDebug as DebugIcon } from 'react-icons/vsc';

const DebugPanel = lazy(() => import('./Debug'));

export const DebugTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DebugIcon
        className="text-xl text-red-500 hover:text-red-400 active:text-red-400 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && <DebugPanel onClose={() => setIsOpen(false)} />}
    </>
  );
};
