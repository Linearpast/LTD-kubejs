//喂食满饱食度的玩家
onEvent('item.entity_interact', event => {
    if (event.getHand().toString() == 'MAIN_HAND') {
        if (event.target.isPlayer()) {
            let target = event.target.player;
            let player = event.player;
            let mainHandItem = player.mainHandItem;

            /**
             * if 为没有被禁止喂食的食物
             * else if 是被禁止的食物
             */
            if (mainHandItem.item.getFoodProperties() != null &&
                cannotFeedFood.indexOf(mainHandItem.id) == -1) {
                //玩家不需要食物，即满饱食
                if (!target.needsFood()) {
                    target.eat(mainHandItem)
                    if (target.saturation > 20) {
                        target.saturation = 20
                    }
                }
            } else if (mainHandItem.item.getFoodProperties() != null &&
                cannotFeedFood.indexOf(mainHandItem.id) != -1) {
                player.tell(Text.red('太卑劣了……'))
                target.tell(Text.red('差点被卑劣的人喂下了来历不明的东西，但是TA没得逞'))
            }
        }
    }
})