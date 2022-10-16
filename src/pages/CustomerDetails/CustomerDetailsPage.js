import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ConsigneeDetails from "../../components/Consignee/ConsigneeDetails";
import AddNewCustomer from "../../components/Customers/AddNewCustomer";
import CustomerDetails from "../../components/Customers/CustomerDetails";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import { CustomersInfo } from "../../DummyData/DummyData";
import { FilterData } from "../../hooks/FilterData";
import { CustomersAll, FilterComponent } from "../Customers/Customers";

const CustomerDetailsPage = () => {
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [filterComInfo, setFilterComInfo] = useState({
        title: "",
        cancelBtn: "",
        applyBtn: "",
    });
    const [search, setSearch] = useState("");
    const searchRef = useRef(null);
    const [filterConsigneeInfo, setFilterConsigneeInfo] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    const [consigneeDetails, setConsigneeDetails] = useState({});
    const [scrollCss, setScrollCss] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { customerId } = useParams();

    useEffect(() => {
        if (customerId) {
            let findCustomer = CustomersInfo.find(customer =>  Number(customer.id) === Number(customerId))
            if (findCustomer !== undefined) {
                setConsigneeDetails(findCustomer)
            } else {
                console.log('customer not  found')
            }
        }
    }, [customerId])
    
    const openAddNewConsignee = () => {
        setRightSidebarOpen(true);
        setFilterComInfo({
            title: "Add new consignee",
            cancelBtn: "cancel",
            applyBtn: "add",
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
        setFilterConsigneeInfo(filter);
        // eslint-disable-next-line
    }, [search]);


    const consigneeClick = (data) => {
        setFilterComInfo({
            title: "Consignee Details",
            cancelBtn: "EDIT",
            applyBtn: "delete",
        });
        setConsigneeDetails(data);
        setRightSidebarOpen(true);
    };


    useEffect(() => {
        window.addEventListener("scroll", () => {
            let pxDown = 500;
            if (window.scrollY > pxDown) {
                setScrollCss(true);
            } else {
                setScrollCss(false);
            }
        });
        // eslint-disable-next-line
    }, []);


    const useFormReset = () => {
        reset((formValues) => {
            Object.keys(formValues).forEach((key) => {
                formValues[key] = "";
            });
            return { ...formValues };
        });
        setFilterConsigneeInfo(CustomersInfo);
        setIsFilter(false);
    };
         
  const btnHandleClick = (data) => {
    if (filterComInfo.title === "Filter") filterData(data)
    if (filterComInfo.title === "Consignee Details") deleteRecord(data)
    if (filterComInfo.title === "Add new consignee" ) addNewConsignee(data)
  };
  const deleteRecord = (data) => {
    console.log(data)
  }
    const addNewConsignee = (data) => {
    console.log(data)
  }

  const filterData = (data) => {
    let bySearch = [];
        for (const [key, value] of Object.entries(data)) {
          bySearch.push({ text: value, search: key });
        }
        let filterData = FilterData(CustomersInfo, bySearch);
        setFilterConsigneeInfo(filterData);
        setIsFilter(true);
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
                simpleRed={true}
            >
                {filterComInfo.title === "Filter" && (
                    <FilterComponent
                        filterCustomersInfo={filterConsigneeInfo}
                        errors={errors}
                        register={register}
                        isFilter={isFilter}
                    />
                )}
                {filterComInfo.title === "Add new consignee" && (
                    <AddNewCustomer register={register} errors={errors} setRightSidebarOpen={setRightSidebarOpen} />
                )}
                {filterComInfo.title === "Consignee Details" && (
                    <ConsigneeDetails simpleRef={true} item={consigneeDetails} setRightSidebarOpen={setRightSidebarOpen} />
                )}
            </RightSidebar>

            <div
                className={`duration-200 overflow-hidden h-[700px] lg:h-[480px] mb-10`}
            >
                <CustomerDetails
                    customerInfos={consigneeDetails}
                />
            </div>


            <Header
            down={450}
                mainCss="!h-[100px]"
                customClass={` !top-[5rem] !px-0 ${scrollCss ? "fixed !px-[3.75rem]" : "!static "} `}
                name={`Consignee (${filterConsigneeInfo.length})`}
            >
                <div className=" flex items-center gap-5 mt-4 lg:mt-0  w-full lg:w-fit ">
                    <CustomButton
                        hadleClick={openAddNewConsignee}
                        btnClass="fixed lg:static right-5 bottom-5 lg:w-fit lg:h-[46px] h-[56px] px-5 text-sm font-semibold rounded-full lg:rounded-lg w-[56px] lg:shadow-none capitalize"
                        text={
                            <p className="flex justify-center items-center">
                                <span className="hidden lg:block ">+ Add new consignee</span>
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

            <div >
                <CustomersAll
                    customerClick={consigneeClick}
                    filterCustomersInfo={filterConsigneeInfo}
                    search={search}
                />
            </div>
        </div>
    );
};

export default CustomerDetailsPage;
