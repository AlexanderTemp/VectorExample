//TODO: Fix input edge delete helpers for length input and updatable node

/* React Icons */
import { AiFillGithub, AiFillCode } from "react-icons/ai"
import { FaReact, FaIcons } from "react-icons/fa"
import { SiTailwindcss } from "react-icons/si"
import { TiFlowMerge } from "react-icons/ti"
import { RiCodeBoxFill } from "react-icons/ri"
import { CgClose } from "react-icons/cg"
/* Libreries Import */
import NodeIndex from "../components/NodeIndex"
import NodeVector from "../components/NodeVector"
import Editor from "@monaco-editor/react"
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';


/* Reactflow data */
let id = 0;
const getId = () => `dndnode_${id++}`;

function App() {
  const [modalVector, setModalVector] = useState(false)
  const [themeSettings, setThemeSettings] = useState("light")
  const [fontSettings, setFontSettings] = useState("14px")

  const [graphNode, setGraphNode] = useState([]);

  // Node Options
  const [optionsNav, setOptionsNav] = useState({
    idNode: undefined,
    length: 1,
    nombre: "",
  });

  function handleClickNode(id) {
    const dataInfo = graphNode.find((x) => x.idForNode === id);
    setOptionsNav({
      idNode: dataInfo.idForNode,
      length: dataInfo.length,
      nombre: dataInfo.nombre
    })
  }


  /* init Reactflow */
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  // Drag from nav der
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let idNodeData = getId();
      const newNode = {
        id: idNodeData,
        type: "input",
        position,
        data: { label: undefined },
        style: {
          width: "fit-content",
          height: "fit-content",
          padding: "0",
          background: "none",
          borderStyle: "none"
        },
      };
      let newNodeData = {}
      if (type === "vector") {
        newNode.data.label = (
          <NodeVector id={idNodeData} length={1} nombre={"vector"} handleClickNode={handleClickNode} />
        );
        newNodeData = {
          idForNode: idNodeData,
          length: 1,
          nombre: "vector",
          type: "vector"
        }
      } else {
        newNode.data.label = (
          <NodeIndex id={idNodeData} input={0} handleClickNode={handleClickNode} />
        );
        newNodeData = {
          idForNode: idNodeData,
          input: 0,
          type: "element"
        }
      }

      graphNode.push(newNodeData);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const handleFontChange = (e) => {
    setFontSettings(e.target.value)
    console.log(fontSettings)
  }
  const handleVectorInit = () => {
    setModalVector(true)
  }
  return (
    <>
      {modalVector &&
        <div className="fixed z-40 w-[550px] h-[500px] left-[calc(50vw-275px)] top-[calc(50vh-250px)] flex flex-col">
          <div className="bg-[#1E2227] text-slate-100 flex justify-between rounded-tl-md rounded-tr-md py-2 px-3">
            <div>
              <h2 className="text-xl">Configuración gráfica del Vector</h2>
            </div>
            <div className="p-1 hover:opacity-80 hover:bg-slate-600 rounded-md cursor-pointer" onClick={() => setModalVector(false)} >
              <CgClose className="h-[25px] w-[25px] text-slate-100" />
            </div>
          </div>

          <div className="flex flex-col bg-slate-200 px-8 py-6 gap-8">
            <div className=" w-full flex items-center">
              <div className="basis-1/3">
                <p className="font-semibold text-lg">Nombre del Vector</p>
              </div>
              <div className="basis-2/3 flex items-center">
                <input className="px-1 w-full mx-3 py-1 border-[1px] border-slate-800" type="text" />
              </div>
            </div>
            <div className=" w-full flex items-center">
              <div className="basis-1/3">
                <p className="font-semibold text-lg">Longitud del Vector</p>
              </div>
              <div className="basis-2/3 flex items-center">
                <input className="px-1 w-full mx-3 py-1 border-[1px] border-slate-800" type="text" />
              </div>
            </div>
          </div>

          <div className="bg-[#23272E] flex w-full justify-end gap-2 px-4 text-slate-100 py-2 rounded-br-md rounded-bl-md">
            <div>
              <button className="py-1 px-2 hover:bg-[#7998d5] transform transition-all duration-200 border-2 border-slate-100 rounded-md">Cerrar</button>
            </div>
            <div>
              <button className="py-1 px-2 bg-[#4D78CC] transform transition-all duration-200 hover:bg-[#2554b1]  border-2  rounded-md">Guardar</button>
            </div>
          </div>
        </div>
      }
      <div className={`App ${modalVector && ' blur-sm'}`}>
        <header className="fixed w-[100%] z-50 py-4 px-10 flex justify-between text-slate-100 bg-[#1E2227]">
          <div className="flex gap-2 items-center">
            <AiFillCode className="text-[#FFC23C] w-[25px] h-[25px]" />
            <h1 className="text-2xl">Ejemplo de Vectores</h1>
          </div>
          <div className="flex gap-2 items-center">
            <a href="https://github.com/AlexanderTemp/" className="p-1 rounded-full hover:bg-slate-500" target="_blank">
              <AiFillGithub className="w-[25px] h-[25px]" />
            </a>
            <p className="lg">Desarrollado por: <span className="text-pink-400">aaalex2025@gmail.com</span></p>
          </div>
        </header>
        <main className="flex flex-col bg-slate-100 pt-16">
          <div className=" flex flex-col justify-center bg-slate-300 items-center pt-5 pb-8">
            <h1 className="text-indigo-800 font-semibold text-5xl">Prueba de Escritorio Gráfica de Vectores</h1>
            <p className="text-lg font-light italic text-sky-700">De los draggables arrastra el tipo de Nodo para visualizar en el Workbench</p>
            <p className="text-lg font-light italic text-sky-700">Modifica el nodo en la sección de opciones</p>
          </div>
          {/* Parte Base */}
          <div className="h-[80vh] flex border-y-2 border-slate-700 mb-10">
            <ReactFlowProvider>
              <div className="flex flex-col basis-[12%] border-r-2 border-slate-700">
                <div className="py-1 text-center border-b-2 bg-slate-300 border-slate-700">
                  <h3 className="font-semibold text-lg">Draggables</h3>
                </div>
                <div className="flex flex-col gap-2 py-4 border-b-2 border-slate-800 items-center px-2">
                  <div className="w-[100%] text-slate-100 px-1 py-1 rounded-lg text-center bg-[#25274E] text-xl cursor-pointer hover:shadow-md hover:shadow-indigo-400" onClick={() => handleVectorInit()}>
                    Vector
                  </div>
                  <div className="w-[100%] text-slate-100 px-1 py-1 rounded-lg text-center bg-[#25274E] text-xl cursor-pointer hover:shadow-md hover:shadow-indigo-400" onDragStart={(event) => onDragStart(event, "element")}
                    draggable>Elemento</div>
                </div>

                {/* OPCIONES */}
                <div className="flex flex-col ">
                  <div className="py-1 text-center border-b-2 bg-slate-300 border-slate-700">
                    <h3 className="font-semibold text-lg">Opciones de Vector</h3>
                  </div>
                  {optionsNav.idNode !== undefined &&
                    <div className="flex flex-col gap-2">
                      <div className="">
                        <p>Nombre del Vector</p>
                        <input type="text" value={optionsNav.nombre} onChange={e => setOptionsNav({
                          ...optionsNav,
                          nombre: e.target.value

                        })} />
                      </div>
                      <div>
                        <p>Tamaño del Vector</p>
                        <input type="text" value={optionsNav.length} onChange={e => setOptionsNav({
                          ...optionsNav,
                          length: e.target.value
                        })} />
                      </div>
                      <div className="mt-10">
                        <div className="bg-green-600 mx-2 py-1 rounded-md text-center text-slate-100">
                          Actualizar datos
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div className="basis-[42%] h-[100%]" ref={reactFlowWrapper}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  proOptions={{
                    hideAttribution: true
                  }}
                  fitView
                >
                  <Background variant="dots" />
                  <Controls />
                </ReactFlow>

              </div>
            </ReactFlowProvider>
            <div className="basis-[46%] border-l-2 border-slate-700 flex flex-col">
              <div className="flex justify-between px-6 py-2 text-slate-100 bg-slate-700">
                <div className="">
                  Opciones del Editor
                </div>
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <p className="text-sm">Fuente:</p>
                    <select value={fontSettings} className="rounded-md bg-slate-800" name="font" id="font" onChange={(e) => handleFontChange(e)}>
                      <option value="">-</option>
                      <option value="14px">14px</option>
                      <option value="18px">18px</option>
                      <option value="24px">24px</option>
                      <option value="32px">32px</option>
                    </select>
                  </div>
                  <div className="flex gap-1">
                    <p className="text-sm">Tema:</p>
                    <select className="rounded-md bg-slate-800" name="theme" id="theme">
                      <option value="light">Claro</option>
                      <option value="vs-dark">Oscuro</option>
                    </select>
                  </div>
                </div>
              </div>
              <Editor
                height="90%"
                theme="light"
                defaultLanguage="python"
                defaultValue="# Añade tu código aquí 😁"
                options={{
                  lineNumbers: "on",
                  fontSize: "16px",
                  tabSize: "1",
                  autoIndent: true,
                  minimap: {
                    enabled: false
                  }
                }}
              />
            </div>
          </div>
        </main>


        {/* Footer */}
        <footer className="bg-[#1E2227] text-slate-100 flex justify-between px-10 py-8">
          <div className="flex flex-col">
            <h3 className="text-lg mb-2">Librerías usadas</h3>
            <div className="flex gap-4 items-center">
              <p className="rounded-xl px-2 text-slate-800 bg-[#66EAFF] flex items-center gap-1">
                <FaReact />React</p>
              <p className="rounded-xl px-2 bg-[#E91E63] flex items-center gap-1"><FaIcons />React Icons</p>
              <p className="rounded-xl px-2 bg-[#FF0072] flex items-center gap-1"><TiFlowMerge />React Flow</p>
              <p className="text-slate-800 rounded-xl px-2 bg-[#38BDF8] flex items-center gap-1"><SiTailwindcss />Tailwind</p>
              <p className="text-slate-100 rounded-xl px-2  bg-[#68217A] flex items-center gap-1"><RiCodeBoxFill />Monaco Editor</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <a href="https://github.com/AlexanderTemp/" className="p-1 rounded-full hover:bg-slate-500" target="_blank">
              <AiFillGithub className="w-[25px] h-[25px]" />
            </a>
            <p className="lg">Desarrollado por: <span className="text-pink-400">aaalex2025@gmail.com</span></p>
          </div>
        </footer>
      </div>

    </>

  );
}

export default App;
