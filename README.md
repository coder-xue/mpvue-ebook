# mpvue-imooc-ebook

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# mpvue小程序学习踩坑记录
①安装sass-loader （npm i -D sass-loader node-sass）会有版本问题
解决：在package.json文件中，指定sass-loader的版本为7.1.0，删除node_modules文件，然后重新cnpm install

②node_modules 中的类库最终被打包在了common文件下的vendor.js文件中，所引入的组件是无法直接访问的，通过修改构建配置，在webpack.base.config.js文件中加入以下代码即可。

if (/^wx$/.test(PLATFORM)) {
  baseWebpackConfig = merge(baseWebpackConfig, {
    plugins: [
      new CopyWebpackPlugin([{
        from: resolve('node_modules/vant-weapp/dist'),
        to: resolve('dist/wx/vant-weapp/dist'),
        ignore: ['.*']
      }])
    ]
  })
}

③引入一个新组件的时候，需要重新运行 npm run dev，否则wxml会无法解析


④小程序中原生图片标签是image,但是使用了mpvue后，使用图片标签是img，依然可用小程序原生的图片属性，会解析转化为image标签


⑤mpvue的源码，主要支持以下这些标签，我们通常开发用不到这么多，记住一些常用的即可：

var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);
也就是说实际开发过程中写 img 和写 image 都是可以的，mpvue 都可以正常识别


⑥在小程序中, 在template中使用 `` 是不会被识别的，所以不能在template模板中用 ``


⑦直接在组件上写样式不会生效
