import "./style.css";
import { TaskControl, ProjectControl } from "./constructor.js";
import { ProjectDisplayControl, myProjectsTab } from "./display.js";

TaskControl.taskConstructor();
TaskControl.taskEditor();
TaskControl.taskDestructor();
ProjectControl.projectConstructor();
ProjectDisplayControl.inboxDisplay();
ProjectDisplayControl.projectDisplay();
myProjectsTab();