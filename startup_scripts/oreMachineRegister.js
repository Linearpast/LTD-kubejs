//注册矿机
onEvent('block.registry', event => {
    event.create('oregen:ore_machine')
        .material('metal')
        .hardness(5.0)
        .requiresTool(true)
        .randomTick(randomTickEvent => {
            let block = randomTickEvent.block
            let arrSlot = [0, 1, 2, 3, 4, 5, 6, 7, 8]

            //根据配置文件的可生成矿物数量来遍历
            global.canCopyBlock.forEach(canCopyBlockId => {
                if (block.down.id == canCopyBlockId) {
                    let blockUp = block.up

                    //判断矿机上面是投掷器
                    if (blockUp.entity != null && blockUp.id == 'minecraft:dropper') {
                        let allData = blockUp.entityData
                        let itemArr = allData.get('Items')
                        let arr = { count: [], slot: [], id: [] }
                        let isAdd = false

                        //把投掷器的 Items 分开存入变量
                        for (let i = 0; i < itemArr.length; i++) {
                            let elementItem = itemArr[i];
                            arr.count[i] = elementItem.getByte('Count')
                            arr.slot[i] = elementItem.getByte('Slot')
                            arr.id[i] = elementItem.id
                        }

                        //全Slot - Items Slot，得到没有物品的slot数组
                        let emptySlotArr = arrSlot.filter(el => !~arr.slot.indexOf(el));
                        let addSlot = emptySlotArr.length > 0 ? emptySlotArr[0] : -1;
                        for (let i = 0; i < arr.slot.length; i++) {
                            if (arr.id[i] == canCopyBlockId && arr.count[i] + global.randomTickOreIncrease <= 64) {
                                block.level.server.runCommandSilent(`/item replace block ${blockUp.x} ${blockUp.y} ${blockUp.z} container.${arr.slot[i]} with ${canCopyBlockId} ${arr.count[i] + global.randomTickOreIncrease}`)
                                isAdd = true
                                break
                            }
                        }
                        //若还有空位且还未增加过矿物
                        if (!isAdd && addSlot != -1) {
                            block.level.server.runCommandSilent(`/item replace block ${blockUp.x} ${blockUp.y} ${blockUp.z} container.${addSlot} with ${canCopyBlockId} ${global.randomTickOreIncrease}`)
                        }
                    }
                    return null
                }
            });
        })
})