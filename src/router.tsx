import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homepage";
import TaskHall from "./pages/task-hall";
import TaskManagement from "./pages/admin/task-management";
import Kol from "./pages/admin/kol";
import Analysis from "./pages/admin/analysis";
import CreateTask from "./pages/admin/create-task";
import UserTask from "./pages/user-task";
import TaskInfo from "./pages/admin/task-info";
function _Router() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-task" element={<UserTask />} />
        <Route path="/task-hall" element={<TaskHall />} />
        <Route path="/task-info/:id" element={<TaskInfo />} />

        <Route path="/admin/task-management" element={<TaskManagement />} />
        <Route path="/admin/kol" element={<Kol />} />
        <Route path="/admin/analysis" element={<Analysis />} />
        <Route path="/admin/create-task" element={<CreateTask />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default _Router;
