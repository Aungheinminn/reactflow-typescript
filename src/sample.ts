type NodeType = "beginNode" | "endNode" | "inputNode" | "processNode" | "displayNode";

type Choice = {
  name: string;
  singleOutput: boolean;
};

type Node = {
  id: string;
  type: NodeType;
  data: {
    label?: string;
    choices?: Choice[];
    processType?: string;
    inputs?: string[];
    value?: string | number;
    processId?: string | number;
  };
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
  selected?: boolean;
  positionAbsolute?: {
    x: number;
    y: number;
  };
  dragging?: boolean;
};

type Edge = {
  type?: string;
  markerEnd?: {
    type: string;
  };
  source: string;
  sourceHandle?: string | null;
  target?: string;
  targetHandle?: string;
  id?: string;
};

type Data = {
  nodes: Node[];
  edges: Edge[];
};
export const datas:Data = {
  nodes: [
    {
      id: "0",
      type: "beginNode",
      data: {
        "label": "Begin node."
      },
      position: { x: -104.528, y: -40.78 },
    },
    {
      id: "1",
      type: "displayNode",
      data: {
        "label": "what is the typical lifespan of a medium-sized golden retriever?"
      },
      position: { x: -254.528, y: -98.78 },
    },
    {
      id: "2",
      type: "inputNode",
      data: {
        "value": 0,
        label: 'Type a number'
      },
      position: { x: 550.9319999999999, y: -24.39599999999991 },
    },
    {
      id: "3",
      type: "processNode",
      data: {
        inputs: ["2"],
        "processId": "process_001"
      },
      position: { x: -178, y: -36 },
    },
    {
      id: "4",
      type: "displayNode",
      data: {
        inputs: ["3"],
        "label": "Your score :"
      },
      position: { x: -176, y: 56 },
    },
  ],
  edges: [
    {
        "type": "smoothstep",
        "source": "0",
        "target": "1",
    },
    {
        "type": "smoothstep",
        "source": "1",        
        "sourceHandle":"handle-source-2",
        "target": "3",
        "targetHandle": "handle-target2"
    },
    {
        "type": "smoothstep",
        "source": "1",
        "target": "2",
    },
    {
        "type": "smoothstep",
        "source": "2",
        "target": "3",
    },
    {
        "type": "smoothstep",
        "source": "3",
        "target": "4",
    },
  ]
}

// export const datas = {
//   nodes: [
//     {
//       id: "begina9c58504-9da6-4d3a-8804-ccccfaf0f37c",
//       type: "beginNode",
//       data: { label: "Begin Node" },
//       position: { x: -254.528, y: -98.78 },
//       width: 47,
//       height: 26,
//       sourcePosition: "bottom",
//       selected: false,
//       positionAbsolute: { x: -254.528, y: -98.78 },
//       dragging: false,
//     },
//     {
//       id: "end352f606f-8b6f-4e75-8654-5c63da63d57e",
//       type: "endNode",
//       data: { label: "End Node" },
//       position: { x: 550.9319999999999, y: -24.39599999999991 },
//       width: 35,
//       height: 26,
//       selected: true,
//       positionAbsolute: { x: 550.9319999999999, y: -24.39599999999991 },
//       dragging: false,
//     },
//     {
//       id: "input7c410a05-df5c-4168-9185-09d585e7647e",
//       type: "inputNode",
//       data: { label: "Type a number" },
//       position: { x: -178, y: -36 },
//       width: 169,
//       height: 81,
//       selected: false,
//       positionAbsolute: { x: -178, y: -36 },
//       dragging: false,
//     },
//     {
//       id: "input6323a76c-1e33-4b56-b144-c453f9bf3126",
//       type: "inputNode",
//       data: { label: "Type a number again" },
//       position: { x: -176, y: 56 },
//       width: 169,
//       height: 81,
//       selected: false,
//       positionAbsolute: { x: -176, y: 56 },
//       dragging: false,
//     },
//     {
//       id: "processcd04611d-48a6-4ad4-83eb-b4e8b086c47e",
//       type: "processNode",
//       data: {
//         label: "Process Node",
//         choices: [
//           { name: "process_001", singleOutput: true },
//           { name: "process_002", singleOutput: false },
//         ],
//         processType: "process_002",
//         inputs: [
//           "input7c410a05-df5c-4168-9185-09d585e7647e",
//           "input6323a76c-1e33-4b56-b144-c453f9bf3126",
//         ],
//       },
//       position: { x: 37.5, y: 2 },
//       width: 118,
//       height: 79,
//       selected: false,
//       positionAbsolute: { x: 37.5, y: 2 },
//       dragging: false,
//     },
//     {
//       id: "display230b486f-ffcf-4f65-8a98-57e8a8ed252d",
//       type: "displayNode",
//       data: {
//         label: "If Node",
//         inputs: ["processcd04611d-48a6-4ad4-83eb-b4e8b086c47e"],
//       },
//       position: { x: 188.5, y: -19.5 },
//       width: 198,
//       height: 102,
//       selected: false,
//       positionAbsolute: { x: 188.5, y: -19.5 },
//       dragging: false,
//     },
//     {
//       id: "display823f05ff-f045-4116-8e36-a5242c85f3f4",
//       type: "displayNode",
//       data: {
//         label: "Else Node",
//         inputs: ["processcd04611d-48a6-4ad4-83eb-b4e8b086c47e"],
//       },
//       position: { x: 190, y: 97.5 },
//       width: 198,
//       height: 102,
//       selected: false,
//       positionAbsolute: { x: 190, y: 97.5 },
//       dragging: false,
//     },
//   ],
//   edges: [
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "begina9c58504-9da6-4d3a-8804-ccccfaf0f37c",
//       sourceHandle: null,
//       target: "processcd04611d-48a6-4ad4-83eb-b4e8b086c47e",
//       targetHandle: "handle-target2",
//       id: "reactflow__edge-begina9c58504-9da6-4d3a-8804-ccccfaf0f37c-input7c410a05-df5c-4168-9185-09d585e7647etarget-input",
//     },
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "input7c410a05-df5c-4168-9185-09d585e7647e",
//       sourceHandle: "b",
//       target: "processcd04611d-48a6-4ad4-83eb-b4e8b086c47e",
//       targetHandle: "handle-target1",
//       id: "reactflow__edge-input7c410a05-df5c-4168-9185-09d585e7647e-processcd04611d-48a6-4ad4-83eb-b4e8b086c47etarget-process-left",
//     },
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "input6323a76c-1e33-4b56-b144-c453f9bf3126",
//       sourceHandle: "b",
//       target: "processcd04611d-48a6-4ad4-83eb-b4e8b086c47e",
//       targetHandle: "handle-target1",
//       id: "reactflow__edge-input6323a76c-1e33-4b56-b144-c453f9bf3126-processcd04611d-48a6-4ad4-83eb-b4e8b086c47etarget-process-left",
//     },
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "processcd04611d-48a6-4ad4-83eb-b4e8b086c47e",
//       sourceHandle: "source-process-true",
//       target: "display230b486f-ffcf-4f65-8a98-57e8a8ed252d",
//       targetHandle: "target-display-left",
//       id: "reactflow__edge-processcd04611d-48a6-4ad4-83eb-b4e8b086c47esource-process-true-display230b486f-ffcf-4f65-8a98-57e8a8ed252dtarget-display-left",
//     },
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "processcd04611d-48a6-4ad4-83eb-b4e8b086c47e",
//       sourceHandle: "source-process-false",
//       target: "display823f05ff-f045-4116-8e36-a5242c85f3f4",
//       targetHandle: "target-display-left",
//       id: "reactflow__edge-processcd04611d-48a6-4ad4-83eb-b4e8b086c47esource-process-false-display823f05ff-f045-4116-8e36-a5242c85f3f4target-display-left",
//     },
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "display230b486f-ffcf-4f65-8a98-57e8a8ed252d",
//       sourceHandle: "source-display",
//       target: "end352f606f-8b6f-4e75-8654-5c63da63d57e",
//       targetHandle: "target-end",
//       id: "reactflow__edge-display230b486f-ffcf-4f65-8a98-57e8a8ed252dsource-display-end352f606f-8b6f-4e75-8654-5c63da63d57etarget-end",
//     },
//     {
//       type: "smoothstep",
//       markerEnd: { type: "arrowclosed" },
//       source: "display823f05ff-f045-4116-8e36-a5242c85f3f4",
//       sourceHandle: "source-display",
//       target: "input7c410a05-df5c-4168-9185-09d585e7647e",
//       targetHandle: "target-input",
//       id: "reactflow__edge-display823f05ff-f045-4116-8e36-a5242c85f3f4source-display-input7c410a05-df5c-4168-9185-09d585e7647etarget-input",
//     },
//   ],
// };