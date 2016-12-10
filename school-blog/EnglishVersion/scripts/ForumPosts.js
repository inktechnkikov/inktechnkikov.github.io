//const kinveyBaseUrl = 'https://baas.kinvey.com/';
//const kinveyAppID = 'kid_By6NFYOt';

$(document).on({
    ajaxStart: function () {
        $('#infoPosts').show();
    },
    ajaxStart: function () {
        $('#errorPosts').hide();
    }
});
function showInfoPosts(mesgText) {
    $('#infoPosts').text(mesgText).show().delay(2000).fadeOut(2000);
}
function postsValidation() {
    let author = $('#postAuthor').val();
    let title = $('#postTitle').val();
    let description = $('#postDescription').val();
    if (author === "") {
        showInfoPosts("Title field can't be empty!");
    }
    else if (title === "") {
        showInfoPosts("Author field can't be empty!");
    }
    else if (description.length <= 4) {
        showInfoPosts("The post is too short!");
    }
    else {
        createPost();
    }
}
function showPostsView(){

    $("#posts").text(''); //Loading...

    let postsUrl = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Posts";
    let authHeaders = {
        "Authorization": "Kinvey " + sessionStorage.authToken
    };
    $.ajax({
        method: "GET",
        url: postsUrl,
        headers: authHeaders,
        success: postsLoaded,
        error: showAjaxError
    });

    function postsLoaded(posts) {
        showInfoPost('Posts table loaded.');
        if(posts.length == 0){
            $('posts').text('No posts in the library.');
        } else {}
              
        let postsTable = $("<table>")
            .append($("<tr>").append(
                '<th>Title</th>',
                '<th>Author</th>',
                '<th>Description</th>')     
                );
        for (let post of posts) {
            postsTable.append($('<tr>').append(
                $('<td>').text(post.title),
                $('<td>').text(post.author),
                $('<td>').text(post.description))
                );
        }
    $('#posts').append(postsTable);
    }
}

function createPost() {
    let setPostsUrl = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Posts";
    let authHeaders = {
        "Authorization": "Kinvey " + sessionStorage.getItem('authToken'),
    };

    let createPostData = {
        author: $("#postAuthor").val(),
        title: $("#postTitle").val(),
        description: $("#postDescription").val(),
        comments: [{ author: "moni88", commentText: "this book is great!" }, { author: "kateto", commentText: "very good book." }]
    };
    $.ajax({
        method: "POST",
        url: setPostsUrl,
        data: createPostData,
        headers: authHeaders,
        success: createPostSuccess,
        //error: showAjaxError
    });

    function createPostSuccess(data) {
        showInfoPosts('Post created successfully!');
        window.setTimeout(function () {
            location.href = 'forum-page.html';
        }, 1500);
    }
}

function addComment(postData, commentText, commentAuthor) {
    let setPostsUrl = kinveyBaseUrl + "appdata/" + kinveyAppID + "/Posts";
    let authHeaders = {
        "Authorization": "Kinvey " + sessionStorage.getItem('authToken'), 'Content-type': 'application/json'
    };

    if (!postData.comments) {
        postData.comments = [];
    }
    postData.comments.push({
        text: commentText, author: commentAuthor
    });

    $.ajax({
        method: "PUT",
        url: setPostsUrl + '/' + postData._id,
        headers: authHeaders,
        data: JSON.stringify(postData),
        success: addPostCommentSuccess,
        error: showAjaxError
    });

    function addPostCommentSuccess(data) {
        showPostsView();
        showInfoPosts('Post comments added.');
    }
}