import {SVGProps} from "react";

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
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
            d="M8 12.5v-2M6.713 2.38l-4.62 3.7c-.52.413-.853 1.287-.74 1.94l.887 5.307c.16.946 1.067 1.713 2.027 1.713h7.466c.954 0 1.867-.773 2.027-1.713l.886-5.307c.107-.653-.226-1.527-.74-1.94l-4.62-3.693c-.713-.574-1.866-.574-2.573-.007Z"
        />
    </svg>
)
export default HomeIcon