const log = require('./tools/Log');
const info = new log();
const fork = require('child_process').fork;
const sp = require('child_process').spawn;
const EventEmitter = require('events');
//===========添加事件监听器监听mcl启动情况=============
const listenser = new EventEmitter();
//===========启动mcl===============================
var mcl = sp('./src/mcl.sh');
info.info('启动mcl')
mcl.stdout.on('data', data => {
    if (data.toString().indexOf('Closing input service') != -1) {
        info.info('<<<<<');
        listenser.emit('start');
    }
});
//===========判断mcl是否启动========================

listenser.on('start', () => {
    info.info('mcl start !!!!!!');
    info.info('启动app主体');
    var app;
    var plugin_controller;

    setTimeout(() => {
        plugin_controller = fork('./src/plugin_controller.js');
        app = fork('./src/app.js');
        app.on('message', data => {
            if (data?.init) {

            } else {
                //======数据解析整理===================
                var message_to_plugin = {
                    "from": data.from,
                    "text": {
                        "haveMessage": false,
                        "data": null
                    },
                    "image": {
                        "haveMessage": false,
                        "data": null
                    }
                };
                if (data?.Plain[0]?.type) {
                    var text_message = (data.from == "group") ? {
                        "data": data.Plain[0].text,
                    } : {
                        "data": data.Plain[0].text,
                    };
                    data.from == "group" ? message_to_plugin.groupId = data.groupId : message_to_plugin.friendId = data.friendId;
                    message_to_plugin.messageId = data.messageId;
                    message_to_plugin.text.haveMessage = true;
                    message_to_plugin.text.data = text_message.data;
                };
                if (data?.Image[0]?.type) {
                    var image_message = (data.from == "group") ? {
                        "data": {
                            "imageId": data.Image[0].imageId,
                            "imageUrl": data.Image[0].url
                        },
                    } : {
                        "data": {
                            "imageId": data.Image[0].imageId,
                            "imageUrl": data.Image[0].url
                        },
                    };
                    data.from == "group" ? message_to_plugin.groupId = data.groupId : message_to_plugin.friendId = data.friendId;
                    message_to_plugin.messageId = data.messageId;
                    message_to_plugin.image.haveMessage = true;
                    message_to_plugin.image.data = image_message.data;
                }
                // console.log('index : 接受到来自app的消息 message_to_plugin');
                // console.log('index : 消息转发到插件管理器');
                //========================================================>
                plugin_controller.send(message_to_plugin);
            }
        });
        app.on('error', data => console.log(data));
        plugin_controller.on('message', data => {
            app.send(data);
        })
    }, 4000);
});