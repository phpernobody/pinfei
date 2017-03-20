<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/20
 * Time: 16:52
 */

if (!defined('IN_IA')) {
    exit('Access Denied');
}


require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';

class Box_EweiShopV2Page extends CommissionMobileLoginPage{
    public function main(){
        global $_W;
        global $_GPC;

        $member = m('member')->getMember($_W['openid']);

        $goodsid = $_GPC['goodid'];

        $goodoptions = pdo_fetchall("select * from ims_ewei_shop_goods_option where goodsid=:goodsid",array(':goodsid' => $goodsid));
//        var_dump($good    options);
//        exit;
        include $this->template();
    }
}