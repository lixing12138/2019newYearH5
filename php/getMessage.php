<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/1/24 0024
 * Time: 11:54
 */
include_once __DIR__.'/Wx.php';

$url=$_GET("url");
$obj=new Wx();
$data=$obj->sign($url);
echo json_encode($data);
?>