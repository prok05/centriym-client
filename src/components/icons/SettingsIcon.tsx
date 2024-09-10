import {SVGProps} from "react";

const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
        {...props}
    >
        <path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M8 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
        <path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M1.333 9.087V7.913A1.27 1.27 0 0 1 2.6 6.647c1.207 0 1.7-.854 1.093-1.9-.346-.6-.14-1.38.467-1.727l1.154-.66a1.113 1.113 0 0 1 1.52.4l.073.127c.6 1.046 1.586 1.046 2.193 0l.074-.127a1.113 1.113 0 0 1 1.52-.4l1.153.66c.607.347.813 1.127.466 1.727-.606 1.046-.113 1.9 1.094 1.9a1.27 1.27 0 0 1 1.267 1.266v1.174a1.27 1.27 0 0 1-1.267 1.266c-1.207 0-1.7.854-1.094 1.9.347.607.14 1.38-.466 1.727l-1.153.66a1.113 1.113 0 0 1-1.52-.4l-.074-.127c-.6-1.046-1.587-1.046-2.193 0l-.074.127a1.113 1.113 0 0 1-1.52.4l-1.153-.66a1.266 1.266 0 0 1-.467-1.727c.607-1.046.114-1.9-1.093-1.9a1.27 1.27 0 0 1-1.267-1.266Z"
        />
    </svg>
)
export default SettingsIcon