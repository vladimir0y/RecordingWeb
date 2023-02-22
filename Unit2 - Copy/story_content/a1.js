var audioChunks = [];
var recorder;
var audioPlayer;

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      recorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
      recorder.start();
    });
}

function stopRecording() {
  recorder.addEventListener("stop", () => {
    var audioBlob = new Blob(audioChunks);
    audioPlayer = new Audio(URL.createObjectURL(audioBlob));
  });
  recorder.stop();
}

function playRecording() {
  audioPlayer.play();
}

function pauseRecording() {
  if (recorder.state === "recording") {
    recorder.pause();
  } else if (recorder.state === "paused") {
    recorder.resume();
  }
}
