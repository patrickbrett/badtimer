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
var TimerDone_1 = require("./TimerDone");
var react_1 = require("react");
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Timer.prototype.render = function () {
        var _a = this.props, time = _a.time, maxTime = _a.maxTime, skew = _a.skew, active = _a.active;
        var finished = false;
        /*
        skew to distortion
        skew is between 0 and 100
        skew of zero corresponds to distortion of 1 (no change)
        skew of 100 corresponds to distortion of 0.6 (huge change)
    
        distortion = 1 - skew/100 * 0.4
         */
        var distortion = 1 - (skew / 100) * 0.4;
        var modifiedTime = Math.ceil(Math.pow(time / maxTime, distortion) * maxTime);
        if (isNaN(modifiedTime) || time < 0) {
            modifiedTime = 0;
            finished = true;
        }
        var prependZero = function (num) { return num < 10 ? "0" + String(num) : String(num); };
        var hours = String(Math.floor(modifiedTime / 3600));
        var minutes = prependZero(Math.floor((modifiedTime % 3600) / 60));
        var seconds = prependZero(Math.floor(modifiedTime % 60));
        var timeDisplay = (React.createElement("div", { id: "time-display" },
            hours,
            ":",
            minutes,
            ":",
            seconds));
        return (React.createElement("div", { id: "timer", className: active ? "large" : "" },
            finished ? React.createElement(TimerDone_1["default"], null) : timeDisplay,
            this.props.children));
    };
    return Timer;
}(react_1.Component));
exports["default"] = Timer;
