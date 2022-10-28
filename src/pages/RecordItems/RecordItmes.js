import React, { useEffect, useRef, useState } from "react";
import AddNewRecordItem from "../../components/RecordItems/AddNewRecordItem";
import RecordDetails from "../../components/RecordItems/RecordDetails";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import MyDropdown from "../../components/shared/Dropdown/Dropdown";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import InputLabel from "../../components/shared/InputLabel/InputLabel";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import { RecordItemsInfo } from "../../DummyData/DummyData";
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
  const [filterOptions, setFilterOptions] = useState([{}]);
  const [recordDetailsInfo, setRecordDetailsInfo] = useState({});

  const createRecordItem = () => {};

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
      cancelBtn: "cancel All",
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

  //Apply  Filtering  by value;
  const filterApply = () => {
    console.log(filterOptions);

    let filter = FilterData(RecordItemsInfo, filterOptions);

    console.log(filter);
    setFilterRecordItemsInfo(filter);
    setRightSidebarOpen(false);
  };

  useEffect(() => {
    let filter = RecordItemsInfo.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.first_name} ${item.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterRecordItemsInfo(filter);
    // eslint-disable-next-line
  }, [search]);

  const btnHandleClick = () => {
    filterComInfo.title === "Filter" ? filterApply() : createRecordItem();
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
        cancelBtn={filterComInfo.cancelBtn}
        btnHandleClick={btnHandleClick}
      >
        {filterComInfo.title === "Filter" && (
          <FilterCoponent
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        )}
        {filterComInfo.title === "Add New Item" && <AddNewRecordItem />}
        {filterComInfo.title === "Item Details" && <RecordDetails recordDetails={recordDetailsInfo}/>}
      </RightSidebar>

      <Header
        mainCss="!h-[150px]"
        name={`Recorded Items  (${filterRecordItemsInfo.length})`}
      >
        <div className="flex items-center gap-5 mt-9 lg:mt-0 w-full lg:w-fit ">
          <CustomButton
            hadleClick={openAddNewRecordItem}
            btnClass="fixed lg:static right-5 bottom-5 lg:w-fit lg:h-[42px] h-[56px] px-5 text-sm font-semibold rounded-full lg:rounded-lg w-[56px] lg:shadow-none capitalize"
            text={
              <p className="flex justify-center items-center ">
                <span className="hidden lg:block ">+ Add new Item</span>
                <span className=" lg:hidden">
                  {<icons.plus className={"text-4xl"} />}
                </span>
              </p>
            }
          />

          <div className="w-full lg:w-[230px] bg-white border rounded-lg flex items-center gap-2 px-3">
            <icons.search className="text-gray-400 text-2xl lg:text-xl" />
            <input
              ref={searchRef}
              onChange={(e) => setSearch(e.target.value)}
              className="text-base lg:text-[13px] w-full outline-none text-gray-600 py-4 lg:py-2"
              placeholder="Search anything"
              type="search"
              name=""
              id=""
            />
          </div>
          <CustomButton
            hadleClick={filterBtnclick}
            block={false}
            btnClass="lg:w-fit lg:h-[42px] h-[56px] px-5 text-sm font-normal rounded-lg w-[56px] border border-[#FE0000] text-[#FE0000]"
            text={
              <p className="flex items-center gap-2">
                <icons.filter />
                <span className="text-[15px] hidden lg:block">
                  filters
                </span>{" "}
              </p>
            }
          />
        </div>
      </Header>

      <div>
        <RecordItemsAll
          recordItemClick={recordItemClick}
          filterRecordItemsInfo={filterRecordItemsInfo}
          search={search}
        />
      </div>
    </div>
  );
};

export default RecordItems;

const RecordItemsAll = ({ filterRecordItemsInfo, recordItemClick }) => {
  return (
    <div className="pb-10">
      <ul className="flex flex-wrap lg:flex-col gap-y-4">
        {filterRecordItemsInfo.length ? (
          filterRecordItemsInfo.map((RecordItem) => (
            <RecordItemsLi
              onClick={recordItemClick}
              key={RecordItem.id}
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
  const ref = useRef();
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
    console.log("Edit RecordItem");
  }
  function deleteRecordItem() {
    console.log("Delete RecordItem");
  }

  const recordClick = (event) => {
    let isCLick = event.target && !event.target.contains(ref?.current);
    if (!isCLick) {
      onClick(RecordItem);
    }
  };
  return (
    <li
      onClick={(e) => recordClick(e)}
      className=" w-full md:w-1/2 lg:w-full p-2 lg:p-0"
    >
      <div className="flex flex-col lg:flex-row items-start  lg:items-center gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="flex gap-2 items-center w-fit">
          <div className="w-fit">
            <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
              Source
            </p>
            <div className="font-medium capitalize w-fit whitespace-nowrap">
              {RecordItem.source}
            </div>
            <span
              ref={ref}
              className=" lg:hidden bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
            >
              <MyDropdown
                btnClass="w-fit h-fit"
                btnText={<icons.threeBarIcon className="text-xl" />}
                items={items}
              />
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-500 mb-1 text-sm">Order Number</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{RecordItem.order_number}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-500 mb-1 text-sm">Tracking Number</p>
          <p className="font-medium">{RecordItem.tracking_number}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1 text-sm">Carrier</p>
          <p className="font-medium">{RecordItem.carrier}</p>
        </div>
        <div className="w-32">
          <p className="text-gray-500 mb-1 text-sm">Status</p>
          <p className="font-medium">
            <Status status={RecordItem.status} />
          </p>
        </div>

        <div className="min-w-[110px] lg:flex  justify-center hidden">
          <span className="bg-gray-100 rounded-full w-[45px] pt-[.4rem] h-[43px] flex justify-center items-center">
            <MyDropdown
              btnText={<icons.threeBarIcon className="text-xl" />}
              items={items}
            />
          </span>
        </div>
      </div>
    </li>
  );
};

export const Status = ({ status }) => {
  console.log({ status });
  let color =
    status === "Dispatched"
      ? "text-[#FE0000]"
      : status === "In transit"
      ? "text-[#FFAD00]"
      : status === "Out for delivery"
      ? "text-[#2A40EC]"
      : status === "Received"
      ? "text-[#2DA400]"
      : "";
  return <span className={color}>{status}</span>;
};

const FilterCoponent = ({ filterOptions, setFilterOptions }) => {
  const changeFunc = (name, value) => {
    let findIndex = filterOptions.findIndex((item) => item.search === name[0]);
    let cloneFilter = [...filterOptions];
    if (findIndex === -1) {
      cloneFilter =
        JSON.stringify(cloneFilter) === "[{}]"
          ? [{ search: name[0], text: value }]
          : [...cloneFilter, { search: name[0], text: value }];
    } else {
      cloneFilter[findIndex] = { search: name[0], text: value };
    }

    console.log(cloneFilter);

    setFilterOptions([...cloneFilter]);
  };

  return (
    <div>
      <div>
        <InputLabel
          defaultValue=""
          label="Source"
          placeholder="Source"
          name="source"
        />
      <br />

        <InputLabel
          defaultValue=""
          label="Order Number"
          placeholder="Order Number"
          name="order_number"
        />
      <br />

        <InputLabel
          defaultValue=""
          label="Tracking Number"
          placeholder="Tracking Number"
          name="tracking_number"
        />
      <br />

        <p className="font-bold text-sm text-gray-800 ">Carrier</p>
        <select
          className="border rounded-md text-gray-400 px-3 py-[15px] w-full mt-2 mb-4"
          name="carrier"
          id="carrier"
        >
          <option value="carrier1">Carrier1</option>
          <option value="carrier2">Carrier2</option>
          <option value="carrier3">Carrier3</option>
          <option value="carrier4">Carrier4</option>
          <option value="carrier5">Carrier5</option>
        </select>
      <br />

        <p className="font-bold text-sm text-gray-800 ">Status</p>
        <select
          className="border rounded-md text-gray-400 px-3 py-[15px] w-full mt-2 mb-4"
          name="status"
          id="status"
        >
          <option value="status1">Status1</option>
          <option value="status2">Status2</option>
          <option value="status3">Status3</option>
          <option value="status4">Status4</option>
          <option value="status5">Status5</option>
        </select>
      </div>
    </div>
  );
};
