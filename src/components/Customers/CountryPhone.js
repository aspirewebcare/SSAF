import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { countries } from '../../DummyData/allCountryJson';


const CountryPhone = ({ errors, register }) => {

    return (
        <>
            <div style={errors.phone ? { borderColor: 'red' } : {}} className='flex items-center gap-4 border rounded-md  py-[14px] text-gray-600 w-full mt-2 mb-4 px-3 relative'>
                <CountrySelect items={countries.map(item => { return { ...item, icon: <img className="w-7" src={'https://img.mobiscroll.com/demos/flags/' + item.value + '.png'} alt="Flag" /> } })} />

                <input {...register('phone', { required: true })} defaultValue='Phone Numbe' className='outline-none text-gray-600 pr-3 pl-1 py-[15px] w-[85%] absolute  left-16' placeholder='Phone Numbe' type='number' name='phone' />
            </div>
        </>
    )
}

export default CountryPhone;





const CountrySelect = ({ items, customClass = '' }) => {
    const [selectedPerson, setSelectedPerson] = useState(items[181])

    const handleChange = (value) => {
        setSelectedPerson(value)
    }


    return (
        <div className={`w-full`}>
            <Listbox value={selectedPerson} onChange={handleChange}>
                <div className={`relative w-full`}>
                    <Listbox.Button className={`w-fit text-left rounded-md text-gray-600 flex items-center  relative ${customClass}`}>
                        <div className='flex w-12 gap-1'>
                            <div className='w-7'>
                                <img src={selectedPerson.image} alt="country_image" />
                            </div>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                <RiArrowDownSLine
                                    className="text-gray-400 text-xl"
                                    aria-hidden="true"
                                />
                            </span>
                        </div>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 w-32"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 pl-0">
                            {items.map((item, itemIdx) => (
                                <Listbox.Option
                                    key={itemIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none  ${active ? 'bg-orange-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <span>
                                            <span
                                                className={`flex gap-1 items-center truncate  py-2 pl-4 pr-4 ${selected ? 'font-medium bg-[#FF5701] text-white' : 'font-normal'
                                                    }`}
                                            >
                                                <div className='flex items-center gap-1'>
                                                    <div className='w-5'>
                                                        <img className='w-full' src={item.image} alt="country_image" />
                                                    </div>
                                                    {item.name}
                                                </div>


                                            </span>
                                            <span></span>
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}