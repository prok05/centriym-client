import {SVGProps} from "react";

const MessagesIcon = (props: SVGProps<SVGSVGElement>) => (
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
            strokeWidth={1.5}
            d="M8 1.833V6.5l1.333-1.333M8 6.5 6.667 5.167M1.32 9.167h2.94c.253 0 .48.14.593.366l.78 1.56c.227.454.687.74 1.193.74H9.18c.506 0 .966-.286 1.193-.74l.78-1.56a.666.666 0 0 1 .593-.366h2.907"
        />
        <path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.667 3.253c-2.36.347-3.333 1.734-3.333 4.58V10.5c0 3.333 1.333 4.667 4.666 4.667h4c3.334 0 4.667-1.334 4.667-4.667V7.833c0-2.846-.973-4.233-3.333-4.58"
        />
    </svg>
)
export default MessagesIcon