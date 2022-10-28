import React, { PureComponent } from 'react';
import { PieChart, Pie,Legend, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Active Drivers', value: 400 },
    { name: 'Inactive Drivers', value: 300 },
    { name: 'Unavailable', value: 300 }
];
const COLORS = ['#0055D7', '#FFB822', '#FF7222'];

export default class PieCharts extends PureComponent {
    render() {
        return (
            <div className='relative text-sm'>
                <ResponsiveContainer width='100%' height={290}>
                    <PieChart  onMouseEnter={this.onPieEnter}>
                <Legend iconSize={12} iconType='circle' layout="horizontal" verticalAlign="bottom" align="center" />
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                </ResponsiveContainer>
              
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center '>
                  <div className='text-center mb-5'>
                     <p className='font-bold  text-[26px]'>{this.props.drivers}</p>
                     <p className='text-gray-600'>Drivers</p>
                  </div>
                </div>
               
            </div>

        );
    }
}



// import React, { useState } from "react";
// import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';
 
 
// const PieCharts = () => {
 
//     const data = [
//         { name: 'Tea', value: 400 },
//         { name: 'Coffee', value: 300 },
//         { name: 'Cola', value: 300 },
//         { name: 'Water', value: 200 },
//     ];
 
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 
//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//         const y = cy + radius * Math.sin(-midAngle * RADIAN);
 
//         return (
//             <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//                 {`${(percent * 100).toFixed(0)}%`}
//             </text>
//         );
//     };
 
//     return (
//         <>
//             <div>
//                 <div class="row d-flex justify-content-center text-center">
//                     <h1>Favorite Beverages - technostuf.com</h1>
//                     <hr />
//                     <div className="col-md-8">
//                         <ResponsiveContainer width={400} height={400} className="text-center">
//                             <PieChart width={400} height={400}>
//                                 <Legend layout="vertical" verticalAlign="top" align="top" />
//                                 <Pie
//                                     data={data}
//                                     cx="50%"
//                                     cy="50%"
//                                     labelLine={false}
//                                     label={renderCustomizedLabel}
//                                     outerRadius={80}
//                                     fill="#8884d8"
//                                     dataKey="value"
//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default PieCharts;