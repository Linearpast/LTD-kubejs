//玩家登录自动获得矿机（仅一次）
onEvent('player.logged_in', event => {
    let tag = event.player.nbt
    let player = event.player

    //若已有矿机少于矿物 或 没有矿机，获得矿机
    if (tag.getByte('oreMachine') < global.canCopyBlock.length) {
        player.give(Item.of('oregen:ore_machine', global.canCopyBlock.length - tag.getByte('oreMachine')))
        tag.putByte('oreMachine', global.canCopyBlock.length)
        event.player.tell(Text.lightPurple(`矿机新增矿物，已自动获得矿机\n目前可生成矿物数：${global.canCopyBlock.length}\n你有的矿机数量：${tag.getByte('oreMachine')}`))
    } else if (tag.getByte('oreMachine') == null) {
        player.give(Item.of('oregen:ore_machine', global.canCopyBlock.length))
        tag.putByte('oreMachine', global.canCopyBlock.length)
        event.player.tell(Text.lightPurple(`已自动获得矿机\n目前可生成矿物数：${global.canCopyBlock.length}\n你有的矿机数量：${tag.getByte('oreMachine')}`))
    }
})

//右键矿机提示可使用矿物
onEvent('block.right_click', event => {
    if (event.block.id == 'oregen:ore_machine' &&
        event.player.mainHandItem.isEmpty()
    ) {
        let tips = `能被生成的矿物：`
        for (let i = 0; i < global.canCopyBlock.length; i++) {
            tips += `\n${global.canCopyBlock[i]}`
        }
        event.player.tell(Text.lightPurple(tips))
    }
})

//使矿机可以被挖
onEvent('tags.blocks', event => {
    event.add('minecraft:needs_iron_tool', 'oregen:ore_machine')
    event.add('minecraft:mineable/pickaxe', 'oregen:ore_machine')
})