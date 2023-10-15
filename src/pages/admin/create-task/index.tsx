import { Button, Input, Modal, Radio, theme } from "antd";
import Layout from "../../../components/layout/adminLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OkImg from "../../../asset/ok.svg";
import TextArea from "antd/es/input/TextArea";
import { CONTRACT_ADDRESS, stories } from "../../../constants";
import useKolList from "../../../hooks/useKolList";
import { getCountryByLocation } from "../kol";
import abi from '../../../abi/abi.json';
import { useContractWrite } from "wagmi";
import http from "../../../lib/http";
import toast from 'react-hot-toast'

const Title = ({ children }: { children: string }) => (
  <p className="text-xl font-bold">{children}</p>
);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function decode(b: string) {
  let decodedBytes = new Uint8Array([...atob(b)].map(char => char.charCodeAt(0)));
  let decodedText = new TextDecoder().decode(decodedBytes)
  return decodedText;
}

function CreateTask() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [taskType, setTaskType] = useState(1);
  const [telegram, setTelegram] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(1);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [gen, setGen] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [taskName, setTaskName] = useState("");

  const [fansRequirement, setFansRequirement] = useState("1000");
  const [area, setArea] = useState(1);
  const [language, setLanguage] = useState(1);
  const [selectedKol, setSelectedKol] = useState(1);
  const [requirement, setRequirement] = useState("");
  const [text, setText] = useState("")
  const kols = useKolList();
  const orderId = Math.floor((Math.random() * 100000));
  const { isLoading, isSuccess, write: createOrder } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'createOrder',
    args: [orderId, kols? (kols[selectedKol]?.quoted_price ?? 0): 0]
  });
  useEffect(() => {
    if(isSuccess) {
      toast.success("创建订单成功")
    }
  }, [isLoading, isSuccess])
  const [genIn, setGenIn] = useState("");
  return (
    <Layout>
      {step === 1 && (
        <div
          className="p-6 flex flex-col gap-3"
          style={{ background: colorBgContainer }}
        >
          <h2 className="text-2xl font-bold">创建任务</h2>
          <Title>任务类型任务类型</Title>
          <p>任务名称</p> <Input placeholder="请输入" onChange={(e) => {
            setTaskName(e.target.value)
          }}/>
          <Title>想用那种平台和载体推广</Title>
          <p>twitter</p>
          <Radio.Group
            onChange={(e) => setTaskType(e.target.value)}
            value={taskType}
          >
            <Radio value={1}>普通推文</Radio>
            <Radio value={2}>长文</Radio>
            <Radio value={3}>联合Space</Radio>
          </Radio.Group>
          <p>telegram</p>
          <Radio.Group
            onChange={(e) => setTelegram(e.target.value)}
            value={telegram}
          >
            <Radio value={1}>群组推文</Radio>
            <Radio value={2}>频道推文</Radio>
          </Radio.Group>

          <Title>希望面向什么地区和语言的用户进行推广</Title>
          <p>地区</p>
          <Radio.Group
            onChange={(e) => setArea(e.target.value)}
            value={area}
          >
            <Radio value={1}>台湾</Radio>
            <Radio value={2}>韩国</Radio>
            <Radio value={3}>日本</Radio>
            <Radio value={4}>新加坡</Radio>
          </Radio.Group>
          <p>语言</p>
          <Radio.Group
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <Radio value={1}>英文</Radio>
            <Radio value={2}>韩文</Radio>
            <Radio value={3}>日本</Radio>
          </Radio.Group>
          <Title>想用哪种方式派单</Title>
          <Radio.Group
            onChange={(e) => setDeliveryMethod(e.target.value)}
            value={deliveryMethod}
            className="flex flex-col gap-3"
          >
            <div>
              <Radio value={1}>派单(有明确KOL或想指定KOL)</Radio>{" "}
            </div>
            <div>
              <Radio value={2}>
                先到先得(开放领取，任何满足条件的 KOL
                都可以接单，直到投放预算耗尽)
              </Radio>{" "}
            </div>
            <div>
              <Radio value={3}>招募(发布要求，等KOL自荐后挑选)</Radio>{" "}
            </div>
          </Radio.Group>
          <Title>结算方式</Title>
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            className="flex flex-col gap-3"
          >
            <div>
              <Radio value={1}>发布内容后直接结算</Radio>{" "}
            </div>
            <div>
              <Radio value={2}>按转化CPS结算</Radio>{" "}
            </div>
            <div>
              <Radio value={3}>按有效浏览量结算</Radio>{" "}
            </div>
          </Radio.Group>
          <Title>接单条件</Title>
          <p>KOL粉丝数需大于</p>
          <Input placeholder="请输入" value={fansRequirement} onChange={(e) => { 
          setFansRequirement(e.target.value)}}/>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/task-management")}>
              取消
            </Button>
            <Button
              type="primary"
              className="bg-[#1677ff]"
              onClick={() => setStep(2)}
            >
              下一步
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div
          className="p-6 flex flex-col gap-3"
          style={{ background: colorBgContainer }}
        >
          <h2 className="text-2xl font-bold">KOL 选择</h2>
          <p>以下是符合本推广任务形式的KOL，可从中挑选</p>
          <table>
            <tr>
              <th>KOL 信息</th>
              <th>受众地区</th>
              <th>受众语言</th>
              <th>连接用户数</th>
              <th>平均展示量</th>
              <th>kol一口价价格</th>
              <th>单条内容报价</th>
            </tr>
            {kols?.map(kol => <tr  key={kol.id} className="text-center h-[100px] mb-10 cursor-pointer" onClick={() => {
              setSelectedKol(kol.id)
            }}>
              <td>
                <div className="flex items-center">
                  <img className="rounded-full mr-3" src={kol.avatar} width={50} height={50}/>
                  <p>{kol.id} {kol.name}</p>
                </div>
              </td>
              <td>{getCountryByLocation(kol.language)}</td>
              <td>繁体中文</td>
              <td>18K</td>
              <td>32K</td>
              <td>${kol.quoted_price ?? 0}</td>
              <td>
                  <p>300</p>
              </td>
              <td>
                  {selectedKol === kol.id &&<img src={OkImg} width={20} height={20} />}
              </td>
            </tr>)}
          </table>
          <div className="flex gap-4">
            <Button onClick={() => setStep(1)}>上一步</Button>
            <Button
              type="primary"
              className="bg-[#1677ff]"
              onClick={() => setStep(3)}
            >
              下一步
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div
          className="p-6 flex flex-col gap-3"
          style={{ background: colorBgContainer }}
        >
          <h2 className="text-2xl font-bold">产品介绍</h2>
          <Title>项目名称</Title>
          <Input placeholder="请输入" />
          <Title>项目介绍</Title>
          <Input placeholder="请输入" />
          <Title>项目赛道</Title>
          <Input placeholder="请输入" />

          <Title>任务要求</Title>
          <TextArea rows={5} placeholder="请输入" value={requirement} onChange={(e) =>setRequirement(e.target.value) }/>
          <div className="flex justify-end">
            <p
              className="text-xs text-[#1677ff] font-bold cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              人工智能生成
            </p>
          </div>
          <Modal
            title="人工智能生成"
            open={isModalOpen}
            onOk={() => {
              console.log("1");
            }}
            onCancel={() => setIsModalOpen(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                取消
              </Button>,
              <Button
                key="ok"
                type="primary"
                className="bg-[#1677ff]"
                onClick={async () => {
                  setDisabled(true);
                  const originText= stories[genIn.includes(decode('QUnmmbrog73ljLnphY1LT0zjgIHoh6rliqjnlJ/miJDmjqjmlofokKXplIDmlofmoYg=')) ? 0: 1]
                  const genText = decode(originText);
                  setGen("")
                  for(let i = 0; i < genText.length; i++) {
                    setGen(prev => prev + genText[i])
                    await sleep(100)
                  }

                  setDisabled(false)
                }}
                disabled={disabled}
              >
                生成
              </Button>,
            ]}
          >
            <p className="my-2">请输入prompt文字</p>
            <TextArea rows={3} placeholder="请输入你的项目营销目标、转化点、推广链接和已有文案"
             onChange={e => setGenIn(e.target.value)}/>
            <TextArea className="mt-2" rows={8} value={gen}/>
          </Modal>
          <TextArea rows={5} placeholder="请输入推广文案" value={text} onChange={(e) => {
            setText(e.target.value)
          }}/>
          <div className="flex gap-4">
            <Button onClick={() => setStep(2)}>上一步</Button>
            <Button
              type="primary"
              className="bg-[#1677ff]"
              onClick={async () => {
                function createFormData(obj: Record<string, any>) {
                    const formData = new FormData();

                    for (let key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            formData.append(key, obj[key]);
                        }
                    }

                    return formData;
                }
                
                await http.post('order/', createFormData({
                  taskName,
                  deliveryMethod,
                  paymentMethod,
                  fansRequirement,
                  taskType,
                  area,
                  language,
                  requirement,
                  text,
                  endTime: "",
                  price: 0,
                  orderId,
                }));

                createOrder(
                  {
                    value: BigInt(1e15)
                  }
                )
              }}
            >
              提交并付款
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CreateTask;
