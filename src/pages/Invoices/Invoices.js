import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import AddNewInvoiceItem from "../../components/Invoices/AddNewInvoiceItem";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import FilterButton from "../../components/shared/Buttons/FilterButton";
import SortButton from "../../components/shared/Buttons/SortButton";
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
  const [loggedUser] = useContext(AuthContext)
  const [fetchAgain, setFetchAgain] = useState(true);
  const [maxDataLoad, setMaxDataLoad] = useState(0)
  const [allInvoices, setAllInvoices] = useState([]);
  const navigate = useNavigate();
  const [fetchStatus, setFetchStatus] = useState('no_fetch')
  const [reload, setReload] = useState(false);

  //Get All Shipping-Items 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token && fetchAgain) {

        ApiRequest('GET', `/shipments?limit=50&offset=${allInvoices.length}`, loggedUser.jwt_token,)
          .then(result => {

            if (result.hasOwnProperty('errors')) {

            }
            if (result.hasOwnProperty('data')) {
              setAllInvoices(prev => [...prev, ...result.data])
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




  const filterBtnclick = () => {
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Filter",
      cancelBtn: "Clear All",
      applyBtn: "Apply",
    });
  };
  const InvoiceItemClick = () => {

  };

  useEffect(() => {
    let filter = allInvoices.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.tracking_number} ${item.source} ${item.destination} ${item.service_type}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterInvoicesInfo(filter);
    // eslint-disable-next-line
  }, [search, allInvoices]);

  const btnHandleClick = (data) => {
    let bySearch = [];
    // console.
    for (const [key, value] of Object.entries(data)) {
      bySearch.push({ text: value, search: key });
    }
    let filterData = FilterData(allInvoices, bySearch);
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
    setFilterInvoicesInfo(allInvoices);
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
      setFilterInvoicesInfo(allInvoices);
    }
  };

  const dateSort = (equation) => {
    let clone = [...allInvoices];

    let filterData = clone.sort((a, b) => {
      if (equation === "Ascending") return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });
    setFilterInvoicesInfo(filterData);
  };
  const sortFilter = (equation) => {
    let clone = [...allInvoices];

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
        <div className="flex justify-end items-center gap-2 lg:gap-5 mt-4 lg:mt-0  w-full ml-auto">
          <SearchInput searchRef={searchRef} setSearch={setSearch} />
          <div className="flex gap-2 md:gap-5">
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
            <FilterButton filterBtnclick={filterBtnclick} />
          </div>
        </div>
      </Header>

      <LoadingForFetch maxDataLoad={maxDataLoad} totalLength={allInvoices?.length} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchStatus={fetchStatus}>
        <InvoicesAll
          InvoiceItemClick={InvoiceItemClick}
          filterInvoicesInfo={filterInvoicesInfo}
          search={search}
        />
      </LoadingForFetch>
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
              key={Invoice?.shipment_uid}
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
  const [loggedUser] = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [surce, setSource] = useState({})
  const [destination, setDestination] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      requestApi(Invoice?.source_office_uid, setSource)
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      requestApi(Invoice?.destination_office_uid, setDestination)
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

  function editInvoice() { }
  function deleteInvoice() { }

  const downloadInvoice = () => {

    setLoading(true)
    ApiRequest('GET', `/shipments/${Invoice?.shipment_uid}/invoice/raw`, loggedUser.jwt_token, '')
      .then(result => {
        downloadPDF(result?.customer)
      })
      .catch(err => console.log({ err }))
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 10000)
      })
  };
  const downloadPDF = (customer) => {
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${loggedUser.jwt_token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    fetch(`https://development.ssaflogistics.com/cms/v1/shipments/${Invoice?.shipment_uid}/invoice/pdf`, requestOptions)
      .then((res) => res.blob())
      .then(data => {
        let objectUrl = window.URL.createObjectURL(data);
        anchor.href = objectUrl;
        anchor.download = `${customer?.first_name + '_' + customer?.last_name}_shipment_information_pdf.pdf`;
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
      })
      .catch(err => {
        console.log({ err })
      })
      .finally(() => { setLoading(false) })
  }
  return (
    <li
      className=" w-full md:w-1/2 lg:w-full p-2 lg:p-0"
    >
      <div className="flex flex-col lg:flex-row items-start   gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
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
              {surce?.title || "-"}
            </p>
          </div>
        </div>
        <div className="w-[16rem]">
          <p className="text-gray-500 mb-1 text-sm">Destination</p>
          <p className="font-medium">
            {destination?.title || "-"}
          </p>
        </div>
        <div className="w-[7rem]">
          <p className="text-gray-500 mb-1 text-sm">Service type</p>
          <p className="font-medium">
            {Invoice?.shipment_service_type || "-"}
          </p>
        </div>
        <div className="w-[6rem]">
          <p className="text-gray-500 mb-1 text-sm">Date</p>
          <p className="font-medium ">{Invoice.shipment_date_time_stamp_gmt || "-"}</p>
        </div>
        <div className="w-[8rem]">
          <p className="text-gray-500 mb-1 text-sm">Amount</p>
          <p className="font-medium ">
            {Invoice.shipment_price + " USD" || "-"}
          </p>
        </div>

        <div className="min-w-[110px] lg:flex  justify-center">
          <CustomButton
            simpleRed={true}
            loading={loading}
            hadleClick={downloadInvoice}
            block={false}
            btnClass=" h-[46px] px-5 text-sm font-normal rounded-lg  w-[110px] border border-[#FE0000] text-[#FE0000]"
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
          name="tracking_number"
          required={false}
        />

        {isFilter && (
          <p className="text-[#2DA400] font-semibold pt-3">
            {Array.isArray(filterInvoicesInfo) && filterInvoicesInfo.length}{" "}
            Results found.
          </p>
        )}
      </div>
    </div>
  );
};
