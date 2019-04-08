require(['../js/config.js'], function() {
    require(['mui'], function(mui) {
        console.log(mui)

        function init() {
            bindEvent();
        }

        function bindEvent() {
            var done = document.getElementById('done');

            done.addEventListener('tap', function() {
                var name = document.querySelector('.name').value.trim();
                var phone = document.querySelector('.phone').value.trim();
                var show = document.querySelector('.show').value.trim();
                var address = document.querySelector('.address').value.trim();
                if (name.length == 0 || phone.length == 0 || show.length == 0 || address == 0) {
                    alert('请输入该信息!')
                } else {
                    //添加用户
                    mui.ajax('/api/addInfo', {
                        type: 'post',
                        data: {
                            name: name,
                            phone: phone,
                            address: show + address
                        },
                        success: function(rs) {
                            if (rs.code === 1) {
                                location.href = '../../index.html'
                            }
                        }
                    });
                }
            });
        }
        init();
    });
});