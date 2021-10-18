import { MouseEventHandler } from 'react'

export default function Button (props: { buttonClass: string, buttonText: string, clickCb: MouseEventHandler }) {
    return (
        <button onClick={props.clickCb} className={props.buttonClass}>{props.buttonText}</button>
    )
}
