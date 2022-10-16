import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import AddShippingDetails from "../../../components/NewShippingComponents/AddShippingDetails";
import CustomButton from "../../../components/shared/Buttons/CustomButton";
import Header from "../../../components/shared/Header";
import icons from "../../../components/shared/icons";
import Modal from "../../../components/shared/Modal/Modal";
import RightSidebar from "../../../components/shared/RightSidebar/RightSidebar";
import { RecordItemsInfo as ShippingInfo } from "../../../DummyData/DummyData";


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
    } = useForm();
    const navigate = useNavigate();
    const { shippingId } = useParams();
    const [allStepper] = useState(stepper || []);
    const [shippingDetails, setShippingDetails] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let findItem = ShippingInfo.find(item => Number(item.id) === Number(shippingId))
        setShippingDetails(findItem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const onSubmit = (data) => {
        setIsModalOpen(true)
    }
    return (
        <div className="container  mx-auto  pt-12 lg:pt-0 relative  overflow-hidden">
            <RightSidebar>
            </RightSidebar>

            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <div className="mt-2 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-center mt-5 mb-3">Submited</h1>
                    <p className="text-sm text-gray-500 text-center">
                        Shipping has Changed
                    </p>
                </div>

                <div className="mt-8 flex justify-center gap-5">
                    <CustomButton
                        hadleClick={() => {
                            setIsModalOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            navigate("/shipping");
                        }}
                        btnClass="h-[45px]"
                        text="Done"
                    />
                </div>
            </Modal>
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

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col lg:flex-row justify-between lg:px-10 py-10 relative">
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
                            <AddShippingDetails shippingDetails={shippingDetails} register={register} errors={errors} nextBtnType={'submit'} nextBtn={'Save'} />
                        }
                    </div>
                </section>
            </form>
        </div>
    );
};

export default EditShipping;
