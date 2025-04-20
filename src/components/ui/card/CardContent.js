import classNames from "classnames";

export default function CardContent(props) {
    const { children, className } =  props;

    const contentClassNames = classNames({
        'py-3 px-4': true,
        [className]: true
    });

    return (
        <div className={contentClassNames}>
            {children}
        </div>
    )
}
