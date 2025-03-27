import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { structureSpec, type StructureDetails } from '../../data/structures';
import { useOre } from '../../hooks/useOre';
import { buildStructure, cancelProduceStructure, produceStructure } from '../../state/slices/game';
import { type Structure } from '../../types';
import { canBuildStructure } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { ContentBox } from '../ContentBox';
import { ProgressBar } from '../ProgressBar';
import { StructureStats } from './StructureStats';
import { useStructurePageContext } from './types';

export type FactoryStructureProps = {
  structure: Structure;
  onClose?: () => void;
};

export type StorageProps = {
  structure: Structure;
};

const Storage = ({ structure }: StorageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const definition = structureSpec[structure.type];

  return (
    <ContentBox title="Structure Kit Storage">
      <p className="text-sm mb-1">
        The following structure kits are in storage. Select a kit to build it in the colony.
      </p>
      <div className="flex space-x-1">
        {Array.from({ length: definition.produces?.slots ?? 0 }).map((_, index) => (
          <Box className="bg-gray-900 border border-purple-500" key={`slot-${index}`}>
            {structure.storage?.[index] ? (
              <img
                src={structureSpec[structure.storage[index]].image}
                className="h-16 w-16 cursor-pointer object-contain"
                onClick={() => {
                  dispatch(buildStructure({ factory: structure, index }));
                  navigate('/');
                }}
              />
            ) : (
              <div className="text-2xl opacity-30 font-bold select-none h-16 w-16 flex items-center justify-center">
                <span>X</span>
              </div>
            )}
          </Box>
        ))}
      </div>
    </ContentBox>
  );
};

export type BuildingStateProps = {
  structure: Structure;
};

const BuildingState = ({ structure }: BuildingStateProps) => {
  const dispatch = useDispatch();
  const currentDefinition = structure.current ? structureSpec[structure.current.type] : undefined;
  const [isPendingCancel, setIsPendingCancel] = useState(false);

  if (!currentDefinition) {
    return null;
  }

  return (
    <ContentBox title="Current Production">
      <div className="flex space-x-1">
        <Box className="bg-gray-900">
          <img src={currentDefinition.image} alt={currentDefinition.type} className="h-16 w-16 object-contain" />
        </Box>
        <div className="flex flex-col space-y-1 flex-1">
          <div className="mb-1">{currentDefinition.name}</div>
          <div className="flex items-center space-x-1">
            <ProgressBar
              className="flex-1"
              percent={Math.min(100, ((structure.current?.progress ?? 0) / currentDefinition.kitBuildTime) * 100)}
            />
            <div className="w-22 text-right">
              {structure.current?.progress ?? 0}/{currentDefinition.kitBuildTime}
            </div>
          </div>
          <div>
            {!isPendingCancel && <Button onClick={() => setIsPendingCancel(true)}>Cancel Construction</Button>}
            {isPendingCancel && (
              <div className="flex space-x-1 items-center">
                <div>Are you sure you want to cancel construction?</div>

                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(cancelProduceStructure({ factory: structure }));
                    setIsPendingCancel(false);
                  }}
                >
                  Confirm
                </Button>

                <Button variant="secondary" onClick={() => setIsPendingCancel(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentBox>
  );
};

export type BuildMenuItemProps = {
  selected?: boolean;
  structure: StructureDetails;
  onBuild?: () => void;
  onSelect?: (structure?: StructureDetails) => void;
};

const BuildMenuItem = ({ selected, structure, onBuild, onSelect }: BuildMenuItemProps) => {
  const ore = useOre();
  const isAvailable = canBuildStructure(ore, structure);

  return (
    <Box
      className={clsx(
        'flex space-x-1 relative',
        isAvailable && 'hover:cursor-pointer hover:bg-purple-400',
        selected && 'bg-purple-500'
      )}
      onClick={() => isAvailable && onSelect?.(structure)}
    >
      {!isAvailable && <div className="absolute left-0 w-full h-full top-0 bg-black opacity-50" />}
      <Box className="bg-gray-900">
        <img src={structure.image} alt={structure.type} className="h-16 w-16 object-contain" />
      </Box>
      <div className="flex-1">
        <div className="mb-1">{structure.name}</div>
        <div className="text-sm">
          Common: {structure.buildCost.common} | Rare: {structure.buildCost.rare}
        </div>
        <div className="text-sm">
          Build Time:{' '}
          {Intl.NumberFormat(navigator.language, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(structure.kitBuildTime / 100)}{' '}
          mark
        </div>
      </div>
      {selected && (
        <div className="flex items-center justify-center">
          <Button onClick={onBuild}>Build</Button>
        </div>
      )}
    </Box>
  );
};

export type BuildMenuProps = {
  structure: Structure;
};

const BuildMenu = ({ structure }: BuildMenuProps) => {
  const dispatch = useDispatch();
  const [selectedStructure, setSelectedStructure] = useState<StructureDetails | undefined>();

  return (
    <ContentBox title="Build Menu">
      <p className="text-sm mb-1">
        Select a structure kit to start manufacturing it. Once the kit is complete, the building may be constructed in
        the colony.
      </p>
      <div className="flex flex-col space-y-1">
        {Object.values(structureSpec).map((definition) => (
          <BuildMenuItem
            key={`build-${definition.type}`}
            structure={definition}
            selected={selectedStructure?.type === definition.type}
            onBuild={() => {
              dispatch(produceStructure({ factory: structure, type: definition.type }));
            }}
            onSelect={() => setSelectedStructure(definition)}
          />
        ))}
      </div>
    </ContentBox>
  );
};

const FactoryStructure = () => {
  const { structure } = useStructurePageContext();
  const isCurrentlyBuilding = !!structure.current?.type;

  return (
    <div className="flex flex-col space-y-1">
      <StructureStats />
      <Storage structure={structure} />
      {!isCurrentlyBuilding && <BuildMenu structure={structure} />}
      {isCurrentlyBuilding && <BuildingState structure={structure} />}
    </div>
  );
};

export default FactoryStructure;
