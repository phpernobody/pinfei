<?php

if (!defined('IN_IA')) {
	exit('Access Denied');
}


require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';
class Select_EweiShopV2Page extends CommissionMobileLoginPage
{
	public function main()
	{
		global $_W;
		global $_GPC;
		$member = m('member')->getMember($_W['openid']);

		if ($member['agentselectgoods'] == 1) {
			$err = '您无权自选商品，请和运营商联系!';

			if ($_W['ispost']) {
				show_json(-1, $err);
			}
			$this->message($err, '', 'error');
		}


		if (empty($this->set['select_goods'])) {
			if ($member['agentselectgoods'] != 2) {
				$err = '系统未开启自选商品!';

				if ($_W['ispost']) {
					show_json(-1, $err);
				}
				$this->message($err, '', 'error');
			}

		}

		$shop = pdo_fetch('select * from ' . tablename('ewei_shop_commission_shop') . ' where uniacid=:uniacid and mid=:mid limit 1', array(':uniacid' => $_W['uniacid'], ':mid' => $member['id']));

		if ($_W['ispost']) {
			$shopdata['selectgoods'] = intval($_GPC['selectgoods']);
			$shopdata['selectcategory'] = intval($_GPC['selectcategory']);
			$shopdata['uniacid'] = $_W['uniacid'];
			$shopdata['mid'] = $member['id'];

			if (is_array($_GPC['goodsids'])) {
				$shopdata['goodsids'] = implode(',', $_GPC['goodsids']);
			}

			if (!empty($shopdata['selectgoods']) && !is_array($_GPC['goodsids'])) {
				show_json(0, '请选择商品!');
			}

			if (empty($shop['id'])) {
				pdo_insert('ewei_shop_commission_shop', $shopdata);
			}
			 else {
				pdo_update('ewei_shop_commission_shop', $shopdata, array('id' => $shop['id']));
			}

			show_json(1);
		}
		$goods = array();

		if (!empty($shop['selectgoods'])) {
			$goodsids = explode(',', $shop['goodsids']);

			if (!empty($goodsids)) {
				$goods = pdo_fetchall('select id,title,marketprice,thumb from ' . tablename('ewei_shop_goods') . ' where uniacid=:uniacid and id in ( ' . trim($shop['goodsids']) . ')', array(':uniacid' => $_W['uniacid']));
				$goods = set_medias($goods, 'thumb');
			}
		}

		$set = m('common')->getSysset('shop');

		if ($_W['shopset']['category']['level'] != -1) {
			$category = m('shop')->getCategory();
		}
		include $this->template();
	}

    public function getDetail() {
        global $_W;
        global $_GPC;

//        show_json(1, ['member' => $_W['shopset']['commission']]);

        $member = m('member')->getMember($_W['openid']);

        $goodsid = $_GPC['goodsid'];
//        show_json(1, $goodid);
        $goodoptions = pdo_fetchall('select * from ' . tablename('ewei_shop_goods_option'). ' where goodsid=' . $goodsid);
        $goodDetail= pdo_fetch('select * from ' . tablename('ewei_shop_goods'). ' where id=' . $goodsid);

        $agentgoods = pdo_fetch('select * from ' . tablename('ewei_shop_agent_stock') . ' where goodsid=' . $goodsid . ' and optionid=0 and memberid=' . $member['id']);
        $goodDetail['stock'] = $agentgoods['stock'];
        $goodDetail['vstock'] = $agentgoods['vstock'];

        $hasoption = false;
        if (!empty($goodoptions)) {
            foreach($goodoptions as $k => $v) {
                $agentoption = pdo_fetch('select * from ' . tablename('ewei_shop_agent_stock') . ' where optionid=' . $v['id'] . ' and memberid=' . $member['id']);
                $goodoptions[$k]['stock'] = $agentoption['stock'];
                $goodoptions[$k]['vstock'] = $agentoption['vstock'];
            }

            $hasoption = true;
        }

        $commission = $_W['shopset']['commission'];
        show_json(1, ['options' => $goodoptions, 'commission' => $commission, 'goodDetail' => $goodDetail, 'hasOptions' => $hasoption]);
//        if (!empty($goodoptions)) {
//            foreach($goodoptions as $k => $v) {
//                $stock = pdo_fetchall('select * from ' . tablename('ewei_shop_agent_stock'). ' where optionid=' . $v['id'] .' and memberid=' . $member['id']);
//                if (!empty($stock)) {
//                    $goodoptions[$k] = array_merge($v, $stock[0]);
//                } else {
//                    $data = array(
//                        'memberid' => $member['id'],
//                        'optionid' => $v['id'],
//                        'goodsid' => $goodid,
//                        'vstock' => "0"
//                    );
//                    pdo_insert('ewei_shop_agent_stock', $data);
//                    $goodoptions[$k] = array_merge($v, $data);
//                }
//            }
//            $commission = $_W['shopset']['commission'];
//            show_json(1, ['options' => $goodoptions, 'commission' => $commission, 'goodDetail' => $goodDetail, 'hasOptions' => true]);
//        } else {
//            $agentStock = pdo_fetchall('select * from ' . tablename('ewei_shop_agent_stock'). ' where goodsid=' . $goodid);
//
//            if (empty($agentStock)) {
//                $data = array(
//                    'memberid' => $member['id'],
//                    'goodsid' => $goodid,
//                    'optionid' => "0",
//                    'vstock' => "0"
//                );
//                pdo_insert('ewei_shop_agent_stock', $data);
//                $goodDetail = array_merge($agentStock, $data);
//            } else {
//                $goodDetail = array_merge($goodDetail, $agentStock[0]);
//            }
//            $commission = $_W['shopset']['commission'];
//            show_json(1, ['goodDetail' => $goodDetail, 'commission' => $commission, 'hasOptions' => false]);
//        }

    }

    public  function setStock() {
        global $_W;
        global $_GPC;
        $hasOptions = $_GPC['hasOptions'];
        $member = m('member')->getMember($_W['openid']);

        if ($hasOptions == 'true') {
            $res = pdo_update('ewei_shop_agent_stock', array("vstock" => intval($_GPC['joinStock'])) , array('optionid' => $_GPC['stockOptionId'], 'memberid' => $member['id']));
        } else {
            $res = pdo_update('ewei_shop_agent_stock', array("vstock" => intval($_GPC['joinStock'])) , array('goodsid' => $_GPC['goodsid'], 'memberid' => $member['id']));
        }

        show_json(1, $res);


    }
}


?>