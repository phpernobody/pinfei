<?php

if (!defined('IN_IA')) {
	exit('Access Denied');
}

class CommissionMobileLoginPage extends PluginMobileLoginPage
{
	public function __construct()
	{
		parent::__construct();
		global $_W;
		global $_GPC;

        /**
         * modify by xiaorenwu
         */
        $member = $this->model->getInfo($_W['openid']);

		if (($_W['action'] != 'register') && ($_W['action'] != 'myshop') && ($_W['action'] != 'share')  && ((intval($member['isaagent']) === 0) || (intval($member['aagentstatus']) === 0)) ) {
			$member = m('member')->getMember($_W['openid']);
			if (($member['isagent'] != 1) || ($member['status'] != 1)) {
				header('location:' . mobileUrl('commission/register'));
				exit();
			}
		}

	}
}


?>