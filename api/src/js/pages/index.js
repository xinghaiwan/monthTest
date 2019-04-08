require(['js/config.js'], function() {
    require(['mui'], function(mui) {
        console.log(mui);

        function init() {
            mui.init();
            getData();
            bindEvent();
        }

        function getData() {
            mui.ajax('/api/allInfo', {
                type: 'post',
                data: {},
                success: function(rs) {
                    if (rs.code === 1) {
                        renderList(rs.data);
                    }
                }
            });
        }

        function renderList(data) {
            data.map(item => {
                main.innerHTML += `<div id="box">
                                        <p><span id="n">${item.name}</span><span>${item.phone}</span></p>
                                        <p>${item.address}</p>
                                        <div class="check">
                                            <div>
                                                <input name="radio" type="radio" checked>
                                                <label>设为默认</label>
                                            </div>
                                            <div class="clickBox">
                                                <button id='confirmBtn' type="button" class="mui-btn mui-btn-blue mui-btn-outlined">删除</button>
                                                <button id="up">修改</button>
                                            </div>
                                        </div>
                                    </div>`
            }).join('');
            var n = document.getElementById('n').innerHTML;

        }
        //绑定事件
        function bindEvent() {
            var btn = document.getElementById("newAdd");
            //点击新建
            btn.addEventListener("tap", function() {
                location.href = '../page/newAdd.html'
            });
            mui("#main").on('tap', '#confirmBtn', delData);
            mui("#main").on('tap', '#up', upData);
        }
        //点击删除
		 function delData() {
			var bigBox = this.parentNode.parentNode.parentNode;
		   document.getElementById("confirmBtn").addEventListener('tap', function() {
		   	var btnArray = ['否', '是'];
		   	mui.confirm('确定要删除该地址吗？', '提示', btnArray, function(e) {
		   		if (e.index == 1) {
					//删除数据		
					bigBox.remove();
		   		} else {
		   			//隐藏弹框				
					confirmBtn.innerText = '';		
		   		}
		   	})
		   });
		}

        //点击修改
        function upData() {
            mui.ajax('/api/allInfo', {
                type: 'post',
                data: {},
                success: function(rs) {
                    if (rs.code === 1) {
                        console.log(rs.data);
                    }
                }
            });
            location.href = '../page/upData.html';
        }
        init();
    });
});