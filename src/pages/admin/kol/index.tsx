import { Button, Radio, theme } from "antd";
import Layout from "../../../components/layout/adminLayout";
import { useState } from "react";
import useKolList from "../../../hooks/useKolList";

export function getCountryByLocation(a: number) {
  switch (a) {
    case 1:
      return "美国";
    case 2:
      return "韩国";
    case 3:
      return "日本";
    default:
      return "东南亚";
  }
}
function Kol() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [track, setTrack] = useState(0);
  const [location, setLocation] = useState(0);
  const [languages, setLanguages] = useState(0);
  const [fansNumber, setFansNumber] = useState(0);

  const originalKols = useKolList();
  const kols = originalKols?.filter((row: any) => {
    if (location === 0) return true;
    return row.area === location;
  })?.filter((row: any) => {
    if(languages === 0) return true;
    return row.language === languages
  })?.filter((row:any) => {
    if(track === 0) return true;
    return row.portrait === track;
  });

  return (
    <Layout>
      <div
        className="p-6 flex flex-col gap-3"
        style={{ background: colorBgContainer }}
      >
        <p>适合赛道</p>
        <Radio.Group onChange={(e) => setTrack(e.target.value)} value={track}>
          <Radio value={0}>全部</Radio>
          <Radio value={1}>Defi</Radio>
          <Radio value={2}>NFT</Radio>
          <Radio value={3}>合约交易</Radio>
          <Radio value={4}>GameFi</Radio>
          <Radio value={5}>SocialFi</Radio>
        </Radio.Group>
        <p>地区</p>
        <Radio.Group
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <Radio value={0}>全部</Radio>
          <Radio value={1}>美国</Radio>
          <Radio value={2}>韩国</Radio>
          <Radio value={3}>日本</Radio>
          <Radio value={4}>东南亚</Radio>
        </Radio.Group>
        <p>语言</p>
        <Radio.Group
          onChange={(e) => setLanguages(e.target.value)}
          value={languages}
        >
          <Radio value={0}>全部</Radio>
          <Radio value={1}>英文</Radio>
          <Radio value={2}>中文</Radio>
          <Radio value={3}>日文</Radio>
          <Radio value={4}>韩文</Radio>
        </Radio.Group>
        <p>粉丝量</p>
        <Radio.Group
          onChange={(e) => setFansNumber(e.target.value)}
          value={fansNumber}
        >
          <Radio value={0}>全部</Radio>
          <Radio value={1}>10K+</Radio>
          <Radio value={2}>50K+</Radio>
          <Radio value={3}>100K+</Radio>
        </Radio.Group>
      </div>
      <div
        className="p-6 flex flex-col gap-3"
        style={{ background: colorBgContainer }}
      >
        <table>
          <tr>
            <th>KOL信息</th>
            <th>受众地区</th>
            <th>受众语言</th>
            <th>连接用户数</th>
            <th>平均占适量</th>
            <th>单条内容报价</th>
          </tr>
          {kols &&
            kols.map((kol) => (
              <tr key={kol.id} className="text-center h-[100px] mb-10">
                <td>
                  <div className="flex justify-center items-center">
                    <img
                      className="mr-5 rounded-full"
                      src={kol.avatar}
                      width={50}
                      height={50}
                    />
                    <p className="w-[150px] text-left">
                      {kol.id}
                      {kol.name}
                    </p>
                  </div>
                </td>
                <td>{getCountryByLocation(kol.area)}</td>
                <td>繁体中文</td>
                <td>18K</td>
                <td>32K</td>
                <td>${kol.quoted_price}</td>
                <td>
                  <Button className="bg-[#1677ff]" type="primary" onClick={() => {
                    window.location.href = '/admin/create-task'
                  }}>
                    下单
                  </Button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </Layout>
  );
}

export default Kol;
