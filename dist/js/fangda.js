class List {
    constructor () {
      // 找元素
      this.container = document.querySelector('#shopping')
      this.box = document.querySelector('#box')
      this.girl = document.querySelector('#girl')
      this.span = this.box.querySelector('span')
      this.imgList = document.querySelector('#imgList').children
      this.priceList = document.querySelector('#priceList').children
      this.changeNum = document.querySelector('#changeNum input')
      this.priceNum = document.querySelector('#price').querySelector('em')
      this.addBtn = document.querySelector('.addBtn')
      this.subBtn = document.querySelector('.subBtn')
      this.okBtn = document.querySelector('#okBtn')
      this.shopNum = document.querySelector('#shopNum')
      this.shopCart = document.querySelector('#shopCart')
      this.bigBox = document.querySelector('#bigBox')
      this.bigImg = bigBox.querySelector('img')
      this.num = Number(this.changeNum.value)
      
      this.prices = ['699', '599', '399', '388']

      // 调用放大镜
      this.zoom()
      // 绑图片和按钮的关系
      this.changeEvents()
      // 调用增加减少数量
      this.changeqh()
      // 加入购物车

      this.addToCart()




    }
    zoom () {
      this.box.onmouseenter =  () => {
                    
        this.taggle('block')
      }
      this.box.onmouseleave = () => {
                   
        this.taggle('none')

      }
      // 这里函数里并没有操作box 希望this仍然指向外层
      this.box.onmousemove = (e) => {
                    
        e = e || window.event
        this.move(e)
      }
      
    }
    taggle (display) {
                    // taggle 切换的意思
      this.span.style.display = display
      this.bigBox.style.display = display
    }
    move (e) {
      var left = e.pageX - this.box.offsetLeft - this.container.offsetLeft - this.span.offsetWidth / 2
      var top = e.pageY - this.box.offsetTop - this.container.offsetTop - this.span.offsetHeight / 2
      if (left < 0) left = 0
      if (top < 0) top = 0
      if (left > this.box.clientWidth - this.span.offsetWidth) left = this.box.clientWidth - this.span.offsetWidth
      if (top > this.box.clientHeight - this.span.offsetHeight) top = this.box.clientHeight - this.span.offsetHeight

      this.span.style.left = left + 'px'
      this.span.style.top = top + 'px'
      // 大图片的坐标是span的坐标的两倍
      this.bigImg.style.left = -2 * left + 'px'
      this.bigImg.style.top = -2 * top + 'px'
    }
    
    changeEvents () {
      Array.from(this.priceList).forEach((price, index) => {
          price.onclick = () => {
            this.changegirl(index)
          }
      })
      Array.from(this.imgList).forEach((img ,index) => {
        img.onmouseenter = () => {
          this.changegirl(index)
        }
      })
    }
    changegirl (n) {
      // 切换商品 
      this.okBtn.disabled = false
        for (var i = 0; i < this.priceList.length; i++) {
          this.priceList[i].classList.remove('ac')
          this.imgList[i].classList.remove('ac')
        }
        this.priceList[n].classList.add('ac')
        this.imgList[n].classList.add('ac')
        // 中图大图都要切换
        this.girl.src = "../images/colthes/" + `${n+1}.png`
        this.bigImg.src = "../images/colthes/" + `${n+1}.png`
        // 价格也要换
        this.priceNum.innerHTML = this.prices[n]
    }

    changeqh () {
      // 增加数量
      this.addBtn.onclick = () => {
        
        this.num++
        // 加了就可以减了
        this.subBtn.disabled = false
        if(this.num >= 4) {
          alert('太多了')
          // 不能在加了
          this.addBtn.disabled = true
          this.num = 4
        }
        this.changeNum.value = this.num
      }
      // 减少数量
      this.subBtn.onclick = () => {
          this.num--
          // 只要减了，就可以加，所以加的按钮就取消禁用
          this.addBtn.disabled = false
          if (this.num < 1) {
            // 最小减到1
            this.num = 1
            this.subBtn.disabled = true
          }
          this.changeNum.value = this.num
        }
    }

    addToCart () {
        // 加入购物车
        this.okBtn.onclick = e => {
          // 计算抛物线上的三个坐标
          // 1、鼠标坐标；2、购物车终点坐标；3、最高点坐标（自己定）
          e = e || window.event
          var x1 = e.clientX,
              y1 = e.clientY,
              x2 = this.shopCart.offsetLeft,
              y2 = this.shopCart.offsetTop,
              x3 = x2 - 200,
              y3 = y2 - 100
          
          // 根据数学公式计算抛物线三个系数（这里不用管，拿来用就行）
          var a = -((y2-y3)*x1 - (x2-x3)*y1 + x2*y3 - x3*y2) / ((x2-x3) * (x1-x2) * (x1-x3));
          var b = ((y2-y3)*x1*x1 + x2*x2*y3 - x3*x3*y2 - (x2*x2 - x3*x3)*y1) / ((x2-x3)*(x1-x2)*(x1-x3));
          var c = ((x2*y3 - x3*y2)*x1*x1 - (x2*x2*y3 - x3*x3*y2)*x1 + (x2*x2*x3 - x2*x3*x3)*y1) / ((x2-x3)*(x1-x2)*(x1-x3));

          // 创建一个div，添加到页面上
          var div = document.createElement('div')
          div.className = 'active'
          document.body.appendChild(div)
          // 让div沿着抛物线运动
          // 先给div一个初始坐标
          div.style.left = x1 + 'px'
          div.style.top = y1 + 'px'
          var timer = setInterval(() => {
            // 横坐标匀速运动
            x1 += 10
            // 纵坐标按照抛物线公式代入x1计算就行
            y1 = a * x1 * x1 + b * x1 + c
            div.style.left = x1 + 'px'
            div.style.top = y1 + 'px'
            if (x1 >= x2) {
              // 清除定时器
              clearInterval(timer)
              // div移除
              div.remove()
              // 购物车数量上当前数量
              this.shopNum.innerHTML = Number(shopNum.innerHTML) + this.num
            }
          }, 10)
        }
      }


  
  }

  new List()