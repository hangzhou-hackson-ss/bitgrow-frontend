import { useEffect, useState } from 'react'
import Layout from '../../../components/layout/kolLayout'
import { useParams } from "react-router-dom";
import http from '../../../lib/http';
import { Button, Input, Modal, theme } from 'antd';
import toast from 'react-hot-toast';
import TextArea from 'antd/es/input/TextArea';
function TaskInfo() {
  const query = useParams();
  const id = query.id;
  const [task, setTask]= useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  useEffect(() => {
    console.log({
      dd: 'task/' + id
    });
    http.get('task/' + id).then(data => {
      setTask(data)
    });
  }, [id])
  return (
    <Layout>
       <div
        className="p-6 mt-6 flex justify-between"
        style={{ background: colorBgContainer }}
      >
        <div className="flex flex-col gap-3">
          <p className='text-lg font-bold'>发布一条参赛选手现场奋斗开发的推文</p>
          <p className='text-lg font-bold'>任务金额 $600</p>
          <p>截止日期: 2023-10-16</p>
        </div>
        <div className='flex items-center'>
          {localStorage.getItem("validation-success") === 'true' && <p className="text-gray-600">推特验证成功</p>}
         {localStorage.getItem("validation-success") !== 'true' &&  <><Button className="bg-[#1677ff] mr-4" type="primary" onClick={() => {
            setIsModalOpen(true)
          }}>
            发布推文
          </Button><Button className="bg-[#1677ff]" type="primary" onClick={async () => {
             setIsTwitterModalOpen(true)
          }}>
            完成任务并验证
          </Button></>}

           <Modal
            title="推文"
            open={isTwitterModalOpen}
            onOk={() => {
              console.log("1");
            }}
            onCancel={() => setIsTwitterModalOpen(false)}
            footer={[
              <Button
                key="ok"
                type="primary"
                className="bg-[#1677ff]"
                onClick={async () => {
                  try {
                    await http.patch("order/"+ id + "/", {
                      action: "submitVerify"
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                    localStorage.setItem('validation-success', 'true')
                    toast.success("验证成功");
                  }catch(e) {
                    toast.error("验证失败")
                  }
                }}
              >
                验证
              </Button>,
            ]}
          >
            <p className="my-2">请输入推文URL</p>
            <Input placeholder='请输入'/>
          </Modal>
        </div>
      </div>
      <div
        className="p-6 mt-6 flex flex-col gap-3 justify-between"
        style={{ background: colorBgContainer }}
      >
        <p className='text-xl font-bold'>具体要求</p>
        <p className='text-lg font-bold'>结算要求: 发布后立即结算</p>
        <p className='text-lg font-bold'>参考指标: 无</p>
        <p className='text-lg font-bold'>参与条件: 1000粉丝以上</p>


        <p className='mt-4 text-xl font-bold'>产品介绍</p>
        <p className='text-lg font-bold'>ETH hangzhou</p>
        <p className='text-lg font-bold'>所属类别: Defi</p>
        <p className='text-lg font-bold'>产品介绍: xxx</p>


        <p className='text-lg font-bold'>任务要求</p>
        <p className='text-lg font-bold'>参考以下内容将文案与连接发布到Twitter,并且365天不删除</p>
        <p className='text-lg font-bold'>xxxxx</p>

        <Modal
            title="Twitter"
            open={isModalOpen}
            onOk={() => {
              console.log("1");
            }}
            onCancel={() => setIsModalOpen(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                取消
              </Button>,
            ]}
          >
            <p className="my-2">想让您的 Web3 项目火到爆吗？BitGrow 用AI智能为您匹配最合适的 KOL，并自动产生高影响力的推文内容。立即注册，让营销变得轻而易举！#Web3营销服务 #项目方必备 #AI营销</p>
          </Modal>
      </div>
    </Layout>
  )
}

export default TaskInfo
