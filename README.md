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
1. 安装sass-loader （npm i -D sass-loader node-sass）会有版本问题
解决：在package.json文件中，指定sass-loader的版本为7.1.0，删除node_modules文件，然后重新cnpm install

2. node_modules 中的类库最终被打包在了common文件下的vendor.js文件中，所引入的组件是无法直接访问的，通过修改构建配置，在webpack.base.config.js文件中加入以下代码即可。

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

3. 引入一个新组件的时候，需要重新运行 npm run dev，否则wxml会无法解析


4. 小程序中原生图片标签是image,但是使用了mpvue后，使用图片标签是img，依然可用小程序原生的图片属性，会解析转化为image标签


5. mpvue的源码，主要支持以下这些标签，我们通常开发用不到这么多，记住一些常用的即可：

var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);
也就是说实际开发过程中写 img 和写 image 都是可以的，mpvue 都可以正常识别


6. 在小程序中, 在template中使用 反引号 `` 是不会被识别的，所以不能在template模板中用 ``


7. 直接在组件上写样式不会生效

8. 禁用eslint    在scritp标签顶部加入以下代码    /* eslint-disable */

9. 一个组件中导入了某个对象，不能直接在template模板中使用该对象，会报错，可以在computed中定义个方法，方法里面直接返回这个对象，这样就可以在template模板中通过computed的方法去调用了


10. created 之前会完成 props、methods、data、computed 和 watch 五大属性的解析；

created 之后 mpvue 会初始化 App 和 Page 对象，并调用小程序的钩子函数（如 onShow、onReady 等），此时界面已完成渲染；

App 和 Page 对象初始化完毕后，mpvue 会调用 beforeMount 之后开始对状态的更新（如更新 data 中的值等）；

状态更新完毕后，mpvue 会调用 page.setData 对界面进行再次更新，之后 mpvue 会调用 mounted 钩子函数，此时小程序渲染完毕。

所以 created 之后调用接口通常不会有问题，但是最佳时机应该是 mounted，因为此时小程序已经完成全部的渲染工作。如果小程序渲染速度较慢，而 created 中接口已经返回数据并开始更新页面，是会引发报错的。


11.在新添加了路由后，需要重新 npm run dev


12.页面配置的json文件必须与js文件同名，否则配置不会生效


13. input框的focus聚焦效果只有在真机上才能看出效果


14.在mpvue.showmodal({ })方法中，不能使用this，这里的this指向的不是vue实例,应先在方法外部把ths赋值给一个变量缓存。


15.tabBar的问题：pages数组的第一项必须是tabBar的list数组的一员,否则不会显示tabBar。


16.小程序页面卸载的时候，vue不会执行beforeDestroy和destroyed函数，也就是说vue实例并不会销毁，只会执行小程序的onUnload生命周期函数，小程序的page实例会被销毁掉，vue内部的状态会被保存。解决方法：小程序加载页面的时候初始化data里面的数据。
	onLoad() {
		Object.assign(this.$data, this.$options.data())
	}


17.通过back的方式返回上一级页面，上一级页面不会重新调用mounted（）方法，但是会再次调用onShow(）方法


18.在template模板中不能直接用$store取值,可以通过computed计算属性来获得$store的值


19.小程序的生命周期函数只能在vue实例绑定的根组件中起作用，在其余子组件中不会起作用。（表述可能不太准确）
