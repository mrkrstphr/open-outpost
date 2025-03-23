import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Content } from '../../components/Content';
import _edenResearchTree from '../../eden-research-tree.json';
import { RootState } from '../../store';
import { ResearchItem } from '../../types';
import { filterAvailableResearch } from '../../utils';

const edenResearchTree = _edenResearchTree as ResearchItem[];

function TopicDetails({ topic }: { topic: ResearchItem }) {
  return (
    <>
      <h3 className="font-semibold mb-1">{topic.topic}</h3>
      <div className="mb-2">
        Scientists: {topic.scientists}, Cost: {topic.cost}
      </div>
      <div className="mb-2">{topic.teaser}</div>
      <div className="mb-2">{topic.description}</div>
      <div className="mb-2">{topic.result}</div>
    </>
  );
}

function AvailableResearchView() {
  const state = useSelector((state: RootState) => state.game);

  const [selectedTopic, setSelectedTopic] = useState<ResearchItem | undefined>();

  const standardLabTopics = filterAvailableResearch(
    'Standard',
    edenResearchTree,
    state.finishedResearch
  );
  const advancedLabTopics = filterAvailableResearch(
    'Advanced',
    edenResearchTree,
    state.finishedResearch
  );

  const availableTopics = [
    ...standardLabTopics,
    ...(state.finishedResearch.includes('RESEARCH_TRAINING_PROGRAMS') ? advancedLabTopics : []),
  ];

  return (
    <div className="flex w-full space-x-1">
      <div className="flex-1 border border-purple-400 p-1">
        <div className="font-medium mb-1">Available Research Topics</div>
        <ul className="ml-12 list-decimal">
          {availableTopics.map((topic) => (
            <li
              className="mb-0.5 hover:underline cursor-pointer hover:text-purple-400"
              onClick={() => setSelectedTopic(topic)}
            >
              {topic.topic}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 border border-purple-400 p-1">
        {selectedTopic && (
          <>
            <TopicDetails topic={selectedTopic} />

            {!state.currentResearchTopic && (
              <div className="mt-1 text-center">
                <button
                  disabled
                  type="button"
                  className="bg-green-500 text-white py-0.5 px-1 hover:bg-green-600"
                >
                  Start Research
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ActiveResearchView() {
  const state = useSelector((state: RootState) => state.game);

  if (!state.currentResearchTopic) {
    return null;
  }

  return (
    <div>
      <div className="flex space-x-2">
        <div className="flex-1">
          Currently Researching:{' '}
          {state.currentResearchTopic ? <span>{state.currentResearchTopic.topic}</span> : 'Nothing'}
        </div>
        <div className="">
          {state.currentResearchTopic.counter} / {state.currentResearchTopic.cost}
        </div>
      </div>
      <div className="h-4 my-1 p-1 border border-purple-500">
        <div
          className="bg-purple-500 h-full"
          style={{
            width: `${Math.min(
              (state.currentResearchTopic.counter / state.currentResearchTopic.cost) * 100,
              100
            )}%`,
          }}
        ></div>
      </div>

      <TopicDetails topic={state.currentResearchTopic} />
    </div>
  );
}

export default function ResearchPanel() {
  const state = useSelector((state: RootState) => state.game);

  return (
    <Content title="Research">
      {state.currentResearchTopic ? <ActiveResearchView /> : <AvailableResearchView />}
    </Content>
  );
}
