$(function() {
  document.addEventListener("DOMContentLoaded", function() {
    dumpBookmarks();
  });
});
// /home/deveedutta/Documents/Projects/psychic-engine/packages/extension/src/browser_action/Readability.js

(() => {
  console.log("");
})();

(function() => {
  var synth = window.speechSynthesis;

  var inputForm = document.querySelector("form");
  var inputTxt = document.querySelector(".txt");
  var voiceSelect = document.querySelector("select");

  var pitch = document.querySelector("#pitch");
  var pitchValue = document.querySelector(".pitch-value");
  var rate = document.querySelector("#rate");
  var rateValue = document.querySelector(".rate-value");

  var voices = [];

  const button = document.querySelector("#button.read.page");
  button.addEventListener(
    "click",
    () => {
      let utterance = new SpeechSynthesisUtterance("Hello world!");
      speechSynthesis.speak(utterance);
    },
    false
  );

  function populateVoiceList() {
    voices = synth.getVoices();

    for (var i = 0; i < voices.length; i++) {
      var option = document.createElement("option");
      option.textContent = voices[i].name + " (" + voices[i].lang + ")";

      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }

      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  inputForm && (inputForm.onsubmit = function(event) {
    event.preventDefault();

    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);

    inputTxt.blur();
  });
  
})();
