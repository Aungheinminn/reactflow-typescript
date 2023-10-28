import { useCallback, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import classes from './TextUpdaterNode.module.css'

type Value = string | number

function TextUpdaterNode({ isConnectable }: NodeProps, stateValue: (arg0: Value | undefined) => void) {
  const [ value, setValue] = useState< Value | undefined >('')
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
    setValue(evt.target.value)
    stateValue( value )
  }, []);


  return (
    <div className={classes.textUpdaterNode}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Display</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default TextUpdaterNode