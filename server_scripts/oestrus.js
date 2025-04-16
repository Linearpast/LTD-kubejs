//ban掉热力炼金放大组件对发情的加强（仅注射器）
onEvent('item.entity_interact', event => {
    if (!augmentApplyToOestru && event.getHand().toString() == 'MAIN_HAND') {
        if (event.target.isPlayer()) {
            let player = event.player;
            let mainHandItem = player.mainHandItem;

            //if 手持注射器
            if (mainHandItem.id == 'thermal:potion_infuser') {
                let potion = null
                let properties = null
                if (mainHandItem.nbt != null &&
                    mainHandItem.nbt.get('Fluid') != null &&
                    mainHandItem.nbt.get('Fluid').get('Tag') != null &&
                    mainHandItem.nbt.get('Fluid').get('Tag').get('Potion') != null &&
                    mainHandItem.nbt.get('Properties') != null
                ) {
                    potion = mainHandItem.nbt.get('Fluid').get('Tag').get('Potion')
                    properties = mainHandItem.nbt.get('Properties')
                }

                //是否装了炼金放大组件
                if (potion != null && properties != null && properties.getFloat('PotionAmp') != 0 && potion.toString().includes('oestrus')) {
                    player.setStatusMessage(Text.red('炼金放大组件无法作用于发情效果'))
                    event.cancel()
                }
            }
        }
    }
})