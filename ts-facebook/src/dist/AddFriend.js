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
var firebase_1 = require("firebase");
var firestore_config_1 = require("../firestore.config");
var react_redux_1 = require("react-redux");
function AddFriend() {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _a = react_1.useState([]), notificationList = _a[0], setNotificationList = _a[1];
    var _b = react_1.useState([]), allUser = _b[0], setAllUser = _b[1];
    var _c = react_1.useState(), ind = _c[0], setInd = _c[1];
    ///// add friend request in database
    var sendRequest = function (userIdOFsender, index) {
        setInd(index);
        var notification = {
            sendTo: userIdOFsender,
            sendFrom: user.uid,
            name: user.displayName,
            photo: user.photoURL,
            dateTime: new Date().toLocaleString()
        };
        firebase_1["default"].database().ref('notification').push(notification, function (error) {
            if (error) {
                alert(error);
            }
        });
    };
    /////// check id of receiver of request
    var checkRequest = function (suggestionBoxUser) {
        var found = notificationList.find(function (item) { return item.sendTo === suggestionBoxUser.id; });
        if (found) {
            return true;
        }
        else {
            return false;
        }
    };
    /// useEffect for fetcging post from database
    react_1.useEffect(function () {
        var fetchPosts = function () {
            firestore_config_1["default"].collection('users').onSnapshot(function (res) {
                setAllUser(res.docs.map(function (doc) { return (__assign(__assign({}, doc.data()), { id: doc.id })); }));
            });
        };
        fetchPosts();
    }, []);
    react_1.useEffect(function () {
        var notiRef = firebase_1["default"].database().ref('notification');
        notiRef.orderByChild('sendFrom').equalTo(user.uid).on('value', function (requests) {
            if (requests.val()) {
                var list = Object.values(requests.val());
                setNotificationList(list);
            }
        });
    }, [allUser, user.uid]);
    return (react_1["default"].createElement("div", { className: " w-3/4 mx-auto py-4 bg-gray-50 shadow-md  mt-4 overflow-auto rounded-md " },
        react_1["default"].createElement("h2", { className: "text-center mb-2  border-b border-gray-200 text-xl w-full" }, "Make Friends Online"),
        react_1["default"].createElement("div", { className: " w-full  flex justify-center items-center h-full  space-x-24 " }, allUser.map(function (userData, index) { return ("" + userData.username !== user.displayName ?
            react_1["default"].createElement("div", { className: "  rounded-md shadow bg-white w-48 h-52 flex flex-col justify-center items-center  text-center content-center" },
                react_1["default"].createElement("img", { className: "w-24 rounded border border-gray-200 h-24", src: userData.userImage, alt: "" }),
                react_1["default"].createElement("p", { className: "w-full text-center mt-2 text-xl " }, userData.username),
                checkRequest(userData) ?
                    react_1["default"].createElement("button", { className: "  mt-4 w-11/12 p-1  text-center bg-red-600 text-white rounded" }, "request send")
                    :
                        react_1["default"].createElement("button", { onClick: function () { return sendRequest(userData.id, index); }, className: "  mt-4 w-11/12 p-1  text-center bg-blue-500 text-white rounded" }, "Add Friend"))
            : ''); }))));
}
exports["default"] = AddFriend;
