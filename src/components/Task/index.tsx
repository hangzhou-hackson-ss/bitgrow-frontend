import EthereumImg from "../../asset/ethereum.png";
import DiscordImg from "../../asset/discord.svg";
import HomeImg from "../../asset/home.svg";
import TwitterImg from "../../asset/twitter.svg";
import { Button } from "antd";
import QuestionImg from "../../asset/question.svg";
import SecurityImg from "../../asset/security.svg";
import { TaskProps } from "../../hooks/useTaskList";
import dayjs from "dayjs";
import http from "../../lib/http";
import toast from 'react-hot-toast'
function Task({
  task,
  opensource,
  orderId
}: {
  opensource?: boolean;
  task?: TaskProps;
  orderId?: number;
}) {
  return (
    <div className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex">
            <div className="flex bg-gray-400 p-2">
              <img className="w-5 h-5 mr-1" src={EthereumImg} />
              <p className="text-sm">ETH Hangzhou</p>
            </div>
            <div className="bg-gray-400 ml-2 p-2 text-sm">普通推文</div>
            <div className="flex gap-2 ml-4">
              <button>
                <img width={20} height={20} src={HomeImg} />
              </button>
              <button>
                <img width={20} height={20} src={TwitterImg} />
              </button>
              <button>
                <img width={20} height={20} src={DiscordImg} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <p className="font-bold">{task?.name}</p>
            <div className="flex">
              <p className="text-sm mr-3">
                截止日期:{" "}
                {dayjs(new Date(task?.end_time ?? Date.now())).format(
                  "YYYY-MM-DD",
                )}
              </p>
              {/* <p className="text-sm">完成日期: {dayjs(new Date(task.end_time)).format('YYYY-MM-DD')}</p> */}
            </div>
          </div>
        </div>
        {opensource !== undefined && (
          <div className="w-[240px]">
            {opensource === true && (
              <div className="flex items-start">
                <img
                  className="mr-1"
                  src={SecurityImg}
                  width={24}
                  height={24}
                />
                <p>合约已开源, Ai已审计, 但不代表100%无风险</p>
              </div>
            )}
            {opensource === false && (
              <div className="flex items-start">
                <img
                  className="mr-1 opacity-40"
                  src={QuestionImg}
                  width={24}
                  height={24}
                />
                <p>合约未开源, 请注意安全</p>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-10">
          <p className="font-bold text-2xl">$600</p>
          <Button className="w-[140px] h-[40px]">拒单</Button>
          <Button className="w-[140px] h-[40px] bg-[#1677ff]" type="primary" onClick={async () => {
            function createFormData(obj: Record<string, any>) {
              const formData = new FormData();

              for (let key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      formData.append(key, obj[key]);
                  }
              }

              return formData;
            }
            try {
              await http.patch("order/"+ orderId + "/", {
                action: "acceptOrder"
              });
              setTimeout(() => {
                window.location.href = "/task-info/" + task?.id
              }, 1000)
              toast.success("订单创建成功");
            }catch(e) {
              toast.error("订单创建失败")
            }
          //  try {
          //    await http.post("order/", createFormData({
          //     kol: 1,
          //     task: task?.id,
          //     orderId: Math.floor(Math.random() * 10000),
          //     taskId: task?.id,
          //   }))
          //   toast.success("订单创建成功");

          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1000)
          //  }catch(e) {

          //   toast.error("订单创建失败")

          //  }

          }}>
            接单
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Task;
