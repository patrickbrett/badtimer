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
var react_1 = require("react");
var TimerDone = /** @class */ (function (_super) {
    __extends(TimerDone, _super);
    function TimerDone(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            flash: true
        };
        _this.componentDidMount = function () {
            setInterval(_this.flash, 500);
        };
        _this.flash = function () {
            _this.setState(function (prevState) { return ({ flash: !prevState.flash }); });
        };
        return _this;
    }
    TimerDone.prototype.render = function () {
        return (React.createElement("div", { id: "timer-done" }, "Timer Done"));
    };
    return TimerDone;
}(react_1.Component));
exports["default"] = TimerDone;
