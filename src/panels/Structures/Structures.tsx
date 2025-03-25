import { lazy, Suspense, useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { ContentBox } from '../../components/ContentBox';
import { ProgressBar } from '../../components/ProgressBar';
import { StructureStatusDot } from '../../components/StructureStatusDot';
import { structureSpec } from '../../data/structures';
import { useStructures } from '../../hooks/useStructures';
import { type Structure, StructureStatus, StructureTypes } from '../../types';
import { sortStructures, structureLabel } from '../../utils';
import { StructureHasNoPower } from './StructureHasNoPower';
import { StructureIsBuildingPanel } from './StructureIsBuildingPanel';
import { StructureIsDisabled } from './StructureIsDisabled';

const structureContentMap: Record<StructureTypes, React.ElementType> = {
  Agridome: () => <div>TODO: Agridome</div>,
  CommandCenter: lazy(() => import('./CommandCenter')),
  FactoryStructure: lazy(() => import('./FactoryStructure')),
  LabStandard: lazy(() => import('./LabPanel')),
  Residence: () => <div>TODO: Residence</div>,
  SmelterCommon: () => <div>TODO: Smelter</div>,
  Tokamak: () => <div>TODO: Tokamak</div>,
};

const AllStructures = ({ onSelect }: { onSelect: (structure: string) => void }) => {
  const structures = useStructures();
  const sortedStructures = useMemo(() => sortStructures(structures), [structures]);
  const [highlightedStructure, setHighlightedStructure] = useState<Structure | undefined>();

  if (structures.length === 0) {
    return <ContentBox title="Your Colony">There are no buildings in your colony.</ContentBox>;
  }

  return (
    <ContentBox title="Your Colony">
      <div className="flex flex-wrap">
        {sortedStructures.map((structure) => (
          <div key={`structure-${structure.type}-${structure.id}`} className="m-4">
            <div className="relative">
              {structure.health !== structure.maxHealth && (
                <ProgressBar
                  percent={(structure.health / structure.maxHealth) * 100}
                  className="absolute inset-x-0.5 bottom-0.5 m-1"
                />
              )}
              <StructureStatusDot status={structure.status} className="absolute inset-y-0.5 right-0.5" />
              <img
                src={structureSpec[structure.type].image}
                alt={structure.type}
                className="hover:bg-gray-900 cursor-pointer h-16"
                onMouseOver={() => setHighlightedStructure(structure)}
                onMouseOut={() => setHighlightedStructure(undefined)}
                onClick={() => onSelect(structure.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-purple-500 -mx-1 p-1 -mb-1 text-sm">
        {highlightedStructure ? structureLabel(highlightedStructure) : <>&nbsp;</>}
      </div>
    </ContentBox>
  );
};

const SelectedStructure = ({ structure, onClose }: { structure: Structure; onClose: () => void }) => {
  const ContentPanel = structureContentMap[structure.type];

  return (
    <ContentBox
      title={`${structureSpec[structure.type].name} [@${structure.id.substring(0, 6)}]`}
      action={<Button onClick={onClose}>Close</Button>}
    >
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        {structure.status === StructureStatus.Building ? (
          <StructureIsBuildingPanel structure={structure} />
        ) : structure.status === StructureStatus.Offline ? (
          <StructureIsDisabled structure={structure} />
        ) : structure.status === StructureStatus.NoPower ? (
          <StructureHasNoPower structure={structure} />
        ) : (
          <ContentPanel structure={structure} onClose={onClose} />
        )}
      </Suspense>
    </ContentBox>
  );
};

export const StructuresPanel = () => {
  const structures = useStructures();
  const [selectedStructure, setSelectedStructure] = useState<string | undefined>();

  return selectedStructure ? (
    <SelectedStructure
      structure={structures.find((s) => s.id === selectedStructure) as Structure}
      onClose={() => setSelectedStructure(undefined)}
    />
  ) : (
    <AllStructures onSelect={setSelectedStructure} />
  );
};
