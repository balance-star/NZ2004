window.onload = function () {
    var head1 = document.getElementById("head1");
    var show1 = document.getElementById("show1");
    head1.onmouseover = function () {
        show1.style.display = "block";
        show1.style.opacity = 1;
    }
    show1.onmouseleave = function () {
        show1.style.display = "none";
        show1.style.opacity = 0;
    }
}