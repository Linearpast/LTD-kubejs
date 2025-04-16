//物品注册
onEvent('item.registry', event => {
    //极光新月
    event.create('oestrus:aurora_crescent')
        .unstackable()
        .useAnimation('drink')
        .food(food => {
            food
                .hunger(520 * 2)
                .saturation(1314 / 520 / 2)
                .alwaysEdible()
                .effect('minecraft:resistance', 1200, 4, 1)
                .effect('minecraft:speed', 1200, 2, 1)
                .effect('minecraft:regeneration', 1200, 9, 1)
                .effect('minecraft:fire_resistance', 1200, 0, 1)
                .effect('minecraft:jump_boost', 1200, 2, 1)
                .effect('minecraft:water_breathing', 1200, 0, 1)
                .effect('minecraft:conduit_power', 1200, 2, 1)
                .effect('minecraft:dolphins_grace', 1200, 2, 1)
                .effect('minecraft:haste', 1200, 2, 1)
                .effect('minecraft:luck', 1200, 9, 1)
                .effect('minecraft:strength', 1200, 4, 1)
                .eaten(ctx => {
                    ctx.player.tell(Text.lightPurple('这一刻，你与极光新月共同见证……'))
                })
        })

})