import { lazy, Suspense, useState } from 'react';
import { Content } from '../../components/Content';
import { ProgressBar } from '../../components/ProgressBar';
import { structureSpec } from '../../data/structures';
import { useStructures } from '../../hooks/useStructures';
import PlymouthLabStandard from '../../structures/playmouth-standard-lab.png';
import PlymouthAgridome from '../../structures/plymouth-agridome.png';
import PlaymouthCommandCenter from '../../structures/plymouth-command-center.png';
import PlymouthSmelterCommon from '../../structures/plymouth-smelter-common.png';
import PlymouthStructureFactory from '../../structures/plymouth-structure-factory.png';
import { BuildingStatus, BuildingType } from '../../types';

const buildingTypeToImageMap = {
  Agridome: PlymouthAgridome,
  CommandCenter: PlaymouthCommandCenter,
  FactoryStructure: PlymouthStructureFactory,
  LabStandard: PlymouthLabStandard,
  SmelterCommon: PlymouthSmelterCommon,
};

const AllStructures = ({ onSelect }: { onSelect: (structure: string) => void }) => {
  const structures = useStructures();
  const [highlightedStructure, setHighlighedStructure] = useState<BuildingType | undefined>();

  if (structures.length === 0) {
    return <Content title="Structures">No buildings available.</Content>;
  }

  // const orderedStructures = state.buildings.sort((a, b) => {
  //   const firstLabel = `${a.type}-${a.id}`;
  //   const secondLabel = `${b.type}-${b.id}`;

  //   if (firstLabel < secondLabel) return -1;
  //   if (firstLabel > secondLabel) return 1;

  //   return 0;
  // });

  return (
    <Content title="Structures">
      <div className="flex flex-wrap">
        {structures.map((building) => (
          <div key={`building-${building.type}-${building.id}`} className="m-4">
            <div className="relative">
              {building.health !== building.maxHealth && (
                <ProgressBar
                  percent={(building.health / building.maxHealth) * 100}
                  className="absolute m-1"
                />
              )}
              <img
                src={buildingTypeToImageMap[building.type]}
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
      <div className="border-t border-purple-400 -mx-1 px-1 -mb-1 text-sm">
        {highlightedStructure ? (
          `${structureSpec[highlightedStructure.type].name} [@${highlightedStructure.id.substring(
            0,
            6
          )}]`
        ) : (
          <>&nbsp;</>
        )}
      </div>
    </Content>
  );
};

const structureContentMap: Record<BuildingType['type'], React.ElementType> = {
  Agridome: () => <div>TODO: Agridome</div>,
  CommandCenter: () => <div>TODO: Command Center</div>,
  FactoryStructure: lazy(() => import('./FactoryStructure')),
  LabStandard: () => <div>TODO: Lab</div>,
  SmelterCommon: () => <div>TODO: Smelter</div>,
};

const SelectedStructure = ({
  structure,
  onClose,
}: {
  structure: BuildingType;
  onClose: () => void;
}) => {
  const ContentPanel = structureContentMap[structure.type];

  return (
    <Content
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
        <ContentPanel structure={structure} />
      </Suspense>
    </Content>
  );
};

export const StructuresPanel = () => {
  const structures = useStructures();
  const [selectedStructure, setSelectedStructure] = useState<string | undefined>();

  return selectedStructure ? (
    <SelectedStructure
      structure={structures.find((s) => s.id === selectedStructure) as BuildingType}
      onClose={() => setSelectedStructure(undefined)}
    />
  ) : (
    <AllStructures onSelect={setSelectedStructure} />
  );
};
