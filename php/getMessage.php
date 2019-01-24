<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/1/24 0024
 * Time: 11:54
 */
function getAccessToken(){
    $appid="wxff5e0192690a209f";
    $app_secret="0fcc2ad006da0e618477fa5156766d12";
    $url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$app_secret}";
    $res=curl_get($url);
    $res = json_decode($res,1);
    return $res['access_token'];
}
function curl_get($url) {
    $headers = array('User-Agent:Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36');
    $oCurl = curl_init();
    if(stripos($url,"https://")!==FALSE){
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
    }
    curl_setopt($oCurl, CURLOPT_TIMEOUT, 20);
    curl_setopt($oCurl, CURLOPT_URL, $url);
    curl_setopt($oCurl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
    $sContent = curl_exec($oCurl);
    $aStatus = curl_getinfo($oCurl);
    curl_close($oCurl);
    if(intval($aStatus["http_code"])==200){
        return $sContent;
    }else{
        return false;
    }
}
function getJsApiTicket(){
    if (isset($_SESSION["jsapi_ticket"])&&$_SESSION["jsapi_ticket_expire_time"]>time()){
        $jsapi_ticket=$_SESSION["jsapi_ticket"];
    }else{
        $access_tocken=getAccessToken();
        $url="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$access_tocken}&type=jsapi";
        $res=curl_get($url);
        $res=json_decode($res,1);
        $jsapi_ticket=$res["ticket"];
        $_SESSION["jsapi_ticket"]=$res["ticket"];
        $_SESSION["jsapi_ticket_expire_time"]=time()+7000;
    }
    return $jsapi_ticket;
}
//获取随机码
function getRandomCode(){
    $code=array(
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        '0','1','2','3','4','5','6','7','8','9'
    );
    $tmpstr='';
    for ($i=0;$i<16;$i++){
        $tmpstr.=$code[rand(0,count($code)-1)];
    }
    return $tmpstr;
}
$jsapi_ticket=getJsApiTicket();
$timestamp=time();
$nonceStr=getRandomCode() ;
$url="https://xcx.fudan.edu.cn/newyear";
$signature="noncestr={$nonceStr}
jsapi_ticket={$jsapi_ticket}
timestamp={$timestamp}
url={$url}";
$signature=sha1($signature);
$data["appid"]="wxff5e0192690a209f";
$data["timestamp"]=$timestamp;
$data["nonceStr"]=$nonceStr;
$data["signature"]=$signature;
echo json_encode($data);

?>