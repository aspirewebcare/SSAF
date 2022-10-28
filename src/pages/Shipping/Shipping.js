import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import FilterButton from "../../components/shared/Buttons/FilterButton";
import SortButton from "../../components/shared/Buttons/SortButton";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import InputLabel from "../../components/shared/InputLabel/InputLabel";
import LoadingForFetch from "../../components/shared/LoadingForFetch";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import SearchInput from "../../components/shared/SearchInput/SearchInput";
import ShowShippingDetails from "../../components/ShowShippingDetails/ShowShippingDetails";
import { RecordItemsInfo as ShippingInfo } from "../../DummyData/DummyData";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";
import { FilterData } from "../../hooks/FilterData";

const Shipping = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [filterComInfo, setFilterComInfo] = useState({
    title: "",
    cancelBtn: "",
    applyBtn: "",
  });
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const [filterShippingInfo, setFilterShippingInfo] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({});
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [isFilter, setIsFilter] = useState(false);
  const [sort, setSort] = useState({});
  const navigate = useNavigate();
  const [loggedUser] = useContext(AuthContext)
  const [fetchStatus, setFetchStatus] = useState('no_fetch')
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(true);
  const [maxDataLoad, setMaxDataLoad] = useState(0)

  //Get All Shipping-Items 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token && fetchAgain) {

        ApiRequest('GET', `/shipments?limit=50&offset=${shippingInfo.length}`, loggedUser.jwt_token,)
          .then(result => {
            if (result.hasOwnProperty('errors')) { }
            if (result.hasOwnProperty('data')) {
              setShippingInfo([...result.data])
              setMaxDataLoad(result?.match_size)
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
    }, 0)

    return () => clearTimeout(delayDebounceFn)
  }, [loggedUser.jwt_token, reload, fetchAgain])


  const addNewShipping = () => {
    navigate("/new-shipping");
  };

  const filterBtnclick = () => {
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Filter",
      cancelBtn: "Clear  All",
      applyBtn: "Apply",
    });
  };
  const shippingItemClick = (item) => {
    setShippingDetails(item);
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Shipping Details",
      cancelBtn: "Edit",
      applyBtn: "Delete",
    });
  };

  useEffect(() => {
    let filter = shippingInfo.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.tracking_number} ${item.source} ${item.destination}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterShippingInfo(filter);
    // eslint-disable-next-line
  }, [search, shippingInfo]);


  const btnHandleClick = (data) => {
    if (filterComInfo.title === "Filter") filterData(data)
    if (filterComInfo.title === "Shipping Details") deleteShipment(data)
  };
  //FOR  Shipment Record
  const deleteShipment = () => {
    setLoading(true)
    ApiRequest('DELETE', `/shipments/${shippingDetails?.shipment_uid}`, loggedUser.jwt_token, '')
      .then(result => {

        if (result.hasOwnProperty('errors')) {

        } else {
          toast.success('Shipment Deleted.')
          setShippingInfo([])
          setRightSidebarOpen(false)
          setReload(prev => !prev)
          setFetchStatus('no_fetch')
        }
      })
      .catch(err => {
        toast.error('sometings is  wrong!')
        if (!checkAuthorized(err)) {
          localStorage.clear();
          navigate('/login')
        }
      })
      .finally(() => setLoading(false))
  }


  const filterData = (data) => {
    let bySearch = [];
    for (const [key, value] of Object.entries(data)) {
      bySearch.push({ text: value, search: key });
    }
    let filterData = FilterData(ShippingInfo, bySearch);
    setFilterShippingInfo(filterData);
    setIsFilter(true);
  }

  const editForm = () => {

    navigate(`/edit-shipping/${shippingDetails?.shipment_uid}`)
    setRightSidebarOpen(false)
  };

  const sortChange = (isChecked, name, type) => {
    setSort({ [type]: isChecked ? name : "" });

    if (type === "Type" && isChecked) {
      if (name === "Customer") {
        sortFilter("Customer");
      } else {
        sortFilter("Consignee");
      }
    } else if (type === "Date" && isChecked) {
      if (name === "Ascending") {
        dateSort("Ascending");
      } else {
        dateSort("Descending");
      }
    } else {
      setFilterShippingInfo(shippingInfo);
    }
  };

  const dateSort = (equation) => {
    let clone = [...shippingInfo];
    let filterData = clone.sort((a, b) => {
      if (equation === "Ascending") return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });
    setFilterShippingInfo(filterData);
  };
  const sortFilter = (equation) => {
    let clone = [...shippingInfo];
    let filterData = clone.filter((item) => {
      return item.type.toLowerCase() === equation.toLowerCase();
    });

    setFilterShippingInfo(filterData);
  };
  return (
    <div className="pt-12 lg:pt-0 relative overflow-hidden">
      <RightSidebar
        childClass={
          filterComInfo.cancelBtn ? "h-[79vh] lg:h-[89vh]" : "h-[78vh]"
        }
        title={filterComInfo.title}
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
        applyBtn={filterComInfo.applyBtn}
        cancelClick={editForm}
        cancelBtn={filterComInfo.cancelBtn}
        btnHandleClick={btnHandleClick}
        handleSubmit={handleSubmit}
        simpleRed={filterComInfo.title === "Shipping Details" ? true : false}
        loading={loading}
      >
        {filterComInfo.title === "Filter" && (
          <FilterComponent
            filterShippingInfo={filterShippingInfo}
            errors={errors}
            register={register}
            isFilter={isFilter}
          />
        )}
        {filterComInfo.title === "Shipping Details" && (
          <ShowShippingDetails itemDetails={shippingDetails} />
        )}
      </RightSidebar>

      <Header
        mainCss="!h-[150px]"
        name={`Shipping (${filterShippingInfo.length})`}
      >
        <div className="flex items-center  gap-2 md:gap-5 mt-4 lg:mt-0  w-full lg:w-fit ">
          <CustomButton
            hadleClick={addNewShipping}
            btnClass="fixed lg:static right-5 bottom-5 lg:w-fit lg:h-[46px] h-[56px] px-5 text-sm font-semibold rounded-full lg:rounded-lg w-[56px] lg:shadow-none capitalize"
            text={
              <p className="flex justify-center items-center ">
                <span className="hidden lg:block ">+ Add new Shipping</span>
                <span className=" lg:hidden">
                  {<icons.plus className={"text-4xl"} />}
                </span>
              </p>
            }
          />

          <SearchInput searchRef={searchRef} setSearch={setSearch} />
          <div className="flex gap-2 md:gap-5">
            <SortButton
              sort={sort}
              sortChange={sortChange}
              setFilter={setFilterShippingInfo}
              data={filterShippingInfo}
              arr={[
                {
                  id: 1,
                  name: "Date",
                  arr: [
                    { id: 1, name: "Ascending" },
                    {
                      id: 2,
                      name: "Descending",
                    },
                  ],
                },
                {
                  id: 2,
                  name: "Type",
                  arr: [
                    { id: 1, name: "Consignee" },
                    {
                      id: 2,
                      name: "Customer",
                    },
                  ],
                },
              ]}
            />
            <FilterButton filterBtnclick={filterBtnclick} />
          </div>
        </div>
      </Header>

      <LoadingForFetch maxDataLoad={maxDataLoad} totalLength={shippingInfo?.length} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchStatus={fetchStatus}>
        <ShippingAll
          loggedUser={loggedUser}
          shippingItemClick={shippingItemClick}
          filterShippingInfo={filterShippingInfo}
          search={search}
        />
      </LoadingForFetch>
    </div>
  );
};

export default Shipping;

const ShippingAll = ({ loggedUser, filterShippingInfo, shippingItemClick }) => {
  return (
    <div className="pb-10">
      <ul className="flex flex-wrap lg:flex-col gap-y-4">
        {filterShippingInfo.length ? (
          filterShippingInfo.map((shipping) => (
            <ShippingLi
              loggedUser={loggedUser}
              onClick={shippingItemClick}
              key={shipping.shipment_uid}
              shipping={shipping}
            />
          ))
        ) : (
          <p className="text-center">No result Found!</p>
        )}
      </ul>
    </div>
  );
};

const ShippingLi = ({ loggedUser, onClick, shipping }) => {
  const [surce, setSource] = useState({})
  const [destination, setDestination] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      requestApi(shipping?.source_office_uid, setSource)
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      requestApi(shipping?.destination_office_uid, setDestination)
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [])


  const requestApi = (uId, setProperty) => {
    ApiRequest('GET', `/offices?office_uid=${uId}`, loggedUser.jwt_token,)
      .then(result => {
        if (result.hasOwnProperty('errors')) {
        } else {
          if (result.hasOwnProperty('data')) {
            setProperty(result?.data[0])
          }
        }
      })
      .catch(error => {
        if (!checkAuthorized(error)) {
          localStorage.clear();
          navigate('/login')
        }
      })

  }
  return (
    <li className=" w-full md:w-1/2 lg:w-full p-2 lg:p-0">
      <div className="flex flex-col lg:flex-row items-start gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="flex gap-2 items-center w-full lg:w-fit">
          <div className="flex items-center justify-between lg:block w-full lg:w-[12rem]">
            <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
              Tracking Number
            </p>
            <div className="font-medium capitalize w-fit whitespace-nowrap">
              {shipping.tracking_number ? shipping.tracking_number : "-"}
            </div>
            <span
              onClick={() => onClick(shipping)}
              className="lg:hidden bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
            >
              <icons.threeBarIcon className="text-xl " />
            </span>
          </div>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Source</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {surce?.title || "-"}
            </p>
          </div>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Destination</p>
          <p className="font-medium">
            {destination?.title || "-"}
          </p>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Service type</p>
          <p className="font-medium">
            {shipping.shipment_service_type ? shipping.shipment_service_type : "-"}
          </p>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Date</p>
          <p className="font-medium ">{shipping.shipment_date_time_stamp_gmt ? shipping.shipment_date_time_stamp_gmt : "-"}</p>
        </div>

        <div className="min-w-[110px] lg:flex  justify-center hidden">
          <span
            onClick={() => onClick(shipping)}
            className=" bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
          >
            <icons.threeBarIcon className="text-xl " />
          </span>
        </div>
      </div>
    </li >
  );
};

const FilterComponent = ({ register, filterShippingInfo, isFilter }) => {
  return (
    <div>
      <div>
        <InputLabel
          register={register}
          label="Source"
          placeholder="Source"
          name="source"
          required={false}
        />
        <br />
        <InputLabel
          register={register}
          label="Destination"
          placeholder="Destination"
          name="destination"
          required={false}
        />
        <br />

        <InputLabel
          register={register}
          label="Tracking Number"
          placeholder="Tracking Number"
          name="tracking_number"
          required={false}
        />
        <br />

        <p className="font-bold text-sm text-gray-800 ">Service  Type</p>
        <select
          {...register("service_type")}
          className="border rounded-md px-3 py-[15px] w-full mt-2 mb-4"
          name="service_type"
          id="service_type"
        >
          <option value="" hidden>
            Choose Service type
          </option>
          <option value="regular">Regular</option>
          <option value="express">Express</option>
        </select>
        <br />

        <p className="font-bold text-sm text-gray-800 ">Date</p>
        <select
          {...register("date")}
          className="border rounded-md px-3 py-[15px] w-full mt-2 mb-4"
          name="date"
          id="date"
        >
          <option value="" hidden>
            Choose Date
          </option>
          <option value="01/02/2022">01/02/2022</option>
          <option value="25/08/2022">25/08/2022</option>
          <option value="11/06/2022">11/06/2022</option>
          <option value="20/10/2022">20/10/2022</option>
        </select>
      </div>
      {isFilter && (
        <p className="text-[#2DA400] font-semibold pt-3">
          {Array.isArray(filterShippingInfo) && filterShippingInfo.length}{" "}
          Results found.
        </p>
      )}
    </div>
  );
};
