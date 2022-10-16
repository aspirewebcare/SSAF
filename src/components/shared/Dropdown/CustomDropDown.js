import React, { useEffect, useRef, useState } from 'react';
import icons from '../icons';

const CustomDropDown = ({defaultValue='', register, children, bodyCss = '', buttons = '', buttonCss = '', items = [] }) => {
    const [dropSort, setDropSort] = useState(false)
    const ref = useRef(null);
    const button = useRef(null);
    const [selectDrop, setSelectDrop] = useState({ value: '', text: '' });

    useEffect(() => {
        setSelectDrop({value: defaultValue, text: defaultValue})
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

    return (
        <div className=" relative">
            <div   value={selectDrop.value ? selectDrop.value : null}  className={`w-fit bg-white  border rounded-lg   cursor-pointer gap-2 px-3 py-[14px]  ${buttonCss} ${selectDrop.value ? 'flex justify-between  items-center' : ''}`} onClick={() => setDropSort(prev => !prev)} >
                {selectDrop.value ? <> <span>{selectDrop.value}</span><icons.arrowDown /> </> : <span className=' text-gray-400'> {buttons}</span>}

            </div>
            <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110]  shadow-lg shadow-gray-200  rounded-lg   p-2 top-12 right-0 w-[310px] h-[137px] bg-white ${bodyCss}`}>
                <div className='flex  gap-3 justify-between py-3 pr-2'>
                    <ul className="w-full">
                        {
                            items.map(item => (
                                <li onClick={() => { setSelectDrop(item); setDropSort(false) }} key={item.id} className='py-2 px-3 hover:text-red-500 hover:bg-gray-50 cursor-pointer w-full'> {item.text}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomDropDown;


export const SenderDropDown = ({defaultValue, closeDrop = false, children, bodyCss = '', buttons = '', buttonCss = '', items = [] }) => {
    const [dropSort, setDropSort] = useState(false)
    const ref = useRef(null);
    const button = useRef(null);
    const [selectDrop,setSelectDrop] = useState({ value: '', text: '' });

    useEffect(() => {
        setSelectDrop({value: defaultValue, text: defaultValue})
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
        if (dropSort) {
            setDropSort(false)
        }
    }, [closeDrop])

    return (
        <div className=" relative">
            <div ref={button} className={`w-fit bg-white border rounded-lg   cursor-pointer gap-2 px-3 py-[14px]  ${buttonCss}`} onClick={() => setDropSort(prev => !prev)} >
                {selectDrop.value ? selectDrop.value : <span className=' text-gray-400'> {buttons}</span>}
            </div>
            <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110] shadow-lg  rounded-lg   p-2 top-16 right-0 w-[310px] h-[324px]  bg-white ${bodyCss}`}>
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
    const [selectDrop, setSelectDrop] = useState({ value: '', text: '' });

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
            <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110]  shadow-lg shadow-gray-200  rounded-lg   p-2 top-10 left-0 right-0 !w-[300px]  h-[278px] bg-white ${bodyCss}`}>
                <div className='flex  flex-col  gap-3 justify-between py-3 pr-2'>
                    <SearchItem search={search} setSearch={setSearch} />
                    <ul className="w-full h-[200px] overflow-y-auto">
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