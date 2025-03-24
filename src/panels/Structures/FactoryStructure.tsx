import { useDispatch } from 'react-redux';
import { ContentBox } from '../../components/ContentBox';
import { ProgressBar } from '../../components/ProgressBar';
import { structureSpec } from '../../data/structures';
import { buildStructure, produceStructure } from '../../state/slices/game';
import { BuildingTypes } from '../../types';

const FactoryStructure = ({ structure }: { structure: BuildingTypes }) => {
  const dispatch = useDispatch();
  const definition = structureSpec[structure.type];

  const currentDefinition = structure.current ? structureSpec[structure.current.type] : undefined;

  return (
    <div>
      <button
        type="button"
        className="bg-purple-500 text-white py-0.5 px-1 hover:bg-purple-600"
        onClick={() => dispatch(produceStructure({ factory: structure, type: 'Agridome' }))}
      >
        make agridome
      </button>

      <ContentBox title="Storage" className="mb-1">
        <div className="flex space-x-1">
          {Array.from({ length: definition.produces?.slots ?? 0 }).map((_, index) => (
            <div
              className="border border-purple-500 w-16 h-16 flex items-center justify-center"
              key={`slot-${index}`}
            >
              {structure.storage?.[index] ? (
                <img
                  src={structureSpec[structure.storage[index]].image}
                  className="w-full cursor-pointer"
                  onClick={() => dispatch(buildStructure({ factory: structure, index }))}
                />
              ) : (
                <span className="text-2xl opacity-30 font-bold select-none">X</span>
              )}
            </div>
          ))}
        </div>
      </ContentBox>

      {currentDefinition && (
        <ContentBox title="Current Production" className="mb-1">
          <ProgressBar
            percent={Math.min(100, (structure.current?.progress / currentDefinition.hp) * 100)}
          />
        </ContentBox>
      )}

      <ContentBox title="Debug">
        <pre>{JSON.stringify(structure, null, 2)}</pre>
      </ContentBox>
    </div>
  );
};

export default FactoryStructure;
