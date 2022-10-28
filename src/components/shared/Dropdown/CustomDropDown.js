import React, { useEffect, useRef, useState } from 'react';
import icons from '../icons';

const CustomDropDown = ({ clearErrors = () => { }, errors = {}, setValue = () => { }, placeholder = '', defaultValue = '', register = () => { }, name = '', bodyCss = '', buttons = '', buttonCss = '', items = [] }) => {
    const [dropSort, setDropSort] = useState(false)
    const divRef = useRef(null);
    const buttonDiv = useRef(null);
    const [selectDrop, setSelectDrop] = useState({ value: '', text: '' });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropSort && divRef.current && !divRef.current.contains(event.target) && buttonDiv.current && !buttonDiv.current.contains(event.target)) {
                setDropSort(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [divRef, dropSort]);

    const drpSelectChange = (item) => {
        setSelectDrop({ value: item.value, text: item.text });
        setDropSort(false)
        setValue(name, item.value)
        clearErrors(name)
    }

    return (
        <div className=" relative">
            <div ref={buttonDiv} className={`flex justify-between items-center bg-white  border rounded-lg   cursor-pointer pr-2  ${errors[name] ? 'border-red-500' : ''}`} onClick={() => setDropSort(prev => !prev)}>
                <input {...register(name, { required: true })} value={selectDrop.text || defaultValue || ''} className={`w-fit rounded-lg cursor-pointer focus:border-none outline-none  gap-2 px-3 py-[14px]  ${buttonCss} ${selectDrop.value ? 'flex justify-between  items-center' : ''}`} name={name} type="text" placeholder={placeholder} autoComplete='off' />
                <icons.arrowDown />
            </div>
            {errors && errors[name] && <span className='text-red-500 text-xs pl-1'>This field is required</span>}

            <div ref={divRef} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110]  shadow-lg shadow-gray-200  rounded-lg   p-2 top-12 right-0 w-[310px] h-fit max-h-[137px] border bg-white ${bodyCss}`}>
                <div className='flex  gap-3 justify-between py-3 pr-2'>
                    <ul className="w-full">
                        {
                            items.map(item => (
                                <li onClick={() => drpSelectChange(item)} key={item.id} className='py-2 px-3 hover:text-red-500 hover:bg-gray-50 cursor-pointer w-full'> {item.text}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default CustomDropDown;


export const SenderDropDown = ({ name = '', errors, clearErrors, defaultValue, closeDrop = false, children, bodyCss = '', buttons = '', buttonCss = '', items = [] }) => {
    const [dropSort, setDropSort] = useState(false)
    const ref = useRef(null);
    const button = useRef(null);
    const [selectDrop, setSelectDrop] = useState({ value: '', text: '' });

    useEffect(() => {
        setSelectDrop({ value: defaultValue, text: defaultValue })
        const handleClickOutside = (event) => {
            if (dropSort && ref.current && !ref.current.contains(event.target) && button.current && !button.current.contains(event.target)) {
                setDropSort(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropSort]);

    useEffect(() => {
        if (dropSort) {
            setDropSort(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeDrop])

    return (
        <div className=" relative">
            <div ref={button} className={`w-fit bg-white border rounded-lg   cursor-pointer gap-2 px-3 py-[14px] ${errors && errors[name] ? 'border-red-500' : ''} ${buttonCss}`} onClick={() => setDropSort(prev => !prev)} >
                {selectDrop.value ? selectDrop.value : <span className=' text-gray-400'> {buttons}</span>}
            </div>
            <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110] shadow-lg  rounded-lg   p-2 top-16 right-0 w-[310px] h-[380px] lg:h-[324px]  bg-white ${bodyCss}`}>
                <div className='py-3 pr-2'>
                    {children}
                </div>
            </div>
        </div>
    );
};




export const CustomSelectWithSearch = ({ onClose, search, setSearch, children, bodyCss = '', buttons = '', buttonCss = '', items = [] }) => {
    const [dropSort, setDropSort] = useState(false)
    const ref = useRef(null);
    const button = useRef(null);
    const [selectDrop] = useState({ value: '', text: '' });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropSort && ref.current && !ref.current.contains(event.target) && button.current && !button.current.contains(event.target)) {
                setDropSort(false)
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [dropSort]);

    useEffect(() => {
        setDropSort(false)
    }, [onClose])
    return (
        <div className="relative">
            <div ref={button} className={`w-fit bg-white border rounded-lg   cursor-pointer gap-1   ${buttonCss}`} onClick={() => setDropSort(prev => !prev)} >
                {selectDrop.value ? selectDrop.value : <span className=' text-gray-400'> {buttons}</span>}
            </div>
            <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110]  shadow-lg shadow-gray-200  rounded-lg   p-2 top-10 left-0 right-0 !w-[300px] h-fit  max-h-[278px] bg-white ${bodyCss}`}>
                <div className='flex  flex-col  gap-3 justify-between py-3 pr-2'>
                    <SearchItem search={search} setSearch={setSearch} />
                    <ul className="w-full h-fit max-h-[200px] overflow-y-auto">
                        {children}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const SearchItem = ({ setSearch }) => {
    return (
        <div className="w-full bg-white border rounded-lg flex items-center gap-2 px-3">
            <icons.search className="text-gray-400 text-2xl lg:text-xl" />
            <input
                onChange={(e) => setSearch(e.target.value)}
                className="text-base lg:text-[13px] w-full outline-none text-gray-600 py-2"
                placeholder="Search anything"
                type="search"
                name=""
                id=""
            />
        </div>
    )
}
CustomSelectWithSearch.Item = ({ handleClick, children, customClass = '' }) => {
    return (
        <li onClick={handleClick} className={`flex  items-center gap-2   py-2 px-3 hover:text-red-500 hover:bg-gray-50 cursor-pointer w-full ${customClass}`} > {children}</li >
    )
}