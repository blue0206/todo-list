import "./style.css";
import { TaskControl, projectConstructor } from "./constructor.js";
import { inboxDisplay, projectDisplay } from "./display.js";

TaskControl.taskConstructor();
TaskControl.taskEditor();
projectConstructor();
inboxDisplay();
projectDisplay();