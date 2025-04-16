import classNames from "classnames";
import {useDispatch, useSelector} from "store";
import {usePathname} from "next/navigation";

export default function AppSidebarItem(props) {
    const { item, parent } = props;
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { activeSidebarGroupMenu } = useSelector(state => state.theme);
    const Icon = item.icon;
    const active = pathname === item.href || item.paths?.includes(pathname);

    const itemClassNames = classNames({
        'py-2.5 px-4 my-0.5 flex gap-4 rounded-lg cursor-pointer': true,
        'bg-primary-500 text-white hover:bg-primary-700 active:bg-primary-700 focus:bg-primary-700': active,
    });

    const ItemIcon = () => {
        return (
            <Icon
                size={18}
                strokeWidth={2}
                className={`${active ? 'text-white' : 'text-neutral-400'}`}/>
        )
    };

    if (item.children) {
        return (
            <li>
                <details open={activeSidebarGroupMenu.includes(item.id)}>
                    <summary className={itemClassNames}>
                        {item.icon && <ItemIcon/>}
                        <div className="flex-1">{item.title}</div>
                    </summary>
                    <ul className="mt-1.5 ms-0 p-1.5 bg-neutral-100 rounded-xl">
                        {item.children?.map((e, i) => (
                            <AppSidebarItem key={i} item={e} parent={item.id}/>
                        ))}
                    </ul>
                </details>
            </li>
        )
    }

    return (
        <li>
            <div className={itemClassNames}>
                {item.icon && <ItemIcon/>}
                <div className="flex-1 text-sm">
                    {parent && <span className="mr-4 text-neutral-400 text-xs">&#x25CF;</span>}
                    {item.title}
                </div>
            </div>
        </li>
    )
}
