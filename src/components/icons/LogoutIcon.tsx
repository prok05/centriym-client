import {SVGProps} from "react";

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
        {...props}
    >
        <path
            stroke="#F13E3E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5.933 5.54c.207-2.4 1.44-3.38 4.14-3.38h.087c2.98 0 4.173 1.193 4.173 4.173v4.347c0 2.98-1.193 4.173-4.173 4.173h-.087c-2.68 0-3.913-.966-4.133-3.326M10 8.5H2.414M3.9 6.267 1.667 8.5 3.9 10.733"
        />
    </svg>
)
export default LogoutIcon