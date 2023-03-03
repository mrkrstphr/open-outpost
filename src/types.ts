export type LabType = 'Standard' | 'Advanced';

export type ResearchItem = {
  topic: string;
  cost: number;
  scientists: number;
  lab: LabType;
  requires: string[];
  teaser: string;
  description: string;
  result: string;
};

export type GameState = {
  mark: number;
  currentResearchTopic?: ResearchItem & { counter: number };
  finishedResearch: string[];
  gameLog: string[];
};
