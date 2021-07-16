const Log = require('../tools/Log');
const info = new Log();
const {
    Bot,
    Middleware
} = require('mirai-js');
const {
    baseUrl,
    authKey,
    Bot_config: {
        QQnumber,
        QQpassword,
        protocol
    },
    group_Filter
} = require('../config.json');
const bot = new Bot();


//==================================//======================//===================================

(async () => {

    const isLoggedIn = await Bot.isBotLoggedIn({
        baseUrl,
        authKey,
        qq: QQnumber
    });

    if (!isLoggedIn) {

        info.info(`QQ: ${QQnumber} 即将登录`);
        info.info('尝试登录 ==>');

        try {
            const logMessage = await Bot.sendCommand({
                baseUrl,
                authKey,
                command: '/login',
                args: [QQnumber, QQpassword, protocol]
            });
            if (logMessage) {
                info.info(`QQ ${QQnumber} 登录成功!`);
            } else {
                throw '出错了 检查一下配置文件 @config.json'
            }
        } catch (err) {
            info.err(err);
        }

    } else {

        info.info(`QQ ${QQnumber} 登录成功!`);

    }

    info.info('打开消息接收通道 ==>')

    await bot.open({
        baseUrl,
        authKey,
        qq: QQnumber
    });

    info.info('通道打开');
    process.send({
        init: true
    });

    bot.on('GroupMessage', new Middleware()
        .groupFilter(group_Filter)
        .messageProcessor(['Plain', 'Image'])
        .use(async (data, next) => {
            data.classified.sender_memberName = data.sender.memberName;
            data.classified.sender_group = data.sender.group.name;
            data.classified.groupId = data.sender.group.id;
            data.classified.messageId = data?.messageChain[0].id;
            data.classified.from = "group";
            next();
        })
        .done(async data => {
            var final_data = data.classified;
            info.Definition('Bot', `群消息==>${final_data.sender_group}==>${final_data.sender_memberName}==>文字:${final_data.Plain[0]?.text} 图片${final_data.Image[0]?.imageId}`, 'blue', 'blue');
            process.send(final_data);
        }));



    bot.on('FriendMessage', new Middleware()
        .messageProcessor(['Plain', 'Image'])
        .use(async (data, next) => {
            data.classified.senderName = data.sender.nickname;
            data.classified.friendId = data.sender.id;
            data.classified.messageId = data?.messageChain[0].id;
            data.classified.from = "friend";
            next();
        })
        .done(async data => {
            var final_data = data.classified;
            info.Definition('Bot', `好友消息==>${final_data.senderName}==>文字:${final_data.Plain[0]?.text} 图片:${final_data.Image[0]?.imageId}`, 'blue', 'blue');
            process.send(final_data);
        })
    );

    process.on('message', async data => {
        // console.log('app : 接受到index的消息,尝试发送');
        // console.log(data);
        await bot.sendMessage(data);
        info.Definition('Bot', '发送成功', 'blue', 'blue');
        // await bot.sendMessage({
        //     group:data.group,
        //     message:data.message
        // })
        // console.log('app : 已发送');
    })

})();