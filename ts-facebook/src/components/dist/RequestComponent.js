"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("../style/model.css");
var firebase_1 = require("firebase");
var react_redux_1 = require("react-redux");
function RequestComponent(props) {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _a = react_1.useState([]), userRequests = _a[0], setUserRequests = _a[1];
    var _b = react_1.useState([]), userKeys = _b[0], setUserKeys = _b[1];
    react_1.useEffect(function () {
        var notiRef = firebase_1["default"].database().ref('notification');
        notiRef.orderByChild('sendTo').equalTo(user.uid).on('value', function (userRequests) {
            if (userRequests.val()) {
                var listOfData = Object.entries(userRequests.val());
                setUserRequests(listOfData);
            }
        });
    }, [user.uid]);
    var acceptRequest = function (reqKey) {
        firebase_1["default"].database().ref('notification').child(reqKey).once('value', function (noti) {
            var reqObj = noti.val();
            reqObj.status = "accept";
            firebase_1["default"].database().ref('notification').child(reqKey).update(reqObj, function (err) {
                if (err)
                    alert(err);
                else {
                    var friendList = { sender: reqObj.sendFrom, receiver: reqObj.sendTo };
                    firebase_1["default"].database().ref('friend-list').push(friendList, function (err) {
                        if (err)
                            alert(err);
                    });
                }
            });
        });
    };
    var rejectRequest = function (reqKey) {
        firebase_1["default"].database().ref('notification').child(reqKey).once('value', function (noti) {
            var reqObj = noti.val();
            reqObj.status = "reject";
            firebase_1["default"].database().ref('notification').child(reqKey).update(reqObj, function (err) {
                if (err)
                    alert(err);
                else { }
            });
        });
    };
    return (react_1["default"].createElement("div", { className: "" + (props.model ? 'model' : 'closeModel') },
        react_1["default"].createElement("div", { className: "" + (props.model ? 'visible' : 'noVisible') },
            react_1["default"].createElement("p", { className: "text-center text-xl font-serif" }, "Your friend request list"),
            react_1["default"].createElement("hr", { className: "bg-red-600 w-full h-1" }),
            userRequests.map(function (userRequestData) { return (userRequestData[1].status === 'pending' ?
                react_1["default"].createElement("div", { className: "p-2 bg-white shadow-2xl mt-4 flex flex-col items-center justify-evenly" },
                    react_1["default"].createElement("h3", null,
                        react_1["default"].createElement("span", { className: "font-bold font-serif" },
                            userRequestData[1].name,
                            ":"),
                        "send friend request to you"),
                    react_1["default"].createElement("div", { className: "p-1 px-2 space-x-1 w-full bg-white shadow-2xl mt-1 flex items-center justify-evenly" },
                        react_1["default"].createElement("img", { className: "w-12 border-2 border-gray-400 p-1 rounded-full", src: userRequestData[1].photo, alt: userRequestData[1].photo }),
                        react_1["default"].createElement("button", { onClick: function () { return acceptRequest(userRequestData[0]); }, className: "bg-blue-700 text-white w-32 rounded-md px-2 py-1" }, "Accept Request"),
                        react_1["default"].createElement("button", { onClick: function () { return rejectRequest(userRequestData[0]); }, className: "bg-red-700 text-white w-32 rounded-md px-2 py-1" }, "Delete")))
                : ''); }))));
}
exports["default"] = RequestComponent;
