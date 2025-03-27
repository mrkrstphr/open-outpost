import { structureSpec } from '../../data/structures';
import type { Structure } from '../../types';
import { ProgressBar } from '../ProgressBar';

export function StructureIsBuildingPanel({ structure }: { structure: Structure }) {
  const definition = structureSpec[structure.type];

  return (
    <div>
      <div className="mb-1">Structure is currently building...</div>
      <div className="flex space-x-1 items-center">
        <ProgressBar className="flex-1" percent={Math.min(100, (structure.health / definition.hp) * 100)} />
        <div className="text-right w-22">
          {structure.health}/{definition.hp}
        </div>
      </div>
    </div>
  );
}
