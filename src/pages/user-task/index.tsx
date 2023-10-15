import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Layout from "../../components/layout/kolLayout";
import useTaskList, { useUserTaskList } from "../../hooks/useTaskList";
import Order from "./Order";
import Task from "../../components/Task";

function UserTask() {
  const taskInHall = useTaskList();
  const tasks = useUserTaskList();

  const tasks1 = useUserTaskList(1);
  const tasks2 = useUserTaskList(2);
  const tasks3 = useUserTaskList(3);
  const tasks4 = useUserTaskList(4);
  return (
    <Layout>
      <Tabs defaultActiveKey="1">
        <TabPane className="flex flex-col gap-4" tab={`全部(${tasks?.length ?? '0'})`} key="1">
          {tasks &&
            tasks.map((task, idx) => (
              <Order key={task.id} task={task} opensource={idx % 2 === 0} />
            ))}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab={`暂未接单(${taskInHall?.length ?? '0'})`} key="2">
          {taskInHall &&
            taskInHall
              .map((task, idx) => (
                <Task key={task.id} task={task} opensource={idx % 2 === 0} />
              ))}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab={`进行中(${tasks2?.length ?? '0'})`} key="3">
          {tasks2 &&
            tasks2
              .map((task, idx) => (
                <Order key={task.id} task={task} opensource={idx % 2 === 0} />
              ))}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab={`已完成(${tasks3?.length ?? '0'})`} key="4">
          {tasks3 &&
            tasks3
              .map((task, idx) => (
                <Order key={task.id} task={task} opensource={idx % 2 === 0} />
              ))}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab={`已取消(${tasks4?.length ?? '0'})`} key="5">
          {tasks4 &&
            tasks4
              .map((task, idx) => (
                <Order key={task.id} task={task} opensource={idx % 2 === 0} />
              ))}
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default UserTask;
