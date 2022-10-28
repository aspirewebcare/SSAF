import React, { useEffect, useRef, useState } from "react";
import { countries } from "../../DummyData/allCountryJson";
import { CountryApiReq } from "../../hooks/ApiRequest";
import CountryPhone from "../shared/CountryPhone";
import InputLabel from "../shared/InputLabel/InputLabel";
import icons from "../shared/icons";
import Loader from "../shared/Loader";
import CustomDropDown from "../shared/Dropdown/CustomDropDown";
import { CountryCityStateZip } from "../Customers/AddNewCustomer";

const AddNewCustomer = ({ setValue, register, errors, }) => {

    return (
        <>
            <InputLabel
                customClass=""
                errors={errors}
                register={register}
                defaultValue=""
                label="First Name"
                placeholder="First Name"
                name="first_name"
                required={false}
            />
            <InputLabel
                customClass="mt-3  "
                errors={errors}
                register={register}
                defaultValue=""
                label="Last Name"
                placeholder="Last Name"
                name="last_name"
                required={false}
            />

            <div className="mb-4">
                <InputLabel
                    customClass="mt-3  "
                    errors={errors}
                    register={register}
                    defaultValue=""
                    label="Email"
                    placeholder="Email"
                    name="email"
                />
                {errors.email && (
                    <p className="text-[#FE0000] text-right text-sm">Enter your email</p>
                )}
            </div>

            <div>
                <p className="font-semibold text-sm">Phone Number</p>
                <CountryPhone errors={errors} register={register} />
            </div>
            <hr className="border-gray-100 mt-2" />
            <h1 className="font-semibold text-xl mb-4 mt-6">Address</h1>
            <InputLabel
                errors={errors}
                register={register}
                defaultValue=""
                label="Street"
                placeholder="Street"
                name="street"
                required={false}
            />
            <br />
            <CountryCityStateZip setValue={setValue} width="w-full lg:!w-[49%]" customClass="justify-between" errors={errors} register={register} />
            <br />
        </>
    );
};

export default AddNewCustomer;

