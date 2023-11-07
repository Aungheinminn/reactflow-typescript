
import { useCallback } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import classes from './DisplayNode.module.css'


function DisplayNode({ isConnectable, data }: NodeProps) {
//   const [ value, setValue] = useState< Value | undefined >('')
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
    // setValue(evt.target.value)
  }, []);
  


  return (
    <div className={classes.textUpdaterNode}>
        <Handle className={classes.handle1} id='handle-target-1' type="target" isConnectable={isConnectable} position={Position.Left}  />
        <div className={classes.display}>
            <span>Display</span>
        </div>
        <div className={classes.textDiv}>
            <div className={classes.labelDiv}>
                <label htmlFor="">{data.label}</label>
            </div>

            <p>{data.feedback}</p>
        </div>

        <Handle type="source" position={Position.Right} id="handle-source-2" isConnectable={isConnectable} />
    </div>
  );
}

export default DisplayNode