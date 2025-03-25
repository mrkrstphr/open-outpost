import { lazy, Suspense, useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { ContentBox } from '../../components/ContentBox';
import { ProgressBar } from '../../components/ProgressBar';
import { StructureStatusDot } from '../../components/StructureStatusDot';
import { structureSpec } from '../../data/structures';
import { useStructures } from '../../hooks/useStructures';
import { Building, BuildingStatus, BuildingTypes } from '../../types';
import { buildingLabel, sortStructures } from '../../utils';
import { StructureHasNoPower } from './StructureHasNoPower';
import { StructureIsBuildingPanel } from './StructureIsBuildingPanel';
import { StructureIsDisabled } from './StructureIsDisabled';

const structureContentMap: Record<BuildingTypes, React.ElementType> = {
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
  const [highlightedStructure, setHighlightedStructure] = useState<Building | undefined>();

  if (structures.length === 0) {
    return <ContentBox title="Your Colony">There are no buildings in your colony.</ContentBox>;
  }

  return (
    <ContentBox title="Your Colony">
      <div className="flex flex-wrap">
        {sortedStructures.map((building) => (
          <div key={`building-${building.type}-${building.id}`} className="m-4">
            <div className="relative">
              {building.health !== building.maxHealth && (
                <ProgressBar
                  percent={(building.health / building.maxHealth) * 100}
                  className="absolute inset-x-0.5 bottom-0.5 m-1"
                />
              )}
              <StructureStatusDot
                status={building.status}
                className="absolute inset-y-0.5 right-0.5"
              />
              <img
                src={structureSpec[building.type].image}
                alt={building.type}
                className="hover:bg-gray-900 cursor-pointer h-16"
                onMouseOver={() => setHighlightedStructure(building)}
                onMouseOut={() => setHighlightedStructure(undefined)}
                onClick={() => onSelect(building.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-purple-500 -mx-1 px-1 -mb-1 text-sm">
        {highlightedStructure ? buildingLabel(highlightedStructure) : <>&nbsp;</>}
      </div>
    </ContentBox>
  );
};

const SelectedStructure = ({
  structure,
  onClose,
}: {
  structure: Building;
  onClose: () => void;
}) => {
  const ContentPanel = structureContentMap[structure.type];

  return (
    <ContentBox
      title={`${structureSpec[structure.type].name} [@${structure.id.substring(0, 6)}]`}
      action={<Button onClick={onClose}>Close</Button>}
    >
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        {structure.status === BuildingStatus.Building ? (
          <StructureIsBuildingPanel structure={structure} />
        ) : structure.status === BuildingStatus.Offline ? (
          <StructureIsDisabled structure={structure} />
        ) : structure.status === BuildingStatus.NoPower ? (
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
      structure={structures.find((s) => s.id === selectedStructure) as Building}
      onClose={() => setSelectedStructure(undefined)}
    />
  ) : (
    <AllStructures onSelect={setSelectedStructure} />
  );
};
