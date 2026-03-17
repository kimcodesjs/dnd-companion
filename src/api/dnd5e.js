const BASE_URL = "https://www.dnd5eapi.co/api/2014";

// ── Core fetch helper ──────────────────────────────────────────────────────────
// All API calls flow through here. Pass a path like "/classes" or "/monsters/aboleth".
const get = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`DnD API error: ${res.status} ${res.statusText}`);
  return res.json();
};

// ── Ability Scores ─────────────────────────────────────────────────────────────
// e.g. STR, DEX, CON, INT, WIS, CHA
export const getAbilityScores = () => get("/ability-scores");
export const getAbilityScore = (index) => get(`/ability-scores/${index}`);

// ── Alignments ────────────────────────────────────────────────────────────────
// e.g. chaotic-evil, lawful-good
export const getAlignments = () => get("/alignments");
export const getAlignment = (index) => get(`/alignments/${index}`);

// ── Backgrounds ───────────────────────────────────────────────────────────────
// e.g. acolyte
export const getBackgrounds = () => get("/backgrounds");
export const getBackground = (index) => get(`/backgrounds/${index}`);

// ── Classes ───────────────────────────────────────────────────────────────────
// e.g. barbarian, bard, cleric, druid, fighter, monk, paladin,
//      ranger, rogue, sorcerer, warlock, wizard
export const getClasses = () => get("/classes");
export const getClass = (index) => get(`/classes/${index}`);
export const getClassLevels = (index) => get(`/classes/${index}/levels`);
export const getClassLevel = (index, level) => get(`/classes/${index}/levels/${level}`);
export const getClassSpells = (index) => get(`/classes/${index}/spells`);
export const getClassFeatures = (index) => get(`/classes/${index}/features`);
export const getClassSubclasses = (index) => get(`/classes/${index}/subclasses`);
export const getClassProficiencies = (index) => get(`/classes/${index}/proficiencies`);
export const getClassMulticlassing = (index) => get(`/classes/${index}/multi-classing`);

// ── Conditions ────────────────────────────────────────────────────────────────
// e.g. blinded, charmed, exhaustion, frightened, grappled, incapacitated,
//      invisible, paralyzed, petrified, poisoned, prone, restrained, stunned, unconscious
export const getConditions = () => get("/conditions");
export const getCondition = (index) => get(`/conditions/${index}`);

// ── Damage Types ──────────────────────────────────────────────────────────────
// e.g. acid, bludgeoning, cold, fire, force, lightning, necrotic,
//      piercing, poison, psychic, radiant, slashing, thunder
export const getDamageTypes = () => get("/damage-types");
export const getDamageType = (index) => get(`/damage-types/${index}`);

// ── Equipment ─────────────────────────────────────────────────────────────────
export const getEquipmentList = () => get("/equipment");
export const getEquipment = (index) => get(`/equipment/${index}`);

// ── Equipment Categories ──────────────────────────────────────────────────────
// e.g. armor, weapons, adventuring-gear, tools, mounts-and-vehicles
export const getEquipmentCategories = () => get("/equipment-categories");
export const getEquipmentCategory = (index) => get(`/equipment-categories/${index}`);

// ── Feats ─────────────────────────────────────────────────────────────────────
// e.g. alert, athlete, actor, charger, crossbow-expert
export const getFeats = () => get("/feats");
export const getFeat = (index) => get(`/feats/${index}`);

// ── Features ──────────────────────────────────────────────────────────────────
// Class features (e.g. action-surge, bardic-inspiration, sneak-attack)
export const getFeatures = () => get("/features");
export const getFeature = (index) => get(`/features/${index}`);

// ── Languages ─────────────────────────────────────────────────────────────────
// e.g. common, elvish, dwarvish, draconic
export const getLanguages = () => get("/languages");
export const getLanguage = (index) => get(`/languages/${index}`);

// ── Magic Items ───────────────────────────────────────────────────────────────
export const getMagicItems = () => get("/magic-items");
export const getMagicItem = (index) => get(`/magic-items/${index}`);

// ── Magic Schools ─────────────────────────────────────────────────────────────
// e.g. abjuration, conjuration, divination, enchantment,
//      evocation, illusion, necromancy, transmutation
export const getMagicSchools = () => get("/magic-schools");
export const getMagicSchool = (index) => get(`/magic-schools/${index}`);

// ── Monsters ──────────────────────────────────────────────────────────────────
export const getMonsters = () => get("/monsters");
export const getMonster = (index) => get(`/monsters/${index}`);

// ── Proficiencies ─────────────────────────────────────────────────────────────
export const getProficiencies = () => get("/proficiencies");
export const getProficiency = (index) => get(`/proficiencies/${index}`);

// ── Races ─────────────────────────────────────────────────────────────────────
// e.g. dragonborn, dwarf, elf, gnome, half-elf, half-orc, halfling, human, tiefling
export const getRaces = () => get("/races");
export const getRace = (index) => get(`/races/${index}`);
export const getRaceTraits = (index) => get(`/races/${index}/traits`);
export const getRaceSubraces = (index) => get(`/races/${index}/subraces`);
export const getRaceProficiencies = (index) => get(`/races/${index}/proficiencies`);

// ── Rules ─────────────────────────────────────────────────────────────────────
export const getRules = () => get("/rules");
export const getRule = (index) => get(`/rules/${index}`);

// ── Rule Sections ─────────────────────────────────────────────────────────────
export const getRuleSections = () => get("/rule-sections");
export const getRuleSection = (index) => get(`/rule-sections/${index}`);

// ── Skills ────────────────────────────────────────────────────────────────────
// e.g. acrobatics, arcana, athletics, deception, history, insight,
//      intimidation, investigation, medicine, nature, perception,
//      performance, persuasion, religion, sleight-of-hand, stealth, survival
export const getSkills = () => get("/skills");
export const getSkill = (index) => get(`/skills/${index}`);

// ── Spells ────────────────────────────────────────────────────────────────────
export const getSpells = () => get("/spells");
export const getSpell = (index) => get(`/spells/${index}`);

// ── Subclasses ────────────────────────────────────────────────────────────────
// e.g. berserker (barbarian), lore (bard), life (cleric)
export const getSubclasses = () => get("/subclasses");
export const getSubclass = (index) => get(`/subclasses/${index}`);
export const getSubclassFeatures = (index) => get(`/subclasses/${index}/features`);
export const getSubclassLevels = (index) => get(`/subclasses/${index}/levels`);

// ── Subraces ──────────────────────────────────────────────────────────────────
// e.g. high-elf, hill-dwarf, lightfoot-halfling
export const getSubraces = () => get("/subraces");
export const getSubrace = (index) => get(`/subraces/${index}`);
export const getSubraceTraits = (index) => get(`/subraces/${index}/traits`);
export const getSubraceProficiencies = (index) => get(`/subraces/${index}/proficiencies`);

// ── Traits ────────────────────────────────────────────────────────────────────
// Racial traits (e.g. darkvision, brave, dwarven-resilience)
export const getTraits = () => get("/traits");
export const getTrait = (index) => get(`/traits/${index}`);

// ── Weapon Properties ─────────────────────────────────────────────────────────
// e.g. ammunition, finesse, heavy, light, loading, reach, thrown, two-handed, versatile
export const getWeaponProperties = () => get("/weapon-properties");
export const getWeaponProperty = (index) => get(`/weapon-properties/${index}`);

// ── Generic detail fetcher ──────────────────────────────────────────────────
export const getResourceDetail = (resourceKey, index) => get(`/${resourceKey}/${index}`);
