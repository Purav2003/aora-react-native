import { useEffect, useState } from "react"

const useAppWrite = (fn) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const fetchData = async()=>{
        setLoading(true)
        try{
          const response = await fn()
          setData(response)
        }
        catch(e){
          Alert.alert('Error',e.message)
        }
        finally{
          setLoading(false)
        }
      }
    useEffect(()=>{
        fetchData()
    },[])

    const refetch = () => fetchData();
   return {data,loading,refetch}

}

export default useAppWrite