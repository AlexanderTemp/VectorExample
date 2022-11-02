import { useState } from "react"
import { Handle, Position } from 'reactflow';
let counter=0;
const getCounter=()=>{
  counter+=1
  return counter-1
}
const NodeVector = ({ id, length, nombre, handleClickNode }) => {
  const [vectors, setVector] = useState(Array(length).fill(0))
  return (
    <div className="flex flex-col h-[85px] rounded-sm bg-slate-200 border-2 border-slate-700" onClick={handleClickNode(id)}>
      <div className="flex justify-center my-2">
        <h1>{nombre}</h1>
      </div>
      <div className="flex">
          {
            vectors.map(x => {
              return <div key={counter} className="flex flex-col justify-center">
                <div className=" h-[30px] w-[30px] border-2 border-slate-800"></div>
                <div>[{counter}]</div>
              </div>
            })
          }
      </div>
      <Handle type="target" position={Position.Bottom} className="w-1 !bg-green-100" />
    </div>
  )
}
export default NodeVector