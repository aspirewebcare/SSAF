import React, { useState } from 'react';

const Tooltrip = ({ children, tooltip = '' }) => {
    const [show, setShow] = useState(false)
    return (
        <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='relative'>
            <span className={`absolute text-sm bottom-7 right-0 duration-150 !min-w-[10rem] text-center bg-gray-700  text-white py-2 px-2 rounded-lg ${show ? 'opacity-100 visible -translate-y-2' : 'opacity-0 invisible '}`}>{tooltip}</span>
            <div className='cursor-pointer'>
                {children}
            </div>
        </div>
    );
};

export default Tooltrip;