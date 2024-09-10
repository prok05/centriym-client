import {SVGProps} from "react";

const LessonsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
        {...props}
    >
        <path
            stroke={props.stroke}
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="m14.447 10.033-.267 3.334c-.1 1.02-.18 1.8-1.986 1.8H3.806c-1.807 0-1.887-.78-1.987-1.8l-.266-3.334a2.02 2.02 0 0 1 .433-1.46L2 8.56c.367-.447.92-.727 1.54-.727h8.92a1.976 1.976 0 0 1 1.54.734c.327.393.507.906.447 1.466Z"
        />
        <path
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M2.333 8.12V4.687c0-2.267.567-2.834 2.834-2.834h.846c.847 0 1.04.254 1.36.68l.847 1.134c.213.28.34.453.907.453h1.7c2.267 0 2.833.567 2.833 2.833v1.194M6.287 11.833h3.426"
        />
    </svg>
)
export default LessonsIcon