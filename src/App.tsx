import { useState, useCallback } from 'react';
import ReactFlow, {
    Controls,
    addEdge,
    FitViewOptions,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    DefaultEdgeOptions,
    NodeTypes,
    Position,
    Panel,
    useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';

import TextUpdaterNode from './components/TextUpdaterNode/TextUpdaterNode';
import InputNode from './components/InputNode/InputNode';

// import CustomNode from './CustomNode';



const initialNodes: Node[] = [
    {
        id: '1',
        sourcePosition: Position.Right,
        type: 'input',
        data: { label: 'Start', },
        position: { x: 0, y: 0},
        
    },
    { 
        id: '2',
        data: { label: 'Node 1', question: 'what is a' }, 
        type: 'textUpdater',
        position: { x: 5, y: 5 }, 
    },
    { 
        id: '3', 
        type: 'inputNode',
        data: { label: 'Node 2', answer: 'alphabet' }, 
        position: { x: 5, y: 5 }
    },
    {
        id: '4',
        // type: 'output',
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

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [rfInstance, setRfInstance] = useState<ToObject | null>(null);
  const { setViewport } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {      
    console.log()

    if (rfInstance) {
      const flow = rfInstance?.toObject();
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
  }, [setNodes, setViewport]);

  const exportData = () => {
    if(rfInstance){
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
  

  return (
    <div style={{ height: '800px'}}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
            onInit={setRfInstance}
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
