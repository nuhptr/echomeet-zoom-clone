import { useEffect, useState } from "react"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"

export function useGetCallById(id: string | string[]) {
    const [call, setCall] = useState<Call>()
    const [isCallLoading, setIsCallLoading] = useState(true)

    const client = useStreamVideoClient()

    useEffect(() => {
        if (!client) return

        const loadCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: { id },
            })

            if (calls.length > 0) setCall(calls[0]) // We only expect one call

            setIsCallLoading(false)
        }

        loadCall()
    }, [client, id])

    return { call, isCallLoading }
}
