import "./style.css";
import { TaskControl, projectConstructor } from "./constructor.js";
import { ProjectDisplayControl } from "./display.js";

TaskControl.taskConstructor();
TaskControl.taskEditor();
projectConstructor();
ProjectDisplayControl.inboxDisplay();
ProjectDisplayControl.projectDisplay();