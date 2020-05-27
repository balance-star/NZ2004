define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
    function download() {
        var aBtns = $("#div1").find("ol li");
        var oUl = $("#div1").find("ul li");
        var timer = null; //用于记录定时器返回值
        var iNow = 0; //代表当前图片显示的下标
    
        aBtns.click(function () {
            iNow = $(this).index();
            tab();
            
        })
    
        //自动循环轮播
        timer = setInterval(function () {
            iNow++;
            tab();
        }, 2000);
    
        //添加移入移出
     
            $("#div1").mouseenter(function () {
                clearInterval(timer);
            }).mouseleave(function () {
                timer = setInterval(function () {
                    iNow++;
                    tab();
                }, 2000);
            })
        
        
    
        // 向后切换
      
            $("#goNext").click(function(){
                iNow++;
                if(iNow == aBtns.size()){
                    iNow = 0;
                    
                }
                tab();
            })
            // 向前切换
            $("#goPrev").click(function(){
                iNow--;
                if(iNow < 0){
                    iNow = aBtns.size() - 1;
                    
                }
                tab();
            })
        
        
        
    
        //切换，单独封装成函数
        function tab() {
            aBtns.removeClass("ac").eq(iNow).addClass("ac");
            oUl.removeClass("ac").eq(iNow).addClass("ac");
            //如果是最后一张图片显示，它对应的按钮下标是0
            if (iNow == aBtns.size()) {
                iNow = 0;
                aBtns.removeClass("ac").eq(iNow).addClass("ac");
                oUl.removeClass("ac").eq(iNow).addClass("ac");
            }
            
        }

    }
    return {
        download: download
    }
})