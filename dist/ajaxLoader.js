/**
 * LoadingBar: v1.0
 * Author: sangshaofeng
 * Github: https://github.com/sangshaofeng
 */

!(function (win) {

  win.AjaxLoader = function AjaxLoader (configs) {

    var defaultColor = '#2d8cf0'
    if (!arguments.length || JSON.stringify(configs) === '{}') {
      this.color = defaultColor;
      this.height = 2;
    } else {
      this.color = configs.color || defaultColor;
      this.height = Math.min(configs.height || 2, 5);
    }
    this.appendDOM();
    this.loadingBar = document.querySelector('.loading-bar-inner');
    this.loadingBarStyle = this.loadingBar.style;
    this.timer = null;
  }
  
  AjaxLoader.prototype = {
  
    appendDOM: function () {
      var body = document.getElementsByTagName('body')[0];
      var div1 = document.createElement('div');
      var div2 = document.createElement('div');
      div1.setAttribute('class', 'loading-bar');
      div1.setAttribute('style', 'width: 100%; position: fixed; top: 0; left: 0; z-index: 9999;');
      div2.setAttribute('class', 'loading-bar-inner');
      div2.setAttribute('style', 'width: 0%; height: '+ this.height +'px; background-color: '+ this.color +'; transition: all .2s linear;')
      div1.appendChild(div2);
      body.insertBefore(div1, body.childNodes[0]);
    },
  
    start: function () {
      var me = this;
      me.clearTimer();
      this.loadingBarStyle.backgroundColor = this.color;
      me.loadingBarStyle.width = '0%';
      me.loadingBarStyle.display = 'block';
      this.timer = setInterval(function () {
        var loadingBarWidth = me.loadingBarStyle.width;
        if (parseInt(loadingBarWidth) > 85) {
          me.clearTimer();
        }
        var randomNum = Math.floor(Math.random() * 5 + 1);
        me.loadingBarStyle.width = parseInt(loadingBarWidth) + randomNum + '%';
      }, 200)
    },
  
    finish: function () {
      var me = this;
      this.clearTimer();
      if (this.loadingBarStyle.display === 'none') {
        this.loadingBarStyle.display = 'block';
      }
      this.loadingBarStyle.width = '100%';
      if (this.loadingBarStyle.width === '100%') {
        setTimeout(function () {
          me.loadingBarStyle.display = 'none';
        }, 500)
      }
    },
  
    error: function (error) {
      if (!arguments.length || JSON.stringify(error) === '{}') {
        this.loadingBarStyle.backgroundColor = '#ed4014'
      } else {
        this.loadingBarStyle.backgroundColor = error.color
      }
      this.finish();
    },
  
    clearTimer: function () {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  }

}(window))


if(typeof exports === 'object' && typeof module === 'object') {
  module.exports = AjaxLoader; 
}