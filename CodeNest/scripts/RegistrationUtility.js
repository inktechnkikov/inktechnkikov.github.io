const kinveyBaseUrl = 'https://baas.kinvey.com/';
const kinveyAppId = 'kid_Bkhf1so0x';
const kinveyAppSecret = '154cc5a94a0547f99b328fd516546d99';
/* Ajax "Loading" event listener */
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
    function registerUser() {
        let username = $('#userName').val();
        let password = $('#passInput').val();
        let emailAddress = $('#emailAddress').val();

        if (username=="") {
            showInfo("Try again.Username name cant be empty");
        }
        else if (password.length <= 4) {
            showInfo("The password must be minimum 4 symbols");
        }
        else if(emailAddress==""){
            showInfo("Enter a valid mail address");
        }
        else {
            registerCollectionData();
        }
    }
    function registerCollectionData() {
        let typeOfUser = $("input[name=check]:checked").val();
        let registerData = {
            username:$('#userName').val(),
            password:$('#passInput').val(),
            emailAddress:$('#emailAddress').val(),
            typeOfUser:typeOfUser,
        };
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + 'user/' + kinveyAppId + '/',
            data: registerData,
            headers: {
                "Authorization": "Basic " + btoa(kinveyAppId + ":" + kinveyAppSecret)
            },
            success: registerSuccess,
            error: ajaxError,
        });
            function registerSuccess(data) {
                sessionStorage.authToken = data._kmd.authtoken;
                showInfo('User registered successfully');
                window.setTimeout(function () {
                    location.href = 'login-form.html';
                }, 3000);
            }
}