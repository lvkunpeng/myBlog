### 使用VUE2.0构建的个人博客系统
- VUE2.0上线之后，对原有的技术博客进行了重建。将博客的阅读页与博客编辑管理页完全分离开来，方便日常的管理维护。
- 项目的布局以及风格都采用了vue官网的风格，后台采用node构建，利用了express快速搭建。并采用了RESTful风格，数据库使用mongodb操作。
- 为了实现页面与代码同步刷新，并且可以使用es6写法书写。使用了babel转义，并支持热插拔，为了实现快速开发的需求以及响应式布局，使用了bootstrap进行布局。引入了全局样式以及封装组件。 生产环境中使用了webpack打包工具减少http请求，提升响应速度。 
- 使用了vue-cls快速搭建环境
- 平日书写经常使用makeDown语法快速构建。本项目中引入了marked模块以及highlight语法高亮，来实现编辑端的编写以及用户端的展示都可以使用makeDown进行。
- 项目部署在腾讯云的linux服务器上(ubuntu系统)，使用pm2进行托管。
> 项目博客端地址：http://www.lvkunpeng.club:90/#/   
> 后台管理端地址：http://www.lvkunpeng.club:90/admin/
