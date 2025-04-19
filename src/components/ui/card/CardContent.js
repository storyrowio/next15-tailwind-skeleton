export default function CardContent(props) {
    const { children } =  props
    return (
        <div className="py-3 px-4 border-b border-neutral-300">
            {children}
        </div>
    )
}
