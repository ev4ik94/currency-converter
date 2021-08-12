import {useState, useCallback} from 'react'
import axios from 'axios'




export function AxiosApi(){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /*-----Abort Controller -----*/

    const source = axios.CancelToken.source()

    const resetErr = ()=>{
        setError(null)
    }



    const request = useCallback(async(url, method='GET', data=null, headers={})=>{
        setLoading(true)
        const instance = axios.create({
            cancelToken: source.token,
            timeout: 30000,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })



        await instance.interceptors.request.use(request=>{
                return request
            },
            error=>{
                return Promise.reject(error)
            })


        await instance.interceptors.response.use(response=>{
                setLoading(false)
                return response
            },
            error=>{

                setLoading(false)
                const {response, config} = error

                if(response && response.status){
                    setError(response)
                }
                return Promise.reject(error)

            })


        return await instance({
            method,
            url,
            data,
            headers
        })


    }, [])

    return {request, loading, error, resetErr}
}
