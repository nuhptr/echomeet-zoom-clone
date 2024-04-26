import Image from "next/image"

export default function Loader() {
   return (
      <div className="w-full h-screen flex-center">
         <Image src="/icons/ic_loading_circle.svg" alt="Loading Icon" width={50} height={50} />
      </div>
   )
}
