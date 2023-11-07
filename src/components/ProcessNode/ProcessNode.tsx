import { SetStateAction, useCallback, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import classes from './ProcessNode.module.css'

type Value = string | number

function ProcessNode({ isConnectable, data }: NodeProps) {
  const [ value, setValue] = useState< Value | undefined >('')
  const handleTypeChange = useCallback((evt: { target: { value: SetStateAction<Value | undefined>, innerText: SetStateAction<Value | undefined> }})=> {
    setValue(evt.target.value) 
  }, []);

  data.processTypeId = value


  return (
    <div className={classes.textUpdaterNode}>
        <Handle className={classes.handle1} type="target" id='handle-target1' position={Position.Left} isConnectable={isConnectable} />
        <Handle className={classes.handle2} type="target" id='handle-target2' position={Position.Left} isConnectable={isConnectable} />

        <div className={classes.wrap}>
            <div className={classes.labelDiv}>
                <label htmlFor="precess">Choose processType:</label>
            </div>

            <div className={classes.option}>
                <div>
                    <select onChange={handleTypeChange} defaultValue={"processId-1"} name="process" id="process-type">
                            <option id='1' value={"processId-1"}>Single</option>
                            <option id='2' value={"processId-2"}>Multi</option>
                            <option id='3' value={"processId-3"}>Blah</option>
                            <option id='4' value={"processId-4"}>Blah</option>
                    </select>
                </div>
      
            </div>


        </div>
        

        {/* {value === 'processId-2'? <div>
            <Handle type="source" className={classes.handle3} position={Position.Right} id="handle-source2" isConnectable={isConnectable} />
            <Handle type="source" className={classes.handle4} position={Position.Right} id="handle-source3" isConnectable={isConnectable} />
        </div> : */}
        <Handle type="source" className={classes.handle5} position={Position.Right} id="handle-source1" isConnectable={isConnectable} />
        {/* } */}

        <div>
            <Handle type='target' className={classes.handle6} position={Position.Top} id="handle-target-3" isConnectable />
        </div>
    </div>
  );
}

export default ProcessNode