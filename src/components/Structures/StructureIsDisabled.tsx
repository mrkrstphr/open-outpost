import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { Structure } from '../../types';
import { hasEnoughStaffForStructure } from '../../util/colonists';
import { hasEnoughPowerForStructure } from '../../util/power';
import { Alert } from '../Alert';

export function StructureIsDisabled({ structure }: { structure: Structure }) {
  const state = useSelector((state: RootState) => state.game);
  const hasEnoughPower = hasEnoughPowerForStructure(state, structure);
  const hasEnoughStaff = hasEnoughStaffForStructure(state, structure);

  return (
    <div className="flex flex-col space-y-1">
      <Alert variant="warning">This structure is offline.</Alert>
      {!hasEnoughPower && <Alert variant="warning">There is not enough power to turn this structure online.</Alert>}
      {!hasEnoughStaff && <Alert variant="warning">There is not enough staff to turn this structure online.</Alert>}
    </div>
  );
}
