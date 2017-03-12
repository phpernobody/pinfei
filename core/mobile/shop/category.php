<?php
if (!(defined('IN_IA'))) 
{
	exit('Access Denied');
}
class Category_EweiShopV2Page extends MobilePage
{
	public function main()
	{
		global $_W;
		global $_GPC;
		$merchid = intval($_GPC['merchid']);

		$sql = "select * from ims_ewei_shop_category where level=1";

		$getCategory = pdo_fetchall($sql);

		include $this->template();
	}

	public function getGoods(){

		$id = $_POST['id'];

        $sql = "select title,salesreal,marketprice,thumb from ims_ewei_shop_goods where pcate=" . $id;

		$getGoods = pdo_fetchall($sql);

		echo json_encode($getGoods);

	}
}

