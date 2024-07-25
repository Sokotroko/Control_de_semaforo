import React, { useEffect, useState } from 'react';
import { getOverview } from './services/api';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOverview();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {data ? <p>{data.message}</p> : <p>Loading...</p>}
            </header>
        </div>
    );
}

export default App;
