﻿$(function () {
    $(".container").autoCenter();

    $("a[data-method]").on('click', function () {
        var $this = $(this);
        switch ($this.attr("data-method")) {
            case "register":
                $("#dialogNew").modal('show');
                break;
            case "forgot":
                $("#dialogForgot").modal('show');
                break;
        }
    });

    $.extend({
        captchaCheck: function (success) {
            $.bc({
                url: "api/OnlineUsers",
                method: "put",
                callback: function (result) {
                    if (result) $captcha.addClass('d-block');
                    else success();
                }
            });
        }
    });

    $('#btnSubmit').on('click', function () {
        $.bc({
            url: "api/Register",
            data: { UserName: $('#userName').val(), Password: $('#password').val(), DisplayName: $('#displayName').val(), Description: $('#description').val() },
            modal: '#dialogNew',
            method: "post",
            callback: function (result) {
                var title = result ? "提交成功<br/>等待管理员审批" : "提交失败";
                lgbSwal({ timer: 1500, title: title, type: result ? "success" : "error" });
            }
        });
    });

    $('#btnForgot').on('click', function () {
        $.bc({
            url: "api/Register",
            data: { UserName: $('#f_userName').val(), DisplayName: $('#f_displayName').val(), Reason: $('#f_desc').val() },
            modal: '#dialogForgot',
            method: "put",
            callback: function (result) {
                var title = result ? "提交成功<br/>等待管理员重置密码" : "提交失败";
                lgbSwal({ timer: 1500, title: title, type: result ? "success" : "error" });
            }
        });
    });

    $('.rememberPwd').on('click', function () {
        var $this = $(this);
        var $check = $this.find('i');
        var $rem = $('#remember');
        if ($check.hasClass('fa-square-o')) {
            $check.addClass('fa-check-square-o').removeClass('fa-square-o');
            $rem.val('true');
        } else {
            $check.addClass('fa-square-o').removeClass('fa-check-square-o');
            $rem.val('false');
        }
    });

    var $captcha = $('.slidercaptcha');
    $('.slidercaptcha .close').on('click', function () {
        $captcha.removeClass('d-block');
    });

    $('button[type="submit"]').on('click', function (e) {
        $.captchaCheck(function () {
            $('form').submit();
        });
        return false;
    });

    $('#captcha').sliderCaptcha({
        width: $(window).width() < 768 ? 216 : 280,
        height: $(window).width() < 768 ? 110 : 150,
        setSrc: function () {
            return 'http://pocoafrro.bkt.clouddn.com/Pic' + Math.round(Math.random() * 136) + '.jpg';
        },
        onSuccess: function () {
            $('form').submit();
        }
    });
});