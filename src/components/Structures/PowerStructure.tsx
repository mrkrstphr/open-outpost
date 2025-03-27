import { StructureStats } from './StructureStats';
import { useStructurePageContext } from './types';

// Catch all for power generating structures
const PowerStructure = () => {
  const { definition } = useStructurePageContext();

  return (
    <div className="flex flex-col space-y-1">
      <StructureStats extras={[{ label: 'Power Generation', value: definition.produces!.power! }]} />
    </div>
  );
};

export default PowerStructure;
