/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define('extensions/ads/0.1/mip-ad', ['require', 'customElement'], function (require){
    var customElem = require('customElement');
    
    /**
     * render
     *
     */
    function render () {
        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var tpl = this.getAttribute('tpl');


        switch(tpl) {
            case 'onlyImg':
                renderOnlyImg.call(this);
                break;
            case 'noneImg':
                renderNoneImg.call(this);
                break;
            case 'oneImg':
                renderOneImg.call(this);
                break;
            case 'moreImg':
                renderMoreImg.call(this);
                break;
        }
    }

    /**
     * [renderOnlyImg banner样式渲染函数]
     * 
     * @return
     */
    function renderOnlyImg() {
        var $this = $(this);

        var url = this.getAttribute('href');
        var src = this.getAttribute('src');
        var size = $this.data('size').trim().split(' ');
        var ratio = (size[1]/size[0]*100).toFixed(2);

        var html = [
            '<a href="'+ url +'" class="c-urljump">',
                '<div class="mip-ad-bannerbox" style="padding-bottom:'+ ratio +'%;">',
                    '<img src="'+ src +'">',
                '</div>',
            '</a>'
        ].join('');

        $this.append(html);
    }

    /**
     * [renderNoneImg 无图样式渲染函数]
     * 
     * @return
     */
    function renderNoneImg() {
        var $this = $(this);

        var url = this.getAttribute('url');
        var title = $this.data('title');

        var html = [
            '<a class="c-blocka" href="'+ url +'" class="c-urljump">',
            '    <div class="c-row mip-ad-box">',
            '        <div class="c-span12 c-line-clamp2">',
            '            ' + title,
            '        </div>',
            '    </div>',
            '</a>'
        ].join('');

        $this.append(html);

    }

    /**
     * [renderOneImg 单图样式渲染函数]
     * 
     * @return 
     */
    function renderOneImg() {
        var $this = $(this);

        var url = this.getAttribute('url');
        var src = this.getAttribute('src');
        var title = $this.data('title');

        var html = [
            '<a class="c-blocka" href="'+ url +'" class="c-urljump">',
            '    <div class="c-row mip-ad-box">',
            '        <div class="c-span4">',
            '            <div class="c-img c-img-x">',
            '                <img src="'+ src +'">',
            '            </div>',
            '        </div>',
            '        <div class="c-span8 c-line-clamp2">',
            '            ' + title,
            '        </div>',
            '    </div>',
            '</a>'
        ].join('');

        $this.append(html);
    }

    /**
     * [renderMoreImg 多图样式渲染函数]
     * 
     * @return
     */
    function renderMoreImg() {
        var $this = $(this);

        var url = this.getAttribute('url');
        var src = this.getAttribute('src').split(';');
        var txt = $this.data('txt') ? $this.data('txt').split(';') : [];
        var abs = $this.data('ads') ? $this.data('ads').split(';') : [];
        var title = $this.data('title') || '';
        
        var len = src.length < 3 ? src.length : 3;

        var img_html = '';

        if(len >= 3) {
            for(var index = 0; index < len; index ++) {
                img_html += [
                    '<div class="c-span4">',
                    '    <div class="mip-ad-imgbox">',
                    '        <div class="c-img c-img-x">',
                    '            <img src="'+ src[index] +'">',
                    '        </div>',
                    '        ' + getLineHtml(abs[index],' mip-ad-abs'),
                    '    </div>',
                    '' + getLineHtml(txt[index],''),
                    '</div>',
                ].join('');
            }

            var html = [
                '<a class="c-blocka  mip-ad-box" href="'+ url +'" class="c-urljump">',
                '    <div class="c-row c-gap-bottom-small">',
                '        <div class="c-span12 c-title">' + title + '</div>',
                '    </div>',
                '    <div class="c-row">',
                '         ' + img_html,
                '    </div>',
                '</a>'
            ].join('');

            $this.append(html);
        }
    }

    function getLineHtml(txt, clsname) {
        if(txt) {
            return [
                '<div class="c-line-clamp1' + clsname + '">',
                '    ' + txt,
                '</div>'
            ].join('');
        }
        return '';
    }


    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
       
        this.build = render;
    };
    return customElem;
});

require(['extensions/ads/0.1/mip-ad'], function (mipAdComm) {
    // 引入组件需要的css文件，选填
    MIP.css.mipAd = ".adv {\n  margin: 10px 0;\n  font-size: 13px;\n  background-color: #fff;\n}\n.mip-ad-bannerbox {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.mip-ad-bannerbox img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n.mip-ad-box {\n  padding: 6px 21px;\n  font-size: 13px;\n  line-height: 22px;\n  text-align: justify;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n}\n.mip-ad-imgbox {\n  position: relative;\n}\n.mip-ad-abs {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  line-height: 20px;\n  font-size: 12px;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.6);\n  color: #fff;\n}\n";
    //注册组件
    MIP.registerMipElement('mip-ad', mipAdComm, MIP.css.mipAd);
});

