import React from 'react';
import { useForm } from "react-hook-form";
import { CountryCityStateZip } from '../Customers/AddNewCustomer';
import CustomButton from '../shared/Buttons/CustomButton';
import CountryPhone from '../shared/CountryPhone';
import InputLabel from '../shared/InputLabel/InputLabel';

const AddNewSender = ({ setRightSidebarOpen }) => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <InputLabel customClass='mt-3' errors={errors} register={register} label='First Name' placeholder='First Name' name='first_name' />
            {errors.first_name && <p className='text-[#FE0000] text-right'>This field is required</p>}
            <InputLabel customClass='mt-3' errors={errors} register={register} label='Last Name' placeholder='Last Name' name='last_name' />
            {errors.last_name && <p className='text-[#FE0000] text-right'>This field is required</p>}
            <InputLabel customClass='mt-3' errors={errors} register={register} label='Email' placeholder='Email' name='email' />
            {errors.email && <p className='text-[#FE0000] text-right'>This field is required</p>}
            
            <div className='mt-3'>
                <p className='font-semibold text-sm'>Phone  Number</p>
                <CountryPhone errors={errors} register={register}/>
            </div>
            <hr className='border-gray-100 mt-2' />

            <h1 className='font-semibold text-xl mb-4 mt-6'>Address</h1>
            <InputLabel errors={errors} register={register} label='Street' placeholder='Street' name='street' />
            <br />
          <CountryCityStateZip width='w-[48%]'customClass='gap-x-2' register={register} errors={errors}/>

            <div className="bg-white pt-3  absolute  w-full left-0 bottom-24  lg:bottom-5 px-10  flex gap-3">
                <CustomButton
                    type='submit'
                    btnClass="h-[56px]"
                    hadleClick={() => setRightSidebarOpen(false)}
                    block={false}
                    text='Cancel'
                />
                <CustomButton
                    type='submit'
                    btnClass="h-[56px]"
                    text='Add 222ss'
                />
            </div>
        </form >
    );
};

export default AddNewSender;




