// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('O([\'f\',\'D\'],3(f,D){c 5={};5.N=3(g){e(S g===Q){g=a}5.g=g;$(\'.6-s P\').h(\'G\').G(3(){c 4=$(j).d(\'4\');c p=$(j).p();e(p==\'\'){l}9.n(\'确认要取消该订单吗?\',\'提示\',3(){5.s(4,p,a)})});$(\'.6-k\').h(\'7\').7(3(){c 4=$(j).d(\'4\');9.n(\'确认要删除该订单吗?\',\'提示\',3(){5.k(4,1)})});$(\'.6-R\').h(\'7\').7(3(){c 4=$(j).d(\'4\');9.n(\'确认要彻底删除该订单吗?\',\'提示\',3(){5.k(4,2)})});$(\'.6-T\').h(\'7\').7(3(){c 4=$(j).d(\'4\');9.n(\'确认要恢复该订单吗?\',\'提示\',3(){5.k(4,0)})});$(\'.6-r\').h(\'7\').7(3(){c 4=$(j).d(\'4\');9.n(\'确认已收到货了吗?\',\'提示\',3(){5.r(4)})});$(\'.6-i\').h(\'7\').7(3(){c 4=$(j).d(\'4\');5.i(4)})};5.s=3(8,z){f.q(\'6/x/s\',{8:8,z:z},3(b){e(b.u==1){e(5.g){v.C=f.J(\'6\')}E{$(".6-H[d-4=\'"+8+"\']").L()}l}9.A.m(b.t)},a,a)};5.k=3(8,y){f.q(\'6/x/k\',{8:8,y:y},3(b){e(b.u==1){e(5.g){v.C=f.J(\'6\')}E{$(".6-H[d-4=\'"+8+"\']").L()}l}9.A.m(b.t)},a,a)};5.r=3(8){f.q(\'6/x/r\',{8:8},3(b){e(b.u==1){v.15();l}9.A.m(b.t)},a,a)};5.i=3(4){o=F 14({16:$(".6-i-17").19(),U:"18-5",13:3(){o.w()}});o.m();$(\'.i-M\').I(\'.w\').h(\'7\').7(3(){o.w()});f.q(\'i/12\',{8:4},3(B){e(B.u==0){9.V(\'生成出错，请刷新重试!\');l}c K=+F Y();$(\'.i-M\').I(\'.Z\').11(\'10\',B.t.1a+"?W="+K).m()},X,a)};l 5});',62,73,'|||function|orderid|modal|order|click|id|FoxUI|true|pay_json|var|data|if|core|fromDetail|unbind|verify|this|delete|return|show|confirm|container|val|json|finish|cancel|result|status|location|close|op|userdeleted|remark|toast|ret|href|tpl|else|new|change|item|find|getUrl|time|remove|pop|init|define|select|undefined|deleted|typeof|recover|extraClass|alert|timestamp|false|Date|qrimg|src|attr|qrcode|maskClick|FoxUIModal|reload|content|hidden|popup|html|url'.split('|'),0,{}))


define(['core', 'tpl'], function (core, tpl) {
    var modal = {};
    modal.init = function (fromDetail) {
        if (typeof fromDetail === undefined) {
            fromDetail = true
        }
        modal.fromDetail = fromDetail;
        $('.order-cancel select').unbind('change').change(function () {
            var orderid = $(this).data('orderid');
            var val = $(this).val();
            if (val == '') {
                return
            }
            FoxUI.confirm('确认要取消该订单吗?', '提示', function () {
                modal.cancel(orderid, val, true)
            })
        });
        $('.order-delete').unbind('click').click(function () {
            var orderid = $(this).data('orderid');
            FoxUI.confirm('确认要删除该订单吗?', '提示', function () {
                modal.delete(orderid, 1)
            })
        });
        $('.order-deleted').unbind('click').click(function () {
            var orderid = $(this).data('orderid');
            FoxUI.confirm('确认要彻底删除该订单吗?', '提示', function () {
                modal.delete(orderid, 2)
            })
        });
        $('.order-recover').unbind('click').click(function () {
            var orderid = $(this).data('orderid');
            FoxUI.confirm('确认要恢复该订单吗?', '提示', function () {
                modal.delete(orderid, 0)
            })
        });
        $('.order-finish').unbind('click').click(function () {
            var orderid = $(this).data('orderid');
            FoxUI.confirm('确认已收到货了吗?', '提示', function () {
                modal.finish(orderid)
            })
        });
        $('.order-verify').unbind('click').click(function () {
            var orderid = $(this).data('orderid');
            modal.verify(orderid)
        })
    };
    modal.cancel = function (id, remark) {
        core.json('order/op/cancel', {
            id: id,
            remark: remark
        }, function (pay_json) {
            if (pay_json.status == 1) {
                if (modal.fromDetail) {
                    location.href = core.getUrl('order')
                } else {
                    $(".order-item[data-orderid='" + id + "']").remove()
                }
                return
            }
            FoxUI.toast.show(pay_json.result)
        }, true, true)
    };
    modal.delete = function (id, userdeleted) {
        core.json('order/op/delete', {
            id: id,
            userdeleted: userdeleted
        }, function (pay_json) {
            if (pay_json.status == 1) {
                if (modal.fromDetail) {
                    location.href = core.getUrl('order')
                } else {
                    $(".order-item[data-orderid='" + id + "']").remove()
                }
                return
            }
            FoxUI.toast.show(pay_json.result)
        }, true, true)
    };
    modal.finish = function (id) {
        core.json('order/op/finish', {
            id: id
        }, function (pay_json) {
            console.log(pay_json);
            if (pay_json.status == 1) {
                location.reload();
                return
            }
            FoxUI.toast.show(pay_json.result)
        }, true, true)
    };
    modal.verify = function (orderid) {
        container = new FoxUIModal({
            content: $(".order-verify-hidden").html(),
            extraClass: "popup-modal",
            maskClick: function () {
                container.close()
            }
        });
        container.show();
        $('.verify-pop').find('.close').unbind('click').click(function () {
            container.close()
        });
        core.json('verify/qrcode', {
            id: orderid
        }, function (ret) {
            if (ret.status == 0) {
                FoxUI.alert('生成出错，请刷新重试!');
                return
            }
            var time = +new Date();
            $('.verify-pop').find('.qrimg').attr('src', ret.result.url + "?timestamp=" + time).show()
        }, false, true)
    };
    return modal
});