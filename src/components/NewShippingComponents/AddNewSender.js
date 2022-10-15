import React from 'react';
import { useForm } from "react-hook-form";
import { countries } from '../../DummyData/allCountryJson';
import CustomButton from '../shared/Buttons/CustomButton';
import CountryPhone from '../shared/CountryPhone';
import InputLabel from '../shared/InputLabel/InputLabel';

const AddNewSender = ({ setRightSidebarOpen }) => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };

    const states = [
        { id: 1, name: 'State', unavailable: false },
        { id: 2, name: 'State 2', unavailable: false },
        { id: 3, name: 'State 3', unavailable: false },
        { id: 4, name: 'State 4', unavailable: true },
        { id: 5, name: 'State 5', unavailable: false },
    ]
    const cities = [
        { id: 1, name: 'City', unavailable: false },
        { id: 2, name: 'City 2', unavailable: false },
        { id: 3, name: 'City 3', unavailable: false },
        { id: 4, name: 'City 4', unavailable: true },
        { id: 5, name: 'City 5', unavailable: false },
    ]



    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <InputLabel customClass='mt-3' errors={errors} register={register} label='First Name' placeholder='First Name' name='first_name' />
            {errors.first_name && <p className='text-[#FE0000] text-right'>This field is required</p>}
            <InputLabel customClass='mt-3' errors={errors} register={register} label='Last Name' placeholder='Last Name' name='last_name' />
            {errors.last_name && <p className='text-[#FE0000] text-right'>This field is required</p>}
            <InputLabel customClass='mt-3' errors={errors} register={register} label='Email' optional={true} placeholder='Email' name='email' />
            {errors.email && <p className='text-[#FE0000] text-right'>This field is required</p>}
            
            <div className='mt-3'>
                <p className='font-semibold text-sm'>Phone  Number</p>
                <CountryPhone errors={errors} register={register}/>
            </div>
            <hr className='border-gray-100 mt-2' />

            <h1 className='font-semibold text-xl mb-4 mt-6'>Address</h1>
            <InputLabel errors={errors} register={register} label='Street' placeholder='Street' name='street' />
            <br />
            <div className='flex gap-2'>
                <div className='w-1/2'>
                    <p className='font-semibold text-sm'>Country</p>
                    <select  style={errors.country ? { borderColor: 'red' } : {}}  {...register("country", { required: true })} className='border text-left rounded-md px-3 py-[15px] w-full mt-2 mb-4 flex items-center' name="country" id="country">
                        <option value="">Choose Country</option>
                        {
                            countries.map((country, ind) => (
                                <option key={country.code} value={country.name}>{country.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='w-1/2'>
                    <p className='font-semibold text-sm'>State</p>
                    <select style={errors.state ? { borderColor: 'red' } : {}}  {...register("state", { required: true })} className='border text-left rounded-md px-3 py-[15px] w-full mt-2 mb-4 flex items-center' name="state" id="state">
                    <option value="">State</option>
                        {
                            states.map((state) => (
                                <option key={state.id} value={state.name}>{state.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='w-1/2'>
                    <p className='font-semibold text-sm'>City</p>
                    <select style={errors.city ? { borderColor: 'red' } : {}}   {...register("city", { required: true })} className='border text-left rounded-md px-3 py-[15px] w-full mt-2 mb-4 flex items-center' name="city" id="city">
                    <option value="">City</option>
                        {
                            cities.map((city, ind) => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))
                        }
                    </select>
                </div>

                <InputLabel errors={errors} register={register} customClass='w-1/2' label='Postcode/Zip' placeholder='Postcode/Zip' name='postalcode_zip' />
            </div>
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
                    text='Add'
                />
            </div>
        </form >
    );
};

export default AddNewSender;




