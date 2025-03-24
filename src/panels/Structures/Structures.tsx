import { lazy, Suspense, useMemo, useState } from 'react';
import { ContentBox } from '../../components/ContentBox';
import { ProgressBar } from '../../components/ProgressBar';
import { structureSpec } from '../../data/structures';
import { useStructures } from '../../hooks/useStructures';
import { Building, BuildingStatus, BuildingTypes } from '../../types';
import { buildingLabel, sortStructures } from '../../utils';

const structureContentMap: Record<BuildingTypes, React.ElementType> = {
  Agridome: () => <div>TODO: Agridome</div>,
  CommandCenter: () => <div>TODO: Command Center</div>,
  FactoryStructure: lazy(() => import('./FactoryStructure')),
  LabStandard: () => <div>TODO: Lab</div>,
  Residence: () => <div>TODO: Residence</div>,
  SmelterCommon: () => <div>TODO: Smelter</div>,
  Tokamak: () => <div>TODO: Tokamak</div>,
};

const AllStructures = ({ onSelect }: { onSelect: (structure: string) => void }) => {
  const structures = useStructures();
  const sortedStructures = useMemo(() => sortStructures(structures), [structures]);
  const [highlightedStructure, setHighlighedStructure] = useState<Building | undefined>();

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
                  className="absolute inset-0.5 m-1"
                />
              )}
              <img
                src={structureSpec[building.type].image}
                alt={building.type}
                className={`h-16 ${
                  building.status !== BuildingStatus.Offline ? 'hover:bg-black cursor-pointer' : ''
                }`}
                onMouseOver={() => setHighlighedStructure(building)}
                onMouseOut={() => setHighlighedStructure(undefined)}
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
      action={
        <button
          type="button"
          className="bg-purple-500 text-white py-0.5 px-1 hover:bg-purple-600"
          onClick={onClose}
        >
          Close
        </button>
      }
    >
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ContentPanel structure={structure} onClose={onClose} />
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
