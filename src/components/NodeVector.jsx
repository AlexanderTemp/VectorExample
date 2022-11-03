import { useState } from "react"
import { Handle, Position } from 'reactflow';
let counter = 0;
const getCounter = () => {
  counter += 1
  return counter - 1
}
const NodeVector = ({ id, length, nombre, handleClickNode }) => {
  const [vectors, setVector] = useState(Array(length).fill(0))
  return (
    <div className="flex flex-col h-[85px] rounded-sm px-1 bg-slate-200 border-2 border-slate-700" onClick={handleClickNode(id)}>
      <div className="flex justify-between my-1 mb-2">
        <h1 className="text-indigo-700 font-semibold lowercase">{nombre}</h1>
        <div className="text-cyan-600 font-semibold">len: {length}</div>
      </div>
      <div className="flex">
        {
          vectors.map((x, i) => {
            return <div key={counter} className="flex flex-col justify-center">
              <div className=" h-[30px] w-[30px] border-2 border-slate-800"></div>
              <div className="text-semibold italic">[{i}]</div>
            </div>
          })
        }
      </div>
    </div>
  )
}
export default NodeVector