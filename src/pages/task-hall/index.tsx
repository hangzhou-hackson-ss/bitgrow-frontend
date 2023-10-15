import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Layout from "../../components/layout/kolLayout";
import Task from "../../components/Task";
import { useEffect, useState } from "react";
import http from "../../lib/http";

function TaskHall() {
  const [order, setOrder] = useState<any[]>([]);
  const tasks = order.map((o: any) => ({
    ...o.task,
    status: o.status
  }));
  useEffect(() => {
    http.get('order?kol=1').then(data => {
      setOrder(data);
    });
  });
  return (
    <Layout>
      <Tabs defaultActiveKey="1">
        <TabPane className="flex flex-col gap-4" tab="谁指派我" key="1">
          {tasks  && order&&
            tasks
              .filter((task) => task.status === 1)
              .map((task, idx) => (
                <Task orderId={order[idx].id} key={idx} task={task} opensource={idx % 2 === 0} />
              ))}
        </TabPane>
        <TabPane className="flex flex-col gap-4" tab="先到先得" key="2">
          {tasks &&
            tasks
              .filter((task) => task.status === 1)
              .map((task, idx) => (
                <Task orderId={order[idx].id} key={idx} task={task} opensource={idx % 2 === 0} />
              ))}
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default TaskHall;
