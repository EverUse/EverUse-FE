import { useQuery } from '@apollo/client';
import { GET_ALL_ITEMS } from '../api';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_ITEMS)

  let allItems

  if (!loading) {
    console.log('data:', data)
    allItems = data.products.map(item => {
      return <div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>{item.color}</p>
        <p>{item.price}</p>
      </div>
    })
  }

  return (
    <div className="App">
      {!loading && 
        <>
          <h1>Remove this line once writing code.</h1>
          {!error && allItems}
        </>
      }
    </div>
  );
}

export default App;
