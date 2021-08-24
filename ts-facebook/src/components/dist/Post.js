"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Emoji_1 = require("./Emoji");
var Comment_1 = require("./Comment");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var firebase_1 = require("firebase");
function Post(props) {
    var _a;
    var _b = react_1.useState(false), open = _b[0], setopen = _b[1];
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var _c = react_1.useState([]), friendIds = _c[0], setFriendIds = _c[1];
    var _d = react_1.useState(), ifFriends = _d[0], setFriends = _d[1];
    console.log(friendIds, "see");
    var checkForCurrentUserPost = function () {
        if (props.userId === user.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    var checkForFriendPost = function () {
        var foundFriend = friendIds.find(function (friendId) { return friendId[1].receiver === user.uid; });
        if (foundFriend) {
            return true;
        }
        else {
            return false;
        }
    };
    react_1.useEffect(function () {
        var friend_db = firebase_1["default"].database().ref('friend-list');
        friend_db.on('value', function (friend_ids) {
            if (friend_ids.val()) {
                var listOfData = Object.entries(friend_ids.val());
                setFriendIds(listOfData);
            }
        });
    }, [user.uid]);
    // const openComment = () => {
    //     setopen(!open);
    // }
    return (react_1["default"].createElement(react_1["default"].Fragment, null, checkForFriendPost() ?
        react_1["default"].createElement("div", { className: "rounded-xl  relative shadow-md mt-4 px-6  py-6 w-2/3 mx-auto flex space-y-4 flex-col items-center bg-white" },
            react_1["default"].createElement("div", { className: "flex absolute left-6 " },
                react_1["default"].createElement("img", { className: "w-20 border-2 p-1 border-gray-200 h-20 rounded-full", src: props.profilePic, alt: "" }),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/profile/:" + props.username, className: "font-bold ml-3 text-lg " }, props.username),
                    react_1["default"].createElement("p", { className: " ml-4" }, new Date((_a = props.timestamp) === null || _a === void 0 ? void 0 : _a.toDate()).toUTCString()))),
            react_1["default"].createElement("div", { className: "w-full " },
                react_1["default"].createElement("p", { className: "mt-16 ml-2 " },
                    react_1["default"].createElement("span", { className: "font-bold text-red-400 mr-3" }, "Message:"),
                    props.message),
                react_1["default"].createElement("img", { className: "w-full h-1/3 mt-2", src: props.image, alt: "" })),
            react_1["default"].createElement(Emoji_1["default"], { id: props.id, holePost: props.holePost }),
            react_1["default"].createElement(Comment_1["default"], { open: open, id: props.id })) : 'nothinf'));
}
exports["default"] = Post;
