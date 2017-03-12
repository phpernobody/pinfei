<?php
if (!(defined('IN_IA')))
{
    exit('Access Denied');
}

require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';

class Withdraw_EweiShopV2Page extends CommissionMobileLoginPage
{
    public function main()
    {
        global $_W;
        global $_GPC;
        $openid = $_W['openid'];
        $level = $this->set['level'];
        $member = $this->model->getInfo($openid, array('total','ok','apply','check','fail','pay','charge','wait','lock'));

        $cansettle = $member['commission_ok'] >= $this->set['withdraw'];
        include $this->template();
    }
}
?>
