import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import samplePdfFile from "../../assets/sample.pdf";
import AddNewInvoiceItem from "../../components/Invoices/AddNewInvoiceItem";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import SortButton from "../../components/shared/Buttons/SortButton";
import MyDropdown from "../../components/shared/Dropdown/Dropdown";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import InputLabel from "../../components/shared/InputLabel/InputLabel";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import { RecordItemsInfo as InvoicesInfo } from "../../DummyData/DummyData";
import { FilterData } from "../../hooks/FilterData";

const Invoices = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [filterComInfo, setFilterComInfo] = useState({
    title: "",
    cancelBtn: "",
    applyBtn: "",
  });
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const [filterInvoicesInfo, setFilterInvoicesInfo] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isFilter, setIsFilter] = useState(false);
  const [sort, setSort] = useState({});

  const filterBtnclick = () => {
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Filter",
      cancelBtn: "Clear All",
      applyBtn: "Apply",
    });
  };
  const InvoiceItemClick = () => {
    console.log("Invoice click");
  };

  useEffect(() => {
    let filter = InvoicesInfo.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.tracking_number} ${item.source} ${item.destination} ${item.service_type}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterInvoicesInfo(filter);
    // eslint-disable-next-line
  }, [search]);

  const btnHandleClick = (data) => {
    let bySearch = [];
    // console.
    for (const [key, value] of Object.entries(data)) {
      bySearch.push({ text: value, search: key });
    }
    let filterData = FilterData(InvoicesInfo, bySearch);
    setFilterInvoicesInfo(filterData);
    setIsFilter(true);
  };

  const useFormReset = () => {
    reset((formValues) => {
      Object.keys(formValues).forEach((key) => {
        formValues[key] = "";
      });

      return { ...formValues };
    });
    setFilterInvoicesInfo(InvoicesInfo);
    setIsFilter(false);
  };

  const sortChange = (isChecked, name, type) => {
    setSort({ [type]: isChecked ? name : "" });

    if (type === "Amount" && isChecked) {
      if (name === "Low to High") {
        sortFilter("low_to_high");
      } else {
        sortFilter("plus");
      }
    } else if (type === "Date" && isChecked) {
      if (name === "Ascending") {
        dateSort("Ascending");
      } else {
        dateSort("Descending");
      }
    } else {
      setFilterInvoicesInfo(InvoicesInfo);
    }
  };

  const dateSort = (equation) => {
    let clone = [...InvoicesInfo];

    let filterData = clone.sort((a, b) => {
      if (equation === "Ascending") return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });
    setFilterInvoicesInfo(filterData);
  };
  const sortFilter = (equation) => {
    let clone = [...InvoicesInfo];

    let filterData = clone.sort((a, b) => {
      if (equation === "low_to_high") return a.amount - b.amount;
      return b.amount - a.amount;
    });

    setFilterInvoicesInfo(filterData);
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
        cancelClick={useFormReset}
        handleSubmit={handleSubmit}
      >
        {filterComInfo.title === "Filter" && (
          <FilterCoponent
            filterInvoicesInfo={filterInvoicesInfo}
            errors={errors}
            register={register}
            isFilter={isFilter}
          />
        )}
        {filterComInfo.title === "Add new Invoice" && <AddNewInvoiceItem />}
      </RightSidebar>

      <Header
        mainCss="!h-[150px]"
        name={`Invoices (${filterInvoicesInfo.length})`}
      >
        <div className="flex items-center gap-2 lg:gap-5 mt-4 lg:mt-0  w-full lg:w-fit ">
          <div className="w-full lg:w-[230px] bg-white border rounded-lg flex items-center gap-2 px-3">
            <icons.search className="text-gray-400 text-2xl lg:text-xl" />
            <input
              ref={searchRef}
              onChange={(e) => setSearch(e.target.value)}
              className="text-base lg:text-[13px] w-full outline-none text-gray-600 py-3"
              placeholder="Search anything"
              type="search"
              name=""
              id=""
            />
          </div>
            <SortButton
              sort={sort}
              sortChange={sortChange}
              setFilter={setFilterInvoicesInfo}
              data={filterInvoicesInfo}
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
                  name: "Amount",
                  arr: [
                    { id: 1, name: "Low to High" },
                    {
                      id: 2,
                      name: "High to Low",
                    },
                  ],
                },
              ]}
            />
    
          <CustomButton
            hadleClick={filterBtnclick}
            block={false}
            btnClass="w-fit lg:h-[46px] h-[50px] px-5 text-sm font-normal rounded-lg border border-[#FE0000] text-[#FE0000]  mt-[2px]"
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
        <InvoicesAll
          InvoiceItemClick={InvoiceItemClick}
          filterInvoicesInfo={filterInvoicesInfo}
          search={search}
        />
      </div>
    </div>
  );
};

export default Invoices;

const InvoicesAll = ({ filterInvoicesInfo, InvoiceItemClick }) => {
  return (
    <div className="pb-10">
      <ul className="flex flex-wrap lg:flex-col gap-y-4">
        {filterInvoicesInfo.length ? (
          filterInvoicesInfo.map((Invoice) => (
            <InvoiceLi
              onClick={InvoiceItemClick}
              key={Invoice.id}
              Invoice={Invoice}
            />
          ))
        ) : (
          <p className="text-center">No result Found!</p>
        )}
      </ul>
    </div>
  );
};

const InvoiceLi = ({ onClick, Invoice }) => {
  const items = [
    {
      id: 1,
      name: <span>Edit</span>,
      icon: "",
      handleChange: editInvoice,
    },
    {
      id: 2,
      name: <span>Delete</span>,
      icon: "",
      handleChange: deleteInvoice,
    },
  ];

  function editInvoice() {
    console.log("Edit Invoice");
  }
  function deleteInvoice() {
    console.log("Delete Invoice");
  }

  const downloadInvoice = () => {
    const link = document.createElement("a");
    link.href = samplePdfFile;
    link.setAttribute("download", "sample.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  return (
    <li
      onClick={() => onClick(Invoice)}
      className=" w-full md:w-1/2 lg:w-full p-2 lg:p-0"
    >
      <div className="flex flex-col lg:flex-row items-start  lg:items-center gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="flex gap-2 items-center w-full lg:w-fit">
          <div className="flex items-center justify-between lg:block w-full lg:w-[12rem]">
            <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
              Tracking Number
            </p>
            <div className="font-medium capitalize w-fit whitespace-nowrap">
              {Invoice.tracking_number ? Invoice.tracking_number : "-"}
            </div>
            <span className=" lg:hidden rounded-full w-[45px] h-[45px] flex justify-center items-center">
              <MyDropdown
                btnClass="w-fit h-fit"
                btnText={<icons.threeBarIcon className="text-xl " />}
                items={items}
              />
            </span>
          </div>
        </div>
        <div className="w-[14rem]">
          <p className="text-gray-500 mb-1 text-sm">Source</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {Invoice.source ? Invoice.source : "-"}
            </p>
          </div>
        </div>
        <div className="w-[16rem]">
          <p className="text-gray-500 mb-1 text-sm">Destination</p>
          <p className="font-medium">
            {Invoice.destination ? Invoice.destination : "-"}
          </p>
        </div>
        <div className="w-[7rem]">
          <p className="text-gray-500 mb-1 text-sm">Service type</p>
          <p className="font-medium">
            {Invoice.service_type ? Invoice.service_type : "-"}
          </p>
        </div>
        <div className="w-[6rem]">
          <p className="text-gray-500 mb-1 text-sm">Date</p>
          <p className="font-medium ">{Invoice.date ? Invoice.date : "-"}</p>
        </div>
        <div className="w-[8rem]">
          <p className="text-gray-500 mb-1 text-sm">Amount</p>
          <p className="font-medium ">
            {Invoice.amount ? Invoice.amount + " " + Invoice.currency : "-"}
          </p>
        </div>

        <div className="min-w-[110px] lg:flex  justify-center hidden">
          <CustomButton
            hadleClick={downloadInvoice}
            block={false}
            btnClass="lg:w-fit lg:h-[46px] h-[56px] px-5 text-sm font-normal rounded-lg w-[56px] border border-[#FE0000] text-[#FE0000]"
            text={<p className="flex items-center gap-2">Download</p>}
          />
        </div>
      </div>
    </li>
  );
};

const FilterCoponent = ({ register, filterInvoicesInfo, isFilter = false }) => {
  return (
    <div>
      <div>
        <InputLabel
          register={register}
          label="Invoice Number"
          placeholder="Invoice Number"
          name="invoice"
          required={false}
        />

        {isFilter && (
          <p className="text-[#2DA400] font-semibold">
            {Array.isArray(filterInvoicesInfo) && filterInvoicesInfo.length}{" "}
            Results found.
          </p>
        )}
      </div>
    </div>
  );
};
