// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import SummaryApi from '../common'
// import VerticalCard from '../components/VerticalCard'

// const SearchProduct = () => {
//     const query = useLocation()
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)

//     console.log("query",query.search)

//     const fetchProduct = async()=>{
//         setLoading(true)
//         const response = await fetch(SummaryApi.searchProduct.url+query.search)
//         const dataResponse = await response.json()
//         setLoading(false)

//         setData(dataResponse.data)
//     }

//     useEffect(()=>{
//         fetchProduct()
//     },[query])

//   return (
//     <div className='container mx-auto p-4'>
//       {
//         loading && (
//           <p className='text-lg text-center'>Loading ...</p>
//         )
//       }

//       <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

//       {
//         data.length === 0 && !loading && (
//            <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
//         )
//       }


//       {
//         data.length !==0 && !loading && (
//           <VerticalCard loading={ loading} data={data}/>
//         )
//       }

//     </div>
//   )
// }

// export default SearchProduct



import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataResponse = await response.json()

      if (response.ok && dataResponse.success) {
        setData(dataResponse.data)
      } else {
        setData([])
        console.error(dataResponse.message)
      }
    } catch (error) {
      console.error("Error fetching search results: ", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  return (
    <div className='container mx-auto p-4'>
      {loading && <p className='text-lg text-center'>Loading ...</p>}

      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {!loading && data.length === 0 && (
        <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
      )}

      {!loading && data.length !== 0 && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  )
}

export default SearchProduct;
