import { useCallback } from 'react';
import { Handle, NodeProps, NodeToolbar, Position, useNodeId } from 'reactflow';
import classes from './TextUpdaterNode.module.css'

// type Value = string | number
// type Data = {
//   toolbarPosition: Position;
//   toolbarVisible: boolean;
// }


function TextUpdaterNode({ isConnectable ,data }: NodeProps ) {
  const nodeId = useNodeId()
  // const [ value, setValue] = useState< Value | undefined >('')
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
    // setValue(evt.target.value)
  }, []);

  return (
    <div className={classes.textUpdaterNode}>
      <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
          <button>delete</button>
          <button>copy</button>
          <button>expand</button>
      </NodeToolbar>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Display nodeId-{nodeId}</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode