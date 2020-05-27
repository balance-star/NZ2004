
const utils = {
    /**
     * 获取元素最终样式值
     * @param obj       <DOMObject>     要获取属性的元素对象 
     * @param attr      <string>        样式名称
     * @return          <string>        获取到的样式值
     */
    // 对象封装，以下都是

    getStyle : function  (obj, attr) {
        if(obj.currentStyle) {
            // 判断obj有currentStyle这个属性，说明使用的是IE属性
            return obj.currentStyle[attr]
        }else {
            // obj没有currentStyle这个属性，说明使用的不是IE属性
            return getComputedStyle(obj,false)[attr]
        }
    },


    /**
    * 添加事件监听
    * @param ele           <DOMObject>     添加事件的DOM元素
    * @param type          <strting>       事件类型(不带on)
    * @param fn            <function>      事件处理函数
    * @param [isCapture]   <boolean>       可选函数,是否捕获,true代表捕获,false代表冒泡,默认为false
    */

    on : function (ele,type,fn,isCapture) {
        if (isCapture === undefined) isCapture = false
        if (ele.attachEvent) {
            // IE
            ele.attachEvent('on' + type, fn)
        }else {
            ele.addEventListener(type , fn, isCapture)
        }
    },


    /**
    * 移除事件监听
    * @param ele           <DOMObject>     添加事件的DOM元素
    * @param type          <strting>       事件类型(不带on)
    * @param fn            <function>      事件处理函数
    * @param [isCapture]   <boolean>       可选函数,是否捕获,true代表捕获,false代表冒泡,默认为false
    */

    off : function (ele ,type ,fn ,isCapture) {
        //  如果参数没有传,默认值为false
        if (isCapture === undefined) isCapture = false
        if(ele.detachEvent) {
            // IE
            ele.attachEvent('on' + type, fn)
        } else {
            ele.removeEventListener(type , fn, isCapture)
        }
    },
    /**
     * 封装匀速运动
     * @param ele        <DOMObject>        要运动的元素对象
     * @param attr       <string>           运动的属性名
     * @param end        <number>           运动的终点，单位px
     * @param duration   <number>           运动总时长，单位ms
     * @param fn         <function>         回调函数，在运动结束以后执行的函数
     */

     move: function (ele, attr, end, duration,fn) {
        //  获取起点
        var start = parseInt(this.getStyle(ele, attr))
        // 算总距离
        var distance = end - start

        // var speed = distance / duration // 速度单位是px/ms

        // 先计算步从起点到终点的总步数
        var steps = Math.floor(duration / 30)

        // 计算速度 :每一步要走的像素值 px/步 px/30ms
        var speed = distance / steps 

        var n = 0 // 记录当前是第几步
        // 开启一个新的定时器之前先把上一次的清除掉
        clearInterval(ele.timer)
        ele.timer = setInterval(function () {
            n++
            ele.style[attr] = start + n * speed + 'px'

            // 用步数判断终点
            if (n == steps) {
                clearInterval(ele.timer)
                // 固定在终点的位置
                ele.style[attr] = end + 'px'
                // 运动结束以后调用传过来的这个函数

                // 逻辑段路，这里如果fn无效，会隐式转换为false，逻辑短路，不会执行fn（）
                // 一般回调函数都会这么写
                
                fn && fn()
            }
        }, 30)


     },

    /**
     * 封装一个缓冲运动,咱们的缓冲算法里速度跟时间没有关系的，所以这里不需要传时间，时间就是根据距离来自动
     * @param ele        <DOMObject>        要运动的元素对象
     * @param attr       <string>           运动的属性名
     * @param end        <number>           运动的终点，单位px
     * @param fn         <function>         回调函数，在运动结束以后执行的函数
     */
    move1: function (ele, attr, end, fn) {
        // 开启定时器之前把旧的先清除掉
        clearInterval(ele.timer)
        var start = parseInt(this.getStyle(ele, attr))
        ele.timer = setInterval(function () {
            // 计算剩下距离
           
            var distance = parseInt(end) - start

            // 计算当前这一步的速度，是剩下距离的十分之一
            // speed就是当前这一步要往前走的距离
            // 如果运动是负方向，diatance小于0，speed也小于0，剩下最后几步负零点几的时候如果向上取整直接得0了，就
            var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance/10)

            // 走完一步以后start的往前加
            start += speed
            // 把更新之后的start赋值给属性
            ele.style[attr] = start + 'px'

            // 判断终点
            // 由于缓冲运动最后是一像素一像素运动的，所以他一定能刚好达到终点
            if(start === end ) {
                clearInterval(ele.timer)
                fn && fn()
            }
            

        }, 30)
    }

}