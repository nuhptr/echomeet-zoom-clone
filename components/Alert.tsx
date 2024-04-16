import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface AlertProps {
   title: string
   iconUrl?: string
}

const Alert = ({ title, iconUrl }: AlertProps) => {
   return (
      <section className="w-full h-screen flex-center">
         <Card className="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
            <CardContent>
               <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-3.5">
                     {iconUrl && (
                        <div className="flex-center">
                           <Image src={iconUrl} width={72} height={72} alt="icon" />
                        </div>
                     )}
                     <p className="text-xl font-semibold text-center">{title}</p>
                  </div>
                  <Button asChild className="bg-blue-1">
                     <Link href="/">Back to Home</Link>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </section>
   )
}

export default Alert
