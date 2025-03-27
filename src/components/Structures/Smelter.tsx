import { StructureTypes } from '../../types';
import { StructureStats } from './StructureStats';
import { useStructurePageContext } from './types';

const SmelterStructure = () => {
  const { definition } = useStructurePageContext();

  const oreType = definition.type === StructureTypes.SmelterCommon ? 'common' : 'rare';

  return (
    <div className="flex flex-col space-y-1">
      <StructureStats extras={[{ label: 'Ore Storage', value: `TODO/${definition.stores!.ore![oreType]}` }]} />
    </div>
  );
};

export default SmelterStructure;
