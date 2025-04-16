/**
 * 用于存储所有配置和一些定义
 */

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

//反射获取java类
let itemStack = java('dev.latvian.mods.kubejs.item.ItemStackJS')
let compoundTag = java('net.minecraft.nbt.CompoundTag')
let effectIns = java('net.minecraft.world.effect.MobEffectInstance')

//计时（默认tick）
//给床放陷阱被反噬的概率(%)
const regurgitationChance = 25;

//是否启用炼金放大组件对发情效果的提升（仅注射器）
const augmentApplyToOestru = false;

//吃食物给奖励冷却（秒）
const eatAwardCooldown = 30;

//不能喂食玩家的食物（仅满饱食度）
const cannotFeedFood = [
    'oestrus:flowers_extracts',
    'oestrus:c9h11no',
    'minecraft:pufferfish',
    'oestrus:aurora_crescent'
];


//权重和
const weightSum = 1000;
//吃东西获得的奖励列表，物品id、数量、权重
//请确保 所有权重的和 <= 权重和
const eatAwardList = [
    { id: 'minecraft:ancient_debris', number: 24, weight: 50 },
    { id: 'minecraft:diamond', number: 28, weight: 50 },
    { id: 'minecraft:nether_star', number: 1, weight: 1 },
    { id: 'minecraft:enchanted_golden_apple', number: 1, weight: 1 },
    { id: 'minecraft:elytra', number: 1, weight: 1 },
    { id: 'minecraft:emerald', number: 32, weight: 50 },
    { id: 'minecraft:gold_ingot', number: 32, weight: 50 },
    { id: 'minecraft:iron_ingot', number: 36, weight: 100 },
    { id: 'oestrus:c9h11no', number: 4, weight: 50 },
    { id: 'kitchenkarrot:ultra_super_delicious_cereal_porridge', number: 1, weight: 25 },
    { id: 'gobber2:gobber2_glob_nether', number: 16, weight: 50 },
    { id: 'minecraft:rabbit_foot', number: 8, weight: 50 },
    { id: 'oestrus:aurora_crescent', number: 1, weight: 1 },
    { id: 'shulker_shell', number: 16, weight: 6 },
    { id: 'minecraft:name_tag', number: 2, weight: 200 },
    { id: 'gobber2:gobber2_glob_end', number: 16, weight: 50 },
    { id: 'gobber2:gobber2_glob', number: 16, weight: 50 }
]

//可以激活的矿机
global.canCopyBlock = [
    'thermal:apatite_ore',
    'thermal:cinnabar_ore',
    'thermal:sulfur_ore',
    'thermal:tin_ore',
    'thermal:lead_ore',
    'thermal:silver_ore',
    'thermal:nickel_ore',
    'maple:salt_ore',
    'minecraft:gold_ore'
]

//矿机每次被随机刻选中后增加的矿物数量
global.randomTickOreIncrease = 4