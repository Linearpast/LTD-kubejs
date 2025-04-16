//食物奖励
onEvent('item.food_eaten', event => {
    let player = event.player
    let foodLevel = event.item.itemStack.getFoodProperties(player.minecraftEntity)

    //距离上次获得奖励的时间（冷却）
    if (player.persistentData.getLong('lastEatAward') == null ||
        Date.now() - player.persistentData.getLong('lastEatAward') > eatAwardCooldown * 1000) {
        //优质食物才能获得奖励
        if (foodLevel.nutrition > 7 && foodLevel.saturationModifier > 0.75) {
            let random = Math.floor(Math.random() * (weightSum - 1)) + 1
            let award = null;
            //计算随机数落在的权重区间
            for (let i = 0; i < eatAwardList.length; i++) {
                let element = eatAwardList[i];
                random -= element.weight
                if (random <= 0) {
                    award = eatAwardList[i]
                    break
                }
            }

            //给予奖励
            player.setStatusMessage(Text.green(`-美味的食物！你获得了来自食神的馈赠-`))
            if (award == null) {
                player.give('minecraft:cake')
            } else if (award.id == null && award.item != null) {
                player.give(award.item)
            } else if (award.id != null && award.item == null) {
                player.give(Item.of(award.id, award.number))
            } else {
                console.log("服务端配置错误");
            }
            player.persistentData.putLong('lastEatAward', Date.now())
        }
    }
})