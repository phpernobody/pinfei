// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('P([\'n\',\'o\',\'O/B/l\'],7(n,o,l){G 6={b:1,8:\'\',g:0};6.h=7(q){6.8=q.8;6.g=q.g;l.h();i(!6.F){6.b=1}r{6.F=Q}6.k();$(\'.d-9\').f({R:7(){6.k()}});$(\'.s-p\').z(7(){$(\'.d-j-M a\').S(\'U\');6.c(5)});L.j({m:$(\'#j\'),J:{j:7(){6.c(\'\')},I:7(){6.c(0)},H:7(){6.c(1)},T:7(){6.c(2)},15:7(){6.c(3)},14:7(){6.c(4)}}});$(".m .d-u").z(7(){6.13=V})};6.c=7(8){i(8==5){$(\'.s-p\').x(\'A\',\'11\')}r{$(\'.s-p\').x(\'A\',\'#12\')}$(\'.d-9\').f(\'h\');$(\'.9-t\').C(),$(\'.m\').X(\'\'),$(\'.f-v\').E();6.b=1,6.8=8,6.k()};6.v=7(){6.b++};6.k=7(){n.W(\'B/Y\',{b:6.b,8:6.8,g:6.g},7(D){G e=D.e;i(e.10<=0){$(\'.9-t\').E();$(\'.d-9\').f(\'y\')}r{$(\'.9-t\').C();$(\'.d-9\').f(\'h\');i(e.u.w<=0||e.u.w<e.N){$(\'.d-9\').f(\'y\')}}6.b++;n.o(\'.m\',\'Z\',e,6.b>1);l.h()})};K 6});',62,68,'||||||modal|function|status|content||page|changeTab|fui|result|infinite|merchid|init|if|tab|getList|op|container|core|tpl|delete|params|else|icon|empty|list|loading|length|css|stop|click|color|order|hide|ret|show|toOrder|var|tab1|tab0|handlers|return|FoxUI|danger|pagesize|biz|define|false|onLoading|removeClass|tab2|active|true|json|html|get_list|tpl_order_index_list|total|red|999|toGoods|tab4|tab3'.split('|'),0,{}))


define(['core', 'tpl', 'biz/order/op'], function (core, tpl, op) {
    var modal = {
        page: 1,
        status: '',
        merchid: 0,
        orderList: [],
        express: {}
    };
    modal.init = function (params) {
        modal.status = params.status;
        modal.merchid = params.merchid;
        op.init();
        if (!modal.toOrder) {
            modal.page = 1
        } else {
            modal.toOrder = false
        }
        modal.getList();
        $('.fui-content').infinite({
            onLoading: function () {
                modal.getList()
            }
        });
        $('.icon-delete').click(function () {
            $('.fui-tab-danger a').removeClass('active');
            modal.changeTab(5)
        });
        FoxUI.tab({
            container: $('#tab'),
            handlers: {
                tab: function () {
                    modal.changeTab('')
                },
                tab0: function () {
                    modal.changeTab(0)
                },
                tab1: function () {
                    modal.changeTab(1)
                },
                tab2: function () {
                    modal.changeTab(2)
                },
                tab3: function () {
                    modal.changeTab(3)
                },
                tab4: function () {
                    modal.changeTab(4)
                }
            }
        });
        $(".container .fui-list").click(function () {
            modal.toGoods = true
        });


    };


    // 发货详情信息
    modal.setOrderDetail = function() {
        var orderDetail = modal.orderDetail;
        console.log(modal)
        var goods = orderDetail.goods[0].goods;
        var address = orderDetail.address;
        var express = modal.express;
        html = '';
        for (var i = goods.length - 1; i >= 0; i--) {
            html += '<img src="';
            html += goods[i].thumb;
            html += '" alt="" style="width: 3.5rem; height: 3.5rem; display: block; float: left;"><div style="position: relative; height: 3.5rem;float: right; width: calc(100% - 4.5rem); font-size: .5rem;"><div style="width: 100%; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: .8rem;">';
            html += goods[i].title;
            html += '</div><div style="width: 100%; color: #7d7c7c; height: 1rem; line-height: 1rem;">订单日期： <span class="se-order-time">';
            html += orderDetail.paytime;
            html += '</span></div><div style="width: 100%; display: flex; justify-content: space-between; position: absolute; bottom: 0;"><div style="color: red;">共';
            html += goods[i].total;
            html += '件商品：¥<span class="se-order-total">';
            html += goods[i].price;
            html += '</span></div><div style="color: #949494;">数量：<span class="se-order-count">';
            html += goods[i].total;
            html += '</span>件</div></div></div>'
        }

        $('.se-status').html(orderDetail.statusstr);
        $('.se-order-sn').html(orderDetail.ordersn);
        $('.se-order-address-user').html(address.realname);
        $('.se-order-address-phone').html(address.mobile);
        $('.se-order-address-address').html(address.province+address.city+address.area+address.address);

        $('.se-order-goods').html(html);

        var op = '<option value="0">其他快递</option>';
        for (var i = 0; i < express.length; i++) {
            op += '<option value="';
            op += (i + 1);
            op += '">';
            op += express[i].name;
            op += '</option>';
        }

        $('#se-plugin-express').html(op);
    };

    // 发货modal
    modal.sendModal = function () {


        // 点击发货
        $(".se-send-btn").click(function() {
            var id = $(this).attr('data-id');

            for (var i = modal.orderList.length - 1; i >= 0; i--) {
                if (id == modal.orderList[i].id) modal.orderDetail = modal.orderList[i];
            }


            modal.setOrderDetail();
            $('.se-send').show();
        });

        // 点击返回
        $(".se-order-cancel").click(function() {
            $('.se-send').hide();
        });

        // 点击确认发货
        $('.se-order-confirm').click(function() {
            console.log(modal);
            var expresssn = $('.se-express-sn').val();

            if (!expresssn) {
                alert('请填写快递单号!'); 
                return;
            }

            var expressVal = $('#se-plugin-express_dummy').val();
            var expressData = modal.express;
            var express = '';
            var expresscom = '';

            for (var i = expressData.length - 1; i >= 0; i--) {
                if (expressData[i].name == expressVal) {
                    express = expressData.express;
                    expresscom = expressData.name;
                }
            }
            core.json('abonus/order/sendConfirm', {
                express: express,
                expresscom: expresscom,
                expresssn: expresssn,
                orderid: modal.orderDetail.id
            }, function (ret) { 
                console.log(ret) 
                window.location.reload();
            })

        });
    };

    modal.changeTab = function (status) {
        if (status == 5) {
            $('.icon-delete').css('color', 'red')
        } else {
            $('.icon-delete').css('color', '#999')
        }
        $('.fui-content').infinite('init');
        $('.content-empty').hide(),
        $('.container').html(''),
        $('.infinite-loading').show();
        modal.page = 1,
        modal.status = status,
        modal.getList()
    };
    modal.loading = function () {
        modal.page++
    };
    modal.getList = function () {
        core.json('abonus/order/get_list', {
            page: modal.page,
            status: modal.status,
            merchid: modal.merchid
        }, function (ret) { 
            var result = ret.result;
            if (result.total <= 0) {
                $('.content-empty').show();
                $('.fui-content').infinite('stop')
            } else {
                $('.content-empty').hide();
                $('.fui-content').infinite('init');
                if (result.list.length <= 0 || result.list.length < result.pagesize) {
                    $('.fui-content').infinite('stop')
                }
            }
            modal.orderList = modal.orderList.concat(result.list);
            modal.express = result.express;
            modal.page++;
            core.tpl('.container', 'tpl_order_index_list', result, modal.page > 1);
            op.init()

            // 调用发货modal
            modal.sendModal();

        })
    };
    return modal
});