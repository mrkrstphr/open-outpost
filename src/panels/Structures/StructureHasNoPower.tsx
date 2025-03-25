import { Structure } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StructureHasNoPower({ structure }: { structure: Structure }) {
  return (
    <div>
      <div className="mb-1">There is not enough power to enable this structure.</div>
    </div>
  );
}
