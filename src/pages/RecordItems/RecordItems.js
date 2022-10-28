import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import AddNewRecordItem from "../../components/RecordItems/AddNewRecordItem";
import RecordDetails from "../../components/RecordItems/RecordDetails";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import FilterButton from "../../components/shared/Buttons/FilterButton";
import MyDropdown from "../../components/shared/Dropdown/Dropdown";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import InputLabel from "../../components/shared/InputLabel/InputLabel";
import LoadingForFetch from "../../components/shared/LoadingForFetch";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import SearchInput from "../../components/shared/SearchInput/SearchInput";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";
import { FilterData } from "../../hooks/FilterData";

const RecordItems = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [filterComInfo, setFilterComInfo] = useState({
    title: "",
    cancelBtn: "",
    applyBtn: "",
  });
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const [filterRecordItemsInfo, setFilterRecordItemsInfo] = useState([]);
  const [recordDetailsInfo, setRecordDetailsInfo] = useState({});
  const [isFilter, setIsFilter] = useState(false);
  const [loggedUser] = useContext(AuthContext)
  const [fetchStatus, setFetchStatus] = useState('no_fetch')
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recordItems, setRecordItems] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(true);
  const [maxDataLoad, setMaxDataLoad] = useState(0)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm();



  //Get All Record-Items 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token && fetchAgain) {
        ApiRequest('GET', `/trackable_items?limit=50&offset=${recordItems.length}`, loggedUser.jwt_token,)
          .then(result => {
          
            if (result.hasOwnProperty('errors')) {
            } else {
              setRecordItems([...result.data])
              setMaxDataLoad(result?.match_size)
            }
            setFetchAgain(false)
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

  const openAddNewRecordItem = () => {
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Add New Item",
      cancelBtn: "cancel",
      applyBtn: "Add",
    });
  };

  const filterBtnclick = () => {
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Filter",
      cancelBtn: "Clear All",
      applyBtn: "Apply",
    });
  };
  const recordItemClick = (item) => {
    setRecordDetailsInfo(item);
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Item Details",
      cancelBtn: "Edit",
      applyBtn: "Delete",
    });
  };

  useEffect(() => {
    let filter = recordItems.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.source} ${item.order_number} ${item.tracking_number} ${item.status}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterRecordItemsInfo(filter);
    // eslint-disable-next-line
  }, [search, recordItems]);


  const btnHandleClick = (data) => {
    if (filterComInfo.title === "Filter") filterData(data)
    if (filterComInfo.title === "Add New Item") addNewRecord(data)
    if (filterComInfo.title === "Item Details") deleteRecord(data)
    if (filterComInfo.title === "Edit Record Details") updateRecord(data)
  };



  const cancelBtnClick = () => {
    if (filterComInfo.title === "Filter") formReset();
    if (filterComInfo.title === "Item Details") editRecord();
    if (filterComInfo.title === "Edit Record Details") {
      setRightSidebarOpen(false)
    };

  }


  //UPdate Record item
  const updateRecord = (data) => {

    setLoading(true)
    let sendObj = { ...data }
    delete sendObj.customer_uid;

    ApiRequest('PATCH', `/trackable_items/${recordDetailsInfo?.trackable_item_uid}`, loggedUser.jwt_token, sendObj)
      .then(result => {
        if (result.hasOwnProperty('errors')) {

          toast.error(result.errors[0].message)

        } else {
          if (result.hasOwnProperty('customer_uid')) {
            toast.success('Update Record Details.')
            setReload(prev => !prev)
            setRightSidebarOpen(false)
            setRecordItems([])
            setReload(prev => !prev)
            setFetchAgain(true)
            setMaxDataLoad(0)
            setFetchStatus('no_fetch')
          } else {
            toast.error(result?.detail[0]?.msg)
          }
        }
      })
      .catch(error => {

        toast.error(error)
        if (!checkAuthorized(error)) {
          localStorage.clear();
          navigate('/login')
        }

      })
      .finally(() => setLoading(false))
  }

  //FOR  Delete Record
  const deleteRecord = (data) => {

    setLoading(true)
    ApiRequest('DELETE', `/trackable_items/${recordDetailsInfo.trackable_item_uid}`, loggedUser.jwt_token, '')
      .then(result => {
        if (result.hasOwnProperty('errors')) {

        } else {
          toast.success('Record Deleted.')
          setRightSidebarOpen(false)
          setRecordItems([])
          setReload(prev => !prev)
          setFetchAgain(true)
          setMaxDataLoad(0)
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

  const addNewRecord = (data) => {

    setLoading(true)
    let sendObj = { ...data }
    delete sendObj.customer_uid;

    ApiRequest('POST', `/customers/${data.customer_uid}/trackable_items`, loggedUser.jwt_token, sendObj)
      .then(result => {

        if (result.hasOwnProperty('errors')) {
          toast.error(result.errors[0].message)
        } else {

          if (result.hasOwnProperty('customer_uid')) {
            toast.success('New Record Added.')
            setReload(prev => !prev)
            setRightSidebarOpen(false)
            setMaxDataLoad(0)
            setFetchAgain(true)
            setRecordItems([])
            setFetchStatus('no_fetch')
          } else {

          }
        }
      })
      .catch(error => {

        toast.error(error)
        if (!checkAuthorized(error)) {
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
    let filterData = FilterData(recordItems, bySearch);
    setFilterRecordItemsInfo(filterData);
    setIsFilter(true);
  }

  const formReset = () => {
    reset((formValues) => {
      Object.keys(formValues).forEach((key) => {
        formValues[key] = "";
      });
      return { ...formValues };
    });
    setFilterRecordItemsInfo(recordItems);
    setIsFilter(false);
  };

  //For Edit Record Sidebar  Open
  const editRecord = () => {
    setRightSidebarOpen(true)
    setFilterComInfo({
      title: "Edit Record Details",
      cancelBtn: "Cancel",
      applyBtn: "Apply",
    });
  }

  useEffect(() => {
    if (!rightSidebarOpen) {
      resetField('source');
      resetField('order_number');
      resetField('tracking_number');
      resetField('carrier');
    }
  }, [rightSidebarOpen])




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
        cancelBtn={filterComInfo.cancelBtn}
        btnHandleClick={btnHandleClick}
        cancelClick={cancelBtnClick}
        handleSubmit={handleSubmit}
        simpleRed={filterComInfo.title === "Item Details" ? true : false}
        loading={loading}
      >
        {filterComInfo.title === "Filter" && (
          <FilterCoponent
            filterRecordItemsInfo={filterRecordItemsInfo}
            errors={errors}
            register={register}
            isFilter={isFilter}
          />
        )}
        {filterComInfo.title === "Edit Record Details" && (
          <AddNewRecordItem isSender={false} clearErrors={clearErrors} record={recordDetailsInfo} setValue={setValue} setFilterComInfo={setFilterComInfo} setRightSidebarOpen={setRightSidebarOpen} register={register} errors={errors} />
        )}
        {filterComInfo.title === "Add New Item" && <AddNewRecordItem setValue={setValue} setFilterComInfo={setFilterComInfo} setRightSidebarOpen={setRightSidebarOpen} register={register} errors={errors} />}
        {filterComInfo.title === "Item Details" && (
          <RecordDetails setRightSidebarOpen={setRightSidebarOpen} recordDetails={recordDetailsInfo} />
        )}
      </RightSidebar>

      <Header
        mainCss="!h-[150px]"
        name={`Recorded Items  (${filterRecordItemsInfo.length})`}
      >
        <div className="flex items-center gap-5 mt-4 lg:mt-0  w-full lg:w-fit ">
          <CustomButton
            hadleClick={openAddNewRecordItem}
            btnClass="fixed lg:static right-5 bottom-5 lg:w-fit lg:h-[46px] h-[56px] px-5 text-sm font-semibold rounded-full lg:rounded-lg w-[56px] lg:shadow-none capitalize"
            text={
              <p className="flex justify-center items-center ">
                <span className="hidden lg:block ">+ Add new Item</span>
                <span className=" lg:hidden">
                  {<icons.plus className={"text-4xl"} />}
                </span>
              </p>
            }
          />
          <SearchInput searchRef={searchRef} setSearch={setSearch} />
          <FilterButton filterBtnclick={filterBtnclick} />
        </div>
      </Header>

      <LoadingForFetch maxDataLoad={maxDataLoad} totalLength={recordItems?.length} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchStatus={fetchStatus}>
        <RecordItemsAll
          recordItemClick={recordItemClick}
          filterRecordItemsInfo={filterRecordItemsInfo}
          search={search}
        />
      </LoadingForFetch>
    </div>
  );
};

export default RecordItems;

const RecordItemsAll = ({ filterRecordItemsInfo, recordItemClick }) => {
  return (
    <div className="pb-20">
      <ul className="flex flex-wrap lg:flex-col gap-y-4">
        {filterRecordItemsInfo.length ? (
          filterRecordItemsInfo.map((RecordItem) => (
            <RecordItemsLi
              onClick={recordItemClick}
              key={RecordItem.trackable_item_uid}
              RecordItem={RecordItem}
            />
          ))
        ) : (
          <p className="text-center">No result Found!</p>
        )}
      </ul>
    </div>
  );
};

const RecordItemsLi = ({ onClick, RecordItem }) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const items = [
    {
      id: 1,
      name: <span>Edit</span>,
      icon: "",
      handleChange: editRecordItem,
    },
    {
      id: 2,
      name: <span>Delete</span>,
      icon: "",
      handleChange: deleteRecordItem,
    },
  ];

  function editRecordItem() {

  }
  function deleteRecordItem() {

  }

  const recordClick = (event) => {
    let isCLick = (ref.current && !ref.current.contains(event.target)) && (ref2.current && !ref2.current.contains(event.target))
    if (isCLick) {
      onClick(RecordItem);
    }
  };
  return (
    <li
      onClick={(e) => recordClick(e)}
      className=" w-full md:w-1/2 lg:w-full p-2 lg:p-0"
    >
      <div className="flex flex-col lg:flex-row items-start  gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="flex gap-2 items-center w-full lg:w-3/12">
          <div className="flex items-center justify-between lg:block w-full">
            <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
              Source
            </p>
            <div className="font-medium capitalize w-fit whitespace-nowrap">
              {RecordItem?.source || '-'}
            </div>

            <MyDropdown
              dropCss='lg:hidden'
              btnClass="w-fit h-fit"
              btnText={
                <span
                  ref={ref2}
                  className=" bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
                >
                  <icons.threeBarIcon className="text-xl" />
                </span>
              }
              items={items}
            />
          </div>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Order Number</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{RecordItem?.order_number || '-'}</p>
          </div>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Tracking Number</p>
          <p className="font-medium">{RecordItem?.tracking_number || '-'}</p>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Carrier</p>
          <p className="font-medium">{RecordItem?.carrier || '-'}</p>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Status</p>
          <p className="font-medium">
            <Status status={RecordItem?.delivery_status || '-'} />
          </p>
        </div>

        <div className="min-w-[110px] lg:flex  justify-center hidden">
          <MyDropdown
            btnText={<span
              ref={ref}
              className="  bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
            >
              <icons.threeBarIcon className="text-xl" />
            </span>}
            items={items}
          />
        </div>
      </div>
    </li>
  );
};

export const Status = ({ status }) => {
  let color =
    status === "DISPATCHED"
      ? "text-[#FE0000]"
      : status === "IN_TRANSIT"
        ? "text-[#FFAD00]"
        : status === "OUT_FOR_DELIVERY"
          ? "text-[#2A40EC]"
          : status === "RECEIVED"
            ? "text-[#2DA400]"
            : "";
  return <span className={color}>{status || '--'}</span>;
};

const FilterCoponent = ({
  register,
  errors,
  filterRecordItemsInfo,
  isFilter,
}) => {
  return (
    <div>
      <div>
        <InputLabel

          label="Source"
          placeholder="Source"
          name="source"
          errors={errors}
          register={register}
          required={false}
        />
        <br />

        <InputLabel

          label="Order Number"
          placeholder="Order Number"
          name="order_number"
          errors={errors}
          register={register}
          required={false}
        />
        <br />

        <InputLabel

          label="Tracking Number"
          placeholder="Tracking Number"
          name="tracking_number"
          required={false}
          errors={errors}
          register={register}
        />
        <br />

        <p className="font-bold text-sm text-gray-800 ">Carrier</p>
        <select
          {...register("carrier")}
          className="border rounded-md  px-3 py-[15px] w-full mt-2 mb-4"
          name="carrier"
          id="carrier"
        >
          <option value="" hidden>
            Carrier
          </option>
          <option value="Fedex">Fedex</option>
          <option value="Usps">Usps</option>
          <option value="Amazon">Amazon</option>
        </select>
        <br />

        <p className="font-bold text-sm text-gray-800 ">Status</p>
        <select
          {...register("status")}
          className="border rounded-md  px-3 py-[15px] w-full mt-2 mb-4"
          name="status"
          id="status"
        >
          <option value="" hidden>
            Status
          </option>
          <option value="Dispatched">Dispatched</option>
          <option value="In transi">In transit</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Received">Received</option>
        </select>
      </div>
      {isFilter && (
        <p className="text-[#2DA400] font-semibold pt-3">
          {Array.isArray(filterRecordItemsInfo) && filterRecordItemsInfo.length}{" "}
          Results found.
        </p>
      )}
    </div>
  );
};
