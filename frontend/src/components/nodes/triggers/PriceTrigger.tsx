import { Handle, Position } from "@xyflow/react";

export type PriceTriggerMetadata = {
    asset:string,
    price:number
}

export function PriceTrigger({data}:{
    data:{
        metadata: PriceTriggerMetadata
    },
    isConnectable:boolean
}){

    return <div className="p-4 border">
        <div>
        {data.metadata.asset}
        </div>
        <div>
        {data.metadata.price}
        </div>
        <Handle type = "source" position={Position.Right}/>
    </div>
}