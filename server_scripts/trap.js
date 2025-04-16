//右键床设置陷阱
onEvent('block.right_click', event => {
    /**
     * 陷阱床
     * if 点击的是床
     *      if 主手点击
     *          if 潜行并且手里拿着捆绑物
     *              放置陷阱
     *          else
     *              触发陷阱
     */
    if (event.getBlock().tags.toArray()
        .find(element => {
            if (element == 'minecraft:beds') {
                return true
            }
        })) {
        //主手点击
        if (event.getHand().toString() == 'MAIN_HAND') {
            let mainItem = event.player.mainHandItem
            let player = event.player
            let server = event.server
            let data = event.block.entityData

            //潜行且手里有捆绑物
            if (event.player.isCrouching() && mainItem.tags.toArray()
                .find(element => {
                    if (element == 'curios:binds') {
                        return true
                    }
                })) {
                let nbt = mainItem.nbt
                let itemId = mainItem.id
                let chance = Math.random() * 100

                /**
                 * if 物品没有nbt
                 *      if 在概率范围
                 *          添加陷阱
                 *      else
                 *          给自己绑住
                 * else
                 *      同上
                 */
                if (nbt == null) {
                    //没有nbt就自己做一个
                    let tag = new compoundTag()
                    tag.put("item", itemId)
                    if (chance > regurgitationChance) {
                        server.persistentData.put(data.toString(), tag)
                        player.tell(Text.green('成功给该床添加陷阱~（快去叫人来睡觉）'))
                    } else {
                        server.runCommandSilent(`curios replace binds 0 ${player.name.text} with ${itemId}`)
                        player.tell(Text.red('哎呀~笨手笨脚的你一不小心给自己缠住了……'))
                    }
                } else {
                    if (nbt.get('item') == null) {
                        nbt.put('item', itemId)
                    }
                    if (chance > regurgitationChance) {
                        server.persistentData.put(data.toString(), nbt)
                        player.tell(Text.green('成功给该床添加陷阱~（快去叫人来睡觉）'))
                    } else {
                        server.runCommandSilent(`curios replace binds 0 ${player.name.text} with ${itemId}${nbt.toString()}`)
                        player.tell(Text.red('哎呀~笨手笨脚的你一不小心给自己缠住了……'))
                    }
                }
                mainItem.count--;
            } else {
                let tag = new compoundTag()
                tag = server.persistentData.get(data.toString())

                //if tag存在 说明有陷阱
                if (tag != null) {
                    //用于防止出来的绳子有多余nbt
                    if (tag.get('item') != null && tag.size() == 1) {
                        server.runCommandSilent(`curios replace binds 0 ${player.name.text} with ${tag.get('item').toString().replace('"','')}`)
                    } else if (tag.get('item') != null) {
                        server.runCommandSilent(`curios replace binds 0 ${player.name.text} with ${tag.get('item').toString().replace('"','')}${tag.toString()}`)
                    } else {
                        console.log(`捆绑床的奇怪bug\n床的nbt:${data.toString()}\n绳子的nbt:${tag}`);
                    }
                    server.persistentData.remove(data.toString())
                }
            }
        }
    }
})