import { useDispatch } from 'react-redux';
import { buildStructure } from '../../store';
import { FactoryStructure as FactoryStructureType } from '../../types';

const FactoryStructure = ({ structure }: { structure: FactoryStructureType }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>TODO: Factory, Structure</div>
      <button
        type="button"
        className="bg-purple-500 text-white py-0.5 px-1 hover:bg-purple-600"
        onClick={() => dispatch(buildStructure({ factory: structure, type: 'Agridome' }))}
      >
        make agridome
      </button>
      <pre>{JSON.stringify(structure, null, 2)}</pre>
    </div>
  );
};

export default FactoryStructure;
