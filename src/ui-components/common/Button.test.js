import { unmountComponentAtNode, render } from 'react-dom'
import Button from './Button'
import { act } from 'react-dom/test-utils'

describe('Button react component', () => {
    let container = null
    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        unmountComponentAtNode(container)
        container.remove()
        container = null
    })

    it('should have corresponding button text which is passed as a prop', () => {
        const buttonClassPropMock = 'button'
        const buttonTextPropMock = 'start'
        const clickCbMock = () => {}

        act(() => {
            render(
                <Button buttonClass={buttonClassPropMock} buttonText={buttonTextPropMock} clickCb={clickCbMock}/>,
                container
            )
        })

        expect(container.textContent).toBe(buttonTextPropMock)
    })

    it('should have corresponding button classes which are passed as a prop', () => {
        const buttonClassPropMock = 'button button-start'
        const buttonTextPropMock = 'start'
        const clickCbMock = () => {}

        act(() => {
            render(
                <Button buttonClass={buttonClassPropMock} buttonText={buttonTextPropMock} clickCb={clickCbMock}/>,
                container
            )
        })

        expect(container.firstChild.className).toBe(buttonClassPropMock)
    })

    it('on click should invoke callback function which is passed as a prop', () => {
        const buttonClassPropMock = 'button'
        const buttonTextPropMock = 'start'
        const clickCbMock = jest.fn()

        act(() => {
            render(
                <Button buttonClass={buttonClassPropMock} buttonText={buttonTextPropMock} clickCb={clickCbMock}/>,
                container
            )
        })

        act(() => {
            container.firstChild.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        expect(clickCbMock).toHaveBeenCalledTimes(1)
    })
})
