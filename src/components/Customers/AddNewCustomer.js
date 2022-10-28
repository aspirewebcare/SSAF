import React, { useEffect, useRef, useState } from "react";
import { countries } from "../../DummyData/allCountryJson";
import { CountryApiReq } from "../../hooks/ApiRequest";
import CountryPhone from "../shared/CountryPhone";
import InputLabel from "../shared/InputLabel/InputLabel";
import icons from "../shared/icons";
import Loader from "../shared/Loader";
import CustomDropDown from "../shared/Dropdown/CustomDropDown";

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


export const CountryCityStateZip = ({ setValue = () => { }, address = {}, customClass = '', selectCss = '', errors, register, width = 'w-1/2', isState = true, isCities = true, isPosttal = true, isCountry = true }) => {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [selectCountry, setSelectCountry] = useState({ code: '', name: '' })
    const [selectState, setSelectState] = useState({ code: '', name: '' })
    const [selectCity, setSelectCity] = useState({ code: '', name: '' })
    const [loadDt, setLoadDt] = useState(false);




    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setCities([])
            setStates([])
            if (selectCountry.code) {
                setLoadDt(true)
                CountryApiReq(selectCountry.code, 'states')
                    .then(res => {
                        Array.isArray(res) && res.length && setStates(res)
                    })
                    .catch(error => console.log('error', error))
                    .finally(() => {
                        setLoadDt(false)
                    })
            }
        }, 0)
        return () => clearTimeout(delayDebounceFn)
    }, [selectCountry.code])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setCities([])
            if (selectCountry.code && selectState.code) {
                setLoadDt(true)
                CountryApiReq(selectCountry.code, 'cities', selectState.code)
                    .then(res => {
                        Array.isArray(res) && res.length && setCities(res)
                    })
                    .catch(error => console.log('error', error))
                    .finally(() => {
                        setLoadDt(false)
                    })
            }
        }, 0)
        return () => clearTimeout(delayDebounceFn)
    }, [selectCountry.code, selectState.code])


    const formReset = (state, city) => {
        state && setSelectState({ code: '', name: '' })
        city && setSelectCity({ code: '', name: '' })
    }
    return (
        <div className="mb-6">
            <div className={`flex flex-wrap gap-y-5  gap-x-2 ${customClass} `}>
                {
                    isCountry &&
                    <div className={`${width} ${selectCss}`}>
                        <p className="font-semibold text-sm">Country</p>
                        <SimpleDrop formReset={formReset} address={address} setValue={setValue} register={register} val={selectCountry} setSelect={setSelectCountry} loadDt={loadDt} name='country' placeholder="Choose Country" items={countries.length ? countries.map(itm => { return { id: itm.code, value: itm.code, name: itm.name } }) : []} />
                    </div>
                }
                {
                    isState &&
                    <div className={`${width} ${selectCss}`}>
                        <p className="font-semibold text-sm">State</p>
                        <SimpleDrop formReset={formReset} address={address} setValue={setValue} register={register} val={selectState} setSelect={setSelectState} loadDt={loadDt} name='state_or_region' placeholder="State" items={states.length ? states.map(itm => { return { id: itm.iso2, value: itm.iso2, name: itm.name } }) : []} />
                    </div>
                }
                {
                    isCities &&
                    <div className={`${width}  ${selectCss}`}>
                        <p className="font-semibold text-sm">City</p>
                        <SimpleDrop formReset={formReset} address={address} setValue={setValue} register={register} val={selectCity} setSelect={setSelectCity} up={true} loadDt={loadDt} name='city' placeholder="City" items={cities.length ? cities.map(itm => { return { id: itm.id, value: itm.name, name: itm.name } }) : []} />
                    </div>
                }
                {
                    isPosttal &&
                    <InputLabel
                        errors={errors}
                        register={register}
                        customClass={width + selectCss}
                        defaultValue={address?.zip_or_postcode}
                        label="Postcode/Zip"
                        placeholder="Postcode/Zip"
                        name="zip_or_postcode"
                        required={false}
                    />
                }
            </div>
        </div >
    )
}

const SimpleDrop = ({ formReset, address = {}, setValue, val = {}, setSelect, up = false, loadDt, name = '', placeholder = '', items = [], register = () => { } }) => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState([])
    const inputRef = useRef(null);
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (show && inputRef.current && !inputRef.current.contains(event.target) && divRef.current && !divRef.current.contains(event.target)) {
                setSearch('');
                setShow(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef, divRef, show]);

    useEffect(() => {
        setValue(name, val.name || '')
    }, [val.name])

    useEffect(() => {
        let filterDat = items.filter(itm => {
            if (search === '') {
                return itm
            } else {
                return itm?.name?.toLowerCase().includes(search?.toLowerCase())
            }
        })

        setFilterData([...filterDat])
    }, [search, items])


    useEffect(() => {
        if (JSON.stringify(address) !== '{}') {
            setSelect({ code: address[name], name: address[name] })
        }
    }, [])



    const changeData = (itm) => {
        setSearch('');
        setSelect({ name: itm.name, code: itm.value });
        setShow(false);
        if(name === 'country') formReset(true,true)
        if(name === 'state_or_region') formReset(false,true)
    }

    return (
        <div className="mt-2  relative">
            <div className='flex justify-between items-center bg-white  border rounded-lg   cursor-pointer pr-2' onClick={() => setShow(prev => !prev)}>
                <input value={val.name || ''} className={`caret-transparent w-fit rounded-lg cursor-pointer focus:border-none outline-none gap-2 px-3 py-[14px] `} name={name} {...register(name)} type="text" placeholder={placeholder} autoComplete="new-password" onChange={() => { }} readOnly />
                <icons.arrowDown />
            </div>

            <div ref={divRef} className={`absolute border  ${up ? 'bottom-[40px] border-t-0' : '-bottom-[44px] border-b-0'}  left-0  rounded-lg z-50 bg-white  pt-1 w-full px-3 ${show ? 'block' : 'hidden'}`} >
                <input value={search} onChange={(e) => setSearch(e.target.value)} className=" outline-none mx-auto w-full border rounded-md mb-1 py-1 px-3" type="search" name="" placeholder="search.." id="" autoComplete="new-password" />
            </div>

            <ul ref={inputRef} className={`text-xs text-center  bg-white absolute left-0 w-full  py-2 ${up ? 'bottom-[56px]' : 'top-[56px]'}  border rounded-lg shadow-md max-h-[175px] overflow-y-auto z-20  ${show ? 'block' : 'hidden'}`}>

                {
                    filterData.length ?
                        !up &&
                        <li className=" outline-none mx-auto w-full   rounded-md mb-3 py-2 px-3 h-[25px]" ></li>
                        : null
                }
                {
                    loadDt ?
                        <Loader width='15px' />
                        :
                        filterData.length ?
                            filterData.map((itm, ind) => (
                                <li onClick={() => changeData(itm)} className={`py-1 hover:bg-gray-100 cursor-pointer text-sm px-3 text-left ${val === itm.name ? 'bg-gray-100' : ''}`} key={ind}>{itm.name}</li>
                            ))
                            :
                            <p className={`text-center pt-3  pb-5 ${up ? '' : 'mt-[2rem]'}`}>No data found!</p>
                }
                {
                    filterData.length ?
                        up &&
                        <li className=" outline-none mx-auto w-full   rounded-md  py-2 px-3 h-[25px]" ></li>
                        : null
                }
            </ul>
        </div>
    )
}