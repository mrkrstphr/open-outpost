import { Box } from '../Box';
import { SimpleDataTable, type SimpleDataTableProps } from '../SimpleDataTable';
import { useStructurePageContext } from './types';

export type StructureStatsProps = {
  extras?: SimpleDataTableProps['data'];
};

export const StructureStats = ({ extras }: StructureStatsProps) => {
  const { definition, structure } = useStructurePageContext();

  const dataAttributes = [
    { label: 'Health', value: structure.health },
    definition.powerUsage && { label: 'Power Usage', value: definition.powerUsage! },
    { label: 'Workers', value: definition.workers ?? 0 },
    { label: 'Scientists', value: definition.scientists ?? 0 },
    ...(extras ?? []),
  ].filter(Boolean) as SimpleDataTableProps['data'];

  return (
    <Box>
      <SimpleDataTable id="factory-stats" data={dataAttributes} />
    </Box>
  );
};
