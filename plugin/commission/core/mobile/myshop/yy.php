<?php
if (!(defined('IN_IA'))) 
{
	exit('Access Denied');
}

require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';
class Yy_EweiShopV2Page extends CommissionMobileLoginPage 
{
	public function main() 
	{		
		include $this->template();
	}
}