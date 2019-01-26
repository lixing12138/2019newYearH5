<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/1/25 0025
 * Time: 17:45
 */

class Wx
{
    protected $appid = 'wxff5e0192690a209f';
    protected $secret = 'fd5ffc15024856360d191b8ed04d2c8d';

    public function getAccessToken()
    {
        $name = 'token_' . md5($this->appid . $this->secret);
        $filename = __DIR__ . '/cache/' . $name . '.php';
        if (is_file($filename) && filemtime($filename) + 7100 > time()) {
            $res = include $filename;
            $data = $res['access_token'];
        } else {
            $url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' . $this->appid . '&secret=' . $this->secret;
            $result = $this->curl($url);
            $res = json_decode($result, true);
            file_put_contents($filename, "<?php \n return " . var_export($res, true) . ";\n?>");

            $data = $res['access_token'];
        }
        return $data;
    }

    public function getJSAPITicket()
    {

        $name = 'ticket_' . md5($this->appid . $this->secret);
        $filename = __DIR__ . '/cache/' . $name . '.php';
        if (is_file($filename) && filemtime(+7100 > time())) {
            $result = include $filename;
            $data = $result['ticket'];
        } else {
            $url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' . $this->getAccessToken() . '&type=jsapi';
            $res = $this->curl($url);
            $result = json_decode($res, true);
            file_put_contents($filename, "<?php \n return " . var_export($result, true) . ";\n?>");
            $data = $result['ticket'];
        }
        return $data;
    }

    public function sign()
    {
        $nonceStr = $this->makeStr();
        $ticket = $this->getJSAPITicket();
        $time = time();
        $url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
        $arr = [
            'noncestr=' . $nonceStr,
            'jsapi_ticket=' . $ticket,
            'timestamp=' . $time,
            'url=' . $url,
        ];
        sort($arr, SORT_STRING);
        $string = implode('&', $arr);
        $sign = sha1($string);
        $content = [
            'appid' => $this->appid,
            'timestamp' => $time,
            'nonceStr' => $nonceStr,
            'jsapi_ticket=' =>$ticket,
            'url=' => $url,
            'signature' => $sign
        ];
        return $content;
    }

    protected function makeStr()
    {
        $seed = 'qwe1r4tu5nj2j5i5opp1gv5ds2x8d7f9g5nbg3';
        $str = '';
        for ($i = 0; $i < 16; $i++) {
            $num = rand(0, strlen($seed) - 1);
            $str .= $seed[$num];
        }
        return $str;
    }

    public function curl($url, $field = [])
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        if (!empty($field)) {
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_PORT, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $field);
        }
        $data = "";
        if (curl_exec($ch)) {
            $data = curl_multi_getcontent($ch);
        }
        curl_close($ch);
        return $data;
    }


}

?>