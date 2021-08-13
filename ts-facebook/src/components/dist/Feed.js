"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Post_1 = require("./Post");
var utils_1 = require("../utils");
var react_redux_1 = require("react-redux");
function Feed() {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState([]), posts = _a[0], setPosts = _a[1];
    console.log(posts, "all");
    react_1.useEffect(function () {
        utils_1.collectionSnapshot("posts", function (list) {
            setPosts(list);
        });
    }, []);
    return (react_1["default"].createElement("div", { className: "feed bg-red mb-10" }, posts.map(function (post) {
        dispatch({ type: "post", payload: post });
        return react_1["default"].createElement(Post_1["default"], { holePost: post, profilePic: post.profilePic, image: post.image, message: post.message, timestamp: post.timestamp, username: post.username, id: post.id, userId: post.userId });
    })));
}
exports["default"] = Feed;
