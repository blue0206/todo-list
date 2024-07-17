import "./style.css";
import { TaskControl, ProjectControl } from "./constructor.js";
import { ProjectDisplayControl } from "./display.js";

TaskControl.taskConstructor();
TaskControl.taskEditor();
ProjectControl.projectConstructor();
ProjectDisplayControl.inboxDisplay();
ProjectDisplayControl.projectDisplay();