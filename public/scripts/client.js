// Prevents XSS with Escaping
const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
const createTweetElement = (tweetData) => {
  const $tweet = $('<article>').addClass('tweet');
  
  // Converts date of tweet from milliseconds to years, days, hours, minutes and seconds
  const totalSeconds = parseInt(Math.floor(tweetData.created_at / 1000));
  const totalMinutes = parseInt(Math.floor(totalSeconds / 60));
  const totalHours = parseInt(Math.floor(totalMinutes / 60));
  const days = parseInt(Math.floor(totalHours / 24));
  const years = parseInt(Math.floor(days / 365));
  const hours = parseInt(totalHours % 24);
  const minutes = parseInt(totalMinutes % 60);
  const seconds = parseInt(totalSeconds % 60);

  const date = `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds ago.`;

  // Tweet <article> template
  const html = `
    <header>
      <div class='profile'>
        <img src='${tweetData.user.avatars}'>
        <p>${tweetData.user.name}</p>
      </div>
      <span class='handle'>${tweetData.user.handle}</span>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
      <p>${date}</p>
      <div class='linkage'>
        <i class='fas fa-flag'></i>
        <i class='fas fa-retweet'></i>
        <i class='fas fa-heart'></i>
      </div>
    </footer>
  `;

  // Appends html template with inserted data and returns tweet
  $tweet.append(html);
  return $tweet;
};

// Takes in an array of tweet objects and then prepends each one to the #tweet-container
const renderTweets = tweets => {
  // Clear out array before re-loading data.
  $('#tweet-container').empty();
  // Separates tweets into an array and then joins them together, to limit page rendering performance issues
  const markupArray = [];
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    markupArray.unshift(tweetElement);
  }
  markupArray.join('');
  // Takes a return value and prepends it to the tweets container
  $('#tweet-container').prepend(markupArray);
};


// Makes a get request, returns a promise, uses that result to render the tweets, passing in the result
const loadtweets = function() {
  $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
    .then(function(result) {
      renderTweets(result);
    });
};

// Signals that the DOM of the page is now ready, so it can be manipulated without worrying that parts of the DOM have not yet been created.
$(document).ready(function() {

  // When 'Write a new tweet' button is clicked, any error message present disappears, and the tweet form is displayed with animation.  The textarea is focused, and in the background, the textarea is cleared and the counter is reset to 140.  If the counter is negative, the class is removed as well.
  $('#click').click(function() {
    $('#error').slideUp('slow');
    $('#new-tweet').slideToggle(800, function() {
      $('#twit').focus();
    });
    setTimeout(() => {
      $('#twit').val('');
      $('.counter').text(140).removeClass('invalid');
    }, 700);
  });

  // Display error messages if tweet has not been written, or if tweet is over 140 characters
  const $form = $('#newbie');
  $form.on('submit', function(event) {
    $('#twit').val().trim();
    event.preventDefault();
    if ($('#twit').val().trim().length > 140) {
      $('#error').text('⚠️ Your tweet is too long! ⚠️').slideDown('slow');
      return;
    } else if ($('#twit').val().trim() === '') {
      $('#error').text('⚠️ You have not entered a tweet! ⚠️').slideDown('slow');
      return;
    }
    // Post serialized data to AJAX, to add new tweet
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $form.serialize(),
      // successful post renders updated list of tweets
      success: function() {
        setTimeout(() => {
          $('#twit').val('');
          $('.counter').text(140).removeClass('invalid');
        }, 500);
        $('#error').slideUp('slow');
        $('#new-tweet').slideUp('slow');
        loadtweets();
      }
    });
  });
});