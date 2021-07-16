const {
    Message
} = require('mirai-js');
const log = require('../tools/Log');
const info = new log();
const event = require('events');
const f = require('path').basename
var final_message = {};
var listenser = new event();
process.on('message', data => {
    var service = "text";
    listenser.on('exit', () => {
        process.exit(0);
    })
    if (data == '注册') {
        process.send(service);
        listenser.emit('exit');
        //=========================================================
    } else if (data.text.data == "测试插件") {

        var youer_message = new Message().addText('1');

        //=========================================================
        data.from == "group" ? (final_message.group = data.groupId) : (final_message.friend = data.friendId);
        final_message.message = youer_message.messageChain;
        info.Definition(`插件< ${f(__filename,'.js')} >`, '<<<<<<信息处理完毕,交还至app主体', 'grey', 'grey');
        process.send(final_message);
        listenser.emit('exit');
    } else {
        listenser.emit('exit');
    }
})