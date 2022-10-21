$('#post-comment').hide()
$('#btn-toggle-comment').click(e => {
    e.preventDefault()
    $('#post-comment').slideToggle()
})