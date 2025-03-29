import { describe, expect, test } from 'vitest';
import { StructureStatus, StructureTypes, type Structure } from '../types';
import { calculatePowerProduction, calculatePowerUtilization, hasEnoughPowerForStructure } from './power';

describe('calculatePowerProduction', () => {
  test('sum up power produced by active power producers', () => {
    expect(
      calculatePowerProduction({
        structures: [],
      })
    ).toEqual(0);

    expect(
      calculatePowerProduction({
        structures: [
          { type: StructureTypes.CommandCenter, status: StructureStatus.Online } as Structure,
          { type: StructureTypes.Residence, status: StructureStatus.Online } as Structure,
          { type: StructureTypes.Tokamak, status: StructureStatus.Online } as Structure,
        ],
      })
    ).toEqual(300);
  });
});

describe('calculatePowerUtilization', () => {
  test('sum up power used by all buildings', () => {
    expect(calculatePowerUtilization({ structures: [] })).toEqual(0);
    expect(
      calculatePowerUtilization({
        structures: [{ type: StructureTypes.CommandCenter, status: StructureStatus.Online } as Structure],
      })
    ).toEqual(0);
    expect(
      calculatePowerUtilization({
        structures: [
          { type: StructureTypes.CommandCenter, status: StructureStatus.Online } as Structure,
          { type: StructureTypes.Residence, status: StructureStatus.Online } as Structure,
          { type: StructureTypes.Residence, status: StructureStatus.Online } as Structure,
          { type: StructureTypes.Agridome, status: StructureStatus.Offline } as Structure,
        ],
      })
    ).toEqual(40);
  });
});

describe('hasEnoughPowerForStructure', () => {
  test('returns true if power is sufficient', () => {
    expect(
      hasEnoughPowerForStructure(
        { structures: [{ type: StructureTypes.CommandCenter, status: StructureStatus.Online } as Structure] },
        { type: StructureTypes.Agridome } as Structure
      )
    ).toBe(true);

    expect(
      hasEnoughPowerForStructure(
        {
          structures: [
            { type: StructureTypes.CommandCenter, status: StructureStatus.Online } as Structure,
            { type: StructureTypes.Agridome, status: StructureStatus.Online } as Structure,
          ],
        },
        { type: StructureTypes.Agridome } as Structure
      )
    ).toBe(true);
  });

  test('return false if power is insufficient', () => {
    expect(hasEnoughPowerForStructure({ structures: [] }, { type: StructureTypes.Agridome } as Structure)).toBe(false);
    expect(
      hasEnoughPowerForStructure(
        {
          structures: [
            { type: StructureTypes.CommandCenter, status: StructureStatus.Online } as Structure,
            { type: StructureTypes.FactoryStructure, status: StructureStatus.Online } as Structure,
          ],
        },
        { type: StructureTypes.Agridome } as Structure
      )
    ).toBe(false);
  });
});
