// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeInMinutes: 25, timeInSeconds: 0, isTimeRunning: false}

  getElapsedSecondsInTimeFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 + timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)

    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onStart = () => {
    this.timeID = setInterval(this.startTimer, 1000)
    this.setState(prevState => ({
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  startTimer = () => {
    this.setState(prevState => ({
      timeInSeconds: prevState.timeInSeconds - 1,
    }))
  }

  onPause = () => {
    clearInterval(this.timeID)
    this.setState(prevState => ({
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  onReset = () => {
    clearInterval(this.timeID)
    this.setState({timeInMinutes: 25, timeInSeconds: 0, isTimeRunning: false})
  }

  onIncrease = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))
  }

  onDecrease = () => {
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes - 1,
    }))
  }

  render() {
    const {isTimeRunning, timeInMinutes, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds < 0
    console.log(timeInSeconds)
    console.log(isButtonsDisabled)

    const startOrPauseImage = isTimeRunning ? (
      <fragment>
        <button
          type="button"
          onClick={this.onPause}
          className="button pauseStartReset"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
            alt="pause icon"
            className="iconImages"
          />{' '}
          Pause
        </button>
      </fragment>
    ) : (
      <fragment>
        <button
          type="button"
          onClick={this.onStart}
          className="button pauseStartReset"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
            alt="play icon"
            className="iconImages"
          />{' '}
          Start
        </button>
      </fragment>
    )

    return (
      <div className="bg-container">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="mainTimerContainer">
          <div className="timerContainer">
            <div className="timeDisplay">
              <h1 className="headingTimer">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              {isTimeRunning ? (
                <p className="runPause">Running</p>
              ) : (
                <p className="runPause">Paused</p>
              )}
            </div>
          </div>
          <div className="secondDivContainer">
            <div className="startAndPauseContainer">
              {startOrPauseImage}
              <button
                type="button"
                className="pauseStartReset"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="iconImages"
                />
                Reset
              </button>
            </div>
            <p>Set Timer Limit</p>
            <div className="setTimerLimit">
              <button
                type="button"
                disabled={isButtonsDisabled}
                className="button bold"
                onClick={this.onDecrease}
              >
                -
              </button>
              <p className="box">{timeInMinutes}</p>
              <button
                type="button"
                disabled={isButtonsDisabled}
                className="button bold"
                onClick={this.onIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
