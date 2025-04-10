import { Colony, type ResearchItem } from '../types';

export const researchTree: Record<Colony, ResearchItem[]> = {
  [Colony.Eden]: [
    {
      id: 'ACID_WEAPONRY',
      topic: 'Acid Weaponry',
      cost: 3500,
      scientists: 16,
      lab: 'Advanced',
      requires: ['ADVANCED_COMBAT_CHASSIS', 'VULCANOLOGY'],
      teaser:
        'Our Common Ore Smelters produce a number of toxic byproducts during the processing of Common Ore into Common Metals. We believe we can use these wastes in a new weapons system.',
      description:
        'Our Acid Cloud turrets fire a projectile which releases a cloud of corrosive acid that can eat through even the toughest armor. The cloud dissolves after a brief period, but any target caught within the cloud will take heavy damage.',
      result: 'Makes the Acid Cloud weapon available.',
    },
    {
      id: 'ADVANCED_ARMORING_SYSTEMS',
      topic: 'Advanced Armoring Systems',
      cost: 3000,
      scientists: 17,
      lab: 'Advanced',
      requires: ['ADVANCED_COMBAT_CHASSIS', 'ENHANCED_DEFENSIVE_FORTIFICATIONS'],
      teaser:
        'The technologies developed by our space program have some spinoff applications on New Terra. One of these is an improvement to the armor systems we use on some of our vehicles.',
      description:
        'Materials research done as part of our space program has resulted in an alloy well suited for use in combat vehicle armor.',
      result: 'Upgrades armor of Lynx (to Medium) and Panther (to Heavy).',
    },
    {
      id: 'ADVANCED_COMBAT_CHASSIS',
      topic: 'Advanced Combat Chassis',
      cost: 2000,
      scientists: 13,
      lab: 'Advanced',
      requires: ['ADVANCED_VEHICLE_POWER_PLANT', 'MOBILE_WEAPONS_PLATFORM', 'RARE_ORE_PROCESSING'],
      teaser:
        'While the Lynx has generally been a satisfactory design, it has proven to have a short life expectancy in combat. Our defenses require a heavier, more durable combat chassis.',
      description:
        'The Panther medium combat chassis, based on the same vehicle body as the Con-Vec and Cargo Truck, is a heavier, better armored defender than its predecessor, the Lynx. Although slower than the Lynx, its greater durability in combat should improve our defenses.',
      result: 'Allows production of Panthers at the Vehicle Factory.',
    },
    {
      id: 'ADVANCED_ROBOTIC_MANIPULATOR_ARM',
      topic: 'Advanced Robotic Manipulator Arm',
      cost: 2800,
      scientists: 16,
      lab: 'Standard',
      requires: ['ROBOT_ASSIST_MECHANIC'],
      teaser:
        'Certain units, such as the ConVec, use manipulator arms to accomplish complex tasks. Our cybernetic experts have a proposal for improving the flexibility and strength of these manipulator arms.',
      description:
        'Several small refinements to the manipulator arms of these units, such as reconfigured joints, use of higher tensile strength metals in construction, and a software upgrade, add up to a substantial improvement in the production and repair rates of these units.',
      result:
        'Improves the productivity of ConVecs, Earthworkers, Robo-Dozers, Repair Vehicles, and Garage by 25 percent. (Improves structure kit deployment, Tube and Wall construction, repair, and bulldozing times.)',
    },
    {
      id: 'ADVANCED_VEHICLE_POWER_PLANT',
      topic: 'Advanced Vehicle Power Plant',
      cost: 1400,
      scientists: 11,
      lab: 'Standard',
      requires: ['HIGH_TEMPERATURE_SUPERCONDUCTIVITY'],
      teaser:
        'Several of the vehicle models we use are powered by the R-2000 cool-fusion plant. Our work in High-Temperature Superconductivity may be applicable to an improvement of this power plant.',
      description:
        'The new R-3000 series cool-fusion plant has been installed in all Cargo Trucks, Robo-Dozers, Earthworkers, replacing the earlier R-2000 model. This application of the High-Temperature Superconductivity technology has increased the speed of these vehicles.',
      result: 'Improves Cargo Truck, Robo-Dozer, and Earthworker speeds.',
    },
    {
      id: 'ARTIFICIAL_LIGHTNING',
      topic: 'Artificial Lightning',
      cost: 4000,
      scientists: 18,
      lab: 'Advanced',
      requires: ['INCREASED_CAPACITANCE_CIRCUITRY'],
      teaser:
        'A new weapons system proposal has been submitted by our research staff. Using the dielectric insulator produced by our Increased Capacitance Circuitry project, a rapid discharge of a bank of capacitors could create an artificial lightning strike of massive power. The difficulty is in targeting the strike to strike enemy units, rather than a ran- dom discharge.',
      description:
        "Our artificial lightning weapon, dubbed Thor's Hammer, is the most powerful weapon we have ever developed. This targeted lightning strike is capable of destroying small enemy units with a single shot!",
      result: "Makes the Thor's Hammer weapon available.",
    },
    {
      id: 'AUTOMATED_DIAGNOSTIC_EXAMINATIONS',
      topic: 'Automated Diagnostic Examinations',
      cost: 1500,
      scientists: 8,
      lab: 'Standard',
      requires: ['HEALTH_MAINTENANCE'],
      teaser:
        'The increase in our population is straining the capacity of our Medical Centers. We may be able to increase their capacity by automating some tasks.',
      description:
        'A new type of robotic medical assistant has been developed which can perform many routine tasks at the Medical Center, allowing the staff to care for more patients.',
      result: 'Increases Medical Center capacity to 75 Colonists.',
    },
    {
      id: 'COMMAND_MODULE',
      topic: 'Command Module',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['SKYDOCK'],
      teaser:
        "Researchers combing through the partially-restored historical records in our databases have discovered a portion of the specifications for the bridge of the 'Conestoga.' This will speed our development of the command and control systems of the ship.",
      description:
        'Several dozen Savant computer systems, working in parallel, make up the core of the Command Module. This is the most sophisticated computer system we have ever devised, capable of guidance control, power direction, and self-maintenance, without human intervention, for decades.',
      result: 'Allows production of the Command Module at the Spaceport.',
    },
    {
      id: 'CONSUMERISM',
      topic: 'Consumerism',
      cost: 1000,
      scientists: 6,
      lab: 'Standard',
      requires: ['ENVIRONMENTAL_PSYCHOLOGY'],
      teaser:
        'Though there are a number of goods and services they can purchase, our colonists are asking for something more: items that they can enjoy during their leisure hours. A few colonists have asked for time at our research facilities to respond to this need.',
      description:
        'Our research into the psychological benefits of consumerism has led to the development of a production facility in which a variety of goods can be produced. These items can induce a short-term increase in Morale.',
      result: 'Allows production of Consumer Goods Factory structure kits at the Structure Factory.',
    },
    {
      id: 'CYBERNETIC_TELEOPERATION',
      topic: 'Cybernetic Teleoperation',
      cost: 800,
      scientists: 10,
      lab: 'Standard',
      requires: [],
      teaser:
        'Prior to the evacuation from our original colony site, Workers remotely operated our vehicles using a technology called Teleoperation. Since the catastrophe, we no longer have enough Workers to Teleoperate our vehicles. The Savant computers at the Command Center have taken on part of this burden, but the job is taxing their capaci- ty. We need a specialized computer vehicle control system. This Cybernetic Teleo- peration project should allows us to operate a much larger number of vehicles.',
      description:
        'Our research has resulted in a specialized variant of the Command Center, with dedicated computers and communications capabilities. In addition, all vehicle designs now include the less expensive Noesis computer, utilizing elements of the Savant technology. This transfers much of the computing burden from the Robot Command Center to the vehicle itself.',
      result: 'Allows production of Robot Command Center and Vehicle Factory structure kits at the Structure Factory.',
    },
    {
      id: 'DIRECTIONAL_MAGNETIC_FIELDS',
      topic: 'Directional Magnetic Fields',
      cost: 2000,
      scientists: 14,
      lab: 'Advanced',
      requires: ['ADVANCED_COMBAT_CHASSIS', 'INDEPENDENT_TURRET_POWER_SYSTEMS'],
      teaser:
        'Some of our researchers, reviewing the military database brought from Earth, have found an abstract of a proposal for a weapon that uses a directional magnetic field to propel a projectile. Although plans for the weapon were lost, we believe we can recreate such a device.',
      description:
        'The Rail Gun turret uses an electric current to accelerate a projectile to velocities of several hundred meters per second. The weapon consists of two copper rails and the R-10 cool-fusion power cell, which charges a capacitor. The capacitor is discharged into one rail and the current flows through the projectile into the second rail, producing a directional magnetic field that accelerates the projectile.',
      result: 'Makes the Rail Gun weapon available.',
    },
    {
      id: 'DIRT_PROCEDURAL_REVIEW',
      topic: 'DIRT Procedural Review',
      cost: 1800,
      scientists: 10,
      lab: 'Standard',
      requires: ['EMERGENCY_RESPONSE_SYSTEMS'],
      teaser:
        'As our colony grows, more and more resources must be invested in DIRTs to maintain adequate protection. DIRT members have made several suggestions that may reduce this burden. A review of methods and procedures is in order.',
      description:
        'Using suggestions made by DIRT members, our emergency response procedures have been improved. Among the improvements are an additional team member, redesigned power-assist armor, and a new type of structural breach patch.',
      result: 'Increases DIRT protection capacity to 15 structures, increases DIRT Worker requirement to 3.',
    },
    {
      id: 'DUAL_TURRET_WEAPON_SYSTEMS',
      topic: 'Dual-Turret Weapon Systems',
      cost: 4000,
      scientists: 18,
      lab: 'Advanced',
      requires: ['ADVANCED_COMBAT_CHASSIS', 'REINFORCED_VEHICLE_CONSTRUCTIONS'],
      teaser:
        'One of our research Scientists has proposed doubling the rate of fire of our combat units by installing a dual weapons turret. This may be just the decisive advantage we need to end this destructive conflict.',
      description:
        'The dual-turret weapons systems are capable of twice the effective rate-of-fire of their single-turret predecessors, but duplicate only 70% of the components, sharing certain support systems. Due to their size, they can only be mounted on the Tiger heavy combat chassis, a tracked vehicle based on the Earthworker and Robo-Dozer designs.',
      result: 'Allows production of Tigers at the Vehicle Factory.',
    },
    {
      id: 'EFFICIENCY_ENGINEERING',
      topic: 'Efficiency Engineering',
      cost: 4000,
      scientists: 16,
      lab: 'Standard',
      requires: ['CONSUMERISM'],
      teaser:
        'All of our factories use a similar assembly-line method of production. Some of our factory workers, reading through the databases of industrial engineering techniques from Earth, have proposed a study of our factories, to look for possible increases in manufacturing efficiency.',
      description: '',
      result: '',
    },
    {
      id: 'ELECTROMAGNETIC_PULSING',
      topic: 'Electromagnetic Pulsing',
      cost: 2400,
      scientists: 11,
      lab: 'Advanced',
      requires: ['ADVANCED_COMBAT_CHASSIS', 'INDEPENDENT_TURRET_POWER_SYSTEMS'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'EMERGENCY_RESPONSE_SYSTEMS',
      topic: 'Emergency Response Systems',
      cost: 1000,
      scientists: 10,
      lab: 'Standard',
      requires: [],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'ENHANCED_DEFENSIVE_FORTIFICATIONS',
      topic: 'Enhanced Defensive Fortifications',
      cost: 1600,
      scientists: 12,
      lab: 'Standard',
      requires: ['LARGE_SCALE_OPTICAL_RESONATORS', 'RARE_ORE_PROCESSING'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'ENVIRONMENTAL_PSYCHOLOGY',
      topic: 'Environmental Psychology',
      cost: 1500,
      scientists: 12,
      lab: 'Standard',
      requires: [],
      teaser:
        'Environmental Psychology studies the relationships between human behaviors and the environments in which they occur. The forced evacuation of our old colony site has increased the stress on our Colonists; additional research in this field may help us to create a more supportive environment and improve Morale.',
      description: 'Increases Residence capacity from 25 to 35.',
      result:
        'Our expanded knowledge of the causes and effects of crowding and environmental and situational stressors has enabled us to redesign our Residences. We can now house more people in the same space, while improving Morale.',
    },
    {
      id: 'EXPANDED_HOUSING',
      topic: 'Expanded Housing',
      cost: 1600,
      scientists: 10,
      lab: 'Standard',
      requires: ['ENVIRONMENTAL_PSYCHOLOGY'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'EXPLOSIVE_CHARGES',
      topic: 'Explosive Charges',
      cost: 900,
      scientists: 11,
      lab: 'Standard',
      requires: ['MOBILE_WEAPONS_PLATFORM'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'EXTENDED_RANGE_PROJECTILE_LAUNCHER',
      topic: 'Extended-Range Projectile Launcher',
      cost: 4000,
      scientists: 18,
      lab: 'Advanced',
      requires: ['ACID_WEAPONRY', 'ELECTROMAGNETIC_PULSING'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'FUELING_SYSTEMS',
      topic: 'Fueling Systems',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['ION_DRIVE_MODULE'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'FUSION_DRIVE_MODULE',
      topic: 'Fusion Drive Module',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['ION_DRIVE_MODULE'],
      teaser: '',
      description: '',
      result: '',
    },
    {
      id: 'GEOTHERMAL_POWER',
      topic: 'Geothermal Power',
      cost: 2200,
      scientists: 14,
      lab: 'Standard',
      requires: ['RARE_ORE_PROCESSING'],
      teaser:
        "On Earth, a significant percentage of electric power was generated by geothermal power plants. Although New Terra does not have ground water like Earth, and therefore cannot have the same kind of steam generation that Earth's geothermal plants had, recent volcanic activity indicates a great deal of underground heat that we may be able to tap into to produce power.",
      description:
        'Although New Terra does not have ground water, and therefore does not generate underground steam and hot water that produced power on Earth, the fumaroles in this area do contain molten salts and gasses that can be used similarly. The Geothermal Plant is a less expensive and more stable power generation facility than our current Tokamak plant.',
      result: 'Allows production of Geothermal Constructors (GeoCons) at the Vehicle Factory.',
    },
    {
      id: 'GRENADE_LOADING_MECHANISM',
      topic: 'Grenade Loading Mechanism',
      cost: 3600,
      scientists: 18,
      lab: 'Advanced',
      requires: ['EXTENDED_RANGE_PROJECTILE_LAUNCHER'],
      teaser:
        'Tests of the reloading mechanism in our grenade launching weapons, the EMP and Corrosive Acid have revealed some potential areas of improvement.',
      description:
        "The hydraulic grenade loading mechanism used in some of our weapons turrets had been designed to handle ammunition that was much less shock-resistant that those we currently have in use. Increasing the 'rattle' tolerances of the system allows for a faster loading system.",
      result: 'Improves EMP and Acid Cloud rate of fire.',
    },
    {
      id: 'HABITAT_RING',
      topic: 'Habitat Ring',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['SKYDOCK'],
      teaser:
        'One of the greatest dangers of our interstellar voyage will be the bombardment of the starship with radiation and dust particles. We must develop some kind of protection against damage to the ship.',
      description:
        'Before and after our interstellar flight, our colonists will live in the Habitat Ring. These temporary quarters are shielded from radiation and small particle collisions by a magnetic field generated by superconductive coils built into the hull.',
      result: 'Allows production of the Habitat Ring at the Spaceport.',
    },
    {
      id: 'HEALTH_MAINTENANCE',
      topic: 'Health Maintenance',
      cost: 700,
      scientists: 7,
      lab: 'Standard',
      requires: [],
      teaser:
        'Although our emergency medical systems are adequate to deal with accidents and disasters, our people are suffering from a lack of regular medical care. We could exploit the vast medical knowledge in our databases to develop a regimen of health maintenance practices.',
      description:
        'Medical Center personnel are trained in a variety of techniques of preventive medicine as well as the treatment of illness and injury. Each Medical Center can support the health needs of up to 40 colonists, improving the health and morale of the colony.',
      result: 'Allows production of Medical Center structure kits at the Structure Factory.',
    },
    {
      id: 'HEAT_DISSIPATION_SYSTEMS',
      topic: 'Heat Dissipation Systems',
      cost: 3600,
      scientists: 18,
      lab: 'Advanced',
      requires: ['ARTIFICIAL_LIGHTNING'],
      teaser:
        'Some of our weapons systems generate high levels of heat when repeatedly fired in combat. These weapons require a cooling-off period before they can be fired again. This delay could be shortened by adding a heat dissipation system.',
      description:
        'Our new weapons turret heat sinks allow these weapons to be fired more quickly. The heat sinks use dichlorodifluoromethane gas as a coolant to prevent weapon overheating.',
      result: "Increases Laser, Rail Gun, and Thor's Hammer rate of fire.",
    },
    {
      id: 'HEAT_MINING',
      topic: 'Heat Mining',
      cost: 1600,
      scientists: 10,
      lab: 'Standard',
      requires: ['GEOTHERMAL_POWER'],
      teaser:
        'Our Geothermal Plants rely on the molten salts and gasses found in fumaroles to generate power. Heat Mining, or Hot Dry Rock geothermal power generation, may allow us to place Geothermal Plants in places without fumaroles by injecting cold water into deep bore wells, then capturing the steam produced when the water reaches the hot rocks in the New Terran surface.',
      description:
        'Our Heat Mining project has met with limited success. We have not been able to develop a viable geothermal plant that can be deployed away from fumaroles, but by injecting cold water into the fumarole, we have been able to increase the output of our Geothermal plants.',
      result: 'Increase Geothermal Plant Power production to 650.',
    },
    {
      id: 'HIGH_ENERGY_RAY_COMPOSITE_PROJECTOR',
      topic: 'High-Energy Ray-Composite Projector',
      cost: 4000,
      scientists: 18,
      lab: 'Standard',
      requires: ['METEOR_WATCH_OBSERVATORY'],
      teaser:
        'Some very ambitious high-energy physicists have submitted a proposal for an energy weapon. Their theory combines both microwave and laser projection with a particle beam projector.',
      description:
        'The High-Energy Ray-Composite (HERC) Projector is now functional. Although the equipment needed to produce this energy/particle beam is far too massive for use in a weapons turret, it is ideal for use as a meteor defense. Using the tracking capabilities of the Observatory, the HERC beam can destroy even the largest meteors with a single shot — if it hits its target.',
      result: 'Allows production of Meteor Defense structure kits at the Structure Factory.',
    },
    {
      id: 'HIGH_TEMPERATURE_SUPERCONDUCTIVITY',
      topic: 'High-Temperature Superconductivity',
      cost: 1100,
      scientists: 11,
      lab: 'Advanced',
      requires: ['RESEARCH_TRAINING_PROGRAMS'],
      teaser:
        'Superconductivity is the ability of certain materials to conduct electric current with no resistance and extremely low losses. The best superconductive materials we have require an operating temperature of 152 degrees Kelvin (-121 degrees Celsius). Many new applications could be developed with a significant increase in the temperature of superconduction.',
      description:
        'Our research into High-Temperature Superconductivity has resulted in the discovery of an alloy that is superconductive at 236 degrees Kelvin (-37 degrees Celsius), over 80 degrees higher than our previous superconductors, improving power generation at our Tokamaks.',
      result: 'Increases Tokamak Power output to 300.',
    },
    {
      id: 'HOT_CRACKING_COLUMN_EFFICIENCY',
      topic: 'Hot-Cracking Column Efficiency',
      cost: 1400,
      scientists: 14,
      lab: 'Standard',
      requires: ['METALS_RECLAMATION', 'RARE_ORE_PROCESSING'],
      teaser:
        'Smelters and GORFs are dependent on hot cracking columns to separate the Metal content of Ores or rubble. This equipment has a very high Power demand. We believe that we may be able to apply our high-temperature superconductive material to some elements of this system and reduce the Power demand.',
      description: 'Common Ore Smelter, Rare Ore Smelter, and GORF Power requirements reduced.',
      result: 'Reduces Common Ore Smelter, Rare Ore Smelter, and GORF Power requirements to 40 units each.',
    },
    {
      id: 'HYDROPONIC_GROWING_MEDIA',
      topic: 'Hydroponic Growing Media',
      cost: 1600,
      scientists: 11,
      lab: 'Standard',
      requires: [],
      teaser:
        'Our Agridomes use a variety of methods, including Hydroponics (soilless farming) to fill our Food requirements. Some of our Agricultural Workers have ideas on ways to improve the growing medium in which our Hydroponic crops are grown.',
      description:
        'By adjusting the nutrients in the liquid in which our hydroponic crops are grown, we have been able to increase production at our Agridomes by 25%.',
      result: 'Increases Food production to 50 units.',
    },
    {
      id: 'HYPNOPAEDIA',
      topic: 'Hypnopaedia',
      cost: 800,
      scientists: 10,
      lab: 'Standard',
      requires: ['RESEARCH_TRAINING_PROGRAMS'],
      teaser:
        'As our research projects become more complex, we need to improve our methods of training scientists. Hypnopaedia, or sleep-learning, is a method we plan to investigate.',
      description:
        'Our hypnopaedia project has borne limited fruits. Sleep-learning is useful only in reducing the time required for memorization. This is helpful in that a large part of our research training requires knowledge of what types of research are described in our scientific databases.',
      result: 'Reduces points required to train Scientists to 3750 (1875 in multiplayer).',
    },
    {
      id: 'IMPROVIED_LAUNCH_VEHICLE',
      topic: 'Improved Launch Vehicle',
      cost: 6000,
      scientists: 18,
      lab: 'Advanced',
      requires: ['SPACE_PROGRAM'],
      teaser:
        'Our SULVs lack cargo sufficient capacity for some of the resource cargo modules we will need to launch in the final stage of the evacuation of New Terra. In addition, they are proving quite expensive on a per launch basis. Our aeronautical experts have proposed a new launch vehicle to address both of these issues.',
      description:
        'The RLV program solves both of the design issues caused by our original SULV. The cargo capacity of the RLV is 40% larger than that of the SULV, allowing it to carry the largest starship modules we develop. And, though a single RLV is much more costly than a single SULV, on a per-launch basis, the RLV is significantly less expensive.',
      result: 'Allows production of the Reusable Launch Vehicle (RLV) at the Spaceport.',
    },
    {
      id: 'INCREASED_CAPACITANCE_CIRCUITRY',
      topic: 'Increased Capacitance Circuitry',
      cost: 1800,
      scientists: 10,
      lab: 'Advanced',
      requires: ['DIRECTIONAL_MAGNETIC_FIELDS'],
      teaser:
        'As our experience in using Rare Metals grows, we find new applications for these materials. Our boptronics engineers believe they can refine the design of the dielectric insulators used in some of our high-voltage capacitors to improve their efficiency.',
      description:
        'The new design of the dielectric insulator has increased the capacitance of the capacitors used in the Rail Gun weapon systems. The higher discharge increases the acceleration of the projectile by 20%. In addition, our researchers are brainstorming another possible use for this technology, and will soon submit a new project proposal.',
      result: 'Increases Rail Gun concussion damage to 100, penetration damage to 50.',
    },
    {
      id: 'INDEPENDENT_TURRET_POWER_SYSTEMS',
      topic: 'Independent Turret Power Systems',
      cost: 1600,
      scientists: 12,
      lab: 'Advanced',
      requires: ['HIGH_TEMPERATURE_SUPERCONDUCTIVITY', 'MOBILE_WEAPONS_PLATFORM'],
      teaser:
        'Our weapons turrets currently feed off the Lynx cool-fusion power plant. Because of the other demands on this power system, the amount of power that is available to the weapon is limited. Our research project will develop an independent power source for weapons turrets.',
      description:
        "The R-10 cool-fusion power cell, just developed, is a small but powerful generator designed to fit into the weapons turret on our Lynx combat vehicles. This replaces the power feeds from the Lynx' own cool-fusion plant, and makes possible other, more powerful weapons systems.",
      result: 'Increases Laser penetration damage to 45.',
    },
    {
      id: 'ION_DRIVE_MODULE',
      topic: 'Ion Drive Module',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['SKYDOCK'],
      teaser:
        "While the main drive of the 'Conestoga' was a less capable fusion drive, it appears that an improved ion propulsion system was developed shortly before launch and used in some thruster systems. Development of an Ion Propulsion interstellar drive will be a substantial step in our starship program.",
      description:
        'The ion motor is a low-thrust/long-duration system which will be activated once the ship reaches interstellar space. The Ion Drive Module contains this interstellar drive as well as supplemental ion and chemical guidance thrusters to be attached to the starship.',
      result: 'Allows production of the Ion Drive Module at the Spaceport.',
    },
    {
      id: 'LARGE_SCALE_OPTICAL_RESONATORS',
      topic: 'Large-Scale Optical Resonators',
      cost: 1200,
      scientists: 12,
      lab: 'Standard',
      requires: [],
      teaser:
        'Inter-colonial relations remain poor, making it prudent to develop some kind of defensive capability. Our most promising research proposal derives from the welding and cutting lasers used at the Structure Factory. The key development will be the design of an optical resonator large enough to produce a weapons-strength beam.',
      description:
        'Industrial laser torches provided the model for the Laser turret, whose large-scale optical resonators are capable of generating a beam that can slice through enemy targets quite easily.',
      result:
        'Makes the Laser weapon available. Allows production of Guard Post structure kits at the Structure Factory.',
    },
    {
      id: 'LAVA_DEFENSES',
      topic: 'Lava Defenses',
      cost: 1200,
      scientists: 12,
      lab: 'Advanced',
      requires: ['RARE_ORE_PROCESSING', 'VULCANOLOGY'],
      teaser:
        'Volcanic eruptions continue to pose a substantial danger. We must find some way of routing these lava flows away from the colony.',
      description:
        'In our search for a way to reduce the threat of volcanic eruptions, we have found a material that can, at least temporarily, resist the intense heat of a lava flow. This material, sprayed on a wall built of heavily-compressed regolith, can delay the approach of lava to our structures, giving us more time to evacuate.',
      result: 'Allows Earthworkers to deploy Lava Walls.',
    },
    {
      id: 'LEISURE_STUDIES',
      topic: 'Leisure Studies',
      cost: 1400,
      scientists: 7,
      lab: 'Standard',
      requires: ['ENVIRONMENTAL_PSYCHOLOGY'],
      teaser:
        'Our colonists are asking for additional entertainment options for their off-duty hours. This project proposes to tap the humanities database for possible leisure-time activities.',
      description:
        'Our leisure studies project has produced a number of activities, for both individuals and groups, that will amuse, entertain, and stimulate our colonists. Recreation facility personnel are trained to organize physical exercise classes, games, and tournaments, and to teach various handicrafts.',
      result: 'Allows production of Recreation Facility structure kits at the Structure Factory.',
    },
    {
      id: 'MAGMA_PURITY_CONTROL',
      topic: 'Magma Purity Control',
      cost: 4500,
      scientists: 18,
      lab: 'Advanced',
      requires: ['MAGMA_REFINING'],
      teaser:
        'Although magma contains all of the elements we classify as Rare Metals, it also contains several other elements which are essentially waste materials. We may be able filter out some of these additional materials in our molten magma flow.',
      description:
        'Our Magma Purity Control technique removes several waste materials from the magma before cooling it for transport to the Rare Ore Smelter.',
      result: 'Increases Rare Ore yield at Magma Well to 150.',
    },
    {
      id: 'MAGMA_REFINING',
      topic: 'Magma Refining',
      cost: 0,
      scientists: 0,
      lab: 'Advanced',
      requires: ['GEOTHERMAL_POWER', 'VULCANOLOGY'],
      teaser:
        'Initial observations of the magma vents that have begun to appear on the New Terran surface indicate that the magma is rich in Rare Metals. If we could develop a method of safely using this magma, it would greatly increase our supply of this resource.',
      description:
        'Using the same basic configuration as our Mines, we have created a process of extracting and cooling magma from magma vents. The product of this process is a steady supply of Rare Ores, with a constant yield of 100 units of Rare Metals.',
      result: 'Allows Robo-Miners to deploy as Magma Wells. Robo-Miner production cost increases to 800 Common Metals.',
    },
    {
      id: 'METALLOGENY',
      topic: 'Metallogeny',
      cost: 700,
      scientists: 7,
      lab: 'Standard',
      requires: [],
      teaser:
        'Metallogeny is the branch of geology that seeks to define the relationship between the geological history of an area and its mineral deposits. Metallogenic research is aimed at achieving a better understanding of the nature and geological settings of base and precious metal deposits, and to use this understanding to help develop areas of high mineral potential.',
      description:
        'Our Metallogenic research has developed a new technique of locating and exploiting veins of Ore. This new method has increased Common Ore production.',
      result: 'Increases Common Ore Mine yield by 20 percent.',
    },
    {
      id: 'METALS_RECLAMATION',
      topic: 'Metals Reclamation',
      cost: 800,
      scientists: 10,
      lab: 'Standard',
      requires: [],
      teaser:
        'With our growing needs, we can no longer afford to overlook any possible sources of Metals. A few adaptations to our current Smelter technology may enable us to reclaim some of the materials in structures we no longer need.',
      description:
        'The Garbage and Ore Recycling Facility (GORF) uses a variant of the hot-cracking technology used at the Common Ore Smelter to extract usable Metals from deconstructed structures, unneeded structure kits, and rubble.',
      result: 'Allows production of GORF structure kits at the Structure Factory.',
    },
    {
      id: 'METEOROLOGY',
      topic: 'Meteorology',
      cost: 1800,
      scientists: 11,
      lab: 'Standard',
      requires: ['VULCANOLOGY'],
      teaser:
        "Although there have always been electrical discharges in the New Terran atmosphere, the atmosphere's low pressure caused these discharges to be manifested as sudden glows, rather than lightning strikes as on Earth. Now, with the thickening of the at- mosphere, dangerous lightning is becoming more of a danger. We need to study these strikes so that we can predict their occurrence and take precautions.",
      description:
        'We now understand the atmospheric conditions that lead to filimentous, or arc, lightning discharges in the New Terran atmosphere, and can predict their occurrence. On Earth, collisions between water particles of varying sizes caused the build-up of an electrical charge in the atmosphere. Negatively-charged particles in storm clouds were attracted to the positively-charged ground. The process is similar on New Terra, except that instead of water particles colliding, we have dust particles colliding.',
      result: 'Gives early warning of electrical storms.',
    },
    {
      id: 'METEOR_WATCH_OBSERVATORY',
      topic: 'Meteor-Watch Observatory',
      cost: 1800,
      scientists: 12,
      lab: 'Standard',
      requires: ['SPACE_PROGRAM'],
      teaser:
        'After the recent meteorite impacts, our observations have found that more are to come. New Terra is entering a field of debris, probably caused by the collision of two asteroids. We need a way to track this debris so we can have some advance warning of meteorite impacts.',
      description:
        'Deployment of the Observatory structure will allow us at least a minimal amount of warning of meteorite impacts in the area of our colony. The Observatory incorporates a wide-field optical telescope with a sophisticated tracking system to allow us to project the path of incoming meteors.',
      result: 'Allows production of Observatory structure kits at the Structure Factory.',
    },
    {
      id: 'MOBILE_WEAPONS_PLATFORM',
      topic: 'Mobile Weapons Platform',
      cost: 1400,
      scientists: 12,
      lab: 'Advanced',
      requires: ['CYBERNETIC_TELEOPERATION', 'LARGE_SCALE_OPTICAL_RESONATORS'],
      teaser:
        'While our Command Center staff is quite pleased with the new Guard Post structures, they point out that our defenses are rather inflexible, due to their lack of mobility. At their suggestion, our Scientists have outlined a project for developing a mobile weapons platform.',
      description:
        "The 'Lynx' light combat chassis is a design adapted from existing vehicles. The Lynx includes light armor-plating and a weapons hard point, to which any kind of turret may be attached.",
      result: 'Allows production of Lynx at the Vehicle Factory.',
    },
    {
      id: 'MULTITAINMENT_CONSOLE_UPGRADE',
      topic: 'Multitainment Console Upgrade',
      cost: 1300,
      scientists: 9,
      lab: 'Standard',
      requires: ['LEISURE_STUDIES'],
      teaser:
        'The demands on our Recreation Facilities have grown even as our colony has grown. This project hopes to ease the situation by improving the multitainment consoles so many of our colonists use during their off-duty hours.',
      description:
        'Our improved Multitainment Consoles are smaller and less expensive, while maintaining their high performance level. The number of units included in the Recreation Facility design has been increased, allowing the facility to serve more colonists.',
      result: 'Increases Recreation Facility capacity to 60 Colonists.',
    },
    {
      id: 'OFFSPRING_ENHANCEMENT',
      topic: 'Offspring Enhancement',
      cost: 600,
      scientists: 6,
      lab: 'Standard',
      requires: [],
      teaser:
        'With our population dwindling, we must find ways of increasing our numbers. This project is designed to find ways of increasing the birth rate as well as improving the health of our children.',
      description:
        'Based on the data developed in the Human Genome Project, completed a few years before the destruction of Earth, our Offspring Enhancement program includes selection of genetically superior children from our gene banks, in vitro gestation, and fertility enhancement.',
      result: 'Allows production of Nursery structure kits at the Structure Factory.',
    },
    {
      id: 'ORBITAL_PACKAGE',
      topic: 'Orbital Package',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['SKYDOCK'],
      teaser:
        'Upon arrival at our new home, we want to deploy a series of satellites and probes that will provide data about the planet and support colony operations.',
      description:
        'This group of satellites and probes, to be deployed upon reaching our destination planet, includes EDWARD, a communications satellite, a solar power satellite, orbital observers, and several types of atmospheric and geologic probes.',
      result: 'Allows production of the Orbital Package at the Spaceport.',
    },
    {
      id: 'PHOENIX_MODULE',
      topic: 'Phoenix Module',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: [
        'COMMAND_MODULE',
        'FUELING_SYSTEMS',
        'FUSION_DRIVE_MODULE',
        'HABITAT_RING',
        'ION_DRIVE_MODULE',
        'ORBITAL_PACKAGE',
        'SENSOR_PACKAGE',
        'SKYDOCK',
        'STASIS_SYSTEMS',
      ],
      teaser:
        'Before we land our colonists on the new planet, we must send a lander to prepare the early stages of a colony. We have in our databases portions of the plans for the Seed Factory used on our arrival on New Terra, but they are incomplete and obsolescent.',
      description:
        'When deployed, this self-contained lander transforms into several of the initial structures and vehicles needed to start a colony. These structures are all capable of operation without human presence, and will give our new home a head start.',
      result: 'Allows production of the Phoenix Module at the Spaceport.',
    },
    {
      id: 'PRECISION_TRAJECTORY_PROJECTION_SOFTWARE',
      topic: 'Precision Trajectory Projection Software',
      cost: 2400,
      scientists: 14,
      lab: 'Standard',
      requires: ['HIGH_ENERGY_RAY_COMPOSITE_PROJECTOR'],
      teaser:
        'Our Meteor Defense is effective... when it can find the target. Field tests of the system show a significant possibility of inaccurate targeting coordinates generated by the Observatory tracking software.',
      description:
        'Revision of the meteor tracking software, using algorithms developed as part of the space program, has improved the trajectory projection software used at the Observatory. This will increase the probability of destroying incoming meteors before they reach our colony.',
      result: "Improves Observatory's meteor targeting system.",
    },
    {
      id: 'RARE_ORE_EXTRACTION',
      topic: 'Rare Ore Extraction',
      cost: 3400,
      scientists: 17,
      lab: 'Advanced',
      requires: ['RARE_ORE_PROCESSING'],
      teaser:
        'Our Rare Ore mining facilities have had only moderate success at finding the best methods of extracting higher grades of Rare Ore. Several proposals have been put forward to improve our efficiency.',
      description:
        'Our project has met with limited success. We have developed two new processes that determine the Rare Metal content of certain gangue materials, such as quartz, and eliminate specimens containing only trace amounts of Rare Metal.',
      result: 'Increases Rare Ore Mine yield by 20 percent.',
    },
    {
      id: 'RARE_ORE_PROCESSING',
      topic: 'Rare Ore Processing',
      cost: 2800,
      scientists: 16,
      lab: 'Advanced',
      requires: ['CYBERNETIC_TELEOPERATION', 'HIGH_TEMPERATURE_SUPERCONDUCTIVITY', 'METALLOGENY'],
      teaser:
        'Since our arrival on New Terra, we have encountered a number of sites that are rich in rare mineral deposits, but we have had neither applications which called for Rare Metals nor methods of processing these Rare Ores. Now, our scientists have a number of projects they wish to undertake which would require Rare Metals.',
      description:
        'Rare Metals will be a great asset to us. These metals can be used in several new research projects.',
      result:
        'Allows production of Rare Ore Smelter and Rare Metals Storage Tanks structure kits at the Structure Factory, and allows Robo-Miners to deploy as Rare Ore Mines. Increases Robo-Miner production costs to 700 Common Metals',
    },
    {
      id: 'RECYCLER_POSTPROCESSING',
      topic: 'Recycler Postprocessing',
      cost: 1500,
      scientists: 10,
      lab: 'Standard',
      requires: ['METALS_RECLAMATION'],
      teaser:
        'The hot-cracking column used in our GORFs successfully reclaims approximately 50% of the Metals content of materials. We have some theories about a secondary process that can recover additional metals from the remaining slag.',
      description: 'Metals recovered through recycling increased.',
      result: 'Increases Metals recovered trhough recycling.',
    },
    {
      id: 'REINFORCED_VEHICLE_CONSTRUCTIONS',
      topic: 'Reinforced Vehicle Construction',
      cost: 1200,
      scientists: 12,
      lab: 'Standard',
      requires: ['RARE_ORE_PROCESSING'],
      teaser:
        'The Cargo Truck, and some similar vehicles, have shown themselves to be all too vulnerable to damage from disasters, explosions, and attacks. Through the use of new composite alloys incorporating Rare Metals, we can increase their durability.',
      description:
        'The durability of these vehicles has been improved through a combination of revised construction and the use of a composite alloy incorporating Rare Metals.',
      result: 'Increases Hit Points and changes production costs of ConVecs, Cargo Trucks, and Evacuation Transports.',
    },
    {
      id: 'REINFORCED_PANTHER_CONSTRUCTION',
      topic: 'Reinforced Panther Construction',
      cost: 1500,
      scientists: 11,
      lab: 'Advanced',
      requires: ['ADVANCED_COMBAT_CHASSIS', 'REINFORCED_VEHICLE_CONSTRUCTIONS'],
      teaser:
        'The composite alloy developed in our Reinforced Vehicle Construction project may be beneficial for our Panther combat chassis as well.',
      description:
        'A redesign of the Panther using a new composite alloy has increased the durability of this combat chassis.',
      result: 'Increases Panther Hit Points to 700; changes production costs to 300 Common Metals and 150 Rare Metals.',
    },
    {
      id: 'RESEARCH_TRAINING_PROGRAMS',
      topic: 'Research Training Programs',
      cost: 300,
      scientists: 5,
      lab: 'Standard',
      requires: [],
      teaser:
        "A lack of trained workers and scientists is hampering our colony's efforts. We need to develop a curricula that will educate our workforce and expand our research staff.",
      description:
        'Our new educational curriculum for training scientists includes intensive class work, independent study with Savant computers, VR simulations, and internships at the research labs.',
      result: 'Allows production of University and Advanced Lab structure kits at the Structure Factory.',
    },
    {
      id: 'ROBOT_ASSIST_MECHANIC',
      topic: 'Robot-Assist Mechanic',
      cost: 800,
      scientists: 8,
      lab: 'Standard',
      requires: ['CYBERNETIC_TELEOPERATION'],
      teaser: 'Our cybernetics experts have proposed a new robot that can be used in repairing vehicles.',
      description:
        'Robot-Assist Mechanics, installed at the Garage, are capable of doing most vehicle repairs. A special version has been mounted on a vehicle for field repairs.',
      result:
        'Allows production of Garage structure kits at the Structure Factory and of Repair Vehicles at the Vehicle Factory.',
    },
    {
      id: 'ROBOTIC_IMAGE_PROCESSING',
      topic: 'Robotic Image Processing',
      cost: 1400,
      scientists: 12,
      lab: 'Standard',
      requires: ['CYBERNETIC_TELEOPERATION'],
      teaser:
        'The visual recognition systems of our robotic vehicles have a limited useful range, partially due to the limitations of the image processing software. Some of our programmers have a possible solution.',
      description:
        'Through a combination of improved image processing software and increased zoom telescoping vision systems, the visual recognition range of certain units has been improved.',
      result: 'Improves sight ranges of Light Tower (to 9), Guard Post (to 9), and Scout (to 8).',
    },
    {
      id: 'SCOUT_CLASS_DRIVE_TRAIN_REFIT',
      topic: 'Scout-class Drive Train Refit',
      cost: 1500,
      scientists: 12,
      lab: 'Standard',
      requires: ['MOBILE_WEAPONS_PLATFORM'],
      teaser:
        'The Scout, and some similar vehicles, use the G-75 drive train. We have discovered a design flaw in the G-75 that impairs its efficiency. This project would redesign the G-75 to make it more effective.',
      description:
        'The G-75 drive train used in these three vehicles has been replaced by the G-80 model, which improved vehicle speed through a more efficient transfer of energy from the power plant to the wheels.',
      result: 'Increases Scout, Robo-Surveyor, and Lynx speeds.',
    },
    {
      id: 'SEISMOLOGY',
      topic: 'Seismology',
      cost: 1800,
      scientists: 11,
      lab: 'Standard',
      requires: [],
      teaser:
        'Our previous research on the geology of New Terra indicated that the planet was not subject to seismic activity; recent events, however, have changed the situation. Our planetary sciences database shows that seismologists had developed methods of seismic event prediction on Earth; some of these techniques may be adaptable to New Terra.',
      description:
        'We have developed equipment to detect certain hydrogeochemical early warning signals of seismic events. Among the most reliable indicators are variations in the concentration of radon and carbon dioxide in the molten salts found in deep bore wells or in fumaroles. These warnings should give us some time to idle structures in the vicinity of the epicenter, reducing damage to them.',
      result: 'Gives early warning of seismic events.',
    },
    {
      id: 'SENSOR_PACKAGE',
      topic: 'Sensor Package',
      cost: 3600,
      scientists: 16,
      lab: 'Advanced',
      requires: ['SKYDOCK'],
      teaser:
        'Our starship must have a remote sensing system, which will serve two purposes. First, it must help us avoid collision with asteroids and other large objects. Second, it will receive data from interstellar probes we send out to find our new home.',
      description:
        'Before we can depart the New Terra system, we must have a destination. Our Sensor Package includes a Nanoprobe launcher, capable of sending thousands of micro- be-sized probes toward potentially habitable planets, and a sensor/telemetry system which will evaluate the reports sent back by the Nanoprobes.',
      result: 'Allows production of the Sensor Package at the Spaceport.',
    },
    {
      id: 'SEVERE_ATMOSPHERIC_DISTURBANCES',
      topic: 'Severe Atmospheric Disturbances',
      cost: 1800,
      scientists: 12,
      lab: 'Standard',
      requires: ['METEOROLOGY'],
      teaser:
        'The vortexes we have been experiencing are a new phenomenon on New Terra; we must study these severe storms to determine how they are caused and how to predict them.',
      description:
        "The vortexes start in a manner similar to the 'dust-devils' common on Earth and Mars. Ground-level air, heated by sunlight, rises. Cooler air rushes into the area that the warmer air has left, but from there, the spinning column of air is enhanced and fo- cused by a yet-unknown process which may be electromagnetic in nature. While our understanding is limited, we can now forecast conditions that will lead to their forma- tion, and have developed technologies for early detection.",
      result: 'Gives early warning of vortexes.',
    },
    {
      id: 'SKYDOCK',
      topic: 'Skydock',
      cost: 3500,
      scientists: 18,
      lab: 'Advanced',
      requires: ['RARE_ORE_PROCESSING', 'RECYCLER_POSTPROCESSING'],
      teaser:
        'We must begin construction of an evacuation starship as soon as possible. The first step is an orbital station from which we can start deploying components of the ship',
      description:
        'Now that we have regained space launch capabilities, we can begin construction of a new starship. The first step is an orbital station from which we can start deploying components of the ship.',
      result: 'Allows production of the Skydock at the Spaceport.',
    },
    {
      id: 'SMELTER_POSTPROCESSING',
      topic: 'Smelter Postprocessing',
      cost: 4000,
      scientists: 18,
      lab: 'Advanced',
      requires: ['RECYCLER_POSTPROCESSING'],
      teaser:
        'The chemical postprocessing technique we developed for improving metals reclamation at the GORF may be adaptable for use at our Common Ore and Rare Ore Smelters.',
      description:
        'We have successfully adapted the chemical postprocessing treatment used at the GORF to improve the yield of our Smelters.',
      result: 'Increases Common Ore Smelter and Rare Ore Smelter production.',
    },
    {
      id: 'SOLAR_POWER',
      topic: 'Solar Power',
      cost: 3200,
      scientists: 18,
      lab: 'Advanced',
      requires: ['SPACE_PROGRAM'],
      teaser:
        'The technology behind solar power has been available for quite some time, the size of the solar collector panels needed to generate a significant amount of power has always been judged prohibitive, especially since our periodic evacuations began. However, with the redevelopment of a space program, it is possible to build a solar collector satellite which beams the energy it collects to a ground-based receiver.',
      description:
        'The solar power system, comprised of a collector satellite and ground-based receiver, is an inexpensive alternative energy source. The satellite, once in orbit, can be retargeted at a new ground location after an evacuation, and the receivers are much less volatile than our Tokamak fusion reactors.',
      result:
        'Allows production of the Solar Power Array at the Structure Factory and the Solar Power Satellite at the Spaceport.',
    },
    {
      id: 'SPACE_PROGRAM',
      topic: 'Space Program',
      cost: 4000,
      scientists: 18,
      lab: 'Advanced',
      requires: ['RARE_ORE_PROCESSING'],
      teaser:
        'With the discovery that the Blight cannot be stopped, and that New Terra will eventually become uninhabitable, it becomes imperative that we develop a space launch facility as the first step in our evacuation of New Terra.',
      description:
        'Our space program is underway. As an initial cargo, we have developed the Early Disaster Warning and Resource Detection (EDWARD) satellite.',
      result:
        'Allows production of Spaceport structure kits at the Structure Factory. The Spaceport may produce Single-Use Launch Vehicles (SULVs) and the EDWARD Satellite.',
    },
    {
      id: 'STASIS_SYSTEMS',
      topic: 'Stasis Systems',
      cost: 3500,
      scientists: 18,
      lab: 'Advanced',
      requires: ['HABITAT_RING', 'HEALTH_MAINTENANCE'],
      teaser:
        "The cold-sleep system used in the 'Conestoga' successfully slowed the metabolic rate of the colonists traveling from Earth to New Terra, but at the cost of shortening their lives once they had arrived. Fortunately, our medical technology has advanced significantly since our arrival, and we believe we now have a method of inducing true suspended animation without the same loss of longevity.",
      description:
        'The Stasis Systems contain suspended animation chambers for 200 colonists. This module, like the Habitat Ring, is equipped with our superconductive magnetic coil radiation shield system.',
      result: 'Allows production of the Stasis Systems at the Spaceport.',
    },
    {
      id: 'VULCANOLOGY',
      topic: 'Vulcanology',
      cost: 1600,
      scientists: 8,
      lab: 'Standard',
      requires: [],
      teaser:
        'Recent volcanic activity on New Terra threatens our colony. To protect our colonists, we need to develop a method of predicting eruptions so that we can safely evacuate our colonists.',
      description:
        "Using data from our planetary sciences database as well as investigations of volcanoes and magma vents here on New Terra, we have developed an early warning system that will accurately predict volcanic eruptions. Our dual-method monitoring system uses seismometers to measure rock movement that may indicate rising magma in the planet's crust and correlation spectrometers that measure sulfur dioxide in plumes rising out of volcanic craters.",
      result: 'Gives early warning of volcanic eruptions.',
    },
  ],
  // TODO:
  [Colony.Plymouth]: [],
};
