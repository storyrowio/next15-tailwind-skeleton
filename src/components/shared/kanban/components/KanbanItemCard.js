import Card from "components/ui/card/Card";
import CardContent from "components/ui/card/CardContent";
import classNames from "classnames";
import Image from "next/image";

const Participants = () => {
    return (
        <div className="avatar-group -space-x-2">
            {Array(4).fill('').map((e, i) => (
                <div className="avatar">
                    <div className="w-5">
                        <Image
                            alt={`avatar-${i}`}
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            width={20}
                            height={20}/>
                    </div>
                </div>
            ))}
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-5">
                    <span className="text-[10px]">+9</span>
                </div>
            </div>
        </div>
    )
};

export default function KanbanItemCard(props) {
    const {item, isDragging} = props;

    const itemClassNames = classNames({
        'mb-3 rounded-xl': true,
        // 'border-blue-500': item.status === 'todo',
        // 'border-yellow-500': item.status === 'in-progress',
        // 'border-green-500': item.status === 'done',
        'shadow-lg': isDragging
    });

    const labels = ['Backend', 'Frontend'];

    return (
        <Card className={itemClassNames}>
            <div className="py-2 px-4">
                <div className="badge badge-soft badge-xs badge-error">Urgent</div>
                <p className="mt-2 text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-gray-600 mt-2">{item.description}</p>
                <div className="max-w-full mt-7 flex flex-wrap gap-2">
                    {labels.map((e, i) => (
                        <div key={i} className="badge badge-soft badge-xs badge-error">{e}</div>
                    ))}
                </div>
                <div className="mt-1">
                    <Participants/>
                </div>
            </div>
        </Card>
    )
}
