import React from "react";
import { countries } from "../../DummyData/allCountryJson";
import CountryPhone from "../shared/CountryPhone";
import InputLabel from "../shared/InputLabel/InputLabel";

const AddNewCustomer = ({ register, errors, setRightSidebarOpen }) => {
 

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
            <div className="flex gap-2">
                <div className="w-1/2">
                    <p className="font-semibold text-sm">Country</p>
                    <select
                        {...register("country")}
                        className="border text-left rounded-md  px-3 h-[56px] w-full mt-2  flex items-center"
                        name="country"
                        id="country"
                    >
                        <option value="" hidden>
                            Choose Country
                        </option>
                        {countries.map((country, ind) => (
                            <option key={country.code} value={country.name}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/2">
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
                        {states.map((state) => (
                            <option key={state.id} value={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <br />

            <div className="flex gap-2">
                <div className="w-1/2">
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
                        {cities.map((city, ind) => (
                            <option key={city.id} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <InputLabel
                    errors={errors}
                    register={register}
                    customClass="w-1/2"
                    defaultValue=""
                    label="Postcode/Zip"
                    placeholder="Postcode/Zip"
                    name="postalcode_zip"
                    required={false}
                />
            </div>
            <br />
        </>
    );
};

export default AddNewCustomer;
