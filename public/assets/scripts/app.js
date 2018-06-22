$('body').on('click', '.comment-link', e => {
	e.preventDefault();
	$('.all-comments').attr('style', 'display: block;');
});
