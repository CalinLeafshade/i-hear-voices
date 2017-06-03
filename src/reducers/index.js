import { combineReducers } from "redux";
import player from "./player";
import podcasts from "./podcasts";

export default combineReducers({ player, podcasts });
