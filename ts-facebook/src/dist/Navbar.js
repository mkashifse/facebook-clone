"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var firebase_1 = require("firebase");
var react_redux_1 = require("react-redux");
var RequestComponent_1 = require("./RequestComponent");
var bs_1 = require("react-icons/bs");
function Navbar() {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _a = react_1.useState(0), notification = _a[0], setNotification = _a[1];
    var _b = react_1.useState(false), model = _b[0], setModel = _b[1];
    react_1.useEffect(function () {
        var notificationDb = firebase_1["default"].database().ref('notification');
        notificationDb.orderByChild('sendTo').equalTo(user.uid).on('value', function (notify) {
            setNotification(notify.numChildren());
        });
    }, [user.uid]);
    var openRequestMOdel = function () {
        console.log('clciked');
    };
    return (react_1["default"].createElement("div", { className: "bg-white flex z-40  h-14 shadow-lg fixed w-full  top-0" },
        react_1["default"].createElement("div", { className: "flex justify-center content-center items-center w-1/4 mt-1 ml-10" },
            react_1["default"].createElement(fa_1.FaFacebook, { className: "mr-2 text-blue-500 text-3xl" }),
            react_1["default"].createElement("label", { className: " relative left-10" },
                react_1["default"].createElement(fa_1.FaSistrix, { className: "text-gray-500 text-2xl" })),
            react_1["default"].createElement("input", { type: "text", placeholder: "search facebook", className: " outline-none   bg-gray-200 py-2 px-12 rounded-full " })),
        react_1["default"].createElement("div", { className: "flex w-1/2  justify-evenly items-center " },
            react_1["default"].createElement(bs_1.BsHouseFill, { className: "text-3xl bg-blue border-b-4 border-blue-600" }),
            react_1["default"].createElement(bs_1.BsLayoutTextSidebarReverse, { className: "text-3xl text-gray-400", onClick: openRequestMOdel }),
            react_1["default"].createElement("span", null,
                " ",
                react_1["default"].createElement("p", { className: "text-red-500 absolute bottom-8 text-xl" }, notification),
                " ",
                react_1["default"].createElement(bs_1.BsFillPeopleFill, { className: "text-3xl text-gray-400 " })),
            react_1["default"].createElement(bs_1.BsFillBriefcaseFill, { className: "text-3xl text-gray-400" }),
            react_1["default"].createElement(bs_1.BsFillPeopleFill, { className: "text-3xl text-gray-400" })),
        react_1["default"].createElement(RequestComponent_1["default"], null)));
}
exports["default"] = Navbar;
