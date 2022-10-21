$('#btn-delete').click(function (e) {
    e.preventDefault()
    let $this = $(this)
    const response = confirm('Esta seguro que desea eliminar la aplicación?')
    if (response) {
        let imgId = $this.data('id')
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
            .done(function (result) {
                console.log(result)
            })
    }
})


$('#post-comment').hide()
$('#btn-toggle-comment').click(e => {
    e.preventDefault()
    $('#post-comment').slideToggle()
})


setTimeout(function () {
    $('#message_button').fadeOut('slow');
}, 4000);

let archivo = document.querySelector('#archivo');
archivo.addEventListener('change', () => {
    document.querySelector('#nombre').innerText = archivo.files[0].name;
});


