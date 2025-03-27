import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { structureSpec } from '../../data/structures';
import { useStructures } from '../../hooks/useStructures';
import { type Structure } from '../../types';
import { sortStructures, structureLabel } from '../../utils';
import { ContentBox } from '../ContentBox';
import { ProgressBar } from '../ProgressBar';
import { StructureStatusDot } from '../StructureStatusDot';

const kebab = (str: string) => str.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();

export const Structures = () => {
  const structures = useStructures();
  const sortedStructures = useMemo(() => sortStructures(structures), [structures]);
  const [highlightedStructure, setHighlightedStructure] = useState<Structure | undefined>();

  if (structures.length === 0) {
    return <ContentBox title="Your Colony">There are no buildings in your colony.</ContentBox>;
  }

  return (
    <ContentBox title="Your Colony" variant="filled">
      <div className="flex flex-wrap">
        {sortedStructures.map((structure) => (
          <div key={`structure-${structure.type}-${structure.id}`} className="m-4">
            <div className="relative">
              {structure.health !== structure.maxHealth && (
                <ProgressBar
                  percent={(structure.health / structure.maxHealth) * 100}
                  className="absolute inset-x-0.5 bottom-0.5 m-1"
                />
              )}
              <StructureStatusDot status={structure.status} className="absolute inset-y-0.5 right-0.5" />
              <Link to={`/structures/${kebab(structure.type)}/${structure.id}`} state={{ structure }}>
                <img
                  src={structureSpec[structure.type].image}
                  alt={structure.type}
                  className="hover:bg-gray-900 cursor-pointer h-16"
                  onMouseOver={() => setHighlightedStructure(structure)}
                  onMouseOut={() => setHighlightedStructure(undefined)}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block border-t border-purple-500 -mx-1 p-1 -mb-1 text-sm">
        {highlightedStructure ? structureLabel(highlightedStructure) : <>&nbsp;</>}
      </div>
    </ContentBox>
  );
};
