let commentsHidden = true;
$('.comment-link').on('click', e => {
    e.preventDefault();
    let id = e.target.nextElementSibling.id;
    $.ajax({
            url: `/articles/${id}`,
            type: 'GET',
        })
        .done(function(data) {
            console.log(data)
            console.log("success");
        })



    // if (commentsHidden) {
    //     commentsHidden = false;
    //     $('.all-comments').attr('style', 'display: block;');
    // } else if (!commentsHidden) {
    //     commentsHidden = true;
    //     $('.all-comments').attr('style', 'display: none;');
    // }
});