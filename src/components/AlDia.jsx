import { LiaCheckCircle } from "react-icons/lia"

export const AlDia = () => {
    return (
<aside className="sm:mb-16 md:mb-0 bg-transparent w-full h-80 flex flex-col items-center justify-center -mt-5 rounded-lg shadow-lg">
  <LiaCheckCircle className="text-green-500 text-7xl" />
  <p className="font-bold text-3xl text-green-500">Estás al día</p>
  <p className="text-slate-700 text-center">Buen trabajo, todas las quejas han sido revisadas.</p>
</aside>


)
}
