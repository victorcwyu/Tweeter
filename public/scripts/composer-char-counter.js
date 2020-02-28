// Implements the character counter for the tweet compose form, adds class 'invalid' if more than 140 characters.
$(document).ready(function() {
  $('#twit').on('input', function() {
    let count = $(this).val().length;
    $(this).parent().children('.counter').text(140 - count);
    if (count >= 140) {
      $(this).parent().children('.counter').addClass('invalid');
    } else {
      $(this).parent().children('.counter').removeClass('invalid');
    }
  });
});