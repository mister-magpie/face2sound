window.onload = function(e){
  ShowCam()
  feedbackDelay = new Tone.PingPongDelay("8n");
  feedbackDelay.feedback = 0.6;
  feedbackDelay.toMaster();
  feedbackDelay.wet = 0.8;
  //Tone.context.latencyHint = "playback"
  makeMusic()
};
function makeMusic(){
  osc = new Tone.FMOscillator("C2","sine","square");
  //osc.partials = [0,0.5,0.1,0.4,1,0.3]
  // vibrato
  var vibrato = new Tone.LFO(3, 0, 10);
  vibrato.start();
  vibrato.connect(osc.modulationIndex);
  // feedback
  //osc.connect(feedbackDelay);
  // panner
  var panner = new Tone.AutoPanner();
  panner.toMaster();
  panner.wet = 0.3;
  panner.frequency = 0.5;
  osc.connect(panner);
  //a lowpass filter
  var lowpass = new Tone.Filter(600, "highpass");
  osc.connect(lowpass);
  lowpass.toMaster();
  // envelope
  //var env = new Tone.Envelope(2.5, 0.1, 0.1, 0.2);
  //env.connect(osc.output.gain);
  //connect it to the output
  osc.volume.value = -18;
  osc.toMaster();
  osc.start();
  osc_bg = new Tone.FMOscillator(440, "sine","square");
  osc_bg.toMaster();
  //osc_bg.start();
  osc_bg.volume.value = -24;
  // vibrato
  var vibrato = new Tone.LFO(6, 1, 4);
  vibrato.start();
  vibrato.connect(osc_bg.harmonicity);
  // feedback
  var feedbackDelay = new Tone.PingPongDelay("8n");
  feedbackDelay.feedback = 0.2
  osc_bg.connect(feedbackDelay);
  feedbackDelay.toMaster();
  feedbackDelay.wet = 0.8;
  Tone.Transport.LoopEnd = "1m";
  Tone.Transport.loop = true;

  loop = new Tone.Loop(happyLoop, "8n");
  // g_scale_0 = ["C4","D4","E4","G4","A4","C5"]
  // Tone.Transport.scheduleRepeat(function(time){
  // 	var index = Math.floor( Math.random() * g_scale_0.length );
  // 	var freq = Tone.Frequency( g_scale_0[ index ] );
  // 	g_objs.get("head").osc.frequency.value = freq;
  //
  // }, "16n");
  Tone.Transport.start();
}
function makeLoop(scale, repeat){
  synth = new Tone.MembraneSynth();
  synth.volume.value = -12;
  var feedbackDelay = new Tone.PingPongDelay("8n");
  feedbackDelay.feedback = 0.6;
  osc.connect(feedbackDelay);
  feedbackDelay.toMaster();
  feedbackDelay.wet = 0.8;
  synth.connect(feedbackDelay)
  //synth.toMaster();
  var loop1 = new Tone.Loop(function(time){
    //console.log("loopy");
    var index = Math.floor( Math.random() * scale.length );
  	var freq = Tone.Frequency(scale[index]).toFrequency();
    //console.log(freq)
  	//synth.frequency.value = freq;
    synth.triggerAttackRelease(scale[index],"16n")
  },repeat);
  loop1.start("@4n")
  return loop1
}
function happyLoop(){
  console.log("happy");
  osc.frequency.value = Tone.Frequency("C2").toFrequency();
  osc.partials = [0.9,0.2,0.2,0.8]
  g_scale_1 = ["C5","D5","E5","G5","A5","C6"]
	var index = Math.floor( Math.random() * g_scale_1.length );
	var freq = Tone.Frequency(g_scale_1[index]).toFrequency();
  //console.log(freq)
	osc.frequency.value = freq;
}
function sadLoop(){
  console.log("sad");
  osc.frequency.value = 110;
  g_scale_1 = ["A3","C4","D4","E4","F4","G4","A4"]
  var index = Math.floor( Math.random() * g_scale_1.length );
	var freq = Tone.Frequency(g_scale_1[index]).toFrequency();
  //console.log(freq)
	osc_bg.frequency.value = freq;
}
function angryLoop(){
  console.log("angry");
  osc.frequency.value = Tone.Frequency("B1").toFrequency();
  g_scale_1 = ["B2","C2","D#2","E2","F2","G2","A#2","B1"]
  var index = Math.floor( Math.random() * g_scale_1.length );
	var freq = Tone.Frequency(g_scale_1[index]).toFrequency();
  //console.log(freq)
	osc_bg.frequency.value = freq;
}
function
makeDrums(rate){
  //Tone.Transport.clear()
  kick = new Tone.MembraneSynth().toMaster()
  kick.volume.value = 0;
  //kick.connect(feedbackDelay)
  hihat = new Tone.MetalSynth().toMaster();
  hihat.volume.value = -18;
  snare  = new Tone.NoiseSynth().toMaster();
  snare.connect(feedbackDelay);
  hhpart = new Tone.Part(function(time, note){
	   hihat.triggerAttackRelease("8n", time);
  }, [[0, "C2"], ["8n", "C3"]]).start("+1n");
  hhpart.loop = true;
  hhpart.loopEnd = "8n"
  kkpart = new Tone.Part(function(time, note){
	   kick.triggerAttackRelease(note,"8n", time);
  }, [[0, "C1"]]).start("+1n");
  kkpart.loop = true;
  snpart = new Tone.Part(function(time, note){
     snare.triggerAttackRelease("8n", time);
  }, [["0:2", "C1"]]).start("+1n");
  snpart.loop = true;
  //if(Math.random() > 0.5){
  kick2 = new Tone.Part(function(time, note){
  	//the notes given as the second element in the array
  	//will be passed in as the second argument
  	kick.triggerAttackRelease(note, "8n", time)
  }, [["0:1:2", "C1"]]).start("+1n");
  kick2.loop=true
  kick2.probability = 0.5
  sn2 = new Tone.Part(function(time, note){
  	//the notes given as the second element in the array
  	//will be passed in as the second argument
  	snare.triggerAttackRelease("8n", time)
  }, [["0:3:2", "C1"],["0:3:3", "C1"]]).start("+1n");
  sn2.loop=true
  sn2.probability = 0.5
  kkpart.playbackRate = rate
  snpart.playbackRate = rate
  sn2.playbackRate = rate
  kick2.playbackRate = rate
  //}
}
function makeSad(){
  //makeDrums(1)
  kkpart.playbackRate = 1
  snpart.playbackRate = 1
  sn2.playbackRate = 1
  kick2.playbackRate = 1
  Tone.Transport.schedule(function(time){
    osc_bg.start();
    loop.callback = sadLoop;
    loop.start();
  },"+1m")
}
function makeHappy(){
  kkpart.playbackRate = 1
  snpart.playbackRate = 1
  sn2.playbackRate = 1
  kick2.playbackRate = 1
  Tone.Transport.schedule(function(time){
    osc_bg.start();
    loop.callback = happyLoop;
    loop.start();
  },"+1m")
  //makeDrums(1)
}
function makeAngry(){
  kkpart.playbackRate = 2
  snpart.playbackRate = 2
  sn2.playbackRate = 2
  kick2.playbackRate = 2
  bitc = new Tone.BitCrusher(4).toMaster();
  osc_bg.type = "square"
  osc_bg.connect(bitc)
  var lfo = new Tone.LFO(2,-50,50)
  lfo.connect(osc_bg.detune)
  Tone.Transport.schedule(function(time){
    osc_bg.start();
    loop.callback = angryLoop;
    loop.interval = "2n"
    loop.start("@4n");
  },"+1m");
}
