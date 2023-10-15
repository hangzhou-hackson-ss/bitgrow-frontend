import { useEffect, useState } from "react"
import http from "../lib/http";

export interface TaskProps {
  area: number;
  delivery_method: number;
  end_time: string;
  fans_requirement: number;
  id: number;
  name: number;
  people: string;
  platform: number;
  project: number;
  requirement: string;
  status: number;
  text: string;
}
function useTaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>();
  useEffect(() => {
    http.get('task').then(data => {
      setTasks(data)
    })
  }, [])
  return tasks;
}

export function useUserTaskList(status?: number) {
  const [tasks, setTasks] = useState<TaskProps[]>();
  useEffect(() => {
    (async function () {
      const orders = await http.get('order/', {
        kol: 1,
        status,
      })
      setTasks(orders.map((order: any) => order.task))
    })()

  }, [])
  return tasks;
}
export default useTaskList
