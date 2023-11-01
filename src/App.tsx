/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    Controls,
    addEdge,
    FitViewOptions,
    Node,
    Edge,
    OnConnect,
    DefaultEdgeOptions,
    NodeTypes,
    Position,
    Panel,
    useReactFlow,
    useNodesState,
    useEdgesState,
    updateEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

import TextUpdaterNode from './components/TextUpdaterNode/TextUpdaterNode';
import InputNode from './components/InputNode/InputNode';

// import CustomNode from './CustomNode';



const initialNodes: Node[] = [
    {
        id: '1',
        sourcePosition: Position.Right,
        type: 'display',
        data: { label: 'what is 1 + 1' },
        position: { x: 0, y: 0},
        
    },
    { 
        id: '2',
        data: { label: 'Node 1'}, 
        type: 'inputNode',
        position: { x: 5, y: 5 }, 
    },
    { 
        id: '3', 
        type: 'processNode',
        data: { label: 'Process', rightAnswer: '2' }, 
        position: { x: 5, y: 5 },
        targetPosition: Position.Left,
        sourcePosition: Position.Right
    },
    {
        id: '4',
        type: 'feedback',
        targetPosition: Position.Left,
        data: { label: 'feedback', feedback: 'feedback from gpt'},
        position: { x: 100, y: 100}
    }
    
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3'},
    { id: 'e3-4', source: '3', target: '4'}
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
  inputNode: InputNode,
};

type ToObject = {
  toObject: () => any;
};

const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;


function App() {

  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ToObject | null>(null);
  const { setViewport } = useReactFlow();    
  const element = useRef(null)
  
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {      

    if (rfInstance) {
      const flow = rfInstance?.toObject();
      console.log(flow)
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey)!);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  const exportData = () => {
    if(rfInstance){
        // eslint-disable-next-line no-var
        var flow = rfInstance.toObject()
    }
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(flow)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

   const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [setEdges]);

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string; }) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [setEdges]);

  const onNodeClick = (e: any) => {
    console.log(e.target)
    console.log(nodes.filter(node => node.id === '1'))    
  }


  return (
    <div style={{ height: '800px'}}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onNodeClick={onNodeClick}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // snapToGrid
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            fitView
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
            onInit={setRfInstance}
            ref={element}
        >
            <Panel position="top-right">
                <button onClick={onSave}>save</button>
                <button onClick={onRestore}>restore</button>
                <button onClick={onAdd}>add node</button>
                <button onClick={exportData}>save as json</button>
            </Panel>
            <Controls />
        </ReactFlow>
    </div>

  );
}

export default App
