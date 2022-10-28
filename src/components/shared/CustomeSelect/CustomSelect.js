const CustomSelect = ({
    register = () => { },
    label = "",
    selectItmes = [],
    customClass = "",
    name = "",
    placeholder = "",
    value = '',
    required=false,
}) => {
    const selectChange = (e) => {

    };
    return (
        <div className="w-full">
            <div className={customClass}>
                <p className="font-semibold text-sm">{label}</p>
                {
                    selectItmes?.length ?
                        <select
                            {...register(name, { required: required })}

                            defaultValue={placeholder}
                            placeholder="egoeogn"
                            className="border w-full rounded-lg mt-3  py-3 px-3"
                            onChange={(e) => selectChange(e)}
                            name={name}
                            id={name}
                        >
                            <option selected value='' disabled hidden>
                                {placeholder}
                            </option>
                            {selectItmes.map(item => (
                                <option key={item.id} value={item.value}>
                                    {item.data}
                                </option>
                            ))}
                        </select>
                        :
                        <input
                            {...register(name, { required: required })}
                            value={value}
                            placeholder={placeholder}
                            type='text'
                            className="border w-full rounded-lg mt-3  py-3 px-3 placeholder:!text-gray-400 outline-none caret-transparent cursor-default"
                            onChange={(e) => selectChange(e)}
                            name={name}
                            id={name}
                            readOnly
                        />
                }



            </div>
        </div>
    );
};
export default CustomSelect;