// A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you.
// Code included inside $(document).ready() will only run once the page Document Object Model(DOM) is ready for JavaScript code to execute

$(document).ready(function () {
  
  loadtweets();

  const $form = $('#newbie');
  $form.on('submit', function (event) {
    event.preventDefault()
    if ($('#twit').val().length > 140) {
      alert("Your tweet is too long!");
      return;
    } else if ($('#twit').val() === "") {
      alert("You haven't entered a tweet!");
      return;
    }
    // Post serialized data to AJAX, to add new tweet
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $form.serialize(),
      // successful post renders updated list of tweets
      success: function() {
        loadtweets();
      }
    });

    //this is the another way of posting serialized data to AJAX
    // $.ajax('/tweets', { method: 'POST', data: $form.serialize()})
    //   .then(function(result) {loadtweets(result)})

  });
});

// deleted fake data taken from initial-tweets.json

// makes a get request, returns a promise, uses that result to render the tweets, passing in the result
const loadtweets = function (tweets) {
    $.ajax('/tweets', { method: 'GET', dataType: 'JSON' })
      .then(function(result) {renderTweets(result)});
    }

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  tweets.forEach(element => {
    //changed append to prepend => makes new tweets appear at top
    $('#tweet-container').prepend(createTweetElement(element));
  });
};

// takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.
const createTweetElement = (tweetData) => {
  const $tweet = $("<article>").addClass("tweet");

  const total_seconds = parseInt(Math.floor(tweetData.created_at / 1000));
  const total_minutes = parseInt(Math.floor(total_seconds / 60));
  const total_hours = parseInt(Math.floor(total_minutes / 60));
  const days = parseInt(Math.floor(total_hours / 24));
  const years = parseInt(Math.floor(days / 365));
  const hours = parseInt(total_hours % 24);
  const minutes = parseInt(total_minutes % 60);
  const seconds = parseInt(total_seconds % 60);

  const date = `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds ago.`;

  const html = `
    <header>
      <div class="profile">
        <img src="${tweetData.user.avatars}">
        <p>${tweetData.user.name}</p>
      </div>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <p>${date}</p>
      <div class="linkage">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  `;

  $tweet.append(html);
  return $tweet;
};

//deleted renderTweets