export default function Input(props: InputProps) {
    return (
        <input
            className="shadow appearance-none rounded-full w-full py-2 px-14 text-[#6B6B6B] leading-tight focus:outline-none focus:shadow-outline text-center"
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            id={props.id}
        />
    )
}

type InputProps = {
    name: string,
    type: string,
    placeholder: string,
    id?: string
}