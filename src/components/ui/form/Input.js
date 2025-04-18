export default function Input(props) {
    const {
        icon,
        validator,
        ...rest
    } = props;

    return (
        <div>
            <label className="input input-primary validator w-full">
                {props?.icon}
                <input {...rest}/>
            </label>
            <p className="validator-hint hidden">
                {validator}
            </p>
        </div>
    )
}
