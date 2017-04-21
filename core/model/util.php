
<?php
if (!defined('IN_IA')) 
{
	exit('Access Denied');
}
class Util_EweiShopV2Model 
{
	function randomFloat($min = 0, $max = 1) {
		return $min + mt_rand() / mt_getrandmax() * ($max - $min);
	}
	
	public function getExpressList($express, $expresssn) 
	{
		$url = "http://m.kuaidi100.com/query?type=" .$express. "&postid=" .$expresssn. "&id=1&valicode=&temp=" .$this->randomFloat();
		//$url="http://api.kuaidi100.com/api?id=[]&com=[]&nu=[]&valicode=[]&show=[0|1|2|3]&muti=[0|1]&order=[desc|asc]"
        load()->func('communication');
		$resp = ihttp_request($url);
		$content = $resp['content'];
		if (empty($content)) 
		{
			return array();
		}
		
		$arr = json_decode ($content,true);
		if (!is_array($arr)) 
		{
			return false;
		}
		$arr = $arr['data'];
		$list = array();
		if ($arr) 
		{
			$i = 1;
			foreach ($arr as $r)
			{
				$list[] = array('time' =>$r['time'], 'step' => $r['context'], 'ts' => $r['content']);
				$i++;
			}
		}
		return $list;
	}
	public function getIpAddress() 
	{
		$ipContent = file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js');
		$jsonData = explode('=', $ipContent);
		$jsonAddress = substr($jsonData[1], 0, -1);
		return $jsonAddress;
	}
	public function checkRemoteFileExists($url) 
	{
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_NOBODY, true);
		$result = curl_exec($curl);
		$found = false;
		if ($result !== false) 
		{
			$statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
			if ($statusCode == 200) 
			{
				$found = true;
			}
		}
		curl_close($curl);
		return $found;
	}
}
?>