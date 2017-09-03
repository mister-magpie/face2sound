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

  kick = new Tone.MembraneSynth().toMaster()
  kick.volume.value = 0;
  //kick.connect(feedbackDelay)
  hihat = new Tone.MetalSynth().toMaster();
  hihat.volume.value = -18;
  snare  = new Tone.NoiseSynth().toMaster();
  snare.connect(feedbackDelay);
  hhpart = new Tone.Part(function(time, note){
     hihat.triggerAttackRelease("8n", time);
  }, [[0, "C2"], ["8n", "C3"]]);
  hhpart.loop = true;
  hhpart.loopEnd = "8n"
  kkpart = new Tone.Part(function(time, note){
     kick.triggerAttackRelease(note,"8n", time);
  }, [[0, "C1"]]);
  kkpart.loop = true;
  snpart = new Tone.Part(function(time, note){
     snare.triggerAttackRelease("8n", time);
  }, [["0:2", "C1"]]);
  snpart.loop = true;
  //if(Math.random() > 0.5){
  kick2 = new Tone.Part(function(time, note){
    //the notes given as the second element in the array
    //will be passed in as the second argument
    kick.triggerAttackRelease(note, "8n", time)
  }, [["0:1:2", "C1"]]);
  kick2.loop=true
  kick2.probability = 0.5
  sn2 = new Tone.Part(function(time, note){
    //the notes given as the second element in the array
    //will be passed in as the second argument
    snare.triggerAttackRelease("8n", time)
  }, [["0:3:2", "C1"],["0:3:3", "C1"]]);
  sn2.loop=true
  sn2.probability = 0.5

  happyOsc = new Tone.FMOscillator("C2","sine","square").start();
  neutralOsc = new Tone.FMOscillator("C2","sine","square").start();
  sadOsc = new Tone.FMOscillator("C2","sine","square").start();
  angryOsc = new Tone.FMOscillator("C2","square","square").start();


  happyOsc.volume.value = -999
  angryOsc.volume.value = -999
  sadOsc.volume.value = -999
  neutralOsc.volume.value = -999

  //osc.partials = [0,0.5,0.1,0.4,1,0.3]
  // vibrato
  vibrato = new Tone.LFO(3, 0, 10);
  vibrato.start();

  // feedback
  // panner
  panner = new Tone.AutoPanner();
  panner.toMaster();
  panner.wet = 0.3;
  panner.frequency = 0.5;

  bitc = new Tone.BitCrusher(4).toMaster();
  angryOsc.connect(bitc)


  //a lowpass filter
  lowpass = new Tone.Filter(600, "highpass");
  lowpass.toMaster();

  // envelope
  //var env = new Tone.Envelope(2.5, 0.1, 0.1, 0.2);
  //env.connect(osc.output.gain);
  //connect it to the output

  osc_bg = new Tone.FMOscillator("C2", "sine","square").start();
  osc_bg.toMaster();
  osc_bg.volume.value = -999;
  osc_bg.volume.rampTo(-18,"1.0");



  Tone.Transport.LoopEnd = "1m";
  Tone.Transport.loop = true;

  loop = new Tone.Loop(happyLoop, "8n");

  Tone.Transport.schedule(function(time){
  	 makeDrums(1)
  }, "5.0");

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

function neutralLoop(){
  console.log("neutral");
  osc_bg.frequency.value = Tone.Frequency("C2").toFrequency();
  happyOsc.volume.value = -999
  angryOsc.volume.value = -999
  sadOsc.volume.value = -999
  neutralOsc.volume.value = -999
}
function happyLoop(){
  console.log("happy");
  osc_bg.frequency.value = Tone.Frequency("C2").toFrequency();
  vibrato.connect(happyOsc.modulationIndex);
  happyOsc.chain(feedbackDelay,panner)

  g_scale_1 = ["C5","D5","E5","G5","A5","C6"]
	var index = Math.floor( Math.random() * g_scale_1.length );
	var freq = Tone.Frequency(g_scale_1[index]).toFrequency();
  //console.log(freq)
	happyOsc.frequency.value = freq;
}
function sadLoop(){
  console.log("sad");
  //osc.frequency.value = 110;
  vibrato.connect(sadOsc.modulationIndex);
  sadOsc.chain(feedbackDelay,panner)

  g_scale_1 = ["A3","C4","D4","E4","F4","G4","A4"]
  var index = Math.floor( Math.random() * g_scale_1.length );
	var freq = Tone.Frequency(g_scale_1[index]).toFrequency();
  //console.log(freq)
	sadOsc.frequency.value = freq;
}
function angryLoop(){
  console.log("angry");
  osc_bg.frequency.value = Tone.Frequency("B1").toFrequency();
  vibrato.connect(angryOsc.modulationIndex);
  angryOsc.chain(feedbackDelay,panner)
  g_scale_1 = ["B2","C2","D#2","E2","F2","G2","A#2","B1"]
  var index = Math.floor( Math.random() * g_scale_1.length );
	var freq = Tone.Frequency(g_scale_1[index]).toFrequency();
  //console.log(freq)
	angryOsc.frequency.value = freq;
}
function
makeDrums(rate){
  //Tone.Transport.clear()
  kkpart.start("+1n");
  snpart.start("+1n");
  hhpart.start("+1n");
  sn2.start("+1n");
  kick2.start("+1n");

  kkpart.playbackRate = rate
  snpart.playbackRate = rate
  sn2.playbackRate = rate
  kick2.playbackRate = rate
  //}
}
function makeSad(){
  //bitc.wet.value = 0;

  kkpart.playbackRate = 1
  snpart.playbackRate = 1
  sn2.playbackRate = 1
  kick2.playbackRate = 1

  sadOsc.start();
  sadOsc.volume.rampTo(-18,"1.0")

  happyOsc.volume.rampTo(-999,"1.0")
  angryOsc.volume.rampTo(-999,"1.0")

  osc_bg.frequency.rampTo(Tone.Frequency("A1").toFrequency(),"1.0")


  Tone.Transport.schedule(function(time){
    loop.callback = sadLoop;
    loop.start();
  },"+4n")
}
function makeHappy(){
  //bitc.wet.value = 0
  kkpart.playbackRate = 1
  snpart.playbackRate = 1
  sn2.playbackRate = 1
  kick2.playbackRate = 1

  happyOsc.start();
  happyOsc.volume.rampTo(-18,"1.0")
  sadOsc.volume.rampTo(-999,"1.0")
  angryOsc.volume.rampTo(-999,"1.0")

  osc_bg.frequency.rampTo(Tone.Frequency("C2").toFrequency(),"1.0")
  Tone.Transport.schedule(function(time){
    loop.callback = happyLoop;
    loop.start();
  },"+4n")
  //makeDrums(1)
}
function makeAngry(){
  kkpart.playbackRate = 2
  snpart.playbackRate = 2
  sn2.playbackRate = 2
  kick2.playbackRate = 2

  osc_bg.type = "square"
  bitc.wet.value = 1;
  var lfo = new Tone.LFO(2,-50,50)
  lfo.connect(osc_bg.detune)

  angryOsc.start();
  angryOsc.volume.rampTo(-18,"1.0")
  sadOsc.volume.rampTo(-999,"1.0")
  happyOsc.volume.rampTo(-999,"1.0")

  osc_bg.frequency.rampTo(Tone.Frequency("B1").toFrequency(),"1.0")
  Tone.Transport.schedule(function(time){
    osc_bg.start();
    loop.callback = angryLoop;
    loop.interval = "2n"
    loop.start("@4n");
  },"+4n");
}

function makeNeutral(){
  kkpart.playbackRate = 1
  snpart.playbackRate = 1
  sn2.playbackRate = 1
  kick2.playbackRate = 1

  //osc_bg.type = "square"
  //bitc.wet.value = 0;

  angryOsc.volume.rampTo(-999,"1.0")
  sadOsc.volume.rampTo(-999,"1.0")
  happyOsc.volume.rampTo(-999,"1.0")

  osc_bg.frequency.rampTo(Tone.Frequency("C1").toFrequency(),"1.0")
  Tone.Transport.schedule(function(time){
    osc_bg.start();
    loop.callback = neutralLoop
  },"+4n");
}
