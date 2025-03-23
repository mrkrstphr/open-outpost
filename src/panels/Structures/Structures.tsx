import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Content } from '../../components/Content';
import { ProgressBar } from '../../components/ProgressBar';
import { useOre } from '../../hooks/useOre';
import { useStructures } from '../../hooks/useStructures';
import { createStructure } from '../../store';
import PlymouthLabStandard from '../../structures/playmouth-standard-lab.png';
import PlymouthAgridome from '../../structures/plymouth-agridome.png';
import PlaymouthCommandCenter from '../../structures/plymouth-command-center.png';
import PlymouthSmelterCommon from '../../structures/plymouth-smelter-common.png';
import PlymouthStructureFactory from '../../structures/plymouth-structure-factory.png';
import { BuildingStatus, BuildingType } from '../../types';
import { createAgridome } from '../../utils';

const buildingTypeToImageMap = {
  Agridome: PlymouthAgridome,
  CommandCenter: PlaymouthCommandCenter,
  FactoryStructure: PlymouthStructureFactory,
  LabStandard: PlymouthLabStandard,
  SmelterCommon: PlymouthSmelterCommon,
};

export const StructuresPanel = () => {
  const dispatch = useDispatch();
  const structures = useStructures();
  const { common, rare } = useOre();

  const [selectedStructure, setSelectedStructure] = useState<BuildingType | undefined>();
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
      <button type="button" onClick={() => dispatch(createStructure(createAgridome(100, 100)))}>
        create
      </button>
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
                onClick={() => setSelectedStructure(building)}
              />
            </div>
            {/* <p>
            {building.type} -{' '}
            {building.status === BuildingStatus.Building ? 'Building: ' : 'Health: '}{' '}
            {building.health}/{building.maxHealth}
          </p> */}
          </div>
        ))}
      </div>
      <div className="border-t border-purple-400 -mx-1 px-1 -mb-1 text-sm">
        {highlightedStructure ? highlightedStructure.type : <>&nbsp;</>}
      </div>
    </Content>
  );
};
