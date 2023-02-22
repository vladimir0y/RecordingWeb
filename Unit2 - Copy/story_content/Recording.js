let recorder;
let chunks = [];
let recording = false;
let playback = false;

function startRecording() {
  if (!recording && !playback) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
          const completeBlob = new Blob(chunks, { type: 'audio/webm' });
          const audioURL = URL.createObjectURL(completeBlob);
          const audio = new Audio(audioURL);
          const audioContainer = document.getElementById('audio-container');
          audioContainer.appendChild(audio);
        };
        recorder.start();
        recording = true;
      })
      .catch(err => console.error('Failed to access microphone', err));
  }
}

function pauseRecording() {
  if (recording) {
    recorder.pause();
    recording = false;
  }
}

function resumeRecording() {
  if (!recording && !playback) {
    recorder.resume();
    recording = true;
  }
}

function stopRecording() {
  if (recording) {
    recorder.stop();
    recording = false;
  }
}

function playRecording() {
  if (!recording && !playback && chunks.length) {
    const completeBlob = new Blob(chunks, { type: 'audio/webm' });
    const audioURL = URL.createObjectURL(completeBlob);
    const audio = new Audio(audioURL);
    audio.play();
    playback = true;
    audio.addEventListener('ended', () => {
      playback = false;
    });
  }
}

function clearRecording() {
  if (!recording && !playback) {
    chunks = [];
    const audioContainer = document.getElementById('audio-container');
    audioContainer.innerHTML = '';
  }
}
