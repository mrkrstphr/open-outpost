import { structureSpec } from '../../data/structures';
import { Building } from '../../types';

export function StructureIsDisabled({ structure }: { structure: Building }) {
  const definition = structureSpec[structure.type];

  return (
    <div>
      <div className="mb-1">This structure is disabled.</div>
      <div className="flex space-x-1 items-center">TODO: [Re-enable]</div>
    </div>
  );
}
