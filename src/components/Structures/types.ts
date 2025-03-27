import { useOutletContext } from 'react-router';
import type { StructureDetails } from '../../data/structures';
import type { Structure } from '../../types';

export type StructurePageContext = {
  id: string;
  definition: StructureDetails;
  structure: Structure;
};

export const useStructurePageContext = () => {
  return useOutletContext<StructurePageContext>();
};
