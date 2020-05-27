define(["parabola","jquery", "jquery-cookie"], function (parabola,$) {
        function xinpin(){
            $.ajax({
                type: "get",
                url: "../data/data1.json",
                success: function (arr) {
                    //创建节点，添加到页面上
                    var html = ``;
                    for (var i = 0; i < arr.length; i++) {
                        html += `<li class="sads_item">
                            <div class="sads_pic">
                                <img src="${arr[i].img}" alt="">
                            </div>
                            <div class="sads_title">
                                <p>${arr[i].desc}</p>
                            </div>
                            <div class="sad">
                                <p id="${arr[i].id}" class="sad_btn">${arr[i].price}</p>
                            </div>
                        </li>`;
                    }
                    //将拼接成功的商品，设置在页面上
                    $(".sads_box ul").html(html);
    
                },
                error: function (err) {
                    console.log(err);
                }
            })
    
        
        }
        return{
            xinpin:xinpin
        }


})