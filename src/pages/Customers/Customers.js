import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import usaFlag from "../../assets/images/usa.svg";
import AddNewCustomer, { CountryCityStateZip } from "../../components/Customers/AddNewCustomer";
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

const Customers = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [filterComInfo, setFilterComInfo] = useState({
    title: "",
    cancelBtn: "",
    applyBtn: "",
  });
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [filterCustomersInfo, setFilterCustomersInfo] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();
  const [loggedUser] = useContext(AuthContext)
  const [fetchStatus, setFetchStatus] = useState('no_fetch')
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(true);
  const [maxDataLoad, setMaxDataLoad] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


  //Get All Customers 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token && fetchAgain && maxDataLoad >= customers.length) {
        getCustomerAll()
      }
    }, 0)
    return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser.jwt_token, reload, fetchAgain])



  //Get CustomerAll Api 
  const getCustomerAll = () => {
    ApiRequest('GET', `/customers?limit=50&offset=${customers.length}`, loggedUser.jwt_token,)
      .then(result => {
  
        if (result.hasOwnProperty('errors')) {
        } else {
          setCustomers(prev => [...prev, ...result.data])
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
        setFetchAgain(false)
        setFetchStatus('fetched')
      })
  }

  const openAddNewcustomer = () => {
    setRightSidebarOpen(true);
    setFilterComInfo({
      title: "Add new customer",
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

  useEffect(() => {
    let filter = customers.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.first_name} ${item.last_name} ${item.email}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterCustomersInfo(filter);
    // eslint-disable-next-line
  }, [search, customers]);


  const btnHandleClick = (data) => {
    if (filterComInfo.title === "Filter") filterData(data)
    if (filterComInfo.title === "Add new customer") addNewCusomter(data)
  };
  const addNewCusomter = (data) => {
    setLoading(true)

    let { email, first_name, last_name, phone_number, zip_or_postcode, state_or_region, street, city, country } = data;
    let body = { phone_number: `+${phone_number}`, first_name, last_name, email, address: { street, city, state_or_region, country, zip_or_postcode }, company_name: "Elliott, Hoffman and Nash" }

    ApiRequest('POST', '/customers', loggedUser.jwt_token, body)
      .then(result => {

        if (result.hasOwnProperty('errors')) {
          toast.error(result.errors[0].msg)
        } else {
          if (result.hasOwnProperty('customer_uid')) {
            toast.success('New Customer Added.')
            setFetchAgain(true)
            setRightSidebarOpen(false)
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

  const filterData = (data) => {
    let bySearch = [];
    for (const [key, value] of Object.entries(data)) {
      bySearch.push({ text: value, search: key });
    }
 
    let filterData = FilterData(customers, bySearch);

    setFilterCustomersInfo(filterData);
    setIsFilter(true);
  }

  const useFormReset = () => {
    reset((formValues) => {
      Object.keys(formValues).forEach((key) => {
        formValues[key] = "";
      });
      return { ...formValues };
    });
    setFilterCustomersInfo(customers);
    setIsFilter(false);
  };

  const customerClick = (customer) => {
    navigate(`/customer/${customer.customer_uid}`)
  }


  return (
    <div className="pt-12 lg:pt-0 relative overflow-hidden">
      <RightSidebar
        childClass={filterComInfo.cancelBtn ? "h-[79vh] lg:h-[89vh]" : "h-[78vh]"}
        title={filterComInfo.title}
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
        applyBtn={filterComInfo.applyBtn}
        cancelBtn={filterComInfo.cancelBtn}
        btnHandleClick={btnHandleClick}
        cancelClick={useFormReset}
        handleSubmit={handleSubmit}
        simpleRed={false}
        loading={loading}
      >
        {filterComInfo.title === "Filter" && (
          <FilterComponent
            setValue={setValue}
            filterCustomersInfo={filterCustomersInfo}
            errors={errors}
            register={register}
            isFilter={isFilter}
          />
        )}
        {filterComInfo.title === "Add new customer" && (
          <AddNewCustomer register={register} errors={errors} setRightSidebarOpen={setRightSidebarOpen} />
        )}
      </RightSidebar>
      <Header
        mainCss="!h-[150px]"
        name={`Customers (${filterCustomersInfo.length})`}
      >
        <div className="flex items-center gap-5 mt-4 lg:mt-0  w-full lg:w-fit ">
          <CustomButton
            hadleClick={openAddNewcustomer}
            btnClass="fixed lg:static right-5 bottom-5 lg:w-fit lg:h-[46px] h-[56px] px-5 text-sm font-semibold rounded-full lg:rounded-lg w-[56px] lg:shadow-none capitalize"
            text={
              <p className="flex justify-center items-center">
                <span className="hidden lg:block ">+ Add new customer</span>
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

      <LoadingForFetch maxDataLoad={maxDataLoad} totalLength={customers?.length} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchStatus={fetchStatus}>
        <CustomersAll
          customerClick={customerClick}
          filterCustomersInfo={filterCustomersInfo}
          search={search}
        />
      </LoadingForFetch>



    </div >
  );
};

export default Customers;

export const CustomersAll = ({ type = 'customers', customerClick, filterCustomersInfo }) => {

  return (
    <div className="pb-10">
      <ul className="flex flex-wrap lg:flex-col gap-y-4">
        {filterCustomersInfo.length ? (
          filterCustomersInfo.map((customer) => (
            <CusomterLi
              customerClick={customerClick}
              key={type === 'customers' ? customer.customer_uid : customer.consignee_uid}
              customer={customer}
            />
          ))
        ) : (
          <p className="text-center">No result Found!</p>
        )}
      </ul>
    </div>
  );
};

export const CusomterLi = ({ customerClick, customer }) => {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const items = [
    {
      id: 1,
      name: <span>Edit</span>,
      icon: "",
      handleChange: () => { },
    },
    {
      id: 2,
      name: <span>Delete</span>,
      icon: "",
      handleChange: () => { },
    },
  ];

  const liClick = (event) => {
    let isCLick = (ref.current && !ref.current.contains(event.target)) && (ref2.current && !ref2.current.contains(event.target))
    if (isCLick) {
      customerClick(customer)

    }
  };

  return (
    <li
      onClick={(e) => liClick(e)}
      className=" w-full md:w-1/2 lg:w-full p-2 lg:p-0"
    >
      <div className="flex flex-col lg:flex-row items-start   gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="flex gap-2 items-center w-full lg:w-2/12">
          <div className="flex items-center justify-between lg:block w-full lg:w-[12rem]">
            <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
              First Name
            </p>
            <div className="font-medium capitalize w-fit whitespace-nowrap">
              {customer?.first_name || '-'}
            </div>

            <MyDropdown
              dropCss='lg:hidden'
              btnText={
                <span
                  ref={ref2}
                  className="lg:hidden bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
                >
                  <icons.threeBarIcon className="text-xl" />
                </span>}
              items={items}
            />

          </div>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Last Name</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{customer?.last_name || '-'}</p>
          </div>
        </div>
        <div className="w-4/12">
          <p className="text-gray-500 mb-1 text-sm">Email</p>
          <p className="font-medium">{customer?.email || '-'}</p>
        </div>
        <div className="lg:w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Phone</p>
          <div className="flex items-center gap-2">
            <img src={usaFlag} alt="usa" />
            <p className="font-medium">{customer?.phone_number || '-'}</p>
          </div>
        </div>

        <div className="min-w-[110px] lg:flex  justify-center hidden">
          <MyDropdown
            btnText={
              <span
                ref={ref}
                className="bg-gray-100 rounded-full w-[45px] h-[45px] flex justify-center items-center"
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

export const FilterComponent = ({
  errors,
  register,
  filterCustomersInfo,
  isFilter,
  setValue
}) => {

  return (
    <div className="pb-4">
      <InputLabel
        errors={errors}
        register={register}
        label="First Name"
        placeholder="First Name"
        name="first_name"
        required={false}
      />
      {errors.first_name && (
        <p className="text-[#FE0000] text-right">This field is required</p>
      )}
      <br />
      <InputLabel
        errors={errors}
        register={register}
        label="Last Name"
        placeholder="Last Name"
        name="last_name"
        required={false}
      />
      {errors.last_name && (
        <p className="text-[#FE0000] text-right">This field is required</p>
      )}
      <br />

      <InputLabel
        errors={errors}
        register={register}
        label="Email"
        placeholder="Email"
        name="email"
        required={false}
      />
      {errors.email && (
        <p className="text-[#FE0000] text-right">This field is required</p>
      )}
      <br />

      <InputLabel
        errors={errors}
        register={register}
        label="Phone Number"
        placeholder="Phone Number"
        name="phone_number"
        required={false}
      />
      {errors.phone_number && (
        <p className="text-[#FE0000] text-right">This field is required</p>
      )}
      <br />
      <CountryCityStateZip setValue={setValue} register={register} errors={errors} isPosttal={false} width="w-full" />
      {isFilter && (
        <p className="text-[#2DA400] font-semibold pt-3">
          {Array.isArray(filterCustomersInfo) && filterCustomersInfo.length}{" "}
          Results found.
        </p>
      )}
    </div>
  );
};
