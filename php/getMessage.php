<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/1/24 0024
 * Time: 11:54
 */
include_once __DIR__.'/Wx.php';
$obj=new Wx();
//$token=$obj->getAccessToken();
//echo json_encode($token)."<br>";
//$ticket=$obj->getJSAPITicket();
//echo json_encode($ticket)."<br>";

$data=$obj->sign();
echo json_encode($data);
?>