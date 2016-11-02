//PUSH REQUEST KENNETH
$(".req").on("click focus", function () {
    $("#subForm .req").removeClass("input-err");
    $(".err-msg").hide();
    $(".err-email").hide();
    $(this).removeClass("input-err");

});



$(".submitreq").click(function () {
    err = false;
    $("#subForm .req").removeClass("input-err");
    $(".err-msg").hide();
    $(".err-email").hide();

    var email = $("input[type='email']").val();

    $("#subForm .req").each(function () {
        if (!$(this).val()) {
            $(this).addClass("input-err");
            $("#subForm .err-msg").show();
            err = true;
        }
        if (!isValidEmailAddress(email)) {
            $("input[type='email']").addClass("input-err");
            $("#subForm .err-email").show();
            err = true;
        }
    });
    if (err) {
        return false;
    } else {
        alert('success');
        $("#subForm input[type=text], #subForm textarea, #subForm input[type=email]").val('');
    }

});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}
;
// - - - - - - - - - - ONLY NUMBERS IN PHONE FIELD - - - - - - - - - - //
$(".numonly").keydown(function (e) {

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
                    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right, down, up
                            (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            foo = $(this).val().split("-").join("");
            // Allow: backspace, delete, tab, escape, enter and .
            foo = foo.match(new RegExp('.{1,4}$|.{1,3}', 'g')).join("-");
            $(this).val(foo);
        });
// - - - - - - - - - - - - - - - - - - - - //
