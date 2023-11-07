import { Handle, NodeProps, Position } from 'reactflow';
import classes from './ConditionNode.module.css'


function ConditionNode({ isConnectable, data }: NodeProps) {

  return (
    <div className={classes.textUpdaterNode}>
        <Handle className={classes.handle3} type="target" position={Position.Left} id="t1" isConnectable={isConnectable} />  
        <div>
            <label htmlFor="">{data.label}</label>
        </div>

        <div className={classes.handle4Div}>
            <Handle className={classes.handle4} type="target" position={Position.Left} id='t2' isConnectable={isConnectable} />
            <label htmlFor="">Condition</label>
        </div>
      
        <div className={classes.handle1Div}>
            <label htmlFor="" className={classes.label}>True</label>
            <Handle className={classes.handle1} id='s1' type="source" isConnectable={isConnectable} position={Position.Right}  />
        </div>
        <div className={classes.handle2Div}>
            <label className={classes.label} htmlFor="">False</label>
            <Handle className={classes.handle2} id='s2' type="source" position={Position.Right} isConnectable={isConnectable}  />
        </div>
    </div>
  );
}

export default ConditionNode