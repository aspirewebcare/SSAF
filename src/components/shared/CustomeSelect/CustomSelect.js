const CustomSelect = ({
    
    label = "",
    selectItmes = [],
    customClass = "",
    name = "",
    placeholder = "",
}) => {
    const selectChange = (e) => {
     
    };
    return (
        <div className="w-full">
            <div className={customClass}>
                <p className="font-semibold text-sm">{label}</p>
                <select
                    defaultValue={placeholder}
                    placeholder="egoeogn"
                    className="border w-full rounded-lg mt-3  py-3 px-3"
                    onChange={(e) => selectChange(e)}
                    name={name}
                    id={name}
                >
                    <option selected  value='' disabled hidden>
                        {placeholder}
                    </option>
                    {selectItmes.map(item => (
                        <option key={item.id} value={item.value}>
                            {item.data}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
export default CustomSelect;