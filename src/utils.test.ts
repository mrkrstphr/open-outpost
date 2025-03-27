import { describe, expect, test } from 'vitest';
import { structureSpec } from './data/structures';
import type { GameState } from './state/slices/game';
import { type LabResearchTopic, type Structure, StructureStatus, StructureTypes } from './types';
import {
  calculateAvailableScientists,
  calculateAvailableWorkers,
  canBuildStructure,
  createNewStructure,
  sortStructures,
  structureLabel,
} from './utils';

describe('createNewStructure', () => {
  test('creates a new structure with default status as Building', () => {
    const structureDef = structureSpec.Agridome;
    const newStructure = createNewStructure(structureDef);

    expect(newStructure).toEqual({
      id: expect.any(String),
      type: StructureTypes.Agridome,
      health: 0,
      status: StructureStatus.Building,
      maxHealth: structureDef.hp,
    });
  });

  test('creates a new structure with the passed status', () => {
    const structureDef = structureSpec.Agridome;
    const newStructure = createNewStructure(structureDef, StructureStatus.Online);

    expect(newStructure).toEqual({
      id: expect.any(String),
      type: StructureTypes.Agridome,
      health: structureDef.hp,
      status: StructureStatus.Online,
      maxHealth: structureDef.hp,
    });
  });
});

describe('canBuildStructure', () => {
  test('returns true when enough resources are available', () => {
    const ore = {
      common: 100,
      rare: 50,
    };
    const structure = {
      buildCost: {
        common: 50,
        rare: 20,
      },
    };
    expect(canBuildStructure(ore, structure)).toBe(true);
  });

  test('returns false when not enough resources are available', () => {
    const ore = {
      common: 30,
      rare: 10,
    };
    const structure = {
      buildCost: {
        common: 50,
        rare: 20,
      },
    };
    expect(canBuildStructure(ore, structure)).toBe(false);
  });
});

describe('sortStructures', () => {
  test('sorts structures by type and id', () => {
    const structures = [
      { id: '9', type: StructureTypes.CommandCenter },
      { id: '2', type: StructureTypes.Agridome },
      { id: '1', type: StructureTypes.LabStandard },
      { id: '3', type: StructureTypes.Agridome },
    ];

    const sorted = sortStructures(structures as Structure[]);
    expect(sorted).toEqual([
      { id: '2', type: StructureTypes.Agridome },
      { id: '3', type: StructureTypes.Agridome },
      { id: '9', type: StructureTypes.CommandCenter },
      { id: '1', type: StructureTypes.LabStandard },
    ]);
  });
});

describe('structureLabel', () => {
  test('returns the correct label for a structure', () => {
    const structure = {
      id: '12345678-1234-5678-1234-567812345678',
      type: StructureTypes.Agridome,
    };

    expect(structureLabel(structure)).toEqual('Agridome@123456');
  });
});

describe('calculateAvailableScientists', () => {
  test('calculates the number of available scientists', () => {
    const state = {
      colonists: { children: 0, scientists: 5, workers: 10 },
      structures: [
        createNewStructure(structureSpec.CommandCenter, StructureStatus.Online),
        createNewStructure(structureSpec.CommandCenter, StructureStatus.Offline),
        createNewStructure(structureSpec.LabStandard, StructureStatus.Online),
      ],
    };

    state.structures[0].researchTopic = {
      assignedScientists: 2,
    } as LabResearchTopic;

    const availableScientists = calculateAvailableScientists(state as GameState);

    expect(availableScientists).toEqual(2);
  });

  test("should reduce availability if there aren't enough workers for all shifts", () => {
    const state = {
      colonists: { children: 0, scientists: 6, workers: 3 },
      structures: [
        createNewStructure(structureSpec.CommandCenter, StructureStatus.Online),
        createNewStructure(structureSpec.CommandCenter, StructureStatus.Offline),
        createNewStructure(structureSpec.LabStandard, StructureStatus.Online),
      ],
    };

    state.structures[0].researchTopic = {
      assignedScientists: 2,
    } as LabResearchTopic;

    const availableScientists = calculateAvailableScientists(state as GameState);

    expect(availableScientists).toEqual(1);
  });
});

describe('calculateAvailableWorkers', () => {
  test('calculates the number of available workers', () => {
    const state = {
      colonists: { children: 0, scientists: 5, workers: 30 },
      structures: [
        createNewStructure(structureSpec.CommandCenter, StructureStatus.Online),
        createNewStructure(structureSpec.CommandCenter, StructureStatus.Offline),
        createNewStructure(structureSpec.LabStandard, StructureStatus.Online),
      ],
    };

    state.structures[0].researchTopic = {
      assignedScientists: 2,
    } as LabResearchTopic;

    const availableScientists = calculateAvailableWorkers(state as GameState);

    expect(availableScientists).toEqual(25);
  });
});
