import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import ConsigneeDetails from "../../components/Consignee/ConsigneeDetails";
import AddNewCustomer from "../../components/Customers/AddNewCustomer";
import CustomerDetails from "../../components/Customers/CustomerDetails";
import CustomButton from "../../components/shared/Buttons/CustomButton";
import Header from "../../components/shared/Header";
import icons from "../../components/shared/icons";
import LoadingForFetch from "../../components/shared/LoadingForFetch";
import RightSidebar from "../../components/shared/RightSidebar/RightSidebar";
import ApiRequest from "../../hooks/ApiRequest";
import { FilterData } from "../../hooks/FilterData";
import { CustomersAll, FilterComponent } from "../Customers/Customers";
import { EditCustomer } from "../../components/Customers/EditCustomer";
import { EditConsignee } from "../../components/Customers/EditCustomer";
import toast from "react-hot-toast";
import { checkAuthorized } from "../../hooks/commonFunc";

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
    const [scrollCss, setScrollCss] = useState(false);
    const [loggedUser] = useContext(AuthContext)
    const [fetchStatus, setFetchStatus] = useState('no_fetch')
    const [customerDetails, setCustomerDetails] = useState({})
    const [consigneeDetails, setConsigneeDetails] = useState({});
    const [consignees, setConsignees] = useState([]);
    const [reload, setReload] = useState(false)
    const [customerDetailReload, setCustomerDetailReload] = useState(false)
    const [fetchAgain, setFetchAgain] = useState(true);
    const [maxDataLoad, setMaxDataLoad] = useState(0)
    const [loading, setLoading] = useState(false);

    const {
        register,
        resetField,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const { customerId } = useParams();
    const navigate = useNavigate();


    //Get All Consignee 
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (loggedUser?.jwt_token && fetchAgain && maxDataLoad >= consignees.length) {
                ApiRequest('GET', `/consignees?limit=50&offset=${consignees.length}&customer_uid=${customerId}`, loggedUser.jwt_token,)
                    .then(result => {
                        if (result.hasOwnProperty('errors')) {

                        } else {
                            setConsignees([...result.data])
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


    //Get Customer Details  Information
    useEffect(() => {
        if (customerId && loggedUser.jwt_token) {
            ApiRequest('GET', `/customers?customer_uid=${customerId}`, loggedUser.jwt_token, '', false)
                .then(result => {
                    if (result.hasOwnProperty('errors')) {
                    } else {
                        let userDetails = result?.data && result?.data[0]
                        setCustomerDetails(userDetails)
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

    }, [customerId, loggedUser.jwt_token, customerDetailReload])

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
        let filter = consignees.filter((item) => {
            if (search === "") return item;
            else {
                return `${item.first_name} ${item.last_name} ${item.email}`
                    .toLowerCase()
                    .includes(search.toLowerCase());
            }
        });
        setFilterConsigneeInfo(filter);
        // eslint-disable-next-line
    }, [search, consignees]);


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


    const formReset = () => {

        reset((formValues) => {
            Object.keys(formValues).forEach((key) => {
                formValues[key] = "";
            });
            return { ...formValues };
        });
        setFilterConsigneeInfo(consignees);
        setIsFilter(false);
    };

    const btnHandleClick = (data) => {
        if (filterComInfo.title === "Filter") filterData(data)
        if (filterComInfo.title === "Consignee Details") deleteConsignee()
        if (filterComInfo.title === "Add new consignee") addNewConsignee(data)
        if (filterComInfo.title === "Edit Customer Details") applyCustomerUpdate(data)
        if (filterComInfo.title === "Edit Consignee Details") applyConsigneeUpdate(data)
    };
    const deleteConsignee = () => {
        setLoading(true)
        ApiRequest('DELETE', `/consignees/${consigneeDetails.consignee_uid}`, loggedUser.jwt_token, '', false)
            .then(result => {
                if (result.hasOwnProperty('errors')) {
                } else {
                    toast.success('Consignee Deleted.')
                    setRightSidebarOpen(false)
                    setConsignees([])
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
            .finally(() => { setLoading(false) })
    }

    const addNewConsignee = (data) => {
        let { email, first_name, last_name, phone_number, zip_or_postcode, state_or_region, street, city, country } = data;
        let body = { phone_number: `+${phone_number}`, first_name, last_name, email, address: { street, city, state_or_region, country, zip_or_postcode }, company_name: "Elliott, Hoffman and Nash" }

        setLoading(true)
        ApiRequest('POST', `/customers/${customerDetails.customer_uid}/consignees`, loggedUser.jwt_token, body)
            .then(result => {
                if (result.hasOwnProperty('errors')) {
                    toast.error(result.errors[0].message)
                } else {
                    if (result.hasOwnProperty('customer_uid')) {
                        toast.success('New Consignee Added.')
                        setRightSidebarOpen(false)
                    } else {
                        toast.error(result?.detail[0]?.msg)
                    }
                }
                setFetchAgain(true)
            })
            .catch(error => {
                toast.error(error[0]?.message)
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
        let filterData = FilterData(consignees, bySearch);
        setFilterConsigneeInfo(filterData);
        setIsFilter(true);
    }


    const cancelBtnClick = () => {
        if (filterComInfo.title === "Filter") formReset()
        if (filterComInfo.title === "Consignee Details") editConsignee()
        if (filterComInfo.title === "Add new consignee") setRightSidebarOpen(false)
        if (filterComInfo.title === "Edit Consignee Details") setRightSidebarOpen(false)
        if (filterComInfo.title === "Edit Customer Details") setRightSidebarOpen(false)
    }

    const editConsignee = () => {
        setFilterComInfo({
            title: "Edit Consignee Details",
            cancelBtn: "Cancel",
            applyBtn: "Apply",
        });
    }

    const editCustomerBtnClick = () => {
        setFilterComInfo({
            title: "Edit Customer Details",
            cancelBtn: "Cancel",
            applyBtn: "Apply",
        });
        setRightSidebarOpen(true)
    }
    const applyCustomerUpdate = (data) => {
        let { email, first_name, last_name, phone_number, zip_or_postcode, state_or_region, street, city, country } = data;
        let body = { phone_number: `+${phone_number}`, first_name, last_name, email, address: { street, city, state_or_region, country, zip_or_postcode }, company_name: "Elliott, Hoffman and Nash" }
        setLoading(true)
        ApiRequest('PATCH', `/customers/${customerDetails.customer_uid}`, loggedUser.jwt_token, body)
            .then(result => {
                if (result.hasOwnProperty('errors')) {
                    toast.error(result.errors[0].message)

                } else {
                    if (result.hasOwnProperty('customer_uid')) {
                        toast.success('Update Cutomer Details.')
                        setCustomerDetailReload(prev => !prev)
                        setRightSidebarOpen(false)
                        setConsignees([])
                        setMaxDataLoad(0)
                    } else {
                        toast.error(result?.detail[0]?.msg)
                    }
                }
                setFetchAgain(true)
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
    const applyConsigneeUpdate = (data) => {
        let { email, first_name, last_name, phone_number, zip_or_postcode, state_or_region, street, city, country } = data;
        let body = {
            phone_number: `+${phone_number}`,
            first_name,
            last_name,
            email,
            address: {
                street: street || consigneeDetails?.address?.street,
                city: city || consigneeDetails?.address?.city,
                state_or_region: state_or_region || consigneeDetails?.address?.state_or_region,
                country: country || consigneeDetails?.address?.country,
                zip_or_postcode: zip_or_postcode || consigneeDetails?.address?.zip_or_postcode
            },
            company_name: "Elliott, Hoffman and Nash"
        }
        setLoading(true)
        ApiRequest('PATCH', `/consignees/${consigneeDetails.consignee_uid}`, loggedUser.jwt_token, body)
            .then(result => {
                if (result.hasOwnProperty('errors')) {
                    toast.error(result.errors[0].message)

                } else {
                    if (result.hasOwnProperty('consignee_uid')) {
                        toast.success('Update Consignee Details.')
                        setReload(prev => !prev)
                        setRightSidebarOpen(false)
                        setConsignees([])
                        setMaxDataLoad(0)
                        setFetchAgain(true)
                        setFetchStatus('no_fetch')
                    } else {
                        toast.error(result?.detail[0]?.msg)
                    }
                }
                setFetchAgain(true)
            })
            .catch(error => {
                toast.error(error)
                if (!checkAuthorized(error)) {
                    localStorage.clear();
                    navigate('/login')
                }
            })
            .finally(() => { setLoading(false) })
    }


    useEffect(() => {
        if (!rightSidebarOpen) {
            resetField('first_name');
            resetField('last_name');
            resetField('email');
            resetField('phone_number');
            resetField('street');
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
                simpleRed={true}
                loading={loading}
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
                    <AddNewCustomer setValue={setValue} register={register} errors={errors} setRightSidebarOpen={setRightSidebarOpen} />
                )}
                {filterComInfo.title === "Consignee Details" && (
                    <ConsigneeDetails simpleRef={true} item={consigneeDetails} setRightSidebarOpen={setRightSidebarOpen} />
                )}

                {filterComInfo.title === "Edit Customer Details" && (
                    <EditCustomer setValue={setValue} customer={customerDetails} register={register} errors={errors} setRightSidebarOpen={setRightSidebarOpen} />
                )}
                {rightSidebarOpen ? filterComInfo.title === "Edit Consignee Details" && (
                    <EditConsignee setValue={setValue} consignee={consigneeDetails} register={register} errors={errors} setRightSidebarOpen={setRightSidebarOpen} />
                ) : null
                }
            </RightSidebar>
            <div
                className={`duration-200 overflow-hidden min-h-[700px] lg:min-h-[480px] h-fit mb-10`}
            >
                <CustomerDetails reload={reload} editCustomerBtnClick={editCustomerBtnClick} fetchStatus={fetchStatus} customerInfos={customerDetails} />
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

            <div>

                <LoadingForFetch maxDataLoad={maxDataLoad} totalLength={consignees?.length} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchStatus={fetchStatus}>
                    <CustomersAll
                        type='cosignee'
                        customerClick={consigneeClick}
                        filterCustomersInfo={filterConsigneeInfo}
                        search={search}
                    />
                </LoadingForFetch>

            </div>
        </div>
    );
};

export default CustomerDetailsPage;


