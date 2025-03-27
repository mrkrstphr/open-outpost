import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router';
import { structureSpec } from '../../data/structures';
import type { RootState } from '../../store';
import { StructureStatus } from '../../types';
import { structureLabel } from '../../utils';
import { ButtonLink } from '../Button';
import { ContentBox } from '../ContentBox';
import { PageNotFound } from '../PageNotFound';
import { StructureHasNoPower } from './StructureHasNoPower';
import { StructureIsBuildingPanel } from './StructureIsBuildingPanel';
import { StructureIsDisabled } from './StructureIsDisabled';

export function StructureContainer() {
  const { id } = useParams<{ id: string }>();
  const structure = useSelector((state: RootState) => state.game.structures.find((s) => s.id === id));

  if (!structure) return <PageNotFound />;

  const definition = structureSpec[structure.type];

  return (
    <ContentBox
      action={
        <ButtonLink to="/" variant="outline">
          Close
        </ButtonLink>
      }
      title={structureLabel(structure)}
      variant="filled"
    >
      {structure.status === StructureStatus.Building ? (
        <StructureIsBuildingPanel structure={structure} />
      ) : structure.status === StructureStatus.Offline ? (
        <StructureIsDisabled structure={structure} />
      ) : structure.status === StructureStatus.NoPower ? (
        <StructureHasNoPower structure={structure} />
      ) : (
        <Outlet context={{ id, definition, structure }} />
      )}
    </ContentBox>
  );
}
