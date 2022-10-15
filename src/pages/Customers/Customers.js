import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usaFlag from "../../assets/images/usa.svg";
import AddNewCustomer from "../../components/Customers/AddNewCustomer";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import MyDropdown from "../../components/shared/Dropdown/Dropdown";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import InputLabel from "../../components/shared/InputLabel/InputLabel";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import { countries } from "../../DummyData/allCountryJson";
import { CustomersInfo } from "../../DummyData/DummyData";
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
  const [filterCustomersInfo, setFilterCustomersInfo] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    let filter = CustomersInfo.filter((item) => {
      if (search === "") return item;
      else {
        return `${item.first_name} ${item.last_name} ${item.email}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterCustomersInfo(filter);
    // eslint-disable-next-line
  }, [search]);


  const btnHandleClick = (data) => {
    let bySearch = [];
    for (const [key, value] of Object.entries(data)) {
      bySearch.push({ text: value, search: key });
    }
    let filterData = FilterData(CustomersInfo, bySearch);

    setFilterCustomersInfo(filterData);
    setIsFilter(true);
  };

  const useFormReset = () => {
    reset((formValues) => {
      Object.keys(formValues).forEach((key) => {
        formValues[key] = "";
      });
      return { ...formValues };
    });
    setFilterCustomersInfo(CustomersInfo);
    setIsFilter(false);
  };
  const customerClick = (customer) => {
    navigate(`/customer/${customer.id}`)
  }
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
        simpleRed={false}
      >
        {filterComInfo.title === "Filter" && (
          <FilterComponent
            filterCustomersInfo={filterCustomersInfo}
            errors={errors}
            register={register}
            isFilter={isFilter}
          />
        )}
        {filterComInfo.title === "Add new customer" && (
          <AddNewCustomer  register={register} errors={errors} setRightSidebarOpen={setRightSidebarOpen} />
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
          <CustomButton
            hadleClick={filterBtnclick}
            block={false}
            btnClass="lg:w-fit lg:h-[46px] h-[56px] px-5 text-sm font-normal rounded-lg w-[56px] border border-[#FE0000] text-[#FE0000]"
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
        <CustomersAll
          customerClick={customerClick}
          filterCustomersInfo={filterCustomersInfo}
          search={search}
        />
      </div>
    </div>
  );
};

export default Customers;

export const CustomersAll = ({ customerClick, filterCustomersInfo }) => {
  console.log({ filterCustomersInfo })
  return (
    <div className="pb-10">
      <ul className="flex flex-wrap lg:flex-col gap-y-4">
        {filterCustomersInfo.length ? (
          filterCustomersInfo.map((customer) => (
            <CusomterLi
              customerClick={customerClick}
              key={customer.id}
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
      handleChange: editCustomer,
    },
    {
      id: 2,
      name: <span>Delete</span>,
      icon: "",
      handleChange: deleteCustomer,
    },
  ];

  function editCustomer() {
    console.log("Edit customer");
  }
  function deleteCustomer() {
    console.log("Delete customer");
  }

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
      <div className="flex flex-col lg:flex-row items-start  lg:items-center gap-3  justify-between p-5  rounded-lg bg-white shadow-sm cursor-pointer">
        <div className="flex gap-2 items-center w-full lg:w-3/12">
          <div className="flex items-center justify-between lg:block w-full lg:w-[12rem]">
            <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
              First Name
            </p>
            <div className="font-medium capitalize w-fit whitespace-nowrap">
              {customer?.first_name}
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
            <p className="font-medium">{customer?.last_name}</p>
          </div>
        </div>
        <div className="w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Email</p>
          <p className="font-medium">{customer?.email}</p>
        </div>
        <div className="lg:w-3/12">
          <p className="text-gray-500 mb-1 text-sm">Phone</p>
          <div className="flex items-center gap-2">
            <img src={usaFlag} alt="usa" />
            <p className="font-medium">{customer?.phone}</p>
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
}) => {
  const states = [
    { id: 2, name: "State 2", unavailable: false },
    { id: 3, name: "State 3", unavailable: false },
    { id: 4, name: "State 4", unavailable: true },
    { id: 5, name: "State 5", unavailable: false },
  ];
  const cities = [
    { id: 2, name: "City 2", unavailable: false },
    { id: 3, name: "City 3", unavailable: false },
    { id: 4, name: "City 4", unavailable: true },
    { id: 5, name: "City 5", unavailable: false },
  ];

  return (
    <div>
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
        name="phone"
        required={false}
      />
      {errors.phone && (
        <p className="text-[#FE0000] text-right">This field is required</p>
      )}
      <br />

      <div>
        <p className="font-semibold text-sm">Country</p>
        <select
          {...register("country")}
          className={`border text-left rounded-md px-3 py-[15px] w-full mt-2 mb-4 flex items-center ${errors.country ? "!border-red" : ""
            }`}
          name="country"
          id="country">
          <option value="" disabled selected hidden>
            Country
          </option>
          {countries.map((country, ind) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <br />

      <div>
        <p className="font-semibold text-sm">State</p>

        <select
          {...register("state")}
          className="border text-left rounded-md  px-3 py-[15px] w-full mt-2 mb-4 flex items-center"
          name="state"
          id="state"
        >
          <option value="" hidden>
            State
          </option>

          {states.map((state, ind) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <br />

      <div>
        <p className="font-semibold text-sm">City</p>

        <select
          {...register("city")}
          className="border text-left rounded-md  px-3 py-[15px] w-full mt-2 mb-4 flex items-center"
          name="city"
          id="city"
        >
          <option value="" hidden>
            City
          </option>

          {cities.map((city, ind) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      {isFilter && (
        <p className="text-[#2DA400] font-semibold">
          {Array.isArray(filterCustomersInfo) && filterCustomersInfo.length}{" "}
          Results found.
        </p>
      )}
    </div>
  );
};
