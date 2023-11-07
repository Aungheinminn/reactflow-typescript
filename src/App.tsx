/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useRef, MouseEvent } from 'react';
import { shallow } from 'zustand/shallow';
import { datas } from './sample';
import ReactFlow, {
    Controls,
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
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
// import useStoreWithEqualityFn from 'zustand/traditional/useStore';
import TextUpdaterNode from './components/TextUpdaterNode/TextUpdaterNode';
import InputNode from './components/InputNode/InputNode';
import ConditionNode from './components/ConditionNode/ConditionNode';

// import CustomNode from './CustomNode';

import useStore from './store';
import ProcessNode from './components/ProcessNode/ProcessNode';
import DisplayNode from './components/DisplayNode/DisplayNode';

const selector = (state: { nodes: any; edges: any; onNodesChange: any; onEdgesChange: any; onConnect: any; }) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
    textUpdater: TextUpdaterNode,
    inputNode: InputNode,
    displayNode: DisplayNode,
    conditionNode: ConditionNode,
    processNode: ProcessNode
};

type ToObject = {
  toObject: () => any;
};




function App() {

    const [rfInstance, setRfInstance] = useState<ToObject | null>(null);
    const flowKey = 'nodesAndEdges'

    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

    const setNodes = useStore((state) => state.setNodes);
    const setEdges = useStore((state)=> state.setEdges)
    const addNodes = useStore((state) => state.addNodes);
    const addEdges = useStore((state)=> state.addEdges);


    const handleRender = () =>{
        datas.nodes.map(data=>addNodes(data))
        datas.edges.map(data=>addEdges(data))

        console.log(nodes, edges);
    }

    const handleStartNode = () => {
        const newStartNode =  { id: Date.now().toString(), data: { label: 'Start' }, position: { x: 100, y: 100 }, type: 'input', sourcePosition: Position.Right }
        addNodes(newStartNode)
    }

    const handleEndNode = () => {
        const newEndNode = { id: Date.now().toString(), data: { label: 'End' }, position: { x: 100, y: 100 }, sourcePosition: Position.Right, targetPosition: Position.Left }
        addNodes(newEndNode)
    }

    const handleDisplayNode = () => {
        const newDisplayNode = { id: Date.now().toString(), data: { label: 'Display', feedback: 'result blah blah' }, position: { x: 100, y: 100 }, type: 'displayNode' }
        addNodes(newDisplayNode);
    }; 
    const handleInputNode = () => {
        const newInputNode = { id: Date.now().toString(), data: { label: 'New Node' }, position: { x: 100, y: 100 }, type: 'inputNode' }
        addNodes(newInputNode)
    }
    const handleProcessNode = () => {
        const newProcessNode = { id: Date.now().toString(), data: { label: 'New Node', processTypeId: '' }, position: { x: 100, y: 100 }, type: 'processNode' }
        addNodes(newProcessNode)
    }

    const onSave = useCallback(() => {      

        if (rfInstance) {
        const flow = rfInstance?.toObject();
        console.log(flow)
        localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [rfInstance]);

    const handleRestore = () => {
        setNodes(nodes);
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey)!);

            if (flow) {
                // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
            }
        };

        restoreFlow()
    };
 
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

    // const handleConnect = (params: { element: any, target: any; }) => {
    //     const { element, target } = params;

    //     console.log(target)

    //      const targetNode = nodes.find((node: Node) => node.id === target);
    //         if (targetNode) {
    //         const updatedNodeData = {
    //             ...targetNode.data,
    //             customData: 'Data from Edge',
    //         };

    //         setNodes(
    //             nodes.map((node: Node) => (node.id === target ? { ...node, data: updatedNodeData } : node))
    //         )
    //         }
    // };




  return (
    <div style={{ height: '800px'}}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // snapToGrid
            // onEdgeUpdate={onEdgeUpdate}
            // onEdgeUpdateStart={onEdgeUpdateStart}
            // onEdgeUpdateEnd={onEdgeUpdateEnd}
            fitView
            fitViewOptions={fitViewOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
            onInit={setRfInstance}
            // ref={element}
        >
            <Panel position="top-right">
                <button onClick={handleRender}>JSON render</button>
                <button onClick={onSave}>save</button>
                <button onClick={handleRestore}>restore</button>
                <button onClick={handleStartNode}>startNode</button>
                <button onClick={handleEndNode}>endNode</button>
                <button onClick={handleDisplayNode}>displayNode</button>
                <button onClick={handleInputNode}>inputNode</button>
                <button onClick={handleProcessNode}>processNode</button>
                <button onClick={exportData}>save as json</button>
            </Panel>
            <Controls />
        </ReactFlow>
    </div>

  );
}

export default App
