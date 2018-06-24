let commentsHidden = true;
$('.comment-link').on('click', e => {
    e.preventDefault();
    let id = e.target.nextElementSibling.id;
    // $.ajax({
    //         url: `/articles/${id}`,
    //         type: 'GET',
    //     })
    //     .done(function(data) {
    //         console.log(data)
    //         console.log("success");
    //     })



    if (commentsHidden) {
        commentsHidden = false;
        $(`#${id}`).attr('style', 'display: block;');
    } else if (!commentsHidden) {
        commentsHidden = true;
        $(`#${id}`).attr('style', 'display: none;');
    }
});