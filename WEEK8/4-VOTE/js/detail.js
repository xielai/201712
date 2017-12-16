let detailRender = (function ($) {
    let passId = null,
        $plan = $.Callbacks();

    let $headerBox = $('.headerBox');

    //=>数据绑定
    $plan.add(result=> {
        let {id, name, picture, sex, phone, bio, isMatch, matchId, slogan, voteNum}=result;

        let str = ``;
        str += `<div class="userInfo">
            <img src="${picture}" alt="" class="picture">
            <p class="info">
                <span>${name}</span>
                ${isMatch == 1 ? ` | <span>编号 #${matchId}</span>` : ``}
            </p>
            <p class="bio">${bio}</p>
            ${isMatch == 1 ? `<div class="vote">${voteNum}</div>` : ``}
        </div>
        ${isMatch == 1 ? `<div class="slogan">${slogan}</div>
        <a href="javascript:;" class="voteBtn">投他一票</a>` : ``}
        `;
        $headerBox.html(str);
    });

    //=>获取详细信息
    let queryData = function () {
        $.ajax({
            url: '/getUser',
            dataType: 'json',
            data: {userId: passId},
            success: result=> {
                let {code, message, data}=result;
                if (code == 0) {
                    //->SUCCESS
                    $plan.fire(data);
                    return;
                }
                //->ERROR:提示客户当前查询的客户信息不匹配,点击确定后,回到首页面(这块的需求有产品决定或者自己处理即可)
                /*alert('您所查询的数据不匹配！');//=>真实项目中最好不要使用ALERT或者CONFIRM这些内置的弹出框(内置的太丑),有些APP会自动屏蔽ALERT
                 window.location.href = 'index.html';*/
                Dialog.show('您所查询的数据不匹配!', {
                    callBack: ()=> {
                        window.location.href = 'index.html';
                    }
                });
            }
        });
    };

    return {
        init: function () {
            //=>获取地址栏中传递进来USER-ID的值
            //window.location.href:获取当前页面URL地址
            //window.location.href='xxx':在JS中让页面跳转到XXX页面(在本页面实现页面跳转,不是以新窗口跳转)
            //window.open('xxx'):这个也是JS中页面跳转的方式(基于新窗口打开页面,等价于A中 target='_blank')
            passId = window.location.href.myQueryURLParameter()['userId'];

            queryData();
        }
    }
})(Zepto);
detailRender.init();