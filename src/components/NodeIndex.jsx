import { MdOutlineDragIndicator } from "react-icons/md"
import { GrDrag } from "react-icons/gr"

const NodeIndex = () => {
  return (
    <div className="flex relative z-50 flex-col border-2 rounded-sm bg-[#FAEEE7] border-[#325288] w-[28px] h-[35px]">
      <div className="">
        <input type="text" className="w-[90%] h-[90%] border-[1px] border-slate-800 bg-transparent font-bold text-lg bg-slate-100" />
      </div>
      <div className="absolute -bottom-1 translate-x-[6px]">
        <GrDrag className=" rotate-90 scale-75" />
      </div>
    </div>
  )
}
export default NodeIndex