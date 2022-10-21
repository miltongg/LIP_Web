const validateComments = async (rating, comment, res) => {

    if (!rating || rating === '0') {
        return res.status(400).json({
            ok: false,
            message: '¿Cuantas estrellas nos das?'
        })
    } else if (!comment) {
        return res.status(400).json({
            ok: false,
            message: 'Por favor, comenta algo...'
        })
    }

}


module.exports = {validateComments}