let oscMelody1, oscMelody2; // Melody oscillators
let melodyEnv1, melodyEnv2; // Envelopes for melody
let reverb; // Reverb effect for atmosphere
let bpm = 60; // Slow tempo for soothing rhythms
let beatDuration; // Duration of each beat in milliseconds
let isPlaying = false; // Whether the loop is playing
let beatTimer = 0; // Timer to track the beat position

// UI elements
let playPauseButton, melodyButton;
let melodySlider, bpmSlider;

let melodyNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C major scale (C4, D4, E4, F4, G4, A4, B4, C5)
let keys = ['A','S','D','F','G','H','J','K'];
let playingNote = [];
let currentNote = 0;
let oscMelody = []
let melodyEnv = []
function setupMelody(){
   // Initialize stuff for Scene 3
    // Call this to ensure the audio context is resumed when you click
  getAudioContext().resume();
  for (let i=0;i<keys.length;i++){
  oscMelody1 = new p5.Oscillator('sine');  // Soft sine wave for melody
  
  // Initialize envelopes for melody oscillators
  melodyEnv1 = new p5.Envelope();
  
  
  // Set envelope properties (slow attack and release for a smooth melody)
  melodyEnv1.setADSR(0.5, 0, 0, 0.5);  // Slow attack and release
  
  
  // Set envelope range (gentle volume for soothing sound)
  melodyEnv1.setRange(0.3, 0);
 
  
  // Initialize reverb effect
  // reverb = new p5.Reverb();
  // reverb.process(oscMelody1, 0.5, 4); // Apply reverb to the melody
  
  // Start oscillators
  oscMelody1.start();
  
  
  // Set initial volume to 0 (off)
  oscMelody1.amp(0);
  oscMelody.push(oscMelody1);
  melodyEnv.push(melodyEnv1);
  playingNote.push(false)
  }
  // Initialize melody oscillators
 
  // Calculate beat duration in milliseconds based on BPM
  updateBeatDuration();

  // // Play/Pause Button for the melody loop
  // playPauseButton = createButton('Start/Stop Melody');
  // playPauseButton.position(20, 20);
  // playPauseButton.mousePressed(togglePlayPause);

  // Melody Button for triggering soothing melodies
  // melodyButton = createButton('Play Melody');
  // melodyButton.position(160, 20);
  // melodyButton.mousePressed(playMelody);

  // BPM slider to control the tempo
  // bpmSlider = createSlider(50, 100, 60, 1);
  // bpmSlider.position(20, 60);
  // bpmSlider.input(updateBPM);

  // Set initial values for BPM slider
  // bpmSlider.value(bpm);
}
function melodyGame() {

  // Display instructions
  fill('white');
  
  textSize(10);
  textAlign(CENTER)
  text('Soothing Melody Controller', 200, 240);
  // text('Click buttons to play melodies', 20, 50);
  // text('Use sliders to adjust volume and BPM', 20, 170);

  // Update the beat timer and play the loop if it's active
 

  
  for(let i=0;i<keys.length;i++){
    //text for notes
    push()
    if(playingNote[i])fill('red')
    text(keys[i], 100+i*27, 350);
    pop()
    if(keyIsDown(keys[i].charCodeAt(0)) === true && !playingNote[i]){
      // console.log(keys[i].charCodeAt(0))
      playNote(i);
      
    }
    else if(!keyIsDown(keys[i].charCodeAt(0))) {
      // console.log("Stop Note"+ keys[i])
      stopNote(i);
    }
  }
  
}

// Update beat duration when BPM changes
function updateBPM() {
  bpm = bpmSlider.value();
  updateBeatDuration();
}

// Update the duration of each beat based on BPM
function updateBeatDuration() {
  beatDuration = (60 / bpm) * 1000; // Duration in milliseconds per beat
}

// Toggle play/pause for the melody loop
function togglePlayPause() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playMelody(); // Start the melody loop
  }
}

// Function to play a simple melody
function playMelody() {
  // Play the first melody note
  playNote(oscMelody1, melodyEnv1, melodyNotes[currentNote]);
  // Play a second note (harmony) after a delay
  playNote(oscMelody2, melodyEnv2, melodyNotes[(currentNote + 2) % melodyNotes.length]); // Harmony
  
  // Move to the next note
  currentNote = (currentNote + 1) % melodyNotes.length; // Loop through the scale
  
  // Adjust the delay for the next note
  beatTimer = 0; // Reset the beat timer
}

// Function to play a note on the given oscillator and envelope
function playNote(idx) {
  if(playingNote[idx])return
  oscMelody[idx].freq(melodyNotes[idx]);// Set frequency to the note's pitch
  oscMelody[idx].amp(0.3, 0.1); // Adjust amplitude (volume) for smooth sound
  melodyEnv[idx].play(oscMelody[idx]); // Apply envelope to the note (with smooth fade in/out)
  playingNote[idx] = true;
}

// Update volumes of melody oscillators based on sliders
function updateVolumes() {
  oscMelody1.amp(0.3, 0.1);
  oscMelody2.amp(0.3, 0.1);
}

function stopNote(idx){
  playingNote[idx] = false;
  // melodyEnv[idx].();
  oscMelody[idx].amp(0)
}
