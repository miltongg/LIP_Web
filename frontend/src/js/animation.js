$(window).scroll(function () {
    $('#object, #object1, #object2, #object3, #object4, #object5').each(function () {
        let imagePos = $(this).offset().top;

        let topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 600) {
            $(this).addClass("slideUp");
        }
    });
});

$(window).scroll(function () {
    $('#object6, #object7, #object8, #object9').each(function () {
        let imagePos = $(this).offset().top;

        let topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 600) {
            $(this).addClass("expandUp");
        }
    });
});

$(window).scroll(function () {
    $('#object10').each(function () {
        let imagePos = $(this).offset().top;

        let topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 600) {
            $(this).addClass("slideRight");
        }
    });
});

$(window).scroll(function () {
    $('#object11').each(function () {
        let imagePos = $(this).offset().top;

        let topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 600) {
            $(this).addClass("slideLeft");
        }
    });
});

// $(window).scroll(function() {
//   $('#object7').each(function(){
//     let imagePos = $(this).offset().top;
//
//     let topOfWindow = $(window).scrollTop();
//     if (imagePos < topOfWindow+500) {
//       $(this).addClass("slideRight");
//     }
//   });
// });