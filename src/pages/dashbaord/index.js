
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import BarCharts from "../../components/shared/Charts/BarCharts";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import Loader from "../../components/shared/Loader";
import { barChartData } from "../../DummyData/DummyData";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";

const Dashboard = () => {
  const [barData, setBarData] = useState(barChartData.weaklyData);
  const [loggedUser] = useContext(AuthContext)
  const [fetchStatus, setFetchStatus] = useState('no_fetch');
  const [filter, setFilter] = useState('WEEKLY')
  const [type, setType] = useState('');

  const [location, setLocation] = useState({})
  const [incoming, setIncoming] = useState([])
  const [outgoing, setOutgoing] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (type === '') {
      getDashBoardData(type, filter)
    } else {
      getDashBoardData('/incoming_shipments', filter)
      getDashBoardData('/outgoing_shipments', filter)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser.jwt_token, filter])

  const chartDataChange = (value) => {
    setType('/incoming_shipments')
    setFilter(value);
  };

  useEffect(() => {
    if (incoming.length && outgoing.length) {
      let data = [];
      for (let i = 0; i < incoming.length; i++) {
        const elementIncome = incoming[i];
        const elementOutgoing = outgoing[i];
        let obj = {}
        let splite = elementIncome?.label?.split(' ');
        if (filter === 'WEEKLY') obj.name = splite[3] + splite[2].slice(0, 3) + ' ' + splite[4]
        if (filter === 'MONTHLY') obj.name = splite[0].slice(0, 3) + ' ' + splite[1]
        if (filter === 'YEARLY') obj.name = splite[0].slice(0, 3) + ' ' + splite[1]
        data.push({ ...obj, pv: elementIncome?.count, ul: elementOutgoing?.count })
      }
      setBarData(data)
    } else {
      setBarData([{ name: '', pv: 0, ul: 0 }])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outgoing, incoming])

  //Get  Data  Dashboard 
  const getDashBoardData = (type = '', filter = '') => {
    if (loggedUser?.jwt_token) {

      ApiRequest('GET', `/dashboard${type}?filter=${filter}`, loggedUser.jwt_token,)
        .then(result => {
          
          if (result.hasOwnProperty('errors')) {
          } else {
            if (type === '') { setLocation(result.location); setIncoming(result?.incoming_shipments); setOutgoing(result?.outgoing_shipments) }
            if (type === '/incoming_shipments') { setIncoming(result?.shipment_data) }
            if (type === '/outgoing_shipments') { setOutgoing(result?.shipment_data) }
          }
        })
        .catch(error => {
          if (!checkAuthorized(error)) {
            localStorage.clear();
            navigate('/login')
          }
        })
        .finally(() => {
          setFetchStatus('fetched')
        })
    }
  }

  return (
    <section className=" pt-12 lg:pt-0 container mx-auto">
      <Header name="Dashboard"></Header>
      <div className="flex flex-wrap  gap-5 lg:gap-10 ">

        <StatusItem fetchStatus={fetchStatus} location={location} />

      </div>
      <div className="mb-10 mt-16">
        <h1 className="text-[22px] font-semibold pb-6">
          Incoming & Outgoing shipments
        </h1>
        <div className="w-full bg-white shadow-sm p-5 rounded-md">
          <div className="flex justify-end">
            <select
              onChange={(e) => chartDataChange(e.target.value)}
              className="ml-auto px-3  py-2  rounded-lg border-r-8 border-r-transparent"
            >
              <option value="WEEKLY">Weakly</option>
              <option value='MONTHLY'>Monthly</option>
              <option value="YEARLY">Yearly</option>
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

const StatusItem = ({ fetchStatus, location }) => {
  return (
    <>
      <div className="bg-white flex-grow lg:w-1/4 w-full flex justify-between items-center gap-6 rounded-lg shadow-sm pl-10  h-[110px] ">
        {
          fetchStatus === 'no_fetch' ?
            <div className="flex items-center justify-center w-full">
              <Loader />
            </div>
            :
            <>
              <div className="flex flex-col gap-1">
                <p className="font-normal leading-snug">Location Manager</p>
                <p className="font-semibold text-[20px] leading-snug">{location?.title}</p>
              </div>
              <div
                // style={{ background: `${item.bgColor}` }}
                className="bg-[#FFEFEF] w-[110px] h-[110px] rounded-lg   flex items-center justify-center"
              >
                <div className="h-[36px] w-[24px]"><img className="w-full" src={icons.men} alt="profile" /></div>
              </div>
            </>
        }

      </div>
      <div className="bg-white flex-grow lg:w-1/4 w-full flex justify-between items-center gap-6 rounded-lg shadow-sm pl-10   h-[110px] ">
        {
          fetchStatus === 'no_fetch' ?
            <div className="flex items-center justify-center w-full">
              <Loader />
            </div>
            :
            <>
              <div className="flex flex-col gap-1">
                <p className="font-normal leading-snug">Location</p>
                <p className="font-semibold text-[20px] leading-snug">{location?.address?.city}</p>
              </div>
              <div
                // style={{ background: `${item.bgColor}` }}
                className="bg-[#FFEFEF] w-[110px] h-[110px] rounded-lg   flex items-center justify-center"
              >
                <div className="h-[36px] w-[24px]"><img className="w-full" src={icons.location} alt="location" /></div>
              </div>
            </>
        }
      </div>
    </>
  );
};
