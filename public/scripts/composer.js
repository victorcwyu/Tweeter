$(document).ready(function() {

  // Declare a variable which obtains the button
  const scrollButton = document.getElementById('scroll-button');

  // Declare a variable which obtains the header button
  const headerButton = document.getElementById('new-button');

  // When the user scrolls down 20px from the top of the document, show the scroll button and hide the header button, otherwise, show the header button and hide the scroll button
  const showScrollButton = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollButton.style.display = 'block';
      headerButton.style.display = 'none';
    } else {
      scrollButton.style.display = 'none';
      headerButton.style.display = 'flex';
    }
  };

  window.onscroll = function() {
    showScrollButton();
  };

  // Declare a function and call it using javascript when the user clicks on the button, to scroll to the top of the document.  In addition, slide the error message and form up, while resetting the textarea and counter.
  const scrollToTop = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  // When 'John Travolta' button is clicked, the page scrolls to the top, any error message present disappears, and the tweet form is displayed with animation.  The textarea is focused, and in the background, the textarea is cleared and the counter is reset to 140.  If the counter is negative, the class is removed as well.
  $('#scroll-button').click(function() {
    scrollToTop();
    $('#error').slideUp('fast');
    $('#new-tweet').slideUp('slow', function() {
      $('#twit').val('');
      $('.counter').text(140).removeClass('invalid');
    });
    $('#new-tweet').slideDown(1200, function() {
      $('#twit').focus();
    });
  });
});