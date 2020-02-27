// A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you.
// Code included inside $(document).ready() will only run once the page Document Object Model(DOM) is ready for JavaScript code to execute
$(document).ready(function () {

  // Declare a variable which obtains the button
  const scrollButton = document.getElementById("scrollButton");

  // Declare a variable which obtains the header button
  const headerButton = document.getElementById("newButton");

  // When the user scrolls down 20px from the top of the document, show the scroll button, hide the header button, otherwise, show the header button and hide the scroll button
  window.onscroll = function() { 
    showScrollButton() 
  };

  const showScrollButton = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollButton.style.display = "block";
      headerButton.style.display = "none";
    } else {
      scrollButton.style.display = "none";
      headerButton.style.display = "flex";
    }
  }

  // declare a function and call it using javascript when the user clicks on the button, to scroll to the top of the document
  const scrollToTop = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  $("#scrollButton").click(function () {
    $('#twit').val('')  
    $('.counter').text(140).removeClass("invalid")
    $('#error').slideUp("slow")
    scrollToTop();
      $("#new-tweet").slideDown(1200, function () {
        $("#twit").focus();
      });
  });
})