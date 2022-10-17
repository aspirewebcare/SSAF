import React, { useEffect, useState } from "react";
import { countries } from "../../DummyData/allCountryJson";
import { ApiRequest } from "../../hooks/ApiRequest";
import CountryPhone from "../shared/CountryPhone";
import InputLabel from "../shared/InputLabel/InputLabel";

const AddNewCustomer = ({ register, errors, setRightSidebarOpen }) => {

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
                    <p className="text-[#FE0000] text-right text-sm">This field is required</p>
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
            <CountryCityStateZip width="w-full lg:!w-[49%]" customClass=" lg:gap-2 justify-between" errors={errors} register={register} />
            <br />
        </>
    );
};

export default AddNewCustomer;


export const CountryCityStateZip = ({ customClass = '', selectCss = '', errors, register, width = 'w-1/2', isState = true, isCities = true, isPosttal = true, isCountry = true }) => {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [selectCountry, setSelectCountry] = useState('')

    useEffect(() => {
        if (selectCountry) {
            ApiRequest(selectCountry, 'states')
                .then(res => {
                    Array.isArray(res) && res.length && setStates(res)
                })
                .catch(error => console.log('error', error));

            ApiRequest(selectCountry, 'cities')
                .then(res => {
                    Array.isArray(res) && res.length && setCities(res)
                })
                .catch(error => console.log('error', error));
        }
    }, [selectCountry])
    return (
        <div>
            <div className={`flex flex-wrap gap-y-5 ${customClass} `}>
                {
                    isCountry &&
                    <div className={`${width} ${selectCss}`}>
                        <p className="font-semibold text-sm">Country</p>
                        <select
                            {...register("country")}
                            onChange={(e) => setSelectCountry(e.target.value)}
                            className="border text-left rounded-md  px-3 h-[56px] w-full mt-2  flex items-center"
                            name="country"
                            id="country"
                        >
                            <option value="" hidden>
                                Choose Country
                            </option>
                            {countries.map((country, ind) => (
                                <option key={ind} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }

                {
                    isState &&
                    <div className={`${width} ${selectCss}`}>
                        <p className="font-semibold text-sm">State</p>
                        <select
                            {...register("state")}
                            className="border text-left rounded-md  px-3 h-[56px] w-full mt-2 flex items-center"
                            name="state"
                            id="state"
                        >
                            <option value="" hidden>
                                State
                            </option>
                            {states.length && states.map((state, ind) => (
                                <option key={ind} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }

                {
                    isCities &&
                    <div className={`${width}  ${selectCss}`}>
                        <p className="font-semibold text-sm">City</p>
                        <select
                            {...register("city")}
                            className="border text-left rounded-md  px-3 h-[56px] w-full mt-2 flex items-center"
                            name="city"
                            id="city"
                        >
                            <option value="" hidden>
                                City
                            </option>
                            {cities.length && cities.map((city, ind) => (
                                <option key={ind} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                {
                    isPosttal &&
                    <InputLabel
                        errors={errors}
                        register={register}
                        customClass={width + selectCss}
                        defaultValue=""
                        label="Postcode/Zip"
                        placeholder="Postcode/Zip"
                        name="postalcode_zip"
                        required={false}
                    />
                }
            </div>
        </div>
    )
}