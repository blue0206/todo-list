import "./style.css";
import { TaskControl, ProjectControl, inboxSetup } from "./constructor.js";
import { myProjectsTab, homeTab } from "./display.js";
import home from "./home.js";

TaskControl.taskConstructor();
TaskControl.taskEditor();
TaskControl.taskDestructor();
ProjectControl.projectConstructor();
ProjectControl.projectEditor();
inboxSetup();
myProjectsTab();
homeTab();
home();