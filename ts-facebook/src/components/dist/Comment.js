"use strict";
exports.__esModule = true;
var react_1 = require("react");
var firestore_config_1 = require("../firestore.config");
var react_redux_1 = require("react-redux");
var gr_1 = require("react-icons/gr");
// import { collectionSnapshot } from "../utils"
var firebase_1 = require("firebase");
function Comment(props) {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _a = react_1.useState(''), userComment = _a[0], setUserComment = _a[1];
    var typeComment = function (e) {
        setUserComment(e.target.value);
    };
    var commentAdd = function (e) {
        e.preventDefault();
        firestore_config_1["default"].collection('posts').doc(props.id).collection("comments").add({
            comment: userComment,
            username: user.displayName,
            currentTime: firebase_1["default"].firestore.FieldValue.serverTimestamp()
        });
        setUserComment("");
    };
    var _b = react_1.useState([]), getComment = _b[0], setGetComment = _b[1];
    react_1.useEffect(function () {
        firestore_config_1["default"].collection('posts').doc(props.id).collection('comments').orderBy('currentTime', "desc").onSnapshot(function (res) {
            var list = res.docs.map(function (doc) { return (doc.data()); });
            setGetComment(list);
        });
    }, [props.id]); /// props.id as a dependency
    return (react_1["default"].createElement("div", { className: "w-full  " },
        react_1["default"].createElement("form", { onSubmit: commentAdd, className: "w-full flex justify-start flex-col items-center py-4 bg-gray-100" },
            react_1["default"].createElement("div", { className: "flex px-12 w-full" },
                react_1["default"].createElement("img", { src: user.photoURL, className: "w-16 border-2 p-1 border-gray-200 h-16 rounded-full", alt: "user-img" }),
                react_1["default"].createElement("input", { value: userComment, onChange: typeComment, type: "text", className: "rounded-full w-11/12  mx-auto px-6 outline-none h-12 mt-2 ml-3 bg-gray-200 text-black", placeholder: "write a comment..." }),
                react_1["default"].createElement("div", { className: "relative right-24 flex top-6 " },
                    react_1["default"].createElement(gr_1.GrRaspberry, { className: "mr-4 text-gray-500" }),
                    react_1["default"].createElement(gr_1.GrReddit, { className: "text-gray-500" }))),
            getComment.map(function (user) { return (react_1["default"].createElement("div", { className: "  flex bg-gray-200 py-2 mb-0.5 mx-10 w-2/3 px-8 text-start rounded-full" },
                react_1["default"].createElement("h1", { className: "font-semibold" }, user.username),
                ":",
                react_1["default"].createElement("p", null, user.comment))); }))));
}
exports["default"] = Comment;
