import type { LabType, ResearchItem } from './types';

export function filterAvailableResearch(
  targetLab: LabType,
  allTopics: ResearchItem[],
  finishedTopics: string[]
) {
  return allTopics
    .filter(({ topic }) => !finishedTopics.includes(topic))
    .filter(({ lab }) => lab === targetLab)
    .filter(({ requires }) => {
      const unsatisfiedPrerequisites = requires.filter(
        (requirement) => !finishedTopics.includes(requirement)
      );

      return unsatisfiedPrerequisites.length === 0;
    });
}
