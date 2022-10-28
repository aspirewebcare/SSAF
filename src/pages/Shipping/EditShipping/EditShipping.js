import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../App";
import AddShippingDetails from "../../../components/NewShippingComponents/AddShippingDetails";
import CustomButton from "../../../components/shared/Buttons/CustomButton";
import Header from "../../../components/shared/Header";
import icons from "../../../components/shared/icons";
import Modal from "../../../components/shared/Modal/Modal";
import RightSidebar from "../../../components/shared/RightSidebar/RightSidebar";
import ApiRequest from "../../../hooks/ApiRequest";
import { checkAuthorized } from "../../../hooks/commonFunc";

const stepper = [
    {
        id: 1,
        name: "Shipping details",
        isActive: false,
    },
    {
        id: 2,
        name: "Add  Items",
        isActive: true,
    },
    {
        id: 3,
        name: "Terms of services",
        isActive: true,
    },
    {
        id: 4,
        name: "Invoice",
        isActive: true,
    },
    {
        id: 5,
        name: "Payment",
        isActive: true,
    },
    {
        id: 6,
        name: "Label",
        isActive: true,
    },
];
const EditShipping = () => {
    const {
        register,
        errors,
        handleSubmit,
        setValue,
        clearErrors
    } = useForm();
    const navigate = useNavigate();
    const { shipment_uid } = useParams();
    const [allStepper] = useState(stepper || []);
    const [shippingDetails, setShippingDetails] = useState({})
    const [loggedUser] = useContext(AuthContext)
    const [fetchStatus, setFetchStatus] = useState('no_fetch')
    const [reload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectSender, setSelectSender] = useState({})


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (loggedUser?.jwt_token) {
            
                ApiRequest('GET', `/shipments?shipment_uid=${shipment_uid}`, loggedUser.jwt_token,)
                    .then(result => {
                    
                        if (result.hasOwnProperty('errors')) {
                        } else {
                            setShippingDetails(result.data[0])
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
    }, [loggedUser.jwt_token, reload])



    const editShipmentAddress = (data) => {
        let cloneData = { ...data };
        delete cloneData.length;
        delete cloneData.width;
        delete cloneData.height;
        delete cloneData.customer_uid;
        cloneData.shipment_dimension = { length: data.length, width: data.width, height: data.height }

        patchShipment(cloneData)
    }


    const patchShipment = (body ) => {
   
        setLoading(true)
        ApiRequest('PATCH', `/shipments/${shippingDetails?.shipment_uid}`, loggedUser.jwt_token, body)
            .then(result => {

                if (result.hasOwnProperty('errors')) {
                    toast.error(result.errors[0].message)
                } else {

                    if (result.hasOwnProperty('customer_uid')) {
                        toast.success('Update Shipment.')
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        navigate("/shipping");
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



    return (
        <div className="container  mx-auto  pt-12 lg:pt-0 relative  overflow-hidden">
            <RightSidebar>
            </RightSidebar>

            <Header
                name={
                    <span className="flex gap-2 items-center">
                        <icons.arrowLeft
                            onClick={() => navigate(-1)}
                            className="cursor-pointer hover:shadow rounded-full w-12  h-12 p-2"
                        />
                        Edit Shipping
                    </span>
                }
            />

            <div className="bg-white flex flex-col lg:flex-row justify-between lg:px-10 py-10 relative">
                <div className="lg:hidden fixed left-0 top-0  bg-white w-full  h-full"></div>
                <aside className="w-full lg:w-3/12  lg:border-r pb-10 relative z-[5]">
                    <div className=" lg:px-5">
                        <ul className="flex  flex-wrap gap-y-2">
                            {allStepper.map((step) => (
                                <React.Fragment key={step.id}>
                                    <li
                                        className="flex gap-3 items-center cursor-pointer w-full sm:w-1/2 lg:w-full"
                                    >
                                        <span
                                            className={`flex items-center justify-center border w-12 h-12  rounded-full text-2xl  border-[#FE0000]   ${step.isActive
                                                ? ` font-semibold text-white bg-[#FE0000]` : 'text-[#FE0000]'}`}
                                        >
                                            {step.id}
                                        </span>
                                        <p
                                            className={`text-[#FE0000] font-medium`}
                                        >
                                            {step.name}
                                        </p>
                                    </li>
                                    {stepper.length !== step.id && (
                                        <span
                                            className={`hidden lg:block  w-[1px]  ml-6 h-10 bg-[#FE0000] `}
                                        ></span>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </aside>
                <section className="w-full lg:w-9/12 lg:pl-10 relative z-[5]">
                    <div className="w-full relative">
                        {
                            JSON.stringify(shippingDetails) !== '{}' &&
                            <AddShippingDetails shippingAddressSubmit={editShipmentAddress} selectSender={selectSender} setSelectSender={setSelectSender} currentStep={1} loading={loading} setValue={setValue} shippingDetails={shippingDetails} register={register} errors={errors} nextBtnType={'submit'} nextBtn={'Save'} />
                        }
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EditShipping;

