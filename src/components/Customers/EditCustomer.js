import React from "react";
import CountryPhone from "../shared/CountryPhone";
import InputLabel from "../shared/InputLabel/InputLabel";
import { CountryCityStateZip } from "./AddNewCustomer";

export const EditCustomer = ({ setValue, customer = {}, register, errors, }) => {
    return (
        <>
            <InputLabel
                customClass=""
                errors={errors}
                register={register}
                defaultValue={customer?.first_name}
                label="First Name"
                placeholder="First Name"
                name="first_name"
                required={false}
            />
            <InputLabel
                customClass="mt-3  "
                errors={errors}
                register={register}
                defaultValue={customer?.last_name}
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
                    defaultValue={customer?.email}
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
                <CountryPhone defaultValue={customer?.phone_number} errors={errors} register={register} />
            </div>
            <hr className="border-gray-100 mt-2" />
            <h1 className="font-semibold text-xl mb-4 mt-6">Address</h1>
            <InputLabel
                errors={errors}
                register={register}
                defaultValue={customer?.address?.street}
                label="Street"
                placeholder="Street"
                name="street"
                required={false}

            />
            <br />
            <CountryCityStateZip setValue={setValue} address={customer?.address} width="w-full lg:!w-[49%]" customClass="justify-between" errors={errors} register={register} />
            <br />
        </>
    );
};

export default EditCustomer;



export const EditConsignee = ({ setValue, consignee = {}, register, errors }) => {

    return (
        <>
            <InputLabel
                customClass=""
                errors={errors}
                register={register}
                defaultValue={consignee?.first_name}
                defaultKey={consignee?.first_name}
                label="First Name"
                placeholder="First Name"
                name="first_name"
                required={false}
            />
            <InputLabel
                customClass="mt-3  "
                errors={errors}
                register={register}
                defaultValue={consignee?.last_name}
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
                    defaultValue={consignee?.email}
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
                <CountryPhone defaultValue={consignee?.phone_number} errors={errors} register={register} />
            </div>
            <hr className="border-gray-100 mt-2" />
            <h1 className="font-semibold text-xl mb-4 mt-6">Address</h1>
            <InputLabel
                errors={errors}
                register={register}
                defaultValue={consignee?.address?.street}
                label="Street"
                placeholder="Street"
                name="street"
                required={false}

            />
            <br />
            <CountryCityStateZip setValue={setValue} address={consignee?.address} width="w-full lg:!w-[49%]" customClass="justify-between" errors={errors} register={register} />
            <br />
        </>
    );
};


