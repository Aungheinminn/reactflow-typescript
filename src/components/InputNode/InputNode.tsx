import { useCallback, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import classes from './InputNode.module.css'

type Value = string | number

function InputNode({ isConnectable, data }: NodeProps) {
  const [ value, setValue] = useState< Value | undefined >(data.initialValue || '')
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)  

  }, []);
  console.log(data.label)
    // data.label = value


  return (
    <div className={classes.textUpdaterNode}>
      {/* <Handle type="target" position={Position.Left} isConnectable={isConnectable} /> */}

      <div>
        <div className={classes.labelDiv}>
            <label htmlFor="text">Type Question:</label>
        </div>
        <div className={classes.inputDiv}>
                <input id="text" name="text" onChange={onChange} value={data.label} className="nodrag" />
        </div>

      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default InputNode