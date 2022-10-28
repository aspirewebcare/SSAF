import React, { useState } from 'react';
import usflag from '../../assets/images/usa.svg';
import { SenderInfos } from '../NewShippingComponents/AddShippingDetails';
import { SenderDropDown } from '../shared/Dropdown/CustomDropDown';
import icons from '../shared/icons';
import InputLabel from '../shared/InputLabel/InputLabel';

const EditRecord = ({ record, setRightSidebarOpen, setFilterComInfo, register, setValue, errors }) => {
    const [closeDrop, setCloseDrop] = useState(false)
    const [selectSender, setSelectSender] = useState({})
    const [isCustomerHere, setIsCustomerHere] = useState({ status: false, info: { customer_uid: record?.customer_uid || '' } })

    const addNewSender = () => {
        setRightSidebarOpen(true);
        setFilterComInfo({
            title: "Add New Sender",
            cancelBtn: "CANCEL",
            applyBtn: "Add",
        });
    }
    return (
        <div>
            <div className="flex justify-between items-center pt-6">
                <div className="w-full mb-5">
                    <p className="font-semibold text-sm mb-3">Sender *</p>
                    <SenderDropDown
                        // defaultValue={shippingDetails?.sender?.first_name || ''}
                        closeDrop={closeDrop}
                        bodyCss="!w-full left-0 !px-3"
                        buttonCss="!w-full "
                        buttons={
                            <button type="button" className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                                {
                                    JSON.stringify(selectSender) !== '{}' || isCustomerHere.status ?
                                        <>
                                            <span className="text-gray-900">{selectSender?.first_name || isCustomerHere?.info?.first_name}</span>
                                            <icons.arrowDown />
                                        </>
                                        :
                                        <>
                                            <span>Enter sender</span>
                                            <icons.arrowDown />
                                        </>
                                }
                            </button>
                        }
                    >
                        <SenderInfos isCustomerHere={isCustomerHere} setIsCustomerHere={setIsCustomerHere} isEmail={false} isLastName={false} placeholder="Search Sender" setSelectData={setSelectSender} setCloseDrop={setCloseDrop} type="sender" addNewSender={addNewSender} />
                    </SenderDropDown>
                </div>
            </div>
            <br />
            <InputLabel
                defaultValue={record?.source}
                label="Source (optional)"
                placeholder="Source"
                name="source"
                register={register}
            />
            <br />
            <InputLabel
                defaultValue={record?.order_number}
                label="Order Number (optional)"
                placeholder="Order Number"
                name="order_number"
                register={register}
            />
            <br />
            <InputLabel
                defaultValue={record?.tracking_number}
                label="Tracking Number"
                placeholder="Tracking Number"
                name="tracking_number"
                register={register}
            />
            <br />
            <InputLabel
                defaultValue={record?.source}
                label="Source (optional)"
                placeholder="Source"
                name="source"
                register={register}
            />


        </div>
    );
};

export default EditRecord;