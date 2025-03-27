import { BsFillLightningChargeFill as PowerIcon } from 'react-icons/bs';
import { FaPeopleGroup as ColonistsIcon } from 'react-icons/fa6';
import { LuPickaxe as OreIcon } from 'react-icons/lu';
import { MdOutlineQueryStats as StatsIcon } from 'react-icons/md';
import { PiCarrot as FoodIcon } from 'react-icons/pi';
import { useColonists, useFood, useMark, useMorale, useOre, usePower } from '../../hooks';
import { ContentBox } from '../ContentBox';
import { SimpleDataTable } from '../SimpleDataTable';

const CommandCenterStructure = () => {
  const mark = useMark();
  const morale = useMorale();
  const { total: totalColonists, children: totalChildren, availableScientists, availableWorkers } = useColonists();
  const { production: foodProduction, storage: foodStorage } = useFood();
  const { production: powerProduction, utilization: powerUtilization } = usePower();
  const { common, rare } = useOre();

  return (
    <div>
      <div className="flex flex-col space-y-1">
        <ContentBox classNames={{ icon: 'text-red-500' }} icon={StatsIcon} title="Stats">
          <SimpleDataTable
            id="stats"
            data={[
              { label: 'Mark', value: mark },
              { label: 'Morale', value: morale },
            ]}
          />
        </ContentBox>

        <ContentBox classNames={{ icon: 'text-blue-500' }} icon={ColonistsIcon} title="Colonists">
          <SimpleDataTable
            id="colonists"
            data={[
              { label: 'Total', value: totalColonists },
              { label: 'Children', value: totalChildren },
              { label: 'Available Workers', value: availableWorkers },
              { label: 'Available Scientists', value: availableScientists },
            ]}
          />
        </ContentBox>

        <ContentBox classNames={{ icon: 'text-yellow-500' }} icon={PowerIcon} title="Power">
          <SimpleDataTable
            id="power"
            data={[
              { label: 'Production', value: powerProduction },
              { label: 'Utilization', value: powerUtilization },
            ]}
          />
        </ContentBox>

        <ContentBox classNames={{ icon: 'text-green-500' }} icon={FoodIcon} title="Food">
          <SimpleDataTable
            id="food"
            data={[
              { label: 'Production', value: foodProduction },
              { label: 'Storage', value: foodStorage },
            ]}
          />
        </ContentBox>

        <ContentBox classNames={{ icon: 'text-orange-500' }} icon={OreIcon} title="Ore">
          <SimpleDataTable
            id="ore"
            data={[
              { label: 'Common', value: common },
              { label: 'Rare', value: rare },
            ]}
          />
        </ContentBox>
      </div>
    </div>
  );
};

export default CommandCenterStructure;
