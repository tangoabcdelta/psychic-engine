import React from "react";
import "./styles.css";

// 1.) Create an input, a Create button and a timer component |
// the input takes in time and when the button is clicked,
// the countdown in timer component starts |
// countdown is in ms - no need of formatting the time
// 2.) Have a pause button in the timer component,
// that can pause and resume the timer back
// 3.) Extend the behaviour of the first Button
// -> when clicked upon, it keeps adding new timer components |
// as soon as a timer component is spawned, the countdown should begin
// 4.) At any particular time, there should only be (n) number of
// timers counting-down on the screen. The timers can continue
// their countdown wen ever there is a scope for them.

class Timer extends React.Component {
  timerID = 0;
  timeElapsed = 0;
  idleTimeEnd = 0;
  idleTimeStart = 0;
  isRunning = false;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: props.totalTime,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  stopTimer = () => {
    this.isRunning = false;
  };

  runTimer = () => {
    if (!this.isRunning) return;
    setTimeout(() => {
      if (this.state.currentTime == 0) {
        this.stopTimer();
      } else {
        const newVal = Date.now() - this.timerResumedAt;
        // if ()
        this.setState(
          {
            currentTime:
              this.state.currentTime - (Date.now() - this.timerResumedAt),
          },
          () => {
            this.runTimer();
          }
        );
      }
    }, 1);
  };

  startTimer = () => {
    this.isRunning = true;
    this.timerResumedAt = Date.now();
    this.runTimer();
  };

  render() {
    let { start, stop, totalTime } = this.props;
    return (
      <div className="Timer">
        <h2>{this.state.currentTime}</h2>
        <button
          onClick={() => {
            this.isRunning ? this.stopTimer() : this.startTimer();
          }}
        >
          pause/resume
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  timers = [];
  constructor(props) {
    super(props);
    this.state = {
      timerList: [],
      inputVal: 3000,
    };
  }

  componentDidMount() {}

  addTimer = (e) => {
    const { inputVal, timerList } = this.state;
    this.setState({
      timerList: [
        ...timerList,
        {
          id: Date.now(),
          totalTime: parseInt(inputVal, 10),
        },
      ],
    });
  };

  start = (e) => {};

  stop = (e) => {};

  onChangeInput = (e) => this.setState({ inputVal: e.target.value });

  render() {
    const { inputVal, timerList } = this.state;
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <input
          type="number"
          defaultValue={inputVal}
          onChange={this.onChangeInput}
        />
        <button onClick={this.addTimer}>Add timer </button>
        {timerList.map((item, index) => {
          console.log(item);
          return <Timer key={item.id} {...item} />;
        })}
      </div>
    );
  }
}

export default App;
