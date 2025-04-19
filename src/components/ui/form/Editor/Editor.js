'use client'

import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import './Quill.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function Editor(props) {
    const { value, onChange } = props;

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={(value) => onChange(value)}
            placeholder="Type here..."/>
    )
}
