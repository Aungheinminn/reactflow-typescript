import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from './nodes';
import initialEdges from './edges';

type RFState = {
  addEdges: any;
  currentNode: null | Node;
  addNodes: any;
  setNodes: any;
  setEdges: any;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    currentNode: null,
    addNodes: (node: Node) => set((state)=> ({ nodes: [...state.nodes, node]})),
    addEdges: (edge: Edge) => set((state)=> ({ edges: [...state.edges, edge]})),
    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({edges}),
 // Initialize current node as null
    setCurrentNode: (node: Node) => set({ currentNode:node }),
    onNodesChange: (changes: NodeChange[]) => {
        set({
        nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
        edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection:Connection) => {
        set({
        edges: addEdge(connection, get().edges),
        });
    },

}));

export default useStore;