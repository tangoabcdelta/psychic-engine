/* eslint-disable react/no-access-state-in-setstate */
// src/stores/AudioRecordingStore.js

import React, { createRef } from "react";
import { Spinner } from "reactstrap";

export const AudioRecordingStoreContext = React.createContext();
export const AudioRecordingStoreProvider = AudioRecordingStoreContext.Provider;
export const AudioRecordingStoreConsumer = AudioRecordingStoreContext.Consumer;

export class AudioRecordingStore extends React.Component {
  constructor(props) {
    const audioRef = createRef();
    const videoRef = createRef();
    this.state = {
      audioRef,
      videoRef,
      isRecording: false,
      stopDisabled: true,
    };
  }

  componentDidCatch(error, info) {
    console.log("try to make this an error boundary");
    console.log("error captured:", error, info);
    this.setState({ error });
  }

  componentDidMount() {
    this.setElementRefs();
    this.loadAudioInterface();
  }

  setElementRefs = () => {
    if (this.videoRef) {
      console.log("this.videoRef.current.value", this.videoRef.current.value);
    } else {
      this.videoRef = {
        current: document.querySelector("video"),
      };
    }

    if (this.audioRef) {
      console.log("this.audioRef.current.value", this.audioRef.current.value);
    } else {
      this.audioRef = {
        current: document.querySelector("audio"),
      };
    }
  };

  loadAudioInterface = async () => {
    const {
      mediaDevices: { getUserMedia },
    } = navigator;

    const constraints = { audio: true };

    try {
      let mediaStream = await getUserMedia({ audio: true, video: true });
      let chunks = [];

      this.mediaRecorder = new MediaRecorder(mediaStream);
      this.videoRef.current.src = window.URL.createObjectURL(mediaStream);
      this.videoRef.current.onloadedmetadata = (e) => {
        // Do something with the video here.
        this.videoRef.current.play();
      };
    } catch (err) {
      console.log(err.name);
    }
  };

  startRecording = () => {
    this.mediaRecorder.start();

    this.setState({
      stopDisabled: false,
      recordDisabled: true,
    });
    // console.log(mediaRecorder.state);
    // console.log("recorder started");
    // record.style.background = "red";
  };

  loadCanvas = async () => {
    let audioCtx;
    const canvasCtx = window.canvas.getContext("2d");
  };

  render() {
    return this.state.error ? (
      <span className="d-flex justify-content-center align-items-center">
        Error
        <Spinner></Spinner>
      </span>
    ) : (
      <AudioRecordingStoreProvider value={this.state}>
        {this.props.children}
      </AudioRecordingStoreProvider>
    );
  }
}

export default AudioRecordingStore;
