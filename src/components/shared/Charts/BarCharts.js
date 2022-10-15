import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function BarCharts({ data }) {
  const renderTooltip = (props) => {
    if (props && props.payload[0]) {
      return (
        <div className="shadow-lg  w-fit h-fit bg-white rounded-md !outline-white !border-white">
          <p className="text-left text-normal bg-gray-200 px-2 py-2 rounded-tl-md rounded-tr-md">
            {props.payload[0].payload.name}
          </p>

          <p className="text-center text-sm font-bold flex items-center gap-1 pl-2 pr-7 pt-2">
            <span className="font-normal  text-[#757575] flex items-center gap-1">
              <span className="block w-2 h-2 rounded-full bg-[#FD9090]"></span>{" "}
              Incoming:
            </span>
            <span className="text-[#757575] font-semibold">
              {props.payload[0].payload.pv}
            </span>
          </p>
          <p className="text-center text-sm font-bold flex items-center gap-1 pl-2 pr-7 pb-2">
            <span className="font-normal  text-[#757575] flex items-center gap-1">
              <span className="block w-2 h-2 rounded-full bg-[#FE0000]"></span>{" "}
              Outgoing:
            </span>
            <span className="text-[#757575] font-semibold">
              {props.payload[0].payload.ul}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="text-[12px]">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis
            domain={[1000, 25000]}
            tickCount={7}
            type="number"
            stroke="#919191"
          />
          <Tooltip content={renderTooltip} />
          <Bar
            barSize={10}
            dataKey="ul"
            fill="#FE0000"
            width={13}
            radius={[2, 2, 0, 0]}
          />

          <Bar
            barSize={10}
            dataKey="pv"
            fill="#FD9090"
            width={13}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
