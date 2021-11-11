import {useState} from "react";

const Timer = () => {

    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [customInterval, setCustomInterval] = useState({})
    const [intervals, setIntervals] = useState([])
    const [isStartDisabled, setStartDisabled] = useState(false)

    const increase = (param) => {
        // eslint-disable-next-line default-case
        switch (param) {
            case 'hour':
                setHour((prev) => prev + 1)
                break;
            case 'minute':
                if (minute === 59) {
                    setHour((prev) => prev + 1)
                    setMinute(0)
                } else {
                    setMinute((prev) => prev + 1)
                }
                break;
            case 'second':
                if (second === 59) {
                    setMinute((prev) => prev + 1)
                    setSecond(0)
                } else {
                    setSecond((prev) => prev + 1)
                }
                break;
        }
    }

    const decrease = (param) => {
        // eslint-disable-next-line default-case
        switch (param) {
            case 'hour':
                if (hour !== 0) {
                    setHour((prev) => prev - 1)
                }
                break;
            case 'minute':
                if (minute !== 0) {
                    setMinute((prev) => prev - 1)
                }
                break;
            case 'second':
                if (second !== 0) {
                    setSecond((prev) => prev - 1)
                }
                break;
        }
    }

    const a = () => {
        if (second === 0) {
            if (minute === 0) {
                if (hour === 0) {
                    alert('Time is over')
                    setStartDisabled(false)
                    clearInterval(customInterval)
                } else {
                    setHour((prev) => prev - 1)
                    setMinute(59)
                    setSecond(59)
                }

            } else {
                setMinute((prev) => prev - 1)
                setSecond(59)
            }

        } else {
            setSecond((prev) => prev - 1)
        }
        // console.log(hour, minute, second)
    }

    const onStartClicked = () => {
        setStartDisabled(true)

        setCustomInterval(setInterval(a, 1000))
    }

    const onStopClicked = () => {
        setStartDisabled(false)

        clearInterval(customInterval)
    }

    const onIntervalClicked = () => {
        let newIntervals = [...intervals]
        newIntervals.push(hour + ':' + minute + ':' + second)
        setIntervals(newIntervals)
    }

    const onClearClicked = () => {
        onStopClicked()
        setHour(0)
        setMinute(0)
        setSecond(0)
        setCustomInterval({})
        setIntervals([])
        setStartDisabled(false)
    }

    return <div>
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-6 offset-3">
                    <div className="card">
                        <div className="card-header">
                            <h1>Timer</h1>
                        </div>
                        <div className="card-body">
                            <div className={'row justify-content-center'}>
                                <div className="col-md-2">
                                    <button className={'d-block'} onClick={() => increase('hour')}>+
                                    </button>
                                    <span className={'fs-3 m-0 ms-1'}> {hour}</span> <span
                                    className={'fs-3 ms-3'}>:</span>
                                    <button className={'d-block'} onClick={() => decrease('hour')}>-
                                    </button>
                                </div>
                                <div className="col-md-2">
                                    <button className={'d-block'} onClick={() => increase('minute')}>+
                                    </button>
                                    <span className={'fs-3 m-0 ms-1'}> {minute}</span> <span
                                    className={'fs-3 ms-3'}>:</span>
                                    <button className={'d-block'} onClick={() => decrease('minute')}>-
                                    </button>
                                </div>
                                <div className="col-md-2">
                                    <button className={'d-block'} onClick={() => increase('second')}>+
                                    </button>
                                    <p className={'fs-3 m-0 ms-2'}> {second}</p>
                                    <button className={'d-block'} onClick={() => decrease('second')}>-
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-3">
                                    <button className={'btn btn-success'} onClick={onStartClicked}
                                            disabled={isStartDisabled}>Start
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className={'btn btn-warning'} onClick={onStopClicked}>Stop
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className={'btn btn-info'} disabled={!isStartDisabled}
                                            onClick={onIntervalClicked}>Interval
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button className={'btn btn-danger'} onClick={onClearClicked}>Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            {intervals.map((item, index) => <div key={index} className={'mt-3'}>{item}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Timer