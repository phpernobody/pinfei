<?php
	if (!(defined('IN_IA'))) 
	{
		exit('Access Denied');
	}	
require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';
class Setadd_EweiShopV2Page extends CommissionMobileLoginPage
{
	protected $member;
	public function __construct() 
	{
		global $_W;
		global $_GPC;
		parent::__construct();
		$this->member = m('member')->getInfo($_W['openid']);
	}

	public function main() 
	{
		global $_W;
		global $_GPC;
		/*//$diyform_data = $this->diyformData();
		extract($diyform_data);*/
		$returnurl = urldecode(trim($_GPC['returnurl']));
		$member = $this->member;
		$wapset = m('common')->getSysset('wap');


        // 用户关系展示
        if (intval($member['oldagentid']) !== 0) {
            $agentInfo = pdo_fetch('select * from ' . tablename('ewei_shop_member') . ' where id=' . $member['oldagentid']);
            $agent = $agentInfo['nickname'];
        } else if (intval($member['agentid']) !== 0) {
            $agentInfo = pdo_fetch('select * from ' . tablename('ewei_shop_member') . ' where id=' . $member['agentid']);
            $agent = $agentInfo['nickname'];
        } else {
            $agent = '总店';
        }

        if (intval($member['isaagent']) === 1 && intval($member['aagentstatus']) === 1) {
            switch(intval($member['aagenttype'])) {
                case 1: $level = '省级代理商';break;
                case 2: $level = '市级代理商';break;
                case 3: $level = '区级代理商';break;
                default: $level = '分销商';break;
            }
        } else {
            $level = '分销商';
        }

        $memberRelative = array(
            'agent' => $agent,
            'level' => $level
        );
        
        if(empty($_POST)){
        	include $this->template();
        }else{
        	//var_dump($_POST);
        	//var_dump($_FILES);
        	if(!is_uploaded_file($_FILES["upfile"]['tmp_name'])){
        		$memberdata=$_POST;
        	}else{
        		//var_dump($_FILES);
        		$path=$this->up_img();
        		//var_dump($path);
        		$memberdata=$_POST;
        		$memberdata['xiaodpath']=$path;
        		
        	}
        	pdo_update('ewei_shop_member', $memberdata, array('openid' => $_W['openid'], 'uniacid' => $_W['uniacid']));
			if (!empty($this->member['uid'])) 
			{
				$mcdata = $_GPC['mcdata'];
				m('member')->mc_update($this->member['uid'], $mcdata);
			}
			$url=mobileUrl('commission/myshop/set',array('mid'=>$mid));
			Header("Location: $url"); 
        }
		
	}
	
	/**
	 * 上传图片
	 * 
	 */
	public function up_img(){
		//类型
		$uptypes=array(  
		    'image/jpg',  
		    'image/jpeg',  
		    'image/png',  
		    'image/gif',
		);
		//储存地址
		$path="../addons/ewei_shopv2/static/xiaod/";
		$max_file_size=2000000;     //上传文件大小限制, 单位BYTE 
		$file = $_FILES["upfile"];
		//检查文件大小  
		if($max_file_size < $file["size"]){  
	        echo "文件太大!";  
	        exit;  
	    }
	    //检查文件类型 
	    if(!in_array($file["type"], $uptypes)) {  
	        echo "文件类型不符!".$file["type"];  
	        exit;  
    	}
    	//检查路径
    	if(!file_exists($destination_folder)){  
        	mkdir($path, 0700);  
    	}
    	
    	$filetype = $_FILES['upfile']['type'];
    	$type=null;
    	//图片的类型
    	switch ($filetype){
    		case 'image/jpg':
    		 $type = '.jpg';
    		 break;
    		 case 'image/jpeg':
    		 $type ='.jpg';
    		 break;
    		 case 'image/png';
    		 $type='.png';
    		 break;
    		 default:
    		 $type='.gif';
    		 break;	 
    	}
    	//复制到路径
    	if($_FILES["upfile"]["name"]){
    		 $today=date("YmdHis"); //获取时间并赋值给变量
    		 $file1= substr(md5($_FILES["upfile"]["name"]),0,6);
    		 $file2 = $path.$today.$file1.$type;
    	}
    
    		if(move_uploaded_file($_FILES["upfile"]["tmp_name"],$file2)){
    			return $file2;
    		}else{
    			return false;
    		}
    		
    	
	}
}