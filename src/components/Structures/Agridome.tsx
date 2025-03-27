import { StructureStats } from './StructureStats';
import { useStructurePageContext } from './types';

const AgridomeStructure = () => {
  const { definition } = useStructurePageContext();

  return (
    <div className="flex flex-col space-y-1">
      <StructureStats
        extras={[
          { label: 'Food Production', value: definition.produces!.food! },
          { label: 'Food Storage', value: `TODO/${definition.stores!.food!}` },
        ]}
      />
    </div>
  );
};

export default AgridomeStructure;
