import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';
import { structureSpec } from '../../data/structures';
import { disableStructure, enableStructure } from '../../state/slices/game';
import type { RootState } from '../../store';
import { StructureStatus } from '../../types';
import { canStructureBeDisabled } from '../../utils';
import { Box } from '../Box';
import { Button, ButtonLink } from '../Button';
import { ContentBox } from '../ContentBox';
import { PageNotFound } from '../PageNotFound';
import { StructureHasNoPower } from './StructureHasNoPower';
import { StructureIsBuildingPanel } from './StructureIsBuildingPanel';
import { StructureIsDisabled } from './StructureIsDisabled';
import { StructureStats } from './StructureStats';

export function StructureContainer() {
  const { id } = useParams<{ id: string }>();
  const structure = useSelector((state: RootState) => state.game.structures.find((s) => s.id === id));
  const [isPendingDisable, setIsPendingDisable] = useState(false);
  const dispatch = useDispatch();

  if (!structure) return <PageNotFound />;

  const definition = structureSpec[structure.type];

  const handleDisableStructureClick = () => {
    dispatch(disableStructure({ structure }));
    setIsPendingDisable(false);
  };

  const handleCancelDisableStructureClick = () => setIsPendingDisable(false);

  const handleEnableStructureClick = () => dispatch(enableStructure({ structure }));

  return (
    <ContentBox
      action={
        <div className="flex space-x-1">
          {structure.status === StructureStatus.Offline && (
            <Button variant="success" onClick={handleEnableStructureClick}>
              Enable
            </Button>
          )}
          {canStructureBeDisabled(structure) && (
            <Button variant="danger" onClick={() => setIsPendingDisable(true)}>
              Disable
            </Button>
          )}
          <ButtonLink to="/" variant="outline">
            Close
          </ButtonLink>
        </div>
      }
      title={definition.name}
      variant="filled"
    >
      <div className="flex flex-col space-y-1">
        <StructureStats definition={definition} structure={structure} />

        {isPendingDisable ? (
          <Box className="flex flex-col space-y-4">
            <div className="text-lg font-bold">Are you sure you want to disable this structure?</div>
            <div className="flex space-x-1">
              <Button variant="danger" onClick={handleDisableStructureClick}>
                Confirm
              </Button>
              <Button onClick={handleCancelDisableStructureClick}>Cancel</Button>
            </div>
          </Box>
        ) : structure.status === StructureStatus.Building ? (
          <StructureIsBuildingPanel structure={structure} />
        ) : structure.status === StructureStatus.Offline ? (
          <StructureIsDisabled structure={structure} />
        ) : structure.status === StructureStatus.NoPower ? (
          <StructureHasNoPower structure={structure} />
        ) : (
          <Outlet context={{ id, definition, structure }} />
        )}
      </div>
    </ContentBox>
  );
}
