$(function () {
    //计算一下购物车中商品的数量
    sc_num();
    sc_msg();


    $.ajax({
        type: "get",
        url: "../data/data2.json",
        success: function (arr) {
            //创建节点，添加到页面上
            var html = ``;
            for (var i = 0; i < arr.length; i++) {
                html += `<li class="good_item">
                <div class="good_pic">
                        <img src="${arr[i].img}">
                    </div>
                    <div class="good_title">
                        <p>【匡威】鞋子/书包${i}</p>
                    </div>
                    <div class="good">
                        <div id="${arr[i].id}" class="good_btn">加入购物车</div>
                    </div>
                </li>`;
            }
            //将拼接成功的商品，设置在页面上
            $(".good_box ul").html(html);

        },
        error: function (err) {
            console.log(err);
        }
    })

    /*
        购物车中的商品本地缓存，cookie(1、最大不能超过4kb  2、只能存储字符串)
        [{id:id,num:1},{id:id,num:1}]
        将上面的数据结构转成对应的json格式字符串进行存储。
    */
    //给所有的加入购物车按钮添加点击
    //对于异步加载，后添加进来的节点，我们要通过事件委托绑定事件
    $(".good_box ul").on("click", ".good_btn", function () {
        //this.id 就是我们加入购物车按钮所在商品id
        var id = this.id;
        //1、判断是否是第一次添加
        var first = $.cookie("goods") == null ? true : false;
        if (first) {
            var arr = [{ id: id, num: 1 }];
            $.cookie("goods", JSON.stringify(arr), {
                expires: 7
            })
        } else {
            //2、判断之前是否添加过
            var cookieArr = JSON.parse($.cookie("goods"));
            var same = false; //默认代表之前没添加过
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    same = true;
                    cookieArr[i].num++; //数量+1
                    break;
                }
            }
            //3、之前没有添加过
            if (!same) {
                var obj = { id: id, num: 1 };
                cookieArr.push(obj);
            }
            //4、最后都要将修改完毕的数据存储回去
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }

        //点击加入购物车以后重新计算商品的数量
        sc_num();
        sc_msg();
        //调用抛物线运动
        ballMove(this);
    })

    // 清空购物车
    $("#clearBtn").click(function() {
        // 删除cookie
        $.cookie("goods",null);
        // 删除数据
        sc_num();
        // 清空子节点
        $(".sc_right ul").empty();
    })

    // $("#someBtn").click(function() {
    //     // 删除cookie
    //    open("../html/fangda.html");
    // })


    // 右侧购物车的删除按钮添加点击
    $(".sc_right ul").on("click", ".delete_goodsBtn", function() {
        // 删除页面上的节点 获取id
        var id = $(this).closest("li").remove().attr("id");
        // 从cookie中删除数据
        var cookieArr = JSON.parse($.cookie("goods"));
        cookieArr = cookieArr.filter(item => item.id == !id);

        if(!cookieArr.length) {
            $.cookie("goods", null);

        }else{
            $.cookie("goods",JSON.stringify(cookieArr), {
                expires:7
            })
        }
        // 重新计算一次购物车数量
        sc_num();
    })

   

    // 给购物车+1 -1添加事件点击
        $(".sc_right ul").on("click", ".sc_goodsNum button", function(){
        //先找到点击+和-部分的商品id
        var id = $(this).closest("li").attr("id");
        //先取去cookie
        var cookieArr = JSON.parse($.cookie("goods"));
        //找到我们要改的数据
        // var item = cookieArr.find(item => item.id == id);
        for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id == id){
                break;
            }
        }
        //判断点击的是+还是-
        if(this.innerHTML == "+"){
            cookieArr[i].num++;
            console.log(cookieArr[i]);
        }else{
            cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
        }
        //页面上体现修改后的数量
        $(this).siblings("span").html(`商品数量：${cookieArr[i].num}`);

        //最后将cookie存储回去
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })
        sc_num();
         
    })




    //给右侧的购物车添加移入移出事件
    $(".sc_right").mouseenter(function () {
        $(this).stop(true).animate({
            right: 0
        }, 500)
    }).mouseleave(function () {
        $(this).stop(true).animate({
            right: -270
        }, 500)
    })

    //计算购物车中商品的数量
    function sc_num() {
        var cookieStr = $.cookie("goods");

        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".sc_right").find(".sc_num").html(sum);
        } else {
            $(".sc_right").find(".sc_num").html(0);
        }
    }

    //加载右侧购物车的数据
    /*
        购物车的数据在cookie里， {id:id,num:1}
        需要商品的详细数据(详细数据在数据源里)
        【注】将加入购物车的商品详情数据，单独找出来。
    */
    function sc_msg() {
        $.ajax({
            type: "get",
            url: "../data/data2.json",
            success: function (arr) {
                //arr 所有的数据
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    
                    var newArr = [];
                    for(var i = 0; i < arr.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(arr[i].id == cookieArr[j].id){
                                //将商品的数量赋值上去
                                arr[i].num = cookieArr[j].num;

                                //这个商品加入购物车过
                                newArr.push(arr[i]);
                            }
                        }
                    }

                    //newArr 加入购物车，商品详情数据
                    //想办法将数据添加到页面上
                    var html = ``;
                    for(var i = 0; i < newArr.length; i++){
                        html += `<li id="${newArr[i].id}">
                            <div class="sc_goodsPic">
                                <img src="${newArr[i].img}"
                                    alt="">
                            </div>
                            <div class="sc_goodsTitle">
                                <p>这是匡威鞋子/书包</p>
                            </div>
                            <div class="sc_goodsBtn">购买</div>
                            <div class="delete_goodsBtn">删除</div>
                            <div class="sc_goodsNum">
                                <div>
                                    <button>+</button>
                                    <button>-</button>
                                    <span>商品数量：${newArr[i].num}</span>
                                </div>
                            </div>
                        </li>`;
                    }
                    
                    $(".sc_right").find("ul").html(html);
                }


            },
            error: function (err) {
                console.log(err);
            }
        })


    }


    //抛物线运动如何去添加（类似于这样的算法问题大家直接去查找就行）
    // 程序员：切记不要重复造轮子，学会在巨人的肩膀上继续前进
    function ballMove(oBtn){


        $("#ball").css({
            display: "block",
            left: $(oBtn).offset().left,
            top: $(oBtn).offset().top
        })

        var X = $(".sc_right .sc_pic").offset().left - $("#ball").offset().left;
        var Y = $(".sc_right .sc_pic").offset().top - $("#ball").offset().top;
       

        var bool = new Parabola({
        el: "#ball",
        offset: [X,Y],
        duration: 500,
        curvature: 0.001,
        callback: function(){
            $("#ball").hide();
        }

        })
        bool.start();
    }
    


})