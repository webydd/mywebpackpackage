
require('./css/index.css');
var demo1 = require('./js/demo1.js');
var demo2 = require('./js/demo2.js');

demo1.init();
demo2.init();

var oImg = new Image();
oImg.src = require('./img/1.jpg');
document.body.appendChild(oImg);

console.log($('.demo1').height());/*jquery测试*/
