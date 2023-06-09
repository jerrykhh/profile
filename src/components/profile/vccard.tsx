import React from "react";
import { Icon, Icons } from "../utils/icons"
import Link from "next/link";

export const Vccard = (props: {
    items: {
        [key: string]: {
            title: string;
            url: string;
        }
    }
}): JSX.Element => {

    return (<React.Fragment>
        {Object.keys(props.items).map((key: string) => {
            const VccardItem = Icons[key];
            const profileItem = props.items[key];
            return (
                <Link
                    key={key}
                    href={profileItem.url}
                    target="_blank"
                    rel="noreferrer">
                    <div className="px-1 py-2" >
                        <div className="flex gap-4">
                            <VccardItem className="w-6 h-6" />
                            {profileItem.title}
                        </div>
                    </div>
                </Link>
            )
        })
        }

    </React.Fragment >)

}