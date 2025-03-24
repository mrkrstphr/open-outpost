import { describe, expect, test } from 'vitest';
import { structureSpec } from './data/structures';
import { BuildingStatus, BuildingTypes } from './types';
import { buildingLabel, canBuildStructure, createNewStructure, sortStructures } from './utils';

describe('createNewStructure', () => {
  test('creates a new structure with default status as Building', () => {
    const structureDef = structureSpec.Agridome;
    const newStructure = createNewStructure(structureDef);

    expect(newStructure).toEqual({
      id: expect.any(String),
      type: BuildingTypes.Agridome,
      health: 0,
      status: BuildingStatus.Building,
      maxHealth: structureDef.hp,
    });
  });

  test('creates a new structure with the passed status', () => {
    const structureDef = structureSpec.Agridome;
    const newStructure = createNewStructure(structureDef, BuildingStatus.Online);

    expect(newStructure).toEqual({
      id: expect.any(String),
      type: BuildingTypes.Agridome,
      health: structureDef.hp,
      status: BuildingStatus.Online,
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
      { id: '9', type: BuildingTypes.CommandCenter },
      { id: '2', type: BuildingTypes.Agridome },
      { id: '1', type: BuildingTypes.LabStandard },
      { id: '3', type: BuildingTypes.Agridome },
    ];

    const sorted = sortStructures(structures);
    expect(sorted).toEqual([
      { id: '2', type: BuildingTypes.Agridome },
      { id: '3', type: BuildingTypes.Agridome },
      { id: '9', type: BuildingTypes.CommandCenter },
      { id: '1', type: BuildingTypes.LabStandard },
    ]);
  });
});

describe('buildingLabel', () => {
  test('returns the correct label for a building', () => {
    const building = {
      id: '12345678-1234-5678-1234-567812345678',
      type: BuildingTypes.Agridome,
    };

    expect(buildingLabel(building)).toEqual('Agridome@123456');
  });
});
