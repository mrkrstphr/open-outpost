import { isNil, isNotNil } from 'ramda';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { researchTree } from '../../data/research';
import { useColonists } from '../../hooks';
import { startResearch } from '../../state/slices/game';
import type { RootState } from '../../store';
import type { ResearchItem, Structure } from '../../types';
import { filterAvailableResearch } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import { useStructurePageContext, type StructurePageContext } from './types';

function TopicDetails({ assigned, topic, onClose }: { assigned?: number; topic: ResearchItem; onClose?: () => void }) {
  return (
    <>
      <div className="flex items-center space-x-1 mb-1">
        <h3 className="flex-1 font-semibold">{topic.topic}</h3>
        {onClose && <Button onClick={onClose}>Close</Button>}
      </div>
      <div className="border-b border-purple-500 mb-1 pb-1">
        Scientists: {isNotNil(assigned) ? `${assigned}/${topic.scientists}` : topic.scientists}, Cost: {topic.cost}
      </div>
      <div className="border-b border-purple-500 mb-1 pb-1">{topic.teaser}</div>
      <div className="border-b border-purple-500 mb-1 pb-1">{topic.description}</div>
      <div className="mb-2">{topic.result}</div>
    </>
  );
}

function AssignTopic({
  structure,
  topic,
  onClose,
}: {
  structure: Structure;
  topic: ResearchItem;
  onClose?: () => void;
}) {
  const dispatch = useDispatch();
  const { availableScientists } = useColonists();
  const maxAvailableScientists = Math.min(availableScientists, topic.scientists);
  const [assignedScientists, setAssignedScientists] = useState(maxAvailableScientists);

  const handleAssignClick = () => {
    dispatch(
      startResearch({
        lab: structure,
        topic: topic,
        scientists: assignedScientists,
      })
    );
  };

  const handleChangeAssigned = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssignedScientists(parseInt(e.target.value, 10));

  return (
    <>
      <TopicDetails topic={topic} onClose={onClose} />

      <div className="border-t border-purple-500 pt-1">
        <p>Available Scientists: {availableScientists}</p>
        <p>Max Scientists: {topic.scientists}</p>
        <p>Assigned Scientists: {assignedScientists}</p>

        <div className="w-full py-3 px-3">
          <input
            id="default-range"
            type="range"
            value={assignedScientists}
            max={maxAvailableScientists}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={handleChangeAssigned}
          />
        </div>

        {!structure.researchTopic && (
          <div className="mt-1 text-center">
            <Button disabled={assignedScientists === 0} onClick={handleAssignClick}>
              Start Research
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export const LabIsReady = () => {
  const { definition, structure } = useStructurePageContext();
  const { colony, finishedResearch } = useSelector((state: RootState) => state.game);
  const [selectedTopic, setSelectedTopic] = useState<ResearchItem | undefined>();

  const availableTopics = definition.researchType
    ? filterAvailableResearch(definition.researchType, researchTree[colony], finishedResearch)
    : [];

  return (
    <>
      <Box className="lg:hidden">
        {isNil(selectedTopic) && (
          <div>
            <div className="font-medium mb-1">Available Research Topics</div>
            <ul className="ml-12 list-decimal">
              {availableTopics.map((topic) => (
                <li
                  key={`topic-${topic.topic}`}
                  className="mb-0.5 hover:underline cursor-pointer hover:text-purple-500"
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic.topic}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedTopic && (
          <Box>
            <AssignTopic
              key={`assign-${selectedTopic.id}`}
              structure={structure}
              topic={selectedTopic}
              onClose={() => setSelectedTopic(undefined)}
            />
          </Box>
        )}
      </Box>

      <div className="hidden lg:flex w-full space-x-1">
        <div className="flex-1 border border-purple-500 p-1">
          <div className="font-medium mb-1">Available Research Topics</div>
          <ul className="ml-12 list-decimal">
            {availableTopics.map((topic) => (
              <li
                key={`topic-${topic.topic}`}
                className="mb-0.5 hover:underline cursor-pointer hover:text-purple-500"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic.topic}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 border border-purple-500 p-1">
          {selectedTopic && (
            <AssignTopic key={`assign-${selectedTopic.id}`} structure={structure} topic={selectedTopic} />
          )}
        </div>
      </div>
    </>
  );
};

function LabIsResearching() {
  const { structure } = useStructurePageContext();

  const topic = structure.researchTopic!;

  const percent = Math.min((topic.progress / topic.cost) * 100, 100);

  return (
    <Box>
      <div className="flex space-x-2">
        <div className="flex-1">Currently Researching: {topic.topic}</div>
        <div className="">
          {topic.progress} / {topic.cost}
        </div>
      </div>

      <ProgressBar percent={percent} className="my-1" />

      <TopicDetails assigned={topic.assignedScientists} topic={topic} />
    </Box>
  );
}

export default function LabPanel() {
  const { structure } = useOutletContext<StructurePageContext>();

  return (
    <div className="flex flex-col space-y-1">{structure.researchTopic ? <LabIsResearching /> : <LabIsReady />}</div>
  );
}
