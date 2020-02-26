/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  tweets.forEach(element => {
    $('#tweet-container').append(createTweetElement(element));
  })
}

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

  const date = `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds ago.`

  const html =
    `       <header>
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
    `
  $tweet.append(html);
  return $tweet;
}

renderTweets(data);
});  