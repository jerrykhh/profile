import React from "react"
import { Pin } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const TodoCard = (props: { todolist: string[] }) => {
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-stretch gap-x-2">
              <Pin className="inline-block h-3 w-3 text-gray-400" />
              <h5>Pined todo list</h5>
            </div>
          </CardTitle>
          <CardDescription>I need to do it.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ul className="list-disc px-4">
            {props.todolist.map((ctx: string, i) => (
              <li key={i}>{ctx}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default TodoCard
