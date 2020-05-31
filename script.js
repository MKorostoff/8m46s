function start() {
  var startButton = document.getElementById('start');
  var intro = document.getElementById('intro');

  if (startButton.classList.contains('hide')) {
    return
  }

  startButton.classList = 'hide';
  intro.classList.add('hide');

  var eight_minutes_from_now = new Date().getTime() + 527000;
  var interval = setInterval(function() {

    var now = new Date().getTime();
    var time_remaining = eight_minutes_from_now - now;
    var minutes = Math.floor((time_remaining % (3600000)) / (60000));
    var seconds = Math.floor((time_remaining % (60000)) / 1000);
    var glue = (seconds > 9) ? ':' : ':0';

    var transcript_item = getTranscriptItem(time_remaining);
    if (transcript_item) {
      fadeInText(transcript_item);
    }

    document.getElementById("timer").innerHTML = minutes + glue + seconds;

    if (time_remaining < 0) {
      clearInterval(interval);
      document.getElementById("timer").innerHTML = "0:00";
      setTimeout(function(){
        var transcript = document.getElementById('transcript');
        transcript.innerHTML = 'Justice for George. <br> Sources: <a target="_blank" href="https://www.youtube.com/watch?v=FMGUAHBFmjk">1</a>, <a target="_blank" href="https://www.youtube.com/watch?v=lirHz93qJ50">2</a>, <a target="_blank" href="https://en.wikipedia.org/wiki/Death_of_George_Floyd">3</a>';
        transcript.classList = 'transcript-show';
      }, 10000);
    }
  }, 1000);
}
function fadeInText(t) {
  var transcript = document.getElementById('transcript');
  transcript.innerHTML = t;
  transcript.classList = 'transcript-show';
  setTimeout(function(){
    var transcript = document.getElementById('transcript');
    transcript.classList = 'transcript-hide';
  }, 7000)
}
function getTranscriptItem(current_time) {
  var fullTranscript = {
    520000: "&ldquo;Please, please, please! I can't breathe!&rdquo;",
    481000: "&ldquo;Please man.&rdquo;",
    475000: "&ldquo;I can't breathe.&rdquo;",
    470000: "&ldquo;I'm about to die.&rdquo;",
    465000: "&ldquo;I can't breathe. I can't breathe.&rdquo;",
    460000: "(Still kneeling) &ldquo;Get in the car!&rdquo; &ldquo;I will!&rdquo;",
    455000: "(Still kneeling) &ldquo;Get up, get in the car!&rdquo; &ldquo;I can't move.&rdquo;",
    450000: "(Still kneeling) &ldquo;Get up, and get in the car!&rdquo; &ldquo;Mama! Mama!.&rdquo;",
    407000: "An ambulance is called.",
    380000: "&ldquo;Everything hurts. Some water or something, please.&rdquo;",
    350000: "&ldquo;I can't breathe officer.&rdquo; &ldquo;Shut up.&rdquo; &ldquo;They gonna kill me.&rdquo;",
    227000: "&ldquo;He's not responsive right now!&rdquo; -bystander",
    173000: "After 5 minutes and 50 seconds, George Floyd becomes unresponsive.",
    107000: "&ldquo;He's not fucking moving!&rdquo; -bystander",
    1: "After 8 minutes and 43 seconds, Derek Chauvin removed his knee from George Floyd's neck. Mr. Floyd was later pronounced dead."
  };
  for (var timestamp in fullTranscript) {
    if (isInTimeWindow(timestamp)) {
      return fullTranscript[timestamp];
    }
  }
  function isInTimeWindow(timestamp) {
    var t = parseInt(timestamp);
    if (current_time >= t - 500 && current_time <= t + 500) {
      return true;
    }
    return false;
  }
}
