<div align="center">
<img width="160" src="https://cdn.jsdelivr.net/gh/mzdluo123/blog_imgs/img/20200531205703.png" alt="logo"></br>
<img width="95" src="https://cdn.jsdelivr.net/gh/mzdluo123/blog_imgs/img/20200531205726.png" alt="title">

----
[Mirai](https://github.com/mamoe/mirai) 是一个在全平台下运行，提供 QQ Android 协议支持的高效率机器人库

图标以及形象由画师<a href = "https://github.com/DazeCake">DazeCake</a>绘制

</div>


### SuperMirai

SuperMirai,在linux上运行在nodejs下的多线程QQ机器人框架,所有消息处理功能全部以子线程的形式运行,适合接触过**mirai-console-loader (MCL)**的仔使用

### 项目目录结构

```
.
├── config.json.template  //修改内容后改为config.json
├── index.js //软件入口
├── lib
│  └── mcl //Mirai控制台
├── package.json 
├── plugins  //功能插件放在这个文件夹
│  ├── image.js //测试插件,处理图片
│  └── text.js  //测试插件,处理文字
├── src 
│  ├── app.js  //与mcl控制台交互
│  ├── mcl.sh  //启动mcl
│  └── plugin_controller.js  //接收消息并调用插件 
└── tools //公共工具文件夹,默认的两个工具勿删
```

### 软件运行流程

![](https://gitee.com/MrVanme/photos/raw/master/supermirai%E8%BF%90%E8%A1%8C%E6%B5%81%E7%A8%8B.png)

### 准备工作

Node.js 12+	Java 11+

> 本项目已经包涵Mirai项目下的**mirai-console-loader (MCL)**和**mirai-api-http**并锁定版本,无须关心除功能实现以外的额外配置

阅读 mirai-js@1 API中的[消息类型 Message](https://mirai-js-drincann.vercel.app/#/v1.x/Message?id=消息类型-message)并学习了解如何生成一个消息链

克隆或下载本项目

```
git clone https://github.com/Riceneeder/SuperMirai.git
//或者
wget https://github.com/Riceneeder/SuperMirai/archive/refs/heads/master.zip
解压
```

------

**注意:**

**1. 如果没有使用过Mirai控制台mcl,请进入项目目录下的``lib/mcl/``目录**

```
sudo chmod +x ./mcl
./mcl
```

此时mcl会在一个终端启动,输入``?``获得帮助,登录你的机器人QQ

```
/login 你的QQ 你的QQ密码
```

登录验证方法详情请查阅[验证码助手](https://txhelper.glitch.me/),推荐下载手机客户端进行验证

登录成功后``Ctrl c``退出mcl,关闭终端

------

**2. 如果以前使用过mcl,请直接将``bots``文件夹复制到``lib/mcl``文件夹下,斌赋予mcl.sh运行权限``sudo chmod + ./mcl``**

### 快速开始

进入项目根目录,修改config.json.template内容并重命名为config.json

运行以下命令

```
npm i
node index //或者运行 npm run start
```

如果没有报错的话,SuperMirai应该就顺利跑起来并载入了两个测试插件

尝试向你的机器人QQ或机器人QQ监听的群发送文字``测试插件``,机器人会回复``1``,发送这个熊猫笑的表情(如果你有的话🤡):    ![](https://gitee.com/MrVanme/photos/raw/master/39fafdafc931d89d.jpg)   ,机器人会回复``2``

### 开发属于自己的功能插件

文档(还没写,其实很简单,可以看看自带的两个测试插件)

### 鸣谢

@[Mirai](https://github.com/mamoe/mirai) 

@[Drincann](https://github.com/Drincann)的项目:[Mirai-js](https://github.com/drinkal/Mirai-js)

