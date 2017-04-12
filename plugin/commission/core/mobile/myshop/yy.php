<?php
if (!(defined('IN_IA'))) 
{
	exit('Access Denied');
}

require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';
class Yy_EweiShopV2Page extends CommissionMobileLoginPage 
{
	public function main() 
	{	global $_W;
		global $_GPC;
		//$count_all=$this->count_all();
		//echo '总营业额'.$count_all['allTotalPrice'].'总利润'.$count_all['allTotalProfit'];
		
		//$date=date('Y-m-d',time());
		//$ya=substr($date,0,4);
		//$ma=substr($date,5,2);
		//$d=substr($date,-2);
		//echo $y.'='.$m.'='.$d;
        //$count=$this->count_month($ya,$ma);
        //var_dump($count);
        $count_all=$this->count_all();
        include $this->template();
		
		
		
	}
	
	
	//数据提取
	public function count_data(){
		global $_W;
        global $_GPC;
        //获取代理的订单数据
        $member = m('member')->getMember($_W['openid']);
        $totalOrder = pdo_fetchall('select * from ' . tablename('ewei_shop_agent_order_finish') . ' where hagentid=' . $member['id']);
       	return $totalOrder;
	}
	//总数提取
	public function count_all(){
		global $_W;
        global $_GPC;
        $count=$this->count_data();
        //总营业额
        $allTotalPrice = 0.00;
        //总利润
        $allTotalProfit = 0.00;
        if($count){
        	foreach($count as $v){
        		$allTotalPrice  += round($v['price'],2);
        		$allTotalProfit += round($v['resultprice'],2);
        	}
        }
        $data =array(
        	'allTotalPrice' => round($allTotalPrice, 2),
            'allTotalProfit' => round($allTotalProfit, 2),
            );
        return $data;
	}
	
	//月利润
	public function count_month($year,$month){
		global $_W;
        global $_GPC;
       /* //将年，月 数字化
        $yint=intval($year);
        
        $mint=intval($month);*/
        //调取订单数据
        $count=$this->count_data();
        //月营业额、月利润
        $monthTotalPrice  = 0.00;
        $monthTotalProfit = 0.00;
        //日营业额、日利润 $dayTotl[1]['prcie']  $dayTotl[1]['profit']
        $dayTotal=array();
       	if($count){
       		foreach($count as $v){
       			//$v['createtime']=2017-04-12 00:26:34
       			$date=explode(' ', $v['createtime'])[0];
       			//将日期分割开
       			$y=substr($date,0,4);
       			$m=substr($date,5,2);
				$d=substr($date,-2);
				//echo $d.'<br/>';
				//判断是否为选择的月份
				if($y==$year&&$m==$month){
        			$dayTotal[$d]['price'] +=round($v['price'],2);
        			$dayTotal[$d]['profit'] +=round($v['resultprice'],2);
        			$monthTotalPrice  += round($v['price'],2);
        			$monthTotalProfit += round($v['resultprice'],2);
				}
       			
       		}
       	}
       	
       	$data=array(
       		'monthTotalPrice' => round($monthTotalPrice, 2),
            'monthTotalProfit' => round($monthTotalProfit, 2),
            'dayTotal' => $dayTotal,
       		);
       	return $data;
	}
	//ajax调用
	public function get_count(){
		/*else{
        	$y=$_GET['yyear'];
        	$m=$_GET['mmonth'];
        	$count_data=$this->count_month($y,$m);
        	echo json_encode(1);
        }*/
       $y=$_GET['yyear'];
       $m=$_GET['mmonth'];
       $count_datas=$this->count_month($y,$m);
       echo json_encode($count_datas);
	}
}