let translatable = java('net.minecraft.network.chat.TranslatableComponent')

//物品提示修改
onEvent('item.tooltip', event => {
    //矿机提示
    event.add('oregen:ore_machine', [
        Text.blue('在其下方放置').append(Text.red('原矿')),
        Text.blue('在其上方放置').append(Text.red('投掷器')),
        Text.green('空手右键可查看可使用矿物id')
    ])

    //极光新月提示
    event.addAdvanced('oestrus:aurora_crescent',
        (item, advanced, text) => {
            text.clear()
            text.add(Text.lightPurple('极光新月').bold())
            text.add(Text.darkPurple('不知何时何处升起的新月……'))
            text.add(Text.darkPurple('亦不知何时何处渲开的极光……'))
            text.add(Text.white('————————————————————'))
            text.add(Text.red('时间静止了，这一刻你和极光新月共同见证'))
            text.add('')
            text.add(Text.gray('不知藏了谁的泪水').italic())
            text.add('')
            text.add(Text.darkGray('“极目惊光霓霞雨，沏雪蚀心月上钩”').italic())
        })
})