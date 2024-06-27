import "./style.css";
import { taskConstructor, projectConstructor } from "./constructor.js";
import { taskWindowClose, inboxDisplay, projectDisplay } from "./main-display.js";

taskConstructor();
projectConstructor();
taskWindowClose();
inboxDisplay();
projectDisplay();