import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

const CustomSelect = ({ changeFunc, items, label, optional = false, customClass = '' }) => {
    const [selectedPerson, setSelectedPerson] = useState(items[0])
   
    const handleChange = (value) => {
        changeFunc(value)
        setSelectedPerson(value)
      
    }
    return (
        <div className='w-full'>
            <p className='font-semibold text-sm'>{label} <span className='text-gray-400 font-normal'>{optional ? `(Optional)` : ''}</span></p>
            <Listbox value={selectedPerson} onChange={handleChange}>
                <div className={`relative mt-1 w-full`}>
                    <Listbox.Button className={`border text-left rounded-mdpx-3 py-[15px] w-full mt-2 mb-4 flex items-center ${customClass}`}>
                        <span className="block truncate">{selectedPerson.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <RiArrowDownSLine
                                className="h-6 w-6 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute -mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 pl-0">
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
                                                className={`block truncate  py-2 pl-4 pr-4 ${selected ? 'font-medium bg-[#FF5701] text-white' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
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


export default CustomSelect;