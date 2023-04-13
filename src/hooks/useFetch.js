import { useState, useEffect } from 'react'

export const useFetch = (endPoint, query) => {
    const [response, setResponse] = useState(undefined)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch(endPoint, {
                    credentials: 'omit',
                    headers: { 'Content-Type': 'application/json' },
                    body: query,
                    method: 'POST'
                })
                    .then(response => response.json())
                    .then(data => data && setResponse(data))
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { response, error, loading }
}
