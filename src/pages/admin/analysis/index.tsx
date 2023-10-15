import { theme } from "antd";
import Layout from "../../../components/layout/adminLayout";

function Analysis() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <div
        className="p-6 flex flex-col gap-3"
        style={{ background: colorBgContainer }}
      >
        <table>
          <tr className="h-[50px] border-b">
            <th></th>
            <th>任务名称</th>
            <th>投放消耗</th>
            <th>创建时间</th>
            <th>结束时间</th>
            <th>操作</th>
          </tr>
          {new Array(10).fill(0).map((_, idx) => (
            <tr key={idx} className="text-center h-[50px] border-b">
              <td></td>
              <td>胡彦斌</td>
              <td>{Number(50000.0).toLocaleString()}</td>
              <td>2017-10-01 12:00</td>
              <td>2017-10-01 12:00</td>
              <td className="text-[#1677ff]">查看</td>
            </tr>
          ))}
        </table>
      </div>
    </Layout>
  );
}

export default Analysis;
