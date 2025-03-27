import type { StructureDetails } from '../../data/structures';
import { StructureTypes, type Structure } from '../../types';
import { Box } from '../Box';
import { SimpleDataTable, type SimpleDataTableProps } from '../SimpleDataTable';

export type StructureStatsProps = {
  definition: StructureDetails;
  extras?: SimpleDataTableProps['data'];
  structure: Structure;
};

export const StructureStats = ({ definition, extras, structure }: StructureStatsProps) => {
  const oreType = definition.type === StructureTypes.SmelterCommon ? 'common' : 'rare';

  const dataAttributes = [
    { label: 'Health', value: structure.health },
    definition.powerUsage && { label: 'Power Usage', value: definition.powerUsage! },
    { label: 'Workers', value: definition.workers ?? 0 },
    { label: 'Scientists', value: definition.scientists ?? 0 },
    definition.produces?.power && { label: 'Power Generation', value: definition.produces!.power! },
    ...(extras ?? []),
    definition.produces?.food && { label: 'Food Production', value: definition.produces!.food! },
    definition.produces?.food && { label: 'Food Storage', value: `TODO/${definition.stores!.food!}` },
    definition.produces?.ore && { label: 'Ore Storage', value: `TODO/${definition.stores!.ore![oreType]}` },
  ].filter(Boolean) as SimpleDataTableProps['data'];

  return (
    <Box>
      <SimpleDataTable id="factory-stats" data={dataAttributes} />
    </Box>
  );
};
