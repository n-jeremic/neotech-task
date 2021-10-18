export default function TextOutput (props: { text: string | number, textClass: string }) {
    return (
        <div className={props.textClass }>{props.text}</div>
    )
}
