import React, { useState, useEffect } from 'react';

const WithData = (WrappedComponent) => {
    const WithData = (props) => {
        const [data, setData] = useState();

        const getData = async () => {
            const url = 'https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1';
            
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        // Fetch data on component mount and whenever the props change.
        useEffect(() => {
            getData()
        }, []);
        return <WrappedComponent data={data} {...props} />;
    };

    return WithData;
};
export default WithData;