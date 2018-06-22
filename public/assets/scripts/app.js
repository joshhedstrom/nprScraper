let commentsHidden = true;
$('body').on('click', '.comment-link', e => {
	console.log(this)
    e.preventDefault();
    if (commentsHidden) {
        commentsHidden = false;
        $('.all-comments').attr('style', 'display: block;');
    }

    else if (!commentsHidden) {
    	commentsHidden = true;
    	$('.all-comments').attr('style', 'display: none;');
    }
});