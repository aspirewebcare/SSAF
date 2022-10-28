import React, {  useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { countries } from '../../DummyData/allCountryJson';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'


const CountryPhone = () => {

    return (
        <>
            <div className='flex items-center gap-4 border rounded-md  p-[15px] text-gray-600 w-full mt-2 mb-4 px-3 relative'>
                <CountrySelect items={countries.map(item => { return { ...item, icon: <img className="w-5" src={'https://img.mobiscroll.com/demos/flags/' + item.value + '.png'} alt="Flag" /> } })} />

                <input defaultValue='Phone Numbe' className='outline-none text-gray-600 pr-3 pl-1 py-[10px] w-full absolute  left-12' placeholder='Phone Numbe' type='number' name='phone' />
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
                    <Listbox.Button className={`w-fit text-left rounded-md text-gray-600 flex items-center relative ${customClass}`}>
                        <span className="block truncate w-5"> {selectedPerson.icon}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                            <RiArrowDownSLine
                                className="text-gray-400 absolute -right-4 top-0 z-10"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 w-32"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 pl-0">
                            {items.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none  ${active ? 'bg-orange-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`flex gap-1 items-center truncate  py-2 pl-4 pr-4 ${selected ? 'font-medium bg-[#FF5701] text-white' : 'font-normal'
                                                    }`}
                                            >
                                                {person.icon}  {person.name}
                                            </span>
                                        </>
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