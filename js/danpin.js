define(["parabola","jquery", "jquery-cookie"], function (parabola,$) {
    function danpin() {
            $.ajax({
                type: "get",
                url: "../data/data.json",
                success: function (arr) {
                    //创建节点，添加到页面上
                    var html = ``;
                    for (var i = 0; i < arr.length; i++) {
                        html += `<li class="goods_item">
                            <div class="goods_pic">
                                <img src="${arr[i].img}" alt="">
                            </div>
                            <div class="goods_title">
                                <p>${arr[i].desc}</p>
                            </div>
                            <div class="sc">
                                <p id="${arr[i].id}" class="sc_btn">${arr[i].price}</p>
                            </div>
                        </li>`;
                    }
                    //将拼接成功的商品，设置在页面上
                    $(".goods_box ul").html(html);
    
                },
                error: function (err) {
                    console.log(err);
                }
            })

        
    }

    return{
        danpin:danpin,
       
    }
    
    



})