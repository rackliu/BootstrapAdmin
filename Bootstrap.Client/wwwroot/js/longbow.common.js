﻿(function ($) {
    // 增加Array扩展
    if (!$.isFunction(Array.prototype.filter)) {
        Array.prototype.filter = function (callback, thisObject) {
            if ($.isFunction(callback)) {
                var res = new Array();
                for (var i = 0; i < this.length; i++) {
                    callback.call(thisObject, this[i], i, this) && res.push(this[i]);
                }
                return res;
            }
        };
    }

    // 增加String扩展
    if (!$.isFunction(String.prototype.trim)) {
        String.prototype.trim = function () {
            if (this === null) return "";
            var trimLeft = /^\s+/, trimRight = /\s+$/;
            return this.replace(trimLeft, "").replace(trimRight, "");
        };
    }

    // 扩展Date
    if (!$.isFunction(Date.prototype.format)) {
        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12,
                "H+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            var week = {
                0: "日",
                1: "一",
                2: "二",
                3: "三",
                4: "四",
                5: "五",
                6: "六"
            };

            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

            if (/(E+)/.test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + week[this.getDay()]);

            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        };
    }

    // 扩展format
    $.extend({
        "format": function (source, params) {
            if (params === undefined) {
                return source;
            }
            if (arguments.length > 2 && params.constructor !== Array) {
                params = $.makeArray(arguments).slice(1);
            }
            if (params.constructor !== Array) {
                params = [params];
            }
            $.each(params, function (i, n) {
                source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                    return n;
                });
            });
            return source;
        }
    });

    // enhance window.console.log
    if (!window.console) {
        window.console = {
            log: function () {

            }
        };
    }
    window.console = window.console || {};
    console.log || (console.log = opera.postError);

    // client
    jQuery.browser = {
        versions: function () {
            var u = navigator.userAgent;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPod: u.indexOf('iPod') > -1, //是否为iPod或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };

    $.extend({
        bc: function (options) {
            options = $.extend({
                id: "",
                url: "",
                data: {},
                title: "",
                modal: false,
                loading: false,
                loadingTimeout: 10000,
                callback: false,
                cors: false,
                contentType: 'application/json',
                dataType: 'json',
                method: 'get'
            }, options);

            if (!options.url || options.url === "") {
                toastr.error('参数错误: 未设置请求地址Url');
                return;
            }

            var loadFlag = "loading";
            if (options.loading && options.modal) {
                var $modal = $(options.modal);
                if (!$modal.hasClass('event')) {
                    $modal.on('shown.bs.modal', function () {
                        var $this = $(this);
                        if ($this.hasClass(loadFlag)) return;
                        $this.modal('hide');
                    });
                }
                $(options.modal).addClass(loadFlag).modal('show');
                setTimeout(function () {
                    $(options.modal).find('.close').removeClass('d-none');
                }, options.loadingTimeout);
            }


            var data = options.method === 'get' ? options.data : JSON.stringify(options.data);
            var url = options.id !== '' ? options.url + '/' + options.id : options.url;
            if (options.query) {
                var qs = [];
                for (var key in options.query) {
                    qs.push($.format("{0}={1}", key, options.query[key]));
                }
                url = url + "?" + qs.join('&');
            }

            function success(result) {
                if ($.isFunction(options.callback)) {
                    options.callback.call(options, result);
                }
                if (options.modal && (result || options.loading)) {
                    $(options.modal).modal('hide');
                }
                if (options.title) toastr[result ? 'success' : 'error'](options.title + (result ? "成功" : "失败"));
            }

            var ajaxSettings = {
                url: $.formatUrl(url),
                data: data,
                method: options.method,
                contentType: options.contentType,
                dataType: options.dataType,
                crossDomain: false,
                success: function (result) {
                    success(result);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    success(false);
                }
            };
            if (options.cors) $.extend(ajaxSettings, {
                xhrFields: { withCredentials: true },
                crossDomain: true
            });
            $.ajax(ajaxSettings);
        },
        lgbSwal: function (options) {
            if ($.isFunction(swal)) {
                swal($.extend({ html: true, showConfirmButton: false, showCancelButton: false, timer: 1000, title: '未设置', type: "success" }, options));
            }
        },
        getUID: function (prefix) {
            if (!prefix) prefix = 'lgb';
            do prefix += ~~(Math.random() * 1000000);
            while (document.getElementById(prefix));
            return prefix;
        },
        formatUrl: function (url) {
            if (!url) return url;
            if (url.substr(0, 4) === "http") return url;
            var base = $('#pathBase').attr('href');
            return base + url;
        }
    });

    window.lgbSwal = $.lgbSwal;

    $.fn.extend({
        autoCenter: function (options) {
            options = $.extend({ top: 0 }, options);
            var that = this;
            var defaultVal = parseFloat(that.css('marginTop').replace('px', ''));
            var getHeight = function () {
                return Math.max(defaultVal, ($(window).height() - options.top - that.outerHeight()) / 2 + $(document).scrollTop());
            };
            $(window).resize(function () {
                that.css({ marginTop: getHeight() });
            });
            that.css({ marginTop: getHeight(), transition: "all .5s linear" });
            return this;
        },
        footer: function (options) {
            var op = $.extend({ header: "header", content: ".container-fluid" }, options);
            return $(op.header).outerHeight() + $(op.content).outerHeight() + this.outerHeight() > $(window).height() ? this.removeClass('position-fixed') : this.addClass('position-fixed');
        },
        lgbTable: function (options) {
            var bsa = new DataTable($.extend(options.dataBinder, { url: options.url }));

            var settings = $.extend({
                url: options.url,
                checkbox: true,
                edit: true,
                editTitle: "编辑",
                editField: "Id",
                queryButton: false
            }, options.smartTable);
            if (settings.edit) settings.columns.unshift({
                title: settings.editTitle,
                field: settings.editField,
                events: bsa.idEvents(),
                formatter: function (value, row, index) {
                    return "<a class='edit' title='" + value + "' href='javascript:void(0)'>" + this.title + "</a>";
                }
            });
            if (settings.checkbox) settings.columns.unshift({ checkbox: true });
            return this.smartTable(settings);
        },
        smartTable: function (options) {
            var settings = $.extend({
                toolbar: '#toolbar',                //工具按钮用哪个容器
                striped: true,                      //是否显示行间隔色
                cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortOrder: "asc",                   //排序方式
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1,                      //初始化加载第一页，默认第一页
                pageSize: 20,                       //每页的记录行数（*）
                pageList: [20, 40, 80, 120],        //可供选择的每页的行数（*）
                showColumns: true,                  //是否显示所有的列
                showRefresh: true,                  //是否显示刷新按钮
                showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
                cardView: $(window).width() < 768,                    //是否显示详细视图
                footer: '.site-footer',
                queryButton: '#btn_query',
                onLoadSuccess: function () {
                    $(settings.footer).footer();
                }
            }, options);
            settings.url = $.formatUrl(settings.url);
            this.bootstrapTable(settings);
            $(settings.toolbar).removeClass('d-none').find('.toolbar').on('click', 'a', function (e) {
                e.preventDefault();
                $('#' + $(this).attr('id').replace('tb_', 'btn_')).trigger("click");
            }).insertBefore(this.parents('.bootstrap-table').find('.fixed-table-toolbar > .bs-bars'));
            if (settings.queryButton) {
                $(settings.queryButton).on('click', this, function (e) {
                    e.data.bootstrapTable('refresh');
                });
            }
            return this;
        },
        lgbDatePicker: function (options) {
            if (!$.isFunction(this.datetimepicker)) return this;
            var option = $.extend({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
                format: 'yyyy-mm-dd',
                pickerPosition: 'bottom-left',
                fontAwesome: true
            }, options);
            this.datetimepicker(option);
            return this;
        },
        lgbIndicator: function (options) {
            if (/update/.test(options)) {
                var $indicator = this.data('radialIndicator');
                if ($indicator.indOption.percentage) $indicator.animate(this.attr('data-val') * 100 / this.attr('data-max'));
                else $indicator.value(this.attr('data-val'));
                return this;
            }
            this.each(function () {
                var op = $.extend({
                    barColor: {
                        0: '#33CC33',
                        70: '#c5c521',
                        80: '#e46121',
                        90: '#c92b2b',
                        100: '#FF0000'
                    },
                    radius: 34,
                    interaction: false,
                    barWidth: 5,
                    roundCorner: true,
                    percentage: true,
                }, options);
                var $this = $(this);
                $this.radialIndicator(op);
                if ($this.attr('data-val')) {
                    var $indicator = $this.data('radialIndicator');
                    if ($indicator.indOption.percentage) $indicator.animate($this.attr('data-val') * 100 / $this.attr('data-max'));
                    else $indicator.value($this.attr('data-val'));
                }
            });
            return this;
        },
        lgbCountUp: function (options) {
            options = $.extend({}, options);
            this.each(function () {
                var option = {
                    useEasing: true,
                    useGrouping: false,
                    separator: ',',
                    decimal: '.'
                };
                var $element = $(this);
                var startVal = options.startVal || 0;
                var endVal = $element.text() || 100;
                var decimals = options.decimals || 0;
                var count = new CountUp(this, startVal, endVal, decimals, 1, $.extend(option, options));
                count.start();
            });
            return this;
        },
        getTextByValue: function (key, value) {
            // 通过Key指定一个下拉框，通过value获得下拉框value值的text属性
            if (this.length !== 1) throw 'element must be one';
            var ele = this.get(0);
            if (!ele[key]) {
                ele[key] = {};
                var that = ele;
                $.each($('#' + key).children(), function (index, element) {
                    that[key][$(element).attr('value')] = $(element).text();
                });
            }
            return ele[key][value];
        },        
        lgbInfo: function (option) {
            this.each(function () {
                var $element = $(this);
                $element.append($.format('<a href="#" tabindex="-1" role="button" data-toggle="popover"><i class="fa fa-question-circle"></i></a>'));
            });
            var container = $(this).parent().attr('data-container') || '#dialogNew';
            this.find('[data-toggle="popover"]').popover($.extend({
                title: function () {
                    return $(this).parent().text();
                }, content: function () {
                    return $(this).parent().attr('data-content');
                }, trigger: 'focus', html: true, container: container
            }, option));
            return this;
        },
        notifi: function (options) {
            var op = $.extend({ url: '', method: 'rev', callback: false }, options);
            var connection = new signalR.HubConnectionBuilder().withUrl($.formatUrl(op.url)).build();
            var that = this;
            connection.on(op.method, function () {
                if ($.isFunction(op.callback)) {
                    op.callback.apply(that, arguments);
                }
            });
            connection.start().catch(function (err) {
                return console.error(err.toString());
            });
            return this;
        }
    });

    //extend dropdown method
    $.extend($.fn.dropdown.Constructor.prototype, {
        val: function () {
            var $element = $(this._element);
            var $op = $(this._menu).find('[data-val="' + $element.val() + '"]:first');
            $element.text($op.text());
        },
        select: function () {
            var $element = $(this._element);
            $(this._menu).on('click', 'a', function (event) {
                event.preventDefault();
                var $op = $(this);
                $element.text($op.text()).val($op.attr('data-val'));
            });
        }
    });

    $(function () {
        $('[data-toggle="dropdown"].dropdown-select').dropdown('select');
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="lgbinfo"]').lgbInfo();
        $('.date').lgbDatePicker();
    });
})(jQuery);