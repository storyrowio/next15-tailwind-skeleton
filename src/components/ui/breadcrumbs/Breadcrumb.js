import {ArrowRight01Icon} from "hugeicons-react";
import classNames from "classnames";

export default function Breadcrumb(props) {
    const { items } = props;


    return (
        <div className="flex items-center gap-2">
            {items.map((e, i) => {
                const titleClassName = classNames({
                    'text-sm': true,
                    'text-neutral-500 cursor-pointer': i < items.length - 1,
                    'text-neutral-700 font-bold': i === items.length - 1
                });

                if (i < items.length - 1) {
                    return (
                        <div key={i} className="flex items-center gap-2">
                            <p className={titleClassName}>{e.title}</p>
                            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="2" cy="2" r="2" fill="#98A2B3"/>
                            </svg>
                        </div>
                    )
                }

                return <p key={i}  className={titleClassName}>{e.title}</p>
            })}
        </div>
    )
}
