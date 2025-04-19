import classNames from "classnames";

export default function Card(props) {
    const { children, className } = props;

    const cardClassNames = classNames({
        'bg-white rounded-3xl border border-neutral-200 shadow-lg/3': true,
        [className]: true
    });

    return (
        <div className={cardClassNames}>
            {children}
        </div>
    )
}
