import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { structureSpec } from '../../data/structures';
import _edenResearchTree from '../../eden-research-tree.json';
import { startResearch } from '../../state/slices/game';
import type { RootState } from '../../store';
import type { ResearchItem, Structure } from '../../types';
import { filterAvailableResearch } from '../../utils';

// TODO: FIXME: remove hardcoded Eden
const edenResearchTree = _edenResearchTree as ResearchItem[];

function TopicDetails({ topic }: { topic: ResearchItem }) {
  return (
    <>
      <h3 className="font-semibold mb-1">{topic.topic}</h3>
      <div className="border-b border-purple-500 mb-1 pb-1">
        Scientists: {topic.scientists}, Cost: {topic.cost}
      </div>
      <div className="border-b border-purple-500 mb-1 pb-1">{topic.teaser}</div>
      <div className="border-b border-purple-500 mb-1 pb-1">{topic.description}</div>
      <div className="mb-2">{topic.result}</div>
    </>
  );
}

export const LabIsReady = ({ structure }: { structure: Structure }) => {
  const definition = structureSpec[structure.type];
  const { finishedResearch } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const [selectedTopic, setSelectedTopic] = useState<ResearchItem | undefined>();

  const availableTopics = definition.researchType
    ? filterAvailableResearch(definition.researchType, edenResearchTree, finishedResearch)
    : [];

  return (
    <div className="flex w-full space-x-1">
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
          <>
            <TopicDetails topic={selectedTopic} />

            {!structure.researchTopic && (
              <div className="mt-1 text-center">
                <Button
                  // TODO: FIXME: scientist assignment...
                  onClick={() =>
                    dispatch(
                      startResearch({
                        lab: structure,
                        topic: selectedTopic,
                        scientists: selectedTopic.scientists,
                      })
                    )
                  }
                >
                  Start Research
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function LabPanel({ structure }: { structure: Structure }) {
  if (structure.researchTopic) {
    const percent = Math.min((structure.researchTopic.progress / structure.researchTopic.cost) * 100, 100);
    return (
      <div>
        <div className="flex space-x-2">
          <div className="flex-1">Currently Researching: {structure.researchTopic.topic}</div>
          <div className="">
            {structure.researchTopic.progress} / {structure.researchTopic.cost}
          </div>
        </div>

        <ProgressBar percent={percent} className="my-1" />

        <TopicDetails topic={structure.researchTopic} />
      </div>
    );
  }

  return <LabIsReady structure={structure} />;
}
