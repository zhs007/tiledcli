# ZExpress
express框架是nodejs下最流行的web框架，ZExpress是在express进一步封装的一套web框架。

ZExpress其实类似express-generator，会生成一套空的项目。

我们加了什么
---
* 我们将服务器返回统一处理了，支持4种通用返回，分别是空返回、页面跳转、ajax的json返回和普通的jade返回。
* 我们对session做了进一步的封装。
* 我们对jade做了缓存优化。
* 我们对渲染参数做了统一封装。
* 我们进一步规范了模块化开发规范。

快速安装
---
直接npm全局安装即可。

```
npm install zexpress -g
```

如何使用
---
创建项目需要一个js的配置文件。

```
// 项目名
name = 'SlotsAdmin';

// port
port = 3600;

// 项目标题
title = '管理后台';

// 数据库配置
dbSlots = {host: '127.0.0.1', user: 'slots', password: 'slots123', database: 'slots3'};
dbGamelog = {host: '127.0.0.1', user: 'slots', password: 'slots123', database: 'slots3'};
dbmgr = {slots3: dbSlots, gamelog: dbGamelog};

// 路由配置
routerIndex = {name: 'Index', url: '/', urlroot: '/', http: 'GET', type: 'simple', needlogin: 'true'};
routerLogin = {name: 'Login', url: '/', urlroot: '/login', http: 'GET', type: 'simple', needlogin: 'true'};

acLogin = {name: 'Login', reqparam: ['name', 'password']};
acLogout = {name: 'Logout'};
routerAdminCtrl = {name: 'AdminCtrl', url: '/', urlroot: '/adminctrl', type: 'ctrl', lstctrl: [
    acLogin,
    acLogout
]};

mcAddChild = {name: 'AddChild', reqparam: ['name', 'password', 'adminkey', 'gems']};
mcChgPassword = {name: 'ChgPassword', reqparam: ['pid', 'password']};
mcCleanChild = {name: 'CleanChild', reqparam: ['pid']};
mcCleanPlayer = {name: 'CleanPlayer', reqparam: ['pid', 'childid']};
mcCleanRoom = {name: 'CleanRoom', reqparam: ['roomid']};
mcProcExchg = {name: 'ProcExchg', reqparam: ['exchgid', 'proc']};
mcResetRoom = {name: 'ResetRoom', reqparam: ['roomid']};
mcUpdChild = {name: 'UpdChild', reqparam: ['pid', 'password', 'adminkey', 'gems']};
mcUpdNotice = {name: 'UpdNotice', reqparam: ['notice']};
mcUpdRoom = {name: 'UpdRoom', reqparam: ['roomid', 'minper', 'maxper', 'playerminper', 'playermaxper']};
mcUpdRoomEx = {name: 'UpdRoomEx', reqparam: ['roomid', 'curdiff']};
routerMainCtrl = {name: 'MainCtrl', url: '/', urlroot: '/mainctrl', type: 'ctrl', lstctrl: [
    mcAddChild,
    mcChgPassword,
    mcCleanChild,
    mcCleanPlayer,
    mcCleanRoom,
    mcProcExchg,
    mcResetRoom,
    mcUpdChild,
    mcUpdNotice,
    mcUpdRoom,
    mcUpdRoomEx
]};

modEdtChild = {name: 'EdtChild'};
modEdtRoom = {name: 'EdtRoom'};
modEdtRoomEx = {name: 'EdtRoomEx'};
modLeftMenu = {name: 'LeftMenu'};
modSysNotice = {name: 'SysNotice'};
modTotal = {name: 'Total'};
modViewChild = {name: 'ViewChild'};
modViewExchg = {name: 'ViewExchg'};
modViewPlayer = {name: 'ViewPlayer'};
modViewRoom = {name: 'ViewRoom'};
routerMain = {name: 'Main', url: ['/', '/:leftmenu/'], urlroot: '/main', type: 'module', needlogin: 'true', lstmodule: [
    modEdtChild,
    modEdtRoom,
    modEdtRoomEx,
    modLeftMenu,
    modSysNotice,
    modTotal,
    modViewChild,
    modViewExchg,
    modViewPlayer,
    modViewRoom
]};

router = [routerIndex, routerAdminCtrl, routerMainCtrl, routerLogin, routerMain];

// 导出
projparam = {
    projname: name,
    port: port,
    title: title,
    dbmgr: dbmgr,
    router: router
};
```

这个配置文件里，配置了数据库、路由（基本页面、ajax请求、模块混合几种），最后，我们通过下面的指令生成项目

```
zrestify sample.js
cd slotsadmin
npm install
```

就会在当前目录下生成一个名为 **slotsadmin** 的项目，并自动下载依赖库。

如果我们要启动服务，可以使用下面的指令：

```
node bin/slotsadmin.js
```


使用到的第三方库
---

* 使用 **[yargs](https://github.com/bcoe/yargs)** 模块简化命令行工具的开发。
* 使用 **[zHandlebars](https://github.com/zhs007/zhandlebars)** 模板做项目生成模板。