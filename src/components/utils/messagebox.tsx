'use client'

import { Terminal, X } from "lucide-react";
import { ClassAttributes, HtmlHTMLAttributes, ReactNode, useState } from "react"
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";


type MessageBoxProps = {

        icon: ReactNode,
        title: ReactNode,
        description: ReactNode
    
}

export const MessageBox = ({ icon, title, description }: MessageBoxProps) => {
    const [closeAnnoun, setCloseAnnoun] = useState<boolean>(false);
    return (
        !closeAnnoun ?
            <Alert>
                {icon}
                <div className="flex justify-between">
                    <div>
                        <AlertTitle>{title}</AlertTitle>
                        <AlertDescription>
                           {description}
                        </AlertDescription>
                    </div>
                    <div className="self-center cursor-pointer" onClick={() => setCloseAnnoun(!closeAnnoun)} >
                        <X className="h-4 w-4" />
                    </div>
                </div>
            </Alert>
            : <></>
    )
}