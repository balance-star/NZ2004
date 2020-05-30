define(["parabola", "jquery", "jquery-cookie"], function(parabola, $){
    function caidan(){
        $("#head1").mouseover(function(){
            $("#show1").css("display", 'block');
            $("#show1").css("opacity", '1');
            $("#show1").css("height", '200px');


        }).mouseout(function(){
            $("#show1").css("display", 'none');
            $("#show1").css("opacity", '0');
            $("#show1").css("height", '0px');

        })
    }

    function daohang() {
        $.ajax({
            type: "get",
            url: "../data/data1.json",
            success: function (arr) {
                //创建节点，添加到页面上
                var html = ``;
                for (var i = 0; i < arr.length; i++) {
                    html += `<li class="show_item">
                        <div class="show_pic">
                            <img src="${arr[i].img}" alt="">
                        </div>
                        <div class="show_title">
                            <p>${arr[i].desc}</p>
                        </div>
                    </li>`;
                }
                //将拼接成功的商品，设置在页面上
                $(".navigation-expended ul").html(html);

            },
            error: function (err) {
                console.log(err);
            }
        })

    
}
    return{
        caidan:caidan,
        daohang:daohang
    }
})