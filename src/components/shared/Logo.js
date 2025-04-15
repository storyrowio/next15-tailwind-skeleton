import Image from "next/image";

export default function Logo(props) {
    let {
        width = 120,
        height = 21,
        icon = false,
        className
    } = props;
    const logoSrc = icon ? '/images/logos/logo-icon.svg' : '/images/logos/logo.svg';

    if (icon) {
        width = 40;
        height = 40 ;
    }

    return (
        <div
            className={`relative ${className}`}
            style={{ width, height }}>
            <Image src={logoSrc} alt="logo" fill style={{ objectFit: 'contain' }}/>
        </div>
    )
}
