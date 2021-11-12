import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const URL = 'https://rickandmortyapi.com/api/character/';

  const getData = useCallback(
    async () => {
      setLoading(true)
      const result = await axios.get(URL)
      setData(result.data.results);
      setLoading(false)
    }, []
  );

  useEffect(() => {
    getData();
  }, [getData])

  const _renderData = useCallback(
    () => (
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {data.map(item => (
          <div key={item.id} style={{ padding: 20 }}>
            <img src={item.image} alt={item.name} />
            <p className="content">Name: {item.name}</p>
            <p className="content">Gender: {item.gender}</p>
            <p className="content">Status: {item.status}</p>
          </div>
        ))}
      </div>
    ), [data]
  )

  const _renderEmpty = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
      <div className="spinner-border" />
    </div>
  );

  const listData = useMemo(() => loading === false && data.length > 0 ? _renderData() : _renderEmpty(), [_renderData, loading, data])

  return (
    <div className="container">
      {listData}
    </div>
  );
}

export default App;
