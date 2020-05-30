<?php
include('../config.php');

$name = $_POST['username'];
$pwd = $_POST['pwd'];

$sql = "select * from user where name='$name' and pwd='$pwd'";

$res = mysql_query($sql);

if (mysql_num_rows($res)  > 0) {
    // 登录成功
    // code是后端自定义的，我们这里定义1成功0失败
    echo json_encode(array(
        "code" => 1,
        "msg" => "登录成功"
    ));
}else {
    echo json_encode(array(
        "code" => 0,
        "msg" => "网络错误，请重试"
    ));
}



?>