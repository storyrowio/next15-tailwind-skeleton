export default function PageTitle(props) {
    const { title, children } = props;

    return (
        <div className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <h2 className="text-2xl font-bold text-neutral-700">{title}</h2>
            <div>
                {children}
            </div>
        </div>
    )
}
