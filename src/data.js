
export const data =  {
    "nodes": [
        {
            "width": 150,
            "height": 35,
            "id": "1699193502963",
            "data": {
                "label": "Start"
            },
            "position": {
                "x": 47,
                "y": 65.5
            },
            "type": "input",
            "sourcePosition": "right",
            "selected": false,
            "positionAbsolute": {
                "x": 47,
                "y": 65.5
            },
            "dragging": false
        },
        {
            "width": 114,
            "height": 62,
            "id": "1699193512212",
            "data": {
                "label": "New Node",
                "processTypeId": ""
            },
            "position": {
                "x": 250,
                "y": 128.5
            },
            "type": "processNode",
            "selected": false,
            "positionAbsolute": {
                "x": 250,
                "y": 128.5
            },
            "dragging": false
        },
        {
            "width": 265,
            "height": 62,
            "id": "1699193519451",
            "data": {
                "label": "what is the number between 3 and 5"
            },
            "position": {
                "x": -69,
                "y": 117.5
            },
            "type": "inputNode",
            "selected": false,
            "positionAbsolute": {
                "x": -69,
                "y": 117.5
            },
            "dragging": false
        },
        {
            "width": 229,
            "height": 62,
            "id": "1699193520189",
            "data": {
                "label": "name an animal starts with d"
            },
            "position": {
                "x": 37,
                "y": 194
            },
            "type": "inputNode",
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
                "x": 37,
                "y": 194
            }
        },
        {
            "width": 150,
            "height": 72,
            "id": "1699193580720",
            "data": {
                "label": "Display",
                "feedback": "result blah blah"
            },
            "position": {
                "x": 411,
                "y": 124.5
            },
            "type": "displayNode",
            "selected": false,
            "dragging": false,
            "positionAbsolute": {
                "x": 411,
                "y": 124.5
            }
        }
    ],
    "edges": [
        {
            "animated": true,
            "source": "1699193502963",
            "sourceHandle": null,
            "target": "1699193512212",
            "targetHandle": "handle-target2",
            "id": "reactflow__edge-1699193502963-1699193512212handle-target2"
        },
        {
            "animated": true,
            "source": "1699193519451",
            "sourceHandle": "b",
            "target": "1699193512212",
            "targetHandle": "handle-target1",
            "id": "reactflow__edge-1699193519451b-1699193512212handle-target1"
        },
        {
            "animated": true,
            "source": "1699193520189",
            "sourceHandle": "b",
            "target": "1699193512212",
            "targetHandle": "handle-target1",
            "id": "reactflow__edge-1699193520189b-1699193512212handle-target1"
        },
        {
            "animated": true,
            "source": "1699193512212",
            "sourceHandle": "handle-source1",
            "target": "1699193580720",
            "targetHandle": "handle-target-1",
            "id": "reactflow__edge-1699193512212handle-source1-1699193580720handle-target-1"
        }
    ],
    "viewport": {
        "x": 185.5,
        "y": -1,
        "zoom": 2
    }
}