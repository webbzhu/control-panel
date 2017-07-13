(function() {
  if ($.DynaCP === undefined) {
    $.DynaCP = {};
  }
  $.DynaCP.Account = {};

  var initFunctions = {};
  initFunctions.initUnlockAccountOverlay = initUnlockAccountOverlay;

  function init() {
    initUnlockAccount();
    initUnlockAccountOverlay();
  }

  function initUnlockAccountOverlay() {
    var form = $("#cp-overlay-unlock-account-form");
    var select = form.find('select');
    if (select.length > 0) {
      select.change(function() {
        var m = form.find("select[name='form_birthday_month']");
        var d = form.find("select[name='form_birthday_day']");
        if (m.length > 0 && d.length > 0) {
          var save = $('#unlock-account-save');
          if (m.val() != "Month" && d.val() != "Day") {
            save.prop('disabled', false);
          } else {
            save.prop('disabled', true);
          }
        }
      });
    }
    $('#cp-overlay input[type="button"]').click(function() {
      if ($(this).hasClass('cp-overlay-cancel')) {
        $.DynaCP.Overlay.closeOverlay();
      } else {
        var id = $(this).attr('id');
        if (id === 'unlock-account-save') {
          var form = $('#cp-overlay-unlock-account-form');
          if (form.length > 0) {
            var data = {},
            url = window.location.pathname;
            $.each(form.serializeArray(),
            function() {
              data[this.name] = this.value
            });
            data.form_name = form.attr('data-name');
            data['unlock-account'] = 1;
            $.ajax({
              url: url,
              type: "POST",
              data: data
            }).done(function(responseData) {
              $.DynaCP.parseJson(responseData).then(function(json) {
                if (json.hasOwnProperty('code')) {
                  if (json.code === '0') {
                    $.DynaCP.Overlay.closeOverlay();
                    $.DynaCP.Notice.createNotice(json.message);
                  } else {
                    if (json.hasOwnProperty('error_message')) {
                      $.DynaCP.Overlay.createOverlayError(json.error_message);
                    }
                  }
                }
              }).
              catch(function(e) {});
            })
          }
        }
      }
    });
  }

  function initUnlockAccount() {
    $(".unlock-account").click(function() {
      unlock_account(this);
    });
  }

  $.DynaCP.Account.unlockAccount = function (target, ids) {
    var cmd = $(target).attr("cmd");
    if (typeof cmd != typeof undefined && cmd != false) {
      var url = window.location.pathname;
      console.log(url);
      var data = {};
      data.cmd = cmd;
      data.ids = ids;
      data['unlock-account'] = 1;
      $.ajax({
        url: url,
        type: "POST",
        data: data
      }).done(function(responseData) {
        $.DynaCP.parseJson(responseData).then(function(json) {
          if (json.code === '0') {
            removeError();
            if (json.hasOwnProperty('content')) {
              $.DynaCP.Overlay.createOverlay(json.content, initUnlockAccountOverlay);
            } else {
              $.DynaCP.Notice.createNotice('Unknown Error');
            }
          } else {
            if (json.hasOwnProperty('error_message')) {
              createError(json.error_message);
            }
          }
        }).
        catch(function(e) {});
      })
    }
  }

  function removeError(){
    var overlay = $('#cp-overlay');
    if(overlay.length > 0){
      var overlay_error = overlay.find('.cp-overlay-error');
      if(overlay_error.length > 0){
        overlay_error.remove();
      }
    }   
  }

  $(document).ready(function() {
    init();
  });
})();