// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('1e([\'j\',\'L\',\'1b/A/v\'],5(j,L,v){4 d={e:{}};d.H=5(e){d.e.p=e.p;v.H({1g:n});$(\'.s-m\').F(5(){f($(3).c(\'w\')){k}K.13(\'确定您要取消申请?\',\'\',5(){$(3).c(\'w\',1).c(\'B\',$(3).8()).8(\'正在处理..\');j.X(\'A/T/m\',{\'i\':d.e.p},5(z){f(z.V==1){6.U=j.W(\'A/11\',{i:d.e.p});k}t{K.Y.q(z.Z.10)}$(\'.s-m\').J(\'w\').8($(\'.s-m\').c(\'B\')).J(\'B\')},n,n)})});$(\'.S-R\').F(5(){4 7=$(3).c(\'7\');4 i="12"+7;4 h=$(3).c(\'h\');f(h==\'1\'){$("."+i).1s()}t{$("."+i).1l()}$(3).c(\'h\',h==\'1\'?\'0\':\'1\')});f($(\'#M\').1k>0){4 g=[];4 I=1j 1i.1m();I.1n(5(r){4 1r=3;f(3.14()==1p){4 l=r.E.l,o=r.E.o;$(\'.P-1h\').N(5(){4 6=$(3).C(\'.6\');4 x=$(3).7(\'o\'),y=$(3).7(\'l\');f(x>0&&y>0){4 9=j.19(o,l,x,y);$(3).7(\'9\',9);6.8(\'距离您: \'+9.18(2)+"17").q()}t{$(3).7(\'9\',15);6.8(\'无法获得距离\').q()}g.16($(3))});g.1a(5(a,b){k a.7(\'9\')-b.7(\'9\')});$.N(g,5(){$(\'.P-1d\').O(3)});$(\'#M\').q();$(\'#u\').O($(g[0]).8());4 6=$(\'#u\').C(\'.6\').8();$(\'#u\').C(\'.6\').8(6+"<Q 1q=\'D-G D-G-1c\'>最近</Q> ");$(g[0]).1f()}},{1o:n})}};k d});',62,91,'|||this|var|function|location|data|html|distance|||attr|modal|params|if|arr|hide|id|core|return|lat|cancel|true|lng|orderid|show||btn|else|nearStoreHtml|op|stop|store_lng|store_lat|postjson|order|buttontext|find|fui|point|click|label|init|geolocation|removeAttr|FoxUI|tpl|nearStore|each|append|store|span|diyinfo|look|refund|href|status|getUrl|json|toast|result|message|detail|diyinfo_|confirm|getStatus|999999999999999999|push|km|toFixed|getDistanceByLnglat|sort|biz|danger|container|define|remove|fromDetail|item|BMap|new|length|slideUp|Geolocation|getCurrentPosition|enableHighAccuracy|BMAP_STATUS_SUCCESS|class|_this|slideDown'.split('|'),0,{}))


define(['core', 'tpl', 'biz/order/op'], function (core, tpl, op) {
    var modal = {
        params: {}
    };
    modal.init = function (params) {
        modal.params.orderid = params.orderid;
        op.init({
            fromDetail: true
        });
        $('.btn-cancel').click(function () {
            if ($(this).attr('stop')) {
                return
            }
            FoxUI.confirm('确定您要取消申请?', '', function () {
                $(this).attr('stop', 1).attr('buttontext', $(this).html()).html('正在处理..');
                core.json('order/refund/cancel', {
                    'id': modal.params.orderid
                }, function (postjson) {
                    if (postjson.status == 1) {
                        location.href = core.getUrl('order/detail', {
                            id: modal.params.orderid
                        });
                        return
                    } else {
                        FoxUI.toast.show(postjson.result.message)
                    }
                    $('.btn-cancel').removeAttr('stop').html($('.btn-cancel').attr('buttontext')).removeAttr('buttontext')
                }, true, true)
            })
        });
        $('.look-diyinfo').click(function () {
            var data = $(this).attr('data');
            var id = "diyinfo_" + data;
            var hide = $(this).attr('hide');
            if (hide == '1') {
                $("." + id).slideDown()
            } else {
                $("." + id).slideUp()
            }
            $(this).attr('hide', hide == '1' ? '0' : '1')
        });
        if ($('#nearStore').length > 0) {
            var arr = [];
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                var _this = this;
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var lat = r.point.lat,
                        lng = r.point.lng;
                    $('.store-item').each(function () {
                            var location = $(this).find('.location');
                            var store_lng = $(this).data('lng'),
                                store_lat = $(this).data('lat');
                            if (store_lng > 0 && store_lat > 0) {
                                    var distance = core.getDistanceByLnglat(lng, lat, store_lng, store_lat);
                                    $(this).data('distance', distance);
                                    location.html('距离您: ' + distance.toFixed(2) + "km").show()
                                } else {
                                    $(this).data('distance', 999999999999999999);
                                    location.html('无法获得距离').show()
                                }
                            arr.push($(this))
                        });
                    arr.sort(function (a, b) {
                            return a.data('distance') - b.data('distance')
                        });
                    $.each(arr, function () {
                            $('.store-container').append(this)
                        });
                    $('#nearStore').show();
                    $('#nearStoreHtml').append($(arr[0]).html());
                    var location = $('#nearStoreHtml').find('.location').html();
                    $('#nearStoreHtml').find('.location').html(location + "<span class='fui-label fui-label-danger'>最近</span> ");
                    $(arr[0]).remove()
                }
            }, {
                enableHighAccuracy: true
            })
        }
    };
    return modal
});