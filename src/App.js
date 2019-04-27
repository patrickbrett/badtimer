"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
require("./App.css");
var Timer_1 = require("./Timer");
var Button_1 = require("./Button");
var About_1 = require("./About");
var react_1 = require("react");
var TimeInput_1 = require("./TimeInput");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        var TIME_DISPLAY_DEFAULT = {
            hours: "0",
            minutes: "05",
            seconds: "00"
        };
        var REFRESH_RATE = 100; // times per second
        var SKEW_INIT = 50;
        _this.state = {
            initialised: false,
            time: 0,
            maxTime: 0,
            active: false,
            skew: SKEW_INIT,
            setup: TIME_DISPLAY_DEFAULT,
            isShowingInfo: false
        };
        _this.componentDidMount = function () {
            setInterval(_this.tick, 1000 / REFRESH_RATE);
        };
        _this.tick = function () {
            _this.setState(function (prevState) {
                var time = prevState.time, active = prevState.active;
                if (active && time > 0) {
                    time -= 1 / REFRESH_RATE;
                }
                return { time: time };
            });
        };
        _this.startTimer = function () {
            _this.setState({ active: true });
        };
        _this.pauseTimer = function () {
            _this.setState({ active: false });
        };
        _this.stopTimer = function () {
            var maxTime = _this.state.maxTime;
            _this.setState({ active: false, time: maxTime });
        };
        _this.editTimer = function () {
            var maxTime = _this.state.maxTime;
            _this.setState({ active: false, time: maxTime, initialised: false });
        };
        _this.updateSkew = function (e) {
            var value = e.target.value;
            _this.setState({ skew: value });
        };
        _this.updateField = function (e, field) {
            var value = e.target.value;
            if (value.match(/\d+/)) {
                value = value
                    .match(/\d+/)
                    .join("")
                    .slice(0, 2);
            }
            else {
                value = "";
            }
            _this.setState(function (prevState) {
                var setup = prevState.setup;
                setup[field] = value;
                return { setup: setup };
            });
        };
        _this.checkSubmit = function (e) {
            if (e.key === "Enter") {
                _this.finishInitialise();
            }
        };
        _this.finishInitialise = function () {
            var setup = _this.state.setup;
            var time = Number(setup.hours) * 3600 + Number(setup.minutes) * 60 + Number(setup.seconds);
            if (time <= 0) {
                _this.setState({
                    setup: {
                        hours: "0",
                        minutes: "05",
                        seconds: "00"
                    }
                });
            }
            else {
                _this.setState({ time: time, maxTime: time, initialised: true });
            }
        };
        _this.toggleShowInfo = function () {
            _this.setState(function (prevState) { return ({ isShowingInfo: !prevState.isShowingInfo }); });
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        var _a = this.state, initialised = _a.initialised, time = _a.time, maxTime = _a.maxTime, active = _a.active, skew = _a.skew, setup = _a.setup, isShowingInfo = _a.isShowingInfo;
        var startButton = (React.createElement(Button_1["default"], { name: "start", onClick: this.startTimer, text: "Start" }));
        var pauseButton = (React.createElement(Button_1["default"], { name: "pause", onClick: this.pauseTimer, text: "Pause" }));
        var stopButton = (React.createElement(Button_1["default"], { name: "stop", onClick: this.stopTimer, text: "Stop" }));
        var resetButton = (React.createElement(Button_1["default"], { name: "reset", onClick: this.stopTimer, text: "Reset" }));
        var editButton = (React.createElement(Button_1["default"], { name: "edit", onClick: this.editTimer, text: "Edit" }));
        var skewSlider = (React.createElement("div", { id: "container-skew-slider" },
            "not bad",
            " ",
            React.createElement("input", { id: "range-slider", type: "range", min: "0", max: "100", value: skew, onChange: this.updateSkew }),
            " ",
            "very bad"));
        var buttonsContainer;
        if (time > 0) {
            buttonsContainer = (React.createElement("div", { id: "container-buttons" },
                active ? pauseButton : startButton,
                active ? stopButton : time === maxTime ? editButton : resetButton,
                active ? null : skewSlider));
        }
        else {
            buttonsContainer = (React.createElement("div", { id: "container-buttons" }, resetButton));
        }
        var timer = (React.createElement(Timer_1["default"], { time: time, active: active, maxTime: maxTime, skew: skew, children: buttonsContainer }));
        var getTimeInput = function (name) { return React.createElement(TimeInput_1["default"], { name: name, checkSubmit: _this.checkSubmit, setup: setup, updateField: _this.updateField }); };
        var timerSetup = (React.createElement("div", { id: "timer-setup" },
            getTimeInput("hours"),
            ":",
            getTimeInput("minutes"),
            ":",
            getTimeInput("seconds"),
            React.createElement(Button_1["default"], { name: "save", text: "Save", onClick: this.finishInitialise })));
        var containerTimer = (React.createElement("div", { id: "container-timer" }, initialised ? timer : timerSetup));
        var containerInfo = React.createElement(About_1["default"], null);
        return (React.createElement("div", { id: "App" },
            isShowingInfo ? containerInfo : containerTimer,
            React.createElement("div", { id: "about-button", onClick: this.toggleShowInfo }, "About")));
    };
    return App;
}(react_1.Component));
exports["default"] = App;
