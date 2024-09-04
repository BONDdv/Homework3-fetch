import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
export default function Data( { searchQuery }) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = useCallback(
        debounce(async (query) => {
            setLoading(true)
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
                if (!response.ok) {
                    throw new Error('Request limit exceeded, please try again later.')
                }
                const result = await response.json()
                setData(result.products)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        } , 1000), []
    )



    useEffect( ()=> {
        const loadData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/search?q=phone')
                const result = await response.json()
                setData(result.products)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    },[])
    
    useEffect( ()=> {
        if(searchQuery) {
            fetchData(searchQuery)
        } else {
            const loadFirstData = async () => {
                try {
                    const response = await fetch('https://dummyjson.com/products/search?q=phone');
                if (!response.ok) {
                    throw new Error('Request limit exceeded, please try again later.');
                }
                const result = await response.json();
                setData(result.products);
                } catch (error) {
                    setError(error.message)
                } finally {
                    setLoading(false)
                }
            }
            loadFirstData();
        }
    }, [searchQuery])
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

  return (
    <div>
        
        {data.length > 0 ? (
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <div>
                            {item.title} | {item.category} | {item.price}
                        </div>
                    
                    </li>
                ))}
            </ul>
        ) : (
            <p>No result found.</p>
        )}
    </div>
  )
}
