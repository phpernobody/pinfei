<?php
if (!(defined('IN_IA'))) 
{
	exit('Access Denied');
}
class Index_EweiShopV2Page extends MobilePage 
{
	public function main() 
	{
		global $_W;
		global $_GPC;
		$allcategory = m('shop')->getCategory();
		$catlevel = intval($_W['shopset']['category']['level']);
		$opencategory = true;
		$plugin_commission = p('commission');
		if ($plugin_commission && (0 < intval($_W['shopset']['commission']['level']))) 
		{
			$mid = intval($_GPC['mid']);
			if (!(empty($mid))) 
			{
				$shop = p('commission')->getShop($mid);
				if (empty($shop['selectcategory'])) 
				{
					$opencategory = false;
				}
			}
		}
		include $this->template();
	}
	
	
	public function gift() 
	{
		global $_W;
		global $_GPC;
		$uniacid = $_W['uniacid'];
		$giftid = intval($_GPC['id']);
		$gift = pdo_fetch('select * from ' . tablename('ewei_shop_gift') . ' where uniacid = ' . $uniacid . ' and id = ' . $giftid . ' and starttime <= ' . time() . ' and endtime >= ' . time() . ' and status = 1 ');
		$giftgoodsid = explode(',', $gift['giftgoodsid']);
		$giftgoods = array();
		if (!(empty($giftgoodsid))) 
		{
			foreach ($giftgoodsid as $key => $value ) 
			{
				$giftgoods[$key] = pdo_fetch('select id,status,title,thumb,marketprice from ' . tablename('ewei_shop_goods') . ' where uniacid = ' . $uniacid . ' and deleted = 0 and total > 0 and id = ' . $value . ' and status = 2 ');
			}
			$giftgoods = array_filter($giftgoods);
		}
		include $this->template();
	}
	public function get_list() 
	{
		global $_GPC;
		global $_W;
		$args = array('pagesize' => 10, 'page' => intval($_GPC['page']), 'isnew' => trim($_GPC['isnew']), 'ishot' => trim($_GPC['ishot']), 'isrecommand' => trim($_GPC['isrecommand']), 'isdiscount' => trim($_GPC['isdiscount']), 'istime' => trim($_GPC['istime']), 'issendfree' => trim($_GPC['issendfree']), 'keywords' => trim($_GPC['keywords']), 'cate' => trim($_GPC['cate']), 'order' => trim($_GPC['order']), 'by' => trim($_GPC['by']));
		$plugin_commission = p('commission');
		if ($plugin_commission && (0 < intval($_W['shopset']['commission']['level'])) && empty($_W['shopset']['commission']['closemyshop']) && !(empty($_W['shopset']['commission']['select_goods']))) 
		{
			$frommyshop = intval($_GPC['frommyshop']);
			$mid = intval($_GPC['mid']);
			if (!(empty($mid)) && !(empty($frommyshop))) 
			{
				$shop = p('commission')->getShop($mid);
				if (!(empty($shop['selectgoods']))) 
				{
					$args['ids'] = $shop['goodsids'];
				}
			}
		}
		$this->_condition($args);
	}
	public function query() 
	{
		global $_GPC;
		global $_W;
		$args = array('pagesize' => 10, 'page' => intval($_GPC['page']), 'isnew' => trim($_GPC['isnew']), 'ishot' => trim($_GPC['ishot']), 'isrecommand' => trim($_GPC['isrecommand']), 'isdiscount' => trim($_GPC['isdiscount']), 'istime' => trim($_GPC['istime']), 'keywords' => trim($_GPC['keywords']), 'cate' => trim($_GPC['cate']), 'order' => trim($_GPC['order']), 'by' => trim($_GPC['by']));

		$this->_condition($args);
	}
	private function _condition($args) 
	{
		global $_GPC;
		global $_W;
		$member = m('member')->getMember($_W['openid']);
		$merch_plugin = p('merch');
		$merch_data = m('common')->getPluginset('merch');
		if ($merch_plugin && $merch_data['is_openmerch']) 
		{
			$args['merchid'] = intval($_GPC['merchid']);
		}
		if (isset($_GPC['nocommission'])) 
		{
			$args['nocommission'] = intval($_GPC['nocommission']);
		}
		//库存管理中显示的库存
		$goods = m('goods')->getList($args);
		foreach ($goods['list'] as $key => $value) {
			$stock = intval(pdo_fetchcolumn('select stock from ' . tablename('ewei_shop_agent_stock') . ' where goodsid=' . $value['id'] . ' and memberid=' . $member['id'] . ' and optionid=0'));
			$goods['list'][$key]['stock'] = $stock;
		}
        foreach ($goods['list'] as $k =>$v){
        	$agenttotal = pdo_fetchcolumn('select sum(vstock) from ' . tablename('ewei_shop_agent_stock') . ' where goodsid=' . $v['id'] . ' and optionid=0');
            $goods[$k]['total'] = intval($goods[$k]['total']) + intval($agenttotal);
        }
        	
        //return $goods['list'];
		show_json(1, array('list' => $goods['list'], 'total' => $goods['total'], 'pagesize' => $args['pagesize']));
	}
/*	//kuu
	public function getGoods(){
		
		$id = $_POST['id'];

        $sql = "select id,title,salesreal,productprice,marketprice,total,thumb from ims_ewei_shop_goods where pcate=" . $id;

		$getGoods = pdo_fetchall($sql);
//var_dump($getGoods);exit;
        // 商品库存重新计算
        foreach($getGoods as $k => $v) {
            $agenttotal = pdo_fetchcolumn('select sum(vstock) from ' . tablename('ewei_shop_agent_stock') . ' where goodsid=' . $v['id'] . ' and optionid=0');
            $getGoods[$k]['total'] = intval($getGoods[$k]['total']) + intval($agenttotal);
        }

		//echo json_encode($getGoods);
	}*/
}
?>