import classNames from "classnames";
import {usePathname} from "next/navigation";
import {ArrowDown01Icon, MoreHorizontalCircle01Icon} from "hugeicons-react";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";

export default function AppSidebarItem(props) {
    const { item, isMiniSidebar = false, miniSidebarVisible } = props;
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { activeSidebarGroupMenu } = useSelector(state => state.theme);
    const Icon = item.icon;
    const active = pathname === item.href || item.paths?.includes(pathname);
    const showFullItem = !isMiniSidebar || miniSidebarVisible;

    const itemClassNames = classNames({
        'py-2.5 px-4 my-0.5 flex items-center gap-4 rounded-lg cursor-pointer': true,
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

    const ItemContent = () => {
        const textClassNames = classNames({
            'flex-1 text-sm text-neutral-500': true,
            'text-white': active,
            'hidden': !showFullItem
        })

        return (
            <>
                {item.icon && <ItemIcon/>}
                <div className={textClassNames}>{item.title}</div>
                {item.children && showFullItem && (
                    <ArrowDown01Icon size={14} className={active ? 'text-white' : 'text-neutral-400'}/>
                )}
            </>
        )
    };

    if (item.sectionTitle) {
        return (
            <li className="mt-5 mb-1 px-4 text-[10px] text-neutral-400 font-semibold uppercase tracking-widest hover:bg-transparent">
                {!showFullItem ? (
                    <MoreHorizontalCircle01Icon size={16} className="p-0 text-neutral-500"/>
                ) : item.sectionTitle}
            </li>
        )
    }

    if (item.children) {
        return (
            <div className="w-full">
                <div className={itemClassNames} onClick={() => dispatch(ThemeActions.setActiveSidebarGroupMenu(item.id))}>
                    <ItemContent/>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        activeSidebarGroupMenu.includes(item.id) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="pl-1 ml-6.5 border-l-2 border-neutral-200 rounded-md">
                        {item.children.map((child, idx) => (
                            <AppSidebarItem key={idx} item={child}/>
                        ))}
                    </div>
                </div>

            </div>
        );
    }

    return (
        <li>
            <div className={itemClassNames}>
                <ItemContent/>
            </div>
        </li>
    )
}
