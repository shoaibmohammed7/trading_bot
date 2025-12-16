import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import type { NodeKind, NodeMetadata } from "./CreatWorkFlow"
import type { TimerNodeMetadata } from "./nodes/triggers/Timer"
import type { PriceTriggerMetadata } from "./nodes/triggers/PriceTrigger"




const SUPPORTED_TRIGGERS = [{
    id:"timer",
    title:"Timer",
    description:"Run this trigger after every x seconds/minutes"

},{
    id:"price-trigger",
    title:"Price-Trigger",
    description:"execute this if the price goes above/below the selected range"
}]


const SUPPORTED_ASSET = ["ETH", "SOL", "BTC"]

export const TriggerSheet= ({
    onSelect 
}: {
    onSelect:(kind: NodeKind, metadata:NodeMetadata) => void
})=> {
   
  const [metadata, setmetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata >({
    time:3600
  });  
  const [selectedTrigger, setselectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id)
  return (
    <Sheet open={true}>
      <SheetTrigger asChild>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the trype of trigger that you need
            <Select value={selectedTrigger} onValueChange={(value)=> setselectedTrigger(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Trigger" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {SUPPORTED_TRIGGERS.map(({id,title})=>
                        <SelectItem key = {id} value={id}>{title} </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select> 
            <br></br>
            {selectedTrigger === "timer" && <div>
              <div>
              Number of seconds after which the timer runs
              </div>
              <Input value={metadata.time} onChange = {(e)=>setmetadata(metadata=>({
                ...metadata,
                time:Number(e.target.value)
              }))} 
                
              ></Input> 
              
              </div> }


            {selectedTrigger === "price-trigger" && <div>
              Price:
              <Input type="text" onChange={(e)=> setmetadata(m=>({
                ...m,
                price:Number(e.target.value)
              }))}></Input> 
            
              Asset
              <Select value={metadata.asset} onValueChange={(value)=> setmetadata(metadata =>({
                ...metadata,
                asset:value
              }))}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Assest" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {SUPPORTED_ASSET.map((id)=><>
                        <SelectItem key = {id} value={id}>{id} </SelectItem>
                        </>)}
                    </SelectGroup>
                </SelectContent>
            </Select> 
              </div> }              
          </SheetDescription>
        </SheetHeader>
        
        <SheetFooter>
          <Button onClick={()=>{
            onSelect(
                //@ts-ignore
                selectedTrigger,
                metadata
            )
          }} type="submit">Create Trigger</Button>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
