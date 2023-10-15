import TwitterImg from "../../../asset/twitter.svg";
import { Button } from "antd";
import { TaskProps } from "../../../hooks/useTaskList";
function Task({ task }: { task?: TaskProps }) {
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div className="w-[300px]">
          <div className="flex">
            <div className="bg-gray-400 ml-2 p-2 text-sm flex items-center">
              <img className="mr-1" width={20} height={20} src={TwitterImg} />
              <p>普通推文</p>
            </div>
            <div className="bg-gray-400 ml-2 p-2 text-sm">一口价</div>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <p className="font-bold">{task?.name}</p>
            <div className="flex">
              <p className="text-sm mr-3">任务创建: 2023-10-16</p>
            </div>
          </div>
        </div>
        <div className="text-sm font-bold">
          价格: $300
        </div>
        <div className="flex items-center gap-10">
          <Button className="w-[140px] h-[40px]">关闭任务</Button>
          <Button className="w-[140px] h-[40px] bg-[#1677ff]" type="primary">
            查看详情
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Task;
