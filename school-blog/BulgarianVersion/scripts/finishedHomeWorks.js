$(document).ready(function () {
    $('#finishedHomeWorks').click(function () {
        $('#showTeachHome').show();
    });
});
function showLogoutNotificationBG(mesgText) {
    $('#LogOutHomeWorkBG').text(mesgText).show().delay(1500).fadeOut(2000);
}
    let methodShow = "GET";
    let userAtuhStudent = "Kinvey " + sessionStorage.getItem('authToken');
    let headersStudent = {};
    headersStudent['Authorization'] = userAtuhStudent;
    let requestUrlStudent = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Homeworks";
    let requestStudent = {
        method: methodShow,
        headers: headersStudent,
        url: requestUrlStudent,
    };

    $.ajax(requestStudent).then(function (responseSt) {
        for (let objSt of responseSt) {
            let listSt = $('#showStHome');
            let innerSt = document.createElement('div');
            let nameOfSt = document.createElement('li');
            let subj1 = document.createElement('li');
            let descr1 = document.createElement('ul');
            nameOfSt.appendChild(document.createTextNode(objSt.name));
            subj1.appendChild(document.createTextNode(objSt.theme));
            descr1.appendChild(document.createTextNode(objSt.description));
            innerSt.appendChild(nameOfSt);
            innerSt.appendChild(subj1);
            innerSt.appendChild(descr1);
            listSt.append(innerSt);
        }
    });

    function logout() {
        showLogoutNotificationBG('Log out');
        sessionStorage.clear();
        window.setTimeout(function () {
            location.href = 'index.html';
        }, 3000);
    }
