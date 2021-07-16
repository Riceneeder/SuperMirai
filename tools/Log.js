var time = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;


setInterval(() => {
    time = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
}, 1000)


var colors = {
    'default': '\x1B[0m', //重置颜色
    'bright': '\x1B[1m', // 亮色
    'grey': '\x1B[2m', // 灰色
    'italic': '\x1B[3m', // 斜体
    'underline': '\x1B[4m', // 下划线
    'reverse': '\x1B[7m', // 反向
    'hidden': '\x1B[8m', // 隐藏
    'black': '\x1B[30m', // 黑色
    'red': '\x1B[31m', // 红色
    'green': '\x1B[32m', // 绿色
    'yellow': '\x1B[33m', // 黄色
    'blue': '\x1B[34m', // 蓝色
    'magenta': '\x1B[35m', // 品红
    'cyan': '\x1B[36m', // 青色
    'white': '\x1B[37m', // 白色
    'blackBG': '\x1B[40m', // 背景色为黑色
    'redBG': '\x1B[41m', // 背景色为红色
    'greenBG': '\x1B[42m', // 背景色为绿色
    'yellowBG': '\x1B[43m', // 背景色为黄色
    'blueBG': '\x1B[44m', // 背景色为蓝色
    'magentaBG': '\x1B[45m', // 背景色为品红
    'cyanBG': '\x1B[46m', // 背景色为青色
    'whiteBG': '\x1B[47m' // 背景色为白色
}


/**
 * 彩色输出控制台信息
 * 
 */
class Log {
    /**
     * @description 普通信息输出
     * @param {*} data 需要输出的信息
     */
    info(data) {
        console.log(`${colors.green}[Infor ${time}]:${colors.default}${colors.white}${data}${colors.default}`);
    }

    /**
     *错误信息输出
     * @param {*} data 输出内容 
     */
    err(data) {
        console.log(`${colors.red}[Error ${time}]:${colors.default}${colors.white}${data}${colors.default}`);
    }

    /**
     * 警告信息输出
     * @param {*} data 输出内容 
     */
    warn(data) {
        console.log(`${colors.yellow}[Warnign ${time}]:${colors.default}${colors.white}${data}${colors.default}`);
    }

    /**
     * 自定义输出形式
     * @param {*} head  输出标识 
     * @param {*} data  输出内容
     * @param {*} head_color    标识颜色[可选]
     * @param {*} data_color    内容颜色[可选]
     * @颜色  'bright' 亮色'grey' 	灰色'italic' 	斜体'underline' 	下划线'reverse' 	反向'hidden' 	隐藏'black' 	黑色'red' 	红色'green' 	绿色'yellow' 	黄色'blue' 	蓝色'magenta' 	品红'cyan' 	青色'white' 	白色'blackBG' 	背景色为黑色'redBG' 	背景色为红色'greenBG' 	背景色为绿色'yellowBG' 	背景色为黄色'blueBG' 	背景色为蓝色'magentaBG' 	背景色为品红'cyanBG' 	背景色为青色'whiteBG' 	背景色为白色   
     *   */
    Definition(head, data, head_color = colors.default, data_color = colors.default) {
        console.log(`${colors[head_color]}[${head} ${time}]:${colors.default}${colors[data_color]}${data}${colors.default}`);

    }
}

module.exports = Log;


// const log = new Log();

// log.info('打印信息');
// log.err('打印错误');
// log.warn('打印警告');
// log.Definition('自定义头','输出输出输出输出','cyan','magenta');
// console.log(time);