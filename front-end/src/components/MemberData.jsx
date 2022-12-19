import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  LineChart,
  Line
} from "recharts";

const data = [
  {
    name: "枯萎的玫瑰",
    增減值: 1224,
    上周收聽次數: 2468,
    本周收聽次數: 3692,
    amt: 2400
  },
  {
    name: "日夜無常",
    增減值: 168,
    上周收聽次數: 2733,
    本周收聽次數: 2901,
    amt: 2210
  },
  {
    name: "他們在鐵皮屋...",
    增減值: -567,
    上周收聽次數: 2616,
    本周收聽次數: 2049,
    amt: 2290
  },
  {
    name: "我還年輕 我還...",
    增減值: 582,
    上周收聽次數: 5078,
    本周收聽次數: 5660,
    amt: 2000
  },
  {
    name: "這樣就好 這樣...",
    增減值: -246,
    上周收聽次數: 4567,
    本周收聽次數: 4321,
    amt: 2181
  }
];
const data2 = [
  {
    name1: "Jan",
    部落格文章: 3,
    音樂創作: 4,
    amt: 2400
  },
  {
    name1: "Feb",
    部落格文章: 4,
    音樂創作: 3,
    amt: 2210
  },
  {
    name1: "Mar",
    部落格文章: 3,
    音樂創作: 6,
    amt: 2290
  },
  {
    name1: "Apr",
    部落格文章: 4,
    音樂創作: 4,
    amt: 2000
  },
  {
    name1: "May",
    部落格文章: 5,
    音樂創作: 4,
    amt: 2181
  },
  {
    name1: "Jun",
    部落格文章: 3,
    音樂創作: 5,
    amt: 2181
  },
  {
    name1: "Jul",
    部落格文章: 4,
    音樂創作: 3,
    amt: 2181
  },
  {
    name1: "Aug",
    部落格文章: 4,
    音樂創作: 2,
    amt: 2181
  },
  {
    name1: "Sep",
    部落格文章: 1,
    音樂創作: 4,
    amt: 2181
  },
  {
    name1: "Oct",
    部落格文章: 2,
    音樂創作: 3,
    amt: 2181
  },
  {
    name1: "Nov",
    部落格文章: 4,
    音樂創作: 6,
    amt: 2181
  },
  {
    name1: "Dec",
    部落格文章: 5,
    音樂創作: 7,
    amt: 2181
  }
];
class MemberData extends Component {
  state = {}
  render() {
    return (
      <div>
        <h2 class="fs-2 fw-bold mb-md-10">數據分析</h2>
        <section>
          <h3 class="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">收聽次數</h3>
          <BarChart className="mb-12"
            width={800}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#fff" />
            <Bar dataKey="上周收聽次數" fill="#BBBBBB" />
            <Bar dataKey="本周收聽次數" fill="#790BD1" />
            <Bar dataKey="增減值" fill="#1A8CFF" />
          </BarChart>
        </section>
        <section>
          <h3 class="d-inline-block fs-5 fw-bold bg-blue rounded-pill mb-md-8 px-6 py-3">創作統計</h3>
          <LineChart
            width={800}
            height={500}
            data={data2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name1" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="音樂創作"
              stroke="#790BD1"
              strokeWidth="2"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="部落格文章"
              stroke="#1A8CFF"
              strokeWidth="2"
            />
          </LineChart>
        </section>
      </div>
    );
  }
}

export default MemberData;