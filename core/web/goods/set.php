<?php
if (!(defined('IN_IA'))) {
    exit('Access Denied');
}

class Set_EweiShopV2Page extends WebPage
{
    public function main()
    {
        global $_W;
        global $_GPC;
        global $_S;
        $error = '';
        if (!empty($_GPC['province']) || !empty($_GPC['city']) || !empty($_GPC['country'])) {
            $data = array(
                'province' => $_GPC['province'],
                'city' => $_GPC['city'],
                'county' => $_GPC['county']
            );
//            $commission = m('common')->getSysset('commission');
            $commission = $_S['commission'];
            $total = $commission['commission1'] + $commission['commission2'] + $commission['commission3'] + $data['province'] + $data['city'] + $data['county'];
            if ($total != 100) {
                $error = '加上分销比例不等于100%,请重新设置';
            }else {
                m('common')->updateSysset(array('mygoods' => $data));
                $goods = pdo_getall('ewei_shop_goods', array('uniacid' => $_W['uniacid']));
                if (!empty($goods)) {
                    foreach ($goods as $good) {
                        $productprice = $good['productprice'];
                        $costprice = $good['costprice'];
                        $p = $productprice - $costprice;
                        $provinceprice = $p * $data['province'] / 100.0 + $costprice;
                        $cityprice = $p * $data['city'] / 100.0 + $provinceprice;
                        $countyprice = $p * $data['county'] / 100.0 + $cityprice;
                        pdo_update('ewei_shop_goods', array('provinceprice' => $provinceprice, 'cityprice' => $cityprice, 'countyprice' => $countyprice), array('id' => $good['id']));
                        $options = pdo_getall('ewei_shop_goods_option', array('goodsid' => $good['id'], 'uniacid' => $_W['uniacid']));
                        if (!empty($options)) {
                            foreach ($options as $option) {
                                $productprice = $good['productprice'];
                                $costprice = $good['costprice'];
                                $p = $productprice - $costprice;
                                $provinceprice = $p * $data['province'] / 100.0 + $costprice;
                                $cityprice = $p * $data['city'] / 100.0 + $provinceprice;
                                $countyprice = $p * $data['county'] / 100.0 + $cityprice;
                                pdo_update('ewei_shop_goods_option', array('provinceprice' => $provinceprice, 'cityprice' => $cityprice, 'countyprice' => $countyprice), array('id' => $option['id']));
                            }
                        }
                    }
                }
            }
        }
        $data = m('common')->getSysset('mygoods');
        include $this->template();
    }
}

?>