import React, { useEffect, useState } from 'react';
import usflag from '../../assets/images/usa.svg';

const ConsigneeDetails = ({ item, setRightSidebarOpen }) => {
    const [forChromeMobile, setForChromeMobile] = useState(false);
    useEffect(() => {
        var ua = navigator.userAgent;
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
                ua
            )
        ) {
            if (
                /Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor)
            ) {
                setForChromeMobile(true);
            }
        }
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center pt-6">
                <div className="w-1/2">
                    <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                        First  Name
                    </p>
                    <p className="font-medium capitalize w-fit whitespace-nowrap">
                        {item.first_name}
                    </p>
                </div>
                <div className="w-1/2">
                    <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                        Last Name
                    </p>
                    <p className="font-medium capitalize w-fit whitespace-nowrap">
                        {item.last_name}
                    </p>
                </div>
            </div>
            <br />
            <div className="w-full">
                <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                    Email
                </p>
                <p className="font-medium capitalize w-fit whitespace-nowrap">
                    {item.email}
                </p>
            </div>
            <br />
            <div className="w-full">
                <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                    Phone Number
                </p>
                <div className="font-medium capitalize w-fit whitespace-nowrap">
                    <div className='flex  items-center  gap-1'>
                        <img className='w-7' src={usflag} alt="flag" /> {item.phone}
                    </div>
                </div>
            </div>
            <br />
            <hr />
            <br />
            <h1 className='text-2xl font-semibold'>Address</h1>
            <br />
            <div className="w-full">
                <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                    Street
                </p>
                <p className="font-medium capitalize w-fit whitespace-nowrap">
                    {item?.address?.street}
                </p>
            </div>
            <br />
            <div className="flex justify-between items-center">
                <div className="w-1/2">
                    <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                        City
                    </p>
                    <p className="font-medium capitalize w-fit whitespace-nowrap">
                        {item?.address?.city}
                    </p>
                </div>
                <div className="w-1/2">
                    <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                        State
                    </p>
                    <p className="font-medium capitalize w-fit whitespace-nowrap">
                        {item?.address?.state}
                    </p>
                </div>
            </div>
            <br />
            <div className="flex justify-between items-center ">
                <div className="w-1/2">
                    <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                        Postcode/Zip
                    </p>
                    <p className="font-medium capitalize w-fit whitespace-nowrap">
                        {item?.address?.postalcode_zip}
                    </p>
                </div>
                <div className="w-1/2">
                    <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
                        Country
                    </p>
                    <p className="font-medium capitalize w-fit whitespace-nowrap">
                        {item?.address?.country}
                    </p>
                </div>
            </div>
       
        </div>
    );
};

export default ConsigneeDetails;