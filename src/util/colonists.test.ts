import { describe, expect, test } from 'vitest';
import { createGameState } from '../state/initialState';
import { StructureStatus, StructureTypes, type Structure } from '../types';
import { hasEnoughStaffForStructure } from './colonists';

describe('hasEnoughStaffForStructure', () => {
  test('should return false if not enough workers', () => {
    const structure = {
      type: 'FactoryStructure',
    } as Structure;

    expect(
      hasEnoughStaffForStructure(
        createGameState({
          colonists: { children: 0, workers: 0, scientists: 0 },
        }),
        structure
      )
    ).toBe(false);

    expect(
      hasEnoughStaffForStructure(
        createGameState({
          colonists: { workers: 1, scientists: 0 },
          structures: [{ type: StructureTypes.Agridome, status: StructureStatus.Online } as Structure],
        }),
        structure
      )
    ).toBe(false);
  });
});
