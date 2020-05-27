define(["jquery"], function ($) {
    function chat(){
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            var pic = document.querySelector('#pic')
            utils.move1(pic, 'top', 200 + scrollTop)
        }
    }
    return {
        chat: chat
    }
})

