import { Tabs } from "antd";
import Layout from "../../../components/layout/adminLayout";
import TabPane from "antd/es/tabs/TabPane";
import Task from "./Task";
import useTaskList from "../../../hooks/useTaskList";

function TaskManagement() {
  const tasks = useTaskList();
  return (
    <Layout>
      <Tabs defaultActiveKey="1">
        <TabPane className="flex flex-col gap-4" tab="全部(356)" key="1">
          {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab="暂未接单(24)" key="2">
          {tasks &&
            tasks
              .filter((task) => task.status === 1)
              .map((task) => <Task key={task.id} task={task} />)}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab="进行中(24)" key="3">
          {tasks &&
            tasks
              .filter((task) => task.status === 2)
              .map((task) => <Task key={task.id} task={task} />)}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab="已完成(24)" key="4">
          {tasks &&
            tasks
              .filter((task) => task.status === 3)
              .map((task) => <Task key={task.id} task={task} />)}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab="已取消(24)" key="5">
          {tasks &&
            tasks
              .filter((task) => task.status === 4)
              .map((task) => <Task key={task.id} task={task} />)}
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default TaskManagement;
