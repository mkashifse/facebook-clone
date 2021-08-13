"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_1 = require("react-router");
var face_svg_1 = require("../images/face.svg");
var facebook_removebg_preview___Copy_png_1 = require("../images/facebook-removebg-preview - Copy.png");
var firestore_config_1 = require("../firestore.config");
var react_redux_1 = require("react-redux");
function Login() {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    console.log(user, "hhhh");
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_1.useHistory();
    function signIn() {
        firestore_config_1.auth.signInWithPopup(firestore_config_1.provider).then(function (result) {
            console.log(result);
            dispatch({ type: "add_user", payload: result.user });
            history.push('/');
        })["catch"](function (error) {
            alert(error.message);
        });
    }
    return (react_1["default"].createElement("div", { className: "login flex-col h-screen w-full flex justify-center items-center" },
        react_1["default"].createElement("img", { className: "w-24 h-24", src: face_svg_1["default"], alt: "" }),
        react_1["default"].createElement("img", { className: "", src: facebook_removebg_preview___Copy_png_1["default"], alt: "" }),
        react_1["default"].createElement("button", { className: " rounded bg-blue-600 text-lg text-white w-48 py-2", onClick: signIn, type: "submit" }, "Sign In")));
}
exports["default"] = Login;
