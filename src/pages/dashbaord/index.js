
import { useState } from "react";
import BarCharts from "../../components/shared/Charts/BarCharts";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import { barChartData } from "../../DummyData/DummyData";

const Dashboard = () => {
  const [barData, setBarData] = useState(barChartData.weaklyData);
  
  const dataChange = (value) => {
 
    if(value === 'Weakly') setBarData(barChartData.weaklyData);
    if(value === 'Monthly') setBarData(barChartData.monthlyData);
    if(value === 'Yearly') setBarData(barChartData.yearlyData);
  };

  const statusitems = [
    {
      id: 1,
      icon: <img className="w-full" src={icons.men} alt="profile" />,
      status: "Location Manager",
      name: "John Doe",
    },
    {
      id: 2,
      icon: <img className="w-full" src={icons.location} alt="location" />,
      status: "Location",
      name: "New  York Office",
    },
  ];
  return (
    <section className=" pt-12 lg:pt-0 container mx-auto">
      <Header name="Dashboard"></Header>
      <div className="flex flex-wrap  gap-5 lg:gap-10 ">
        {statusitems.map((item) => (
          <StatusItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mb-10 mt-16">
        <h1 className="text-[22px] font-semibold pb-6">
          Incoming & Outgoing shipments
        </h1>
        <div className="w-full bg-white shadow-sm p-5 rounded-md">
          <div className="flex justify-end">
            <select
              onChange={(e) => dataChange(e.target.value)}
              className="ml-auto px-3  py-2  rounded-lg border-r-8 border-r-transparent"
            >
              <option value="Weakly">Weakly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="mt-5">
            <BarCharts data={barData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

const StatusItem = ({ item }) => {
  return (
    <div className="bg-white flex-grow lg:w-1/4 w-full flex justify-between items-center gap-6 rounded-lg shadow-sm pl-10">
      <div className="flex flex-col gap-1">
        <p className="font-normal leading-snug">{item.status}</p>
        <p className="font-semibold text-[20px] leading-snug">{item.name}</p>
      </div>
      <div
        style={{ background: `${item.bgColor}` }}
        className="bg-[#FFEFEF] w-[110px] h-[110px] rounded-lg   flex items-center justify-center"
      >
        <div className="h-[36px] w-[24px]">{item.icon}</div>
      </div>
    </div>
  );
};
