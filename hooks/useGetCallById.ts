import { useEffect, useState } from "react"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"

export function useGetCallById(id: string | string[]) {
   // The call object that we want to fetch only 1 call
   const [call, setCall] = useState<Call>()
   const [isCallLoading, setIsCallLoading] = useState(true)

   const client = useStreamVideoClient()

   useEffect(() => {
      if (!client) return

      const loadCall = async () => {
         try {
            const { calls } = await client.queryCalls({ filter_conditions: { id } })
            //* We only expect one call to be returned
            if (calls.length > 0) setCall(calls[0])

            setIsCallLoading(false)
         } catch (error) {
            console.error(error)
            setIsCallLoading(false)
         }
      }

      loadCall()
   }, [client, id])

   return { call, isCallLoading }
}
