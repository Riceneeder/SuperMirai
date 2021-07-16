const path = require('path');
const pluginlist = require('../tools/GetPluginsList');
const fork = require('child_process').fork;
const list = pluginlist();

var plugins = {},
    text_plugins = {},
    num_Of_text_plug = 0,
    image_plugins = {},
    num_Of_image_plug = 0;

for (let index = 0; index < list.length; index++) {
    plugins[index] = list[index];
}
// console.log(plugins);

for (let index = 0; index < list.length; index++) {
    plugins[index] = fork(`${path.resolve(__dirname,'../plugins')}/${list[index]}`);
    plugins[index].on('message', data => {
        switch (true) {
            case data == "text":
                text_plugins[num_Of_text_plug] = list[index];
                num_Of_text_plug++;
                break;
            case data == "image":
                image_plugins[num_Of_image_plug] = list[index];
                num_Of_image_plug++
                break;
        }
    });
    plugins[index].send('注册');
}

setTimeout(() => {
    console.log('[plugin_contronller] ===================插件注册完毕===============');
    // console.log(text_plugins);
    // console.log(image_plugins);
}, 3000);

process.on('message', data => {
    if (data.text.haveMessage && num_Of_text_plug > 0) {
        var text_plugins_runtime = {};
        for (let i = 0; i < num_Of_text_plug; i++) {
            text_plugins_runtime[i] = fork(`${path.resolve(__dirname,'../plugins')}/${text_plugins[i]}`);
            text_plugins_runtime[i].on('message', data => {
                process.send(data);
            });
            // text_plugins_runtime[i].on('exit', (code) => {
            //     console.log(`text exit with code ${code}`);
            // })
            text_plugins_runtime[i].send(data);
        }
    }
    if (data.image.haveMessage && num_Of_image_plug > 0) {
        var image_plugins_runtime = {};
        for (let i = 0; i < num_Of_image_plug; i++) {
            image_plugins_runtime[i] = fork(`${path.resolve(__dirname,'../plugins')}/${image_plugins[i]}`);
            image_plugins_runtime[i].on('message', data => {
                process.send(data);
            });
            // image_plugins_runtime[i].on('exit', (code) => {
            //     console.log(`image exit with code ${code}`);
            // })
            image_plugins_runtime[i].send(data);
        }
    }
})