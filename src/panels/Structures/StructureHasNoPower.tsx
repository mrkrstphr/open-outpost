import { Building } from '../../types';

export function StructureHasNoPower({ structure }: { structure: Building }) {
  return (
    <div>
      <div className="mb-1">There is not enough power to enable this structure.</div>
    </div>
  );
}
