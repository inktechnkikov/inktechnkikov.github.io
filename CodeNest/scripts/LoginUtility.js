const kinveyBaseUrl = 'https://baas.kinvey.com/';
const kinveyAppId = 'kid_Bkhf1so0x';
const kinveyAppSecret = '154cc5a94a0547f99b328fd516546d99';
$(document).on({
    ajaxStart: function () {
        $('#infoBox').show();
    },
    ajaxStart: function () {
        $('#infoBox').hide();
    }
});
function showInfo(mesgText) {
    $('#infoBox').text(mesgText).show().delay(1500).fadeOut(2000);
}
function ajaxError() {
    let errorMsg = "Try again!";
    $('#errorBox').text(errorMsg).show().delay(1500).fadeOut(2000);

}
function loginUser() {
    let loginData = {
        username:$('#loginUser').val(),
        password:$('#loginPass').val(),
    };
    $.ajax({
        method: "POST",
        url:kinveyBaseUrl + 'user/' + kinveyAppId + '/login',
        data:loginData,
        headers:{
            "Authorization": "Basic " + btoa(kinveyAppId + ":" + kinveyAppSecret)
        },
        success: loginSuccess,
        error: ajaxError,
    });
    function loginSuccess(data) {
        sessionStorage.authToken = data._kmd.authtoken;
        showInfo('Login successful');
        window.setTimeout(function () {
            location.href = 'chess-game.html';
        },3000);
    }
}
$(function () {
    $('#formLogin').submit(function (e) {
        e.preventDefault();
        loginUser()
    });
});