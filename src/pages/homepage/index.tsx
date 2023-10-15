import { Avatar, Button, theme } from "antd";
import Layout from "../../components/layout/kolLayout";
import { UserOutlined } from "@ant-design/icons";
import { useAccount, useContractWrite } from "wagmi";
import Task from "../../components/Task";
import useTaskList from "../../hooks/useTaskList";
import { CONTRACT_ADDRESS } from "../../constants";
import abi from '../../abi/abi.json';
import { useEffect, useState } from "react";
function HomePage() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { address } = useAccount();
  const tasks = useTaskList();

  const [orderId, setOrderId] = useState(1);
   const { isLoading, isSuccess, write: endOrder } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'endOrder',
    args: [orderId, address]
  });
  const [claimable, setClaimable] = useState(0);

  useEffect(() => {
    const claim = localStorage.getItem('claimable');
    if(!claim) {
      localStorage.setItem('claimable', '100');
      window.location.reload();
    } else {
      setClaimable(Number(claim))
    }
  });
  return (
    <Layout>
      <div
        className="p-6 flex justify-between items-center"
        style={{ background: colorBgContainer }}
      >
        <div className="flex items-center">
          <Avatar size={64} icon={<UserOutlined />} />
          <p className="ml-5">ID: {address}</p>
        </div>
        <div className="flex items-start gap-10 text-center">
          <div>
            <p className="text-2xl font-bold">$128</p>
            <p>任务总金额</p>
          </div>
          <div>
            <p className="text-2xl font-bold">$8</p>
            <p>待到帐金额</p>
            <p className="text-xs">完成任务后奖励需冷冻7天</p>
          </div>
          <div>
            <p className="text-2xl font-bold">$100</p>
            <p>可领取金额</p>
          </div>
          <div className="py-3">
            <Button className="bg-[#1677ff]" type="primary" onClick={() => {
              endOrder();
              localStorage.setItem('claimable', '0')
            }}>
              領取
            </Button>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default HomePage;
