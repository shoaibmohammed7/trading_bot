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




const SUPPORTED_TRIGGERS = [{
    id:"timer",
    title:"Timer",
    description:"Run this trigger after every x seconds/minutes"

},{
    id:"price-trigger",
    title:"Price-Trigger",
    description:"execute this if the price goes above/below the selected range"
}]




export const TriggerSheet= ({
    onSelect 
}: {
    onSelect:(kind: NodeKind, metadata:NodeMetadata) => void
})=> {
   
  const [metadata, setmetadata] = useState({});  
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
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {SUPPORTED_TRIGGERS.map(({id,title})=>
                        <SelectItem key = {id} value={id}>{title} </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select> 
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
