import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import { ProgressBar } from '../../components/ProgressBar';
import { structureSpec } from '../../data/structures';
import { buildStructure, produceStructure } from '../../state/slices/game';
import { FactoryStructure as FactoryStructureType } from '../../types';

type BorderedContentBoxProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  action?: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const BorderedContentBox = ({
  action,
  title,
  children,
  className,
  ...props
}: BorderedContentBoxProps) => (
  <div className={`border border-purple-500 ${className}`} {...props}>
    <div className="border-b border-purple-500">
      <div className="p-1">
        <div className="flex items-center">
          <strong className="flex-1">{title}</strong>
          {action}
        </div>
      </div>
    </div>
    <div className="p-1">{children}</div>
  </div>
);

const FactoryStructure = ({ structure }: { structure: FactoryStructureType }) => {
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

      <BorderedContentBox title="Storage" className="mb-1">
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
      </BorderedContentBox>

      {currentDefinition && (
        <BorderedContentBox title="Current Production" className="mb-1">
          <ProgressBar
            percent={Math.min(100, (structure.current?.progress / currentDefinition.hp) * 100)}
          />
        </BorderedContentBox>
      )}

      <BorderedContentBox title="Debug">
        <pre>{JSON.stringify(structure, null, 2)}</pre>
      </BorderedContentBox>
    </div>
  );
};

export default FactoryStructure;
