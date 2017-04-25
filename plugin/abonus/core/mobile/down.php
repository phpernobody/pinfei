<?php

if (!defined('IN_IA')) {
	exit('Access Denied');
}


require EWEI_SHOPV2_PLUGIN . 'commission/core/page_login_mobile.php';
class Down_EweiShopV2Page extends CommissionMobileLoginPage
{
	public function main()
	{
		global $_W;
		global $_GPC;

        $memberid = $_GPC['downid'];
        $openid = pdo_fetchcolumn('select openid from ' . tablename('ewei_shop_member') . ' where id=' . $memberid);

//    var_dump($member); exit;
//		$levelcount1 = $member['level1'];
//		$levelcount2 = $member['level2'];
//		$levelcount3 = $member['level3'];
//		$level1 = $level2 = $level3 = 0;
//		$level1 = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid=:agentid and uniacid=:uniacid limit 1', array(':agentid' => $member['id'], ':uniacid' => $_W['uniacid']));
//
//		if ((2 <= $this->set['level']) && (0 < $levelcount1)) {
//			$level2 = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid in( ' . implode(',', array_keys($member['level1_agentids'])) . ') and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid']));
//		}
//		if ((3 <= $this->set['level']) && (0 < $levelcount2)) {
//			$level3 = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid in( ' . implode(',', array_keys($member['level2_agentids'])) . ') and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid']));
//		}
//		$total = $level1 + $level2 + $level3;
//		include $this->template();

//        $list = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' and isaagent = 1 and hagentid='. $member['id'] . '  ORDER BY id desc');
        $list = $this->get_down($openid);

        include $this->template();
	}

    public function get_down($openid)
    {
        global $_W;
        global $_GPC;
        $member = $this->model->getInfo($openid);

        $total_level = 1;
        $level = intval(1);
        ((3 < $level) || ($level <= 0)) && ($level = 1);
        $condition = '';
        $levelcount1 = $member['level1'];
        $levelcount2 = $member['level2'];
        $levelcount3 = $member['level3'];
        $pindex = max(1, intval($_GPC['page']));

        $condition = ' and agentid=' . $member['id'];
        $hasangent = true;
        $list = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' ' . $condition . '  ORDER BY isagent desc,id desc');

        foreach ($list as &$row ) {
            if ($row['isagent'] && $row['status']) {
                $info = $this->model->getInfo($row['openid'], array('total'));

                $row['commission_total'] = $info['commission_total'];
                $row['agentcount'] = $info['agentcount'];
                $row['agenttime'] = date('Y-m-d H:i', $row['agenttime']);
            }

            $ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
            $row['ordercount'] = number_format(intval($ordercount), 0);
            $moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
            $row['moneycount'] = number_format(floatval($moneycount), 2);
            $row['createtime'] = date('Y-m-d H:i', $row['createtime']);
            $row['down_count'] = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_member') . ' where agentid=' . $row['id'] . ' and isaagent=0');
        }

        unset($row);

//        var_dump($list);exit;
        return $list;
    }

    public function get_down_ajax()
    {
        global $_W;
        global $_GPC;
        $openid = $_GPC['openid'];
        $member = $this->model->getInfo($openid);
        $total_level = 1;
        $level = intval(1);
        ((3 < $level) || ($level <= 0)) && ($level = 1);
        $condition = '';
        $levelcount1 = $member['level1'];
        $levelcount2 = $member['level2'];
        $levelcount3 = $member['level3'];
        $pindex = max(1, intval($_GPC['page']));

        $condition = ' and agentid=' . $member['id'];
        $hasangent = true;
        $list = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' ' . $condition . '  ORDER BY isagent desc,id desc');

        foreach ($list as &$row ) {
            if ($member['isagent'] && $member['status']) {
                $info = $this->model->getInfo($row['openid'], array('total'));
                $row['commission_total'] = $info['commission_total'];
                $row['agentcount'] = $info['agentcount'];
                $row['agenttime'] = date('Y-m-d H:i', $row['agenttime']);
            }

            $ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
            $row['ordercount'] = number_format(intval($ordercount), 0);
            $moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
            $row['moneycount'] = number_format(floatval($moneycount), 2);
            $row['createtime'] = date('Y-m-d H:i', $row['createtime']);
        }

        unset($row);
        show_json(1, array('list' => $list));
    }

	public function get_agent_list()
	{
		$level = 2;
		$page = 1;
		global $_W;
		global $_GPC;
		$openid = $_W['openid'];
		$member = $this->model->getInfo($openid);
		$pindex = max(1, intval($page));
		$psize = 20;

		$condition = 'and agentid=' . $member['id'];
		$agentList = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' ' . $condition . '  ORDER BY isagent desc,id desc limit ' . (($pindex - 1) * $psize) . ',' . $psize);
		// foreach ($list as &$row ) {
		// 	if ($member['isagent'] && $member['status']) {
		// 		$info = $this->model->getInfo($row['openid'], array('total'));
		// 		$row['commission_total'] = $info['commission_total'];
		// 		$row['agentcount'] = $info['agentcount'];
		// 		$row['agenttime'] = date('Y-m-d H:i', $row['agenttime']);
		// 	}


		// 	$ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
		// 	$row['ordercount'] = number_format(intval($ordercount), 0);
		// 	$moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
		// 	$row['moneycount'] = number_format(floatval($moneycount), 2);
		// 	$row['createtime'] = date('Y-m-d H:i', $row['createtime']);
		// }
		// unset($row);



		foreach ($agentList as $key => $value) {
			if ($member['isagent'] && $member['status']) {
				$info = $this->model->getInfo($value['openid'], array('total'));
				$agentList[$key]['commission_total'] = $info['commission_total'];
				$agentList[$key]['agentcount'] = $info['agentcount'];
				$agentList[$key]['agenttime'] = date('Y-m-d H:i', $agentList[$key]['agenttime']);
			}

			$ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $value['openid']));
			$agentList[$key]['ordercount'] = number_format(intval($ordercount), 0);
			$moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $value['openid']));
			$agentList[$key]['moneycount'] = number_format(floatval($moneycount), 2);
			$agentList[$key]['createtime'] = date('Y-m-d H:i', $agentList[$key]['createtime']);

			$condition = 'and agentid=' . $value['id'];

			$downList = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' ' . $condition . '  ORDER BY isagent desc,id desc');

			foreach ($downList as &$row) {
				$info = $this->model->getInfo($row['openid'], array('total'));
				$row['commission_total'] = $info['commission_total'];
				$row['agentcount'] = $info['agentcount'];
				$row['agenttime'] = date('Y-m-d H:i', $row['agenttime']);

				$ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
				$row['ordercount'] = number_format(intval($ordercount), 0);
				$moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
				$row['moneycount'] = number_format(floatval($moneycount), 2);
				$row['createtime'] = date('Y-m-d H:i', $row['createtime']);
			}
			unset($row);

			$agentList[$key]['downList'] = $downList;
		}
		show_json(1, array(
			'list'     => $agentList,
			'total'    => count($agentList),
			'pagesize' => $psize
		));
	}

	public function get_list()
	{
		global $_W;
		global $_GPC;
		$openid = $_W['openid'];
		$member = $this->model->getInfo($openid);
		$total_level = 0;
		$level = intval($_GPC['level']);
		((3 < $level) || ($level <= 0)) && ($level = 1);
		$condition = '';
		$levelcount1 = $member['level1'];
		$levelcount2 = $member['level2'];
		$levelcount3 = $member['level3'];
		$pindex = max(1, intval($_GPC['page']));
		$psize = 20;

		if ($level == 1) {
			$condition = ' and agentid=' . $member['id'];
			$hasangent = true;
			$total_level = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid=:agentid and uniacid=:uniacid limit 1', array(':agentid' => $member['id'], ':uniacid' => $_W['uniacid']));
		}
		 else if ($level == 2) {
			if (empty($levelcount1)) {
				show_json(1, array(
                'list'     => array(),
                'total'    => 0,
                'pagesize' => $psize
                ));
			}


			$condition = ' and agentid in( ' . implode(',', array_keys($member['level1_agentids'])) . ')';
			$hasangent = true;
			$total_level = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid in( ' . implode(',', array_keys($member['level1_agentids'])) . ') and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid']));
		}
		 else if ($level == 3) {
			if (empty($levelcount2)) {
				show_json(1, array(
                    'list'     => array(),
                    'total'    => 0,
                    'pagesize' => $psize
                ));
			}

			$condition = ' and agentid in( ' . implode(',', array_keys($member['level2_agentids'])) . ')';
			$hasangent = true;
			$total_level = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid in( ' . implode(',', array_keys($member['level2_agentids'])) . ') and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid']));
		}


		$list = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' ' . $condition . '  ORDER BY isagent desc,id desc limit ' . (($pindex - 1) * $psize) . ',' . $psize);

		foreach ($list as &$row ) {
			if ($member['isagent'] && $member['status']) {
				$info = $this->model->getInfo($row['openid'], array('total'));
				$row['commission_total'] = $info['commission_total'];
				$row['agentcount'] = $info['agentcount'];
				$row['agenttime'] = date('Y-m-d H:i', $row['agenttime']);
			}


			$ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
			$row['ordercount'] = number_format(intval($ordercount), 0);
			$moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
			$row['moneycount'] = number_format(floatval($moneycount), 2);
			$row['createtime'] = date('Y-m-d H:i', $row['createtime']);
		}

		unset($row);
		show_json(1, array('list' => $list, 'total' => $total_level, 'pagesize' => $psize));
	}

    // 获取所有的下线
    public function get_all_list()
    {
        global $_W;
        global $_GPC;
        $openid = $_W['openid'];
        $member = $this->model->getInfo($openid);
        $total_level = 0;
        $level = intval($_GPC['level']);
        ((3 < $level) || ($level <= 0)) && ($level = 1);
        $condition = '';
        $levelcount1 = $member['level1'];
        $levelcount2 = $member['level2'];
        $levelcount3 = $member['level3'];
        $pindex = max(1, intval($_GPC['page']));
        $psize = 20;

        if ($level == 1) {
            $condition = ' and agentid=' . $member['id'];
            $hasangent = true;
            $total_level = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid=:agentid and uniacid=:uniacid limit 1', array(':agentid' => $member['id'], ':uniacid' => $_W['uniacid']));
        }
        else if ($level == 2) {
            if (empty($levelcount1)) {
                show_json(1, array(
                    'list'     => array(),
                    'total'    => 0,
                    'pagesize' => $psize
                ));
            }


            $condition = ' and agentid in( ' . implode(',', array_keys($member['level1_agentids'])) . ')';
            $hasangent = true;
            $total_level = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid in( ' . implode(',', array_keys($member['level1_agentids'])) . ') and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid']));
        }
        else if ($level == 3) {
            if (empty($levelcount2)) {
                show_json(1, array(
                    'list'     => array(),
                    'total'    => 0,
                    'pagesize' => $psize
                ));
            }


            $condition = ' and agentid in( ' . implode(',', array_keys($member['level2_agentids'])) . ')';
            $hasangent = true;
            $total_level = pdo_fetchcolumn('select count(*) from ' . tablename('ewei_shop_member') . ' where agentid in( ' . implode(',', array_keys($member['level2_agentids'])) . ') and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid']));
        }


        $list = pdo_fetchall('select * from ' . tablename('ewei_shop_member') . ' where uniacid = ' . $_W['uniacid'] . ' ' . $condition . '  ORDER BY isagent desc,id desc limit ' . (($pindex - 1) * $psize) . ',' . $psize);

        foreach ($list as &$row ) {
            if ($member['isagent'] && $member['status']) {
                $info = $this->model->getInfo($row['openid'], array('total'));
                $row['commission_total'] = $info['commission_total'];
                $row['agentcount'] = $info['agentcount'];
                $row['agenttime'] = date('Y-m-d H:i', $row['agenttime']);
            }


            $ordercount = pdo_fetchcolumn('select count(id) from ' . tablename('ewei_shop_order') . ' where openid=:openid and uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
            $row['ordercount'] = number_format(intval($ordercount), 0);
            $moneycount = pdo_fetchcolumn('select sum(og.realprice) from ' . tablename('ewei_shop_order_goods') . ' og ' . ' left join ' . tablename('ewei_shop_order') . ' o on og.orderid=o.id where o.openid=:openid  and o.status>=1 and o.uniacid=:uniacid limit 1', array(':uniacid' => $_W['uniacid'], ':openid' => $row['openid']));
            $row['moneycount'] = number_format(floatval($moneycount), 2);
            $row['createtime'] = date('Y-m-d H:i', $row['createtime']);
        }

        unset($row);
        show_json(1, array('list' => $list, 'total' => $total_level, 'pagesize' => $psize));
    }
}


?>