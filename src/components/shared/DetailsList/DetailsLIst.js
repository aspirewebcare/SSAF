const DetailsList = ({ approval = '', title = '', infoArr = [], customClass = 'justify-between' }) => {
    return (
        <div className=' w-full p-5  rounded-lg bg-white shadow-sm cursor-pointer mb-10'>
            {
                title &&
                <h1 className='uppercase font-bold text-[#191C52] flex flex-col sm:flex-row items-start sm:items-center gap-3 '>{title} {approval && <Approval text={approval} />}</h1>
            }
            <div className={`py-7 flex flex-col lg:flex-row items-start  lg:items-center gap-3 lg:gap-8 ${customClass}`}>
                {
                    infoArr.map(info => (
                        <div key={info.id} className='w-fit'>
                            <p className='hidden lg:block uppercase text-gray-500 mb-1 text-sm'>{info.label}</p>
                            <div className='font-medium capitalize w-fit whitespace-nowrap'>{info.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DetailsList;

const Approval = ({ text }) => {
    return (
        <span className="pt-1 pb-[2px]  px-3 bg-[#FF5701] text-[10px] rounded-full text-white">
            Approval {text}
        </span>
    )
}