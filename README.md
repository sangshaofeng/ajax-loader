# ajax-loader
ajax请求加载中进度条，使用方法如下：

引入js文件
```html
<script src="../dist/ajaxLoader.js"></script>
```
初始化（只需在需要使用的作用域内初始化一次即可）
```javascript
var ajaxLoader = new AjaxLoader();
var ajaxLoader = new AjaxLoader({
  height: 4,
  color: green
})
```
ajax请求
```javascript
function getData () {
    ajaxLoader.start();
    $.ajax({
      url: '/api/xxx/xxx',
      type: 'get',
      dataType: 'json',
      success: function (res) {
        ajaxLoader.finish();
      },
      error: function () {
        ajaxLoader.error({color: '#a0a0a0'});
      }
    })
  }
```
参数
```css
color: 给定一个色值
height: 默认2px, 2-5px之间
调用error时也能传入一个color值
```

