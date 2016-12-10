$(document).on({
    ajaxStart: function () {
        $('#infoStudentBG').show();
    },
    ajaxStart: function () {
        $('#errorStudentBG').hide();
    }
});
function showInfoStudenBG(mesgText) {
    $('#infoStudentBG').text(mesgText).show().delay(1500).fadeOut(2000);
}
function studentsValidation() {
    let nameOfStudent = $('#studentName').val();
    let nameOfTheme = $('#themeOfHomework').val();
    let descrOfHmrkSt = $('#descriptionOfHomeWork').val();
    if (nameOfStudent === "") {
        showInfoStudenBG("-ИМЕ на ученик- не може да бъде празно");
    }
    else if (nameOfTheme === "") {
        showInfoStudenBG("-ТЕМА/ПРЕДМЕТ- не може да бъде празно");
    }
    else if (descrOfHmrkSt.length <= 4) {
        showInfoStudenBG("Домашната е прекалено кратка");
    }
    else {
        uploadHomeworks();
    }
}
    function uploadHomeworks() {
        let setHomeWorkUrl = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Homeworks";
        let authHeaders = {
            "Authorization": "Kinvey " + sessionStorage.getItem('authToken'),
        };

        let upload = {
            name: $('#studentName').val(),
            theme: $('#themeOfHomework').val(),
            description: $('#descriptionOfHomeWork').val()
        };
        $.ajax({
            method: "POST",
            url: setHomeWorkUrl,
            data: upload,
            headers: authHeaders,
            success:uploadOk(),

        });
        function uploadOk() {
            showInfoStuden('Усешно предаване на домашна');
            window.setTimeout(function () {
                location.href = 'student-page.html';
            },1500);
        }
    }
        $(document).ready(function () {
            $('#showHomeWorkStudents').click(function () {
                $('#fieldInStudents').slideDown();
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
                    let list = $('#fieldInStudents');
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
                $('#hideHomeworksStudents').click(function () {
                    $('#fieldInStudents').slideUp();
                });
            });
        });
function logout() {
    showInfoStudenBG('Log out');
    sessionStorage.clear();
    window.setTimeout(function () {
        location.href='index.html';
    },3000);

}
