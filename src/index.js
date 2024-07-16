import "./style.css";
import { TaskControl, projectConstructor } from "./constructor.js";
import { taskWindowClose, inboxDisplay, projectDisplay } from "./main-display.js";

TaskControl.taskConstructor();
projectConstructor();
taskWindowClose();
inboxDisplay();
projectDisplay();