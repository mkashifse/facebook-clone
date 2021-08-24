"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var react_redux_1 = require("react-redux");
var firestore_config_1 = require("../firestore.config");
var firebase_1 = require("firebase");
function PostCreater() {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _a = react_1.useState(""), input = _a[0], setInput = _a[1];
    var _b = react_1.useState(""), imageUrl = _b[0], setImageUrl = _b[1];
    var handleClick = function (e) {
        e.preventDefault();
        /// db stuff start here
        firestore_config_1["default"].collection("posts").add({
            message: input,
            timestamp: firebase_1["default"].firestore.FieldValue.serverTimestamp(),
            username: user.displayName,
            image: imageUrl,
            profilePic: user.photoURL,
            userId: user.uid
        });
        console.log(input);
        setInput("");
        setImageUrl("");
    };
    return (react_1["default"].createElement("div", { className: "message-sender rounded-xl shadow-md mt-24 p-6 w-2/3 m-auto flex space-y-4 flex-col items-center bg-white" },
        react_1["default"].createElement("div", { className: " flex w-full " },
            react_1["default"].createElement("form", { className: "flex  justify-center items-center w-full space-x-4 " },
                react_1["default"].createElement("img", { src: user.photoURL, className: "w-16 border-2 p-1 border-gray-200 h-16 rounded-full", alt: "user-img" }),
                react_1["default"].createElement("input", { type: "text", value: input, onChange: function (e) { return setInput(e.target.value); }, className: "  flex-1 bg-gray-50  border-2 border-gray-300 rounded-xl outline-none px-8 py-1", placeholder: 'whats on your mind' }),
                react_1["default"].createElement("input", { type: "text", value: imageUrl, onChange: function (e) { return setImageUrl(e.target.value); }, className: "flex-1  border-2 bg-gray-50 border-gray-300 rounded-xl outline-none px-8 py-1", placeholder: 'image url optional' }),
                react_1["default"].createElement("button", { className: "hidden", type: "submit", onClick: handleClick }, "hidden button"))),
        react_1["default"].createElement("div", { className: "message-bottom rounded  flex w-full justify-center items-center bg-gray-200 h-12 " },
            react_1["default"].createElement("select", { className: "  h-8  text-red-500 hover:bg-gray-100  rounded-full px-12 outline-none w-1/2 " },
                react_1["default"].createElement("option", { className: "w-1/2 ", value: "Public" }, "Public"),
                react_1["default"].createElement("option", { value: "private" }, "Private"),
                react_1["default"].createElement("option", { value: "friendsOnly" }, "Friends only"))),
        react_1["default"].createElement("div", { className: "message-bottom  flex w-1/3 justify-between items-center " },
            react_1["default"].createElement("div", { className: "flex bg-gray-100 w-32 cursor-wait rounded-xl  pointer hover:bg-gray-100 p-2  justify-between items-center  video-option" },
                react_1["default"].createElement(fa_1.FaVideo, { style: { color: 'red' } }),
                react_1["default"].createElement("h3", null, "Live Video")),
            react_1["default"].createElement("label", { htmlFor: "upload", className: "flex bg-gray-100 w-36 cursor-pointer rounded-xl hover:bg-gray-100 p-2 justify-between items-center" },
                react_1["default"].createElement(fa_1.FaImage, { style: { color: "green" } }),
                react_1["default"].createElement("h3", null, "photo/image")),
            react_1["default"].createElement("input", { type: "file", className: "w-full hidden", id: "upload" }))));
}
exports["default"] = PostCreater;
