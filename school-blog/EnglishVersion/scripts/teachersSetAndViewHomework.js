//const kinveyBaseUrl = 'https://baas.kinvey.com/';
//const kinveyAppID = 'kid_By6NFYOt';
//const appSecrets = '9887cd73e9a84e26875688775c120525';

$(document).on({
    ajaxStart: function () {
        $('#infoTeachers').show();
    },
    ajaxStart: function () {
        $('#infoTeachers').hide();
    }
});
function showInfo(mesgText) {
    $('#infoTeachers').text(mesgText).show().delay(2000).fadeOut(2000);
}
function checkFields() {
    let nameOfTeach = $('#simpleName').val();
    let subj = $('#subject').val();
    let descrHomeWork = $('#dHomeWork').val();
    if (nameOfTeach === "") {
        showInfo("Name of teacher cant be empty!")
    }
    else if (subj === "") {
        showInfo("Please input subject field.Try again");
    }
    else if (descrHomeWork.length <= 3) {
        showInfo("The description is too short!");
    }
    else {
        setHomerowk();
    }

    function setHomerowk() {
        let homeWorkUrl = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Teachers";
        let authHeaders = {
            "Authorization": "Kinvey " + sessionStorage.getItem('authToken'),
        };
        let homeWorkData = {
            name: $("#simpleName").val(),
            subject: $("#subject").val(),
            description: $("#dHomeWork").val()
        };

        $.ajax({
            method: "POST",
            url: homeWorkUrl,
            data: homeWorkData,
            headers: authHeaders,
            success: setOk,
        });
        function setOk(data) {
           // sessionStorage.authToken = data._kmd.authtoken;
            showInfo('Homework added successfully!');
            window.setTimeout(function () {
                location.href = 'teacher-page.html';
            },1500);
        }
    }
}
$(document).ready(function () {
    $('#showHomeworkForTeach').click(function () {
        $('#field').slideDown();
    });
    let method = "GET";
    let userAtuh = "Kinvey " + sessionStorage.getItem('authToken');
    let headers = {};
    headers['Authorization'] = userAtuh;
    let requestUrl = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Teachers";
    let request = {
        method: method,
        headers: headers,
        url: requestUrl,
    };
    $.ajax(request).then(function (response) {
        for (let obj of response) {
            let list = $('#field');
            let inner = document.createElement('li');
            let nameOfTeacher = document.createElement('li');
            let subj = document.createElement('li');
            let descr = document.createElement('ul');

            nameOfTeacher.appendChild(document.createTextNode(obj.name));
            subj.appendChild(document.createTextNode(obj.subject));
            descr.appendChild(document.createTextNode(obj.description));
            inner.appendChild(nameOfTeacher);
            inner.appendChild(subj);
            inner.appendChild(descr);
            list.append(inner);
        }

    });
    $(document).ready(function () {
        $('#hide').click(function () {
            $('#field').slideUp();
        });
    });
});
$(function () {
    $('#formSet').submit(function (e) { e.preventDefault(); checkFields();});

});
function logout() {
    showInfo("Log out");
    sessionStorage.clear();
    window.setTimeout(function () {
        location.href='index.html';
    },3000);

}