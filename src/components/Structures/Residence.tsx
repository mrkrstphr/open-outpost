import { StructureStats } from './StructureStats';

const ResidenceStructure = () => {
  return (
    <div className="flex flex-col space-y-1">
      <StructureStats
        extras={
          [
            // TODO: how many people can live here? What is colony demand?
            // { label: 'Capacity', value: `TODO/${definition.stores!.people!}` },
          ]
        }
      />
    </div>
  );
};

export default ResidenceStructure;
