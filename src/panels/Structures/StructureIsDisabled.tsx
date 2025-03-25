import type { Structure } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StructureIsDisabled({ structure }: { structure: Structure }) {
  return (
    <div>
      <div className="mb-1">This structure is disabled.</div>
      <div className="flex space-x-1 items-center">TODO: [Re-enable]</div>
    </div>
  );
}
