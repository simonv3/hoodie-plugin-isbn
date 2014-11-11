$(function () {
    var hoodieAdmin = top.hoodieAdmin;

    function getConfig(callback) {
      hoodieAdmin.request('GET', '/app/config')
        .fail(function(error) { callback(error); })
        .done(function(response) { callback(null, response); })
    }
    function setConfig(doc, callback) {
      hoodieAdmin.request('PUT', '/app/config', {
        data: JSON.stringify(doc)
      })
        .fail(function(error) { callback(error); })
        .done(function(response) { callback(null, response); })
    }

    function updateConfig(obj, callback) {
        getConfig(function (err, doc) {
            if (err) {
                return callback(err);
            }
            doc.config = _.extend(doc.config, obj);
            setConfig(doc, callback);
        });
    }

    // set initial form values
    getConfig(function (err, doc) {
        if (err) {
            return alert(err);
        }
        console.log('hello');
        $('[name=isbnDbKey]').val(doc.config.isbn_db_key);
    });

    function setSubmitButtonToSaving(form){
        $btn = $(form).find('button[type="submit"]');
        $btn.data('originalButtonText', $btn.text());
        $btn.data('disabled', 'disabled');
        $btn.text('Saving');
    }

    function setSubmitButtonToSuccess(form){
        $btn.text('Successfully saved!').addClass('success');
        _.delay(function(){
            $(form).find('button[type="submit"]').data('disabled', null);
            $btn.text($btn.data('originalButtonText')).removeClass('success');;
        }, 2000);
    }

    function setSubmitButtonToError(form, error){
        $btn.text('Something went wrong, sorry.').addClass('error');
        $btn.after('<p class="help-block">'+error+'</p>');
        _.delay(function(){
            $(form).find('button[type="submit"]').data('disabled', null);
            $btn.text($btn.data('originalButtonText')).removeClass('error');;
        }, 2000);
    }

    // save app info on submit
    $('#isbnKeyForm').submit(function (ev) {
        console.log('logging');
        var el = this;
        ev.preventDefault();
        setSubmitButtonToSaving(this);
        var cfg = {
            isbn_db_key: $('[name=isbnDbKey]').val()
        };
        updateConfig(cfg, function (err) {
            if (err) {
                setSubmitButtonToError(el, err);
                //return alert(err);
            }
            else {
                setSubmitButtonToSuccess(el);
            }
        });
        return false;
    });
});
