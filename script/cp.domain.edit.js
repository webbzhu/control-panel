(function () {
    if ($.DynaCP === undefined) {
        $.DynaCP = {};
    }
    $.DynaCP.DomainEdit = {};

    var initFunctions = {};
    initFunctions.initRenewOptionOverlay = initRenewOptionOverlay;
    initFunctions.initEmailSettingsOverlay = initEmailSettingsOverlay;
    function initTooltips() {
        $
            .each(
                $("a:link[data-toggle='tooltip']"),
                function () {
                    var customClass = $(this).data('custom-class');
                    if (customClass !== undefined) {
                        var template = '<div class="tooltip '
                            + customClass
                            + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
                        $(this).tooltip({
                            container: 'body',
                            template: template
                        });
                    } else {
                        $(this).tooltip({
                            container: 'body'
                        });
                    }
                });
    }

    function initTabs() {
        $('#cp-domain-edit-sc-nav li').click(function () {
            if (!$(this).hasClass('active')) {
                var link = $(this).find('a');
                if (link.length > 0) {
                    var id = link.attr('data-id');
                    var show = $('#' + id);
                    if (show.length > 0) {
                        show.siblings().hide();
                        show.show();
                    }
                }
                $(this).siblings().each(function () {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active')
                    }
                });
                $(this).addClass('active');
            }
        });
    }

    function initButtons() {
        $('.cp-button').click(function () {
            var cmd = $(this).attr('cmd');
            if (typeof cmd !== typeof undefined && cmd !== false) {
                var url = window.location.pathname;
                var data = {};
                data.cmd = cmd;
                data['edit-domain'] = 1;
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data
                }).done(function (responseData) {
                    $.DynaCP.parseJson(responseData).then(function (json) {
                        if (json.code === '0') {
                            removeError();
                            if (json.hasOwnProperty('content') && json.hasOwnProperty('init')) {
                                $.DynaCP.Overlay.createOverlay(json.content, initFunctions[json.init]);
                            } else {
                                $.DynaCP.Notice.createNotice('Unknown Error');
                            }

                        } else {
                            if (json.hasOwnProperty('error_message')) {
                                createError(json.error_message);
                            }

                        }
                    }).catch(function (e) {
                    });

                })
            }
        });
    }

    function removeError() {
        var err = $('#domain-edit-error');
        if (err.length > 0) {
            error.remove();
        }
    }

    function createError(msg) {
        var err = $('#domain-edit-error');
        if (err.length > 0) {
            err.html(msg);
        } else {
            var head = $('domain-edit-header');
            if (head.length > 0) {
                err = $('<div id="domain-edit-error"></div>');
                err.html(msg);
                err.insertAfter(head);
            }
        }
    }

    function init() {
        initTooltips();
        initTabs();
        initButtons();
    }

    function initRenewOptionOverlay() {
        var select = $('#domain-edit-renew-options-select');
        var save = $('#domain-edit-renew-options-save')
        if (select.length > 0) {
            select.change(function () {
                if (save.is(":disabled")) {
                    save.prop('disabled', false);
                }
            });
        }
        $('#cp-overlay input[type="button"]').click(function () {
            if ($(this).hasClass('cp-overlay-cancel')) {
                $.DynaCP.Overlay.closeOverlay();
            } else {
                var id = $(this).attr('id');
                if (id === 'domain-edit-renew-options-save') {
                    var form = $('#cp-overlay-renew-option-form');
                    if (form.length > 0) {
                        var data = {}, url = window.location.pathname;
                        $.each(form.serializeArray(), function () {
                            data[this.name] = this.value
                        });
                        data.form_name = form.attr('data-name');
                        data['edit-domain'] = 1;
                        $.ajax({
                            url: url,
                            type: "POST",
                            data: data
                        }).done(function (responseData) {
                            $.DynaCP.parseJson(responseData).then(function (json) {
                                if (json.hasOwnProperty('code')) {
                                    if (json.code === '0') {
                                        $.DynaCP.Overlay.closeOverlay();
                                        var info = $('#cp-domain-edit-sc-settings-row-renew-option').find('.cp-domain-edit-sc-settings-row-info');
                                        if (info.length > 0) {
                                            info.html(json.update_info);
                                        }
                                        $.DynaCP.Notice.createNotice(json.message);
                                    } else {
                                        if (json.hasOwnProperty('error_message')) {
                                            $.DynaCP.Overlay.createOverlayError(json.error_message);
                                        }
                                    }
                                }
                            }).catch(function (e) {
                            });

                        })

                    }
                }
            }
        });
    }

    function initEmailSettingsOverlay() {
        var overlay = $('#domain-edit-email-settings');
        if (overlay.length > 0) {
            var save = $('#domain-edit-email-settings-save');
            emailSettingsSeleteContent();
            overlay.on('propertychange change keyup input paste', 'input[type=text]', function (e) {
                if (save.is(":disabled")) {
                    save.prop('disabled', false);
                }
            });
            $('#domain-edit-email-settings-select').change(function () {
                emailSettingsSeleteContent();
                if (save.is(":disabled")) {
                    save.prop('disabled', false);
                }
            });
            $('#email-settings-forward-add').click(function () {
                var form = $('#email-settings-forward-form');
                if (form.length > 0) {
                    var max = form.attr('data-max');
                    if (typeof max !== typeof undefined && max !== false) {
                        if ($.isNumeric(max)) {
                            var maxInt = parseInt(max);
                            var rows = form.children('.alia-row');
                            if (rows.length > 0 && rows.length < maxInt) {
                                var row = $('<div class="email-setting-row alia-row"></div>'), r = rows[rows.length - 1];
                                row.html($(r).html());
                                $.each(row.find('input[type=text]'), function () {
                                    $(this).val('');
                                });
                                row.appendTo(form);
                                if (save.is(":disabled")) {
                                    save.prop('disabled', false);
                                }
                            }
                        }
                    }
                }
            });

            $('#email-settings-mx-add').click(function () {
                var form = $('#email-settings-mx-form');
                if (form.length > 0) {
                    var max = form.attr('data-max');
                    if (typeof max !== typeof undefined && max !== false) {
                        if ($.isNumeric(max)) {
                            var maxInt = parseInt(max);
                            var rows = form.children('.mx-row');
                            if (rows.length > 0 && rows.length < maxInt) {
                                var row = $('<div class="email-setting-row mx-row"></div>'), r = rows[rows.length - 1];
                                row.html($(r).html());
                                $.each(row.find('input[type=text]'), function () {
                                    $(this).val('');
                                });
                                row.appendTo(form);
                                if (save.is(":disabled")) {
                                    save.prop('disabled', false);
                                }
                            }
                        }
                    }
                }
            });


            $('#email-settings-forward-form').delegate(".email-setting-delete-forward", "click", function () {
                var rows = $('#email-settings-forward-form').children('.alia-row');
                if (rows.length > 1) {
                    var row = $(this).parents('.alia-row');
                    if (row.length > 0) {
                        row.remove();
                        if (save.is(":disabled")) {
                            save.prop('disabled', false);
                        }
                    }
                }
            });

            $('#email-settings-mx-form').delegate(".email-setting-delete-mx", "click", function () {
                var rows = $('#email-settings-mx-form').children('.mx-row');
                if (rows.length > 1) {
                    var row = $(this).parents('.mx-row');
                    if (row.length > 0) {
                        row.remove();
                        if (save.is(":disabled")) {
                            save.prop('disabled', false);
                        }
                    }
                }
            });

            $('#domain-edit-email-settings-save').click(function(){
                submitEmailSettings();
            })
        }
    }

    function emailSettingsSeleteContent() {
        var val = $('#domain-edit-email-settings-select option:selected').val();
        $.each($('#domain-edit-email-settings .email-settings-content'), function () {
            var id = $(this).attr('id');
            if ((val === '1' && id === 'email-settings-forward') || (val === '2' && id === 'email-settings-mx')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    }

    function submitEmailSettings() {
        var m_type = $('#domain-edit-email-settings-select option:selected').val();
        var data = {};
        var canSubmit = false;
        if(m_type==='0'){
            canSubmit = true;
        }else if (m_type === '1') {
            var form = $('#email-settings-forward-form');
            if (form.length > 0) {
                var lable = form.attr('data-label');
                if (lable.length > 0) {
                    var index = 0;
                    $.each(form.find('.alia-row'), function () {
                        var emailUserInput = $(this).find('.email-user-input');
                        var emailToInput = $(this).find('.email-to-input');
                        if (emailUserInput.length > 0 && emailToInput.length > 0) {
                            var emailUser = emailUserInput.val(), emailTo = emailToInput.val();
                            if (emailUser.length > 0) {
                                emailUser = emailUser.trim();
                            }
                            if (emailTo.length > 0) {
                                emailTo = emailTo.trim();
                            }
                            if (emailUser.length > 0 && emailTo.length > 0) {
                                data[lable+'_alias_user_'+index] = emailUser;
                                data[lable+'_alias_email_'+index] = emailTo;
                                index++;
                                if(!canSubmit){
                                    canSubmit = true;
                                }
                            }
                        }
                    });
                }
            }
        } else if (m_type === '2') {
            var form = $('#email-settings-mx-form');
            if (form.length > 0) {
                var lable = form.attr('data-label');
                if (lable.length > 0) {
                    var index = 0;
                    $.each(form.find('.mx-row'), function () {
                        var mxHostInput = $(this).find('.mx-host-input');
                        var mxDistanceInput = $(this).find('.mx-distance-input');
                        if (mxHostInput.length > 0 && mxDistanceInput.length > 0) {
                            var mxHost = mxHostInput.val(), mxDistance = mxDistanceInput.val();
                            if (mxHost.length > 0) {
                                mxHost = mxHost.trim();
                            }
                            if (mxDistance.length > 0) {
                                mxDistance = mxDistance.trim();
                            }
                            if (mxHost.length > 0 && mxDistance.length > 0) {
                                data[lable+'_host_'+index] = mxHost;
                                data[lable+'_dist_'+index] = mxDistance;
                                index++;
                                if(!canSubmit){
                                    canSubmit = true;
                                }
                            }
                        }
                    });
                }
            }
        }
        if(canSubmit){
            var url = window.location.pathname;
            data.glue_basic_mtype = m_type;
            data.form_name = 'form-email-settings';
            data['edit-domain'] = 1;
            $.ajax({
                url: url,
                type: "POST",
                data: data
            }).done(function (responseData) {
                $.DynaCP.parseJson(responseData).then(function (json) {
                    if (json.hasOwnProperty('code')) {
                        if (json.code === '0') {
                            $.DynaCP.Overlay.closeOverlay();
                            var info = $('#cp-domain-edit-sc-settings-row-email-settings').find('.cp-domain-edit-sc-settings-row-info');
                            if (info.length > 0) {
                                info.html(json.update_info);
                            }
                            $.DynaCP.Notice.createNotice(json.message);
                        } else {
                            if (json.hasOwnProperty('error_message')) {
                                $.DynaCP.Overlay.createOverlayError(json.error_message);
                            }
                        }
                    }
                }).catch(function (e) {
                });

            })
        }

    }

    $(document).ready(function () {
        init();
// $('body').click(function (e) {
// console.log(e.target);
// });
    });
})();