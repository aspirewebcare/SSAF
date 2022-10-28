import React from 'react';
import Loader from './Loader';
import ScrollToFetch from 'react-scroll-to-fetch'

const LoadingForFetch = ({ totalLength = 0, maxDataLoad = 0, setFetchAgain = () => { }, fetchAgain = true, children, fetchStatus = 'no_fetch' }) => {

    return (
        <ScrollToFetch
            fetch={() => { if (!fetchAgain) setFetchAgain(true) }}
            finished={maxDataLoad === totalLength}
            initialLoad={false}
            loader={<div className="mb-8 flex items-center justify-center">{fetchAgain ? <><Loader /> Loading more...</> : ''} </div>}
            successMessage={<span></span>}
        >
            {
                fetchStatus === 'no_fetch' ?
                    <div className='pt-16'>
                        <Loader />
                    </div>
                    :
                    children
            }
        </ScrollToFetch>
    );
};

export default LoadingForFetch;

export const SimpleLoading = ({ children, fetchStatus = 'no_fetch' }) => {
    return (

        fetchStatus === 'no_fetch' ?
            <div className='pt-16'>
                <Loader />
            </div>
            :
            children

    )
} 