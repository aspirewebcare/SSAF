import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    {
        name: "Sunday",
        orders: 100
    },
    {
        name: "Monday",
        orders: 50
    },
    {
        name: "Tuesday",
        orders: 250
    },
    {
        name: "Wednesday",
        orders: 150
    },
    {
        name: "Thursday",
        orders: 20
    },
    {
        name: "Friday",
        orders: 180
    },
    {
        name: "Saturday",
        orders: 200
    }
];

export default function AreaCharts() {
    const renderTooltip = (props) => {
        if (props && props.payload[0]) {
            return (
                <div className="shadow-lg p-4 w-[87px] h-[60px] bg-white rounded-md ">
                    <p className="text-center text-[10px]">Orders</p>
                    <p className="text-center text-sm font-bold">{props.payload[0].payload.orders}</p>
                </div >
            )
        }
    }
    return (
        <div className="text-[12px]">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                    <CartesianGrid stroke='#edebeb' horizontal={true} fill="#fafafa" vertical={false} />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5701" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#FF5701" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis
                        domain={[0, 250]}
                        tickCount={7}
                        type="number"
                        stroke="#919191"
                    />
                    <Tooltip content={renderTooltip} />
                    <Area  type='basis'  dataKey="orders" stroke="#FF5701" strokeWidth={5} fill="url(#colorUv)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
