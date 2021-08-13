"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var react_3 = require("react");
var react_router_dom_1 = require("react-router-dom");
var firestore_config_1 = require("../firestore.config");
var react_router_dom_2 = require("react-router-dom");
var Emoji_1 = require("./Emoji");
var Comment_1 = require("./Comment");
var react_redux_1 = require("react-redux");
var fa_1 = require("react-icons/fa");
function Profile() {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var name = react_router_dom_1.useParams().name;
    var _a = react_2.useState(false), open = _a[0], setopen = _a[1];
    var _b = react_2.useState([]), specific = _b[0], setSpecific = _b[1];
    var ArrayUser = {};
    specific.map(function (userData) { return (":" + userData.username === name ? ArrayUser = userData : ''); });
    react_3.useEffect(function () {
        var fetchPosts = function () {
            firestore_config_1["default"].collection('posts').onSnapshot(function (res) {
                setSpecific(res.docs.map(function (doc) { return (__assign(__assign({}, doc.data()), { id: doc.id })); }));
            });
        };
        fetchPosts();
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "w-full mt-12 h-96 bg-white border-b-2 border-gray-300 to-white  flex justify-end items-center" },
            react_1["default"].createElement("div", { style: { backgroundImage: "url(" + ArrayUser.image + ")", backgroundBlendMode: 'revert', backgroundPosition: 'cover' }, className: "w-11/12 mx-auto mt-2 rounded-md shadow-lg  flex justify-center items-center h-52  bg-red-300" },
                react_1["default"].createElement("img", { className: 'h-40 w-40 mt-32 ml-44 z-10    border-4  border-white  rounded-full', src: ArrayUser.profilePic, alt: "" }),
                react_1["default"].createElement("h2", { className: " text-2xl font-bold right-32 top-40 z-30 relative" }, ArrayUser.username),
                react_1["default"].createElement(fa_1.FaCameraRetro, { className: "text-3xl  text-gray-500  shadow-xl right-48 top-32 relative  z-30  bg-gray-100" }))),
        specific.map(function (userData) {
            var _a;
            return (":" + userData.username === name ?
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { className: "rounded-xl  relative left-1/3 mb-8 top-8 shadow-md mt-6 px-6  py-6 w-1/2   flex space-y-4 flex-col  items-center bg-white" },
                        react_1["default"].createElement("div", { className: "flex absolute left-6 " },
                            react_1["default"].createElement("img", { className: "w-20 border-2 p-1 border-gray-200 h-20 rounded-full", src: userData.profilePic, alt: "" }),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement(react_router_dom_2.Link, { to: "/profile/:" + userData.username, className: "font-bold ml-3 text-md " }, userData.username),
                                react_1["default"].createElement("p", { className: " ml-4" }, new Date((_a = userData.timestamp) === null || _a === void 0 ? void 0 : _a.toDate()).toUTCString()))),
                        react_1["default"].createElement("div", { className: "w-full " },
                            react_1["default"].createElement("p", { className: "mt-16 ml-2 " },
                                react_1["default"].createElement("span", { className: "font-bold text-red-400 mr-3" }, "Message:"),
                                userData.message),
                            react_1["default"].createElement("img", { className: "w-full h-1/3 mt-2", src: userData.image, alt: "" })),
                        react_1["default"].createElement(Emoji_1["default"], { id: userData.id, holePost: userData }),
                        react_1["default"].createElement(Comment_1["default"], { open: open, id: userData.id })))
                : '');
        })));
}
exports["default"] = Profile;
