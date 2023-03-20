import { Children, cloneElement, useState, useRef } from "react"

function FloatWindow({ children, onClick, onHover }) {
    const Initiator = Children.toArray(children).find(el => el.props.floatWindowInitiator)
    const Window = Children.toArray(children).find(el => el.props.floatWindow)

    const [show, setShow] = useState(false)
    const ref = useRef(null)

    const InitiatorProps = {
        ...Initiator.props,
        "data-show": show,
    }

    if (onClick) {
        InitiatorProps.onClick = e => {
            setShow(!show)

            if (Initiator.props.onClick) {
                Initiator.props.onClick(e)
            }
        }
    }

    if (onHover) {
        InitiatorProps.onMouseEnter = e => {
            if (onHover) {
                setShow(true)
            }

            if (Initiator.props.onMouseEnter) {
                Initiator.props.onMouseEnter(e)
            }
        }

        InitiatorProps.onMouseLeave = e => {
            if (onHover) {
                setShow(false)
            }

            if (Initiator.props.onMouseEnter) {
                Initiator.props.onMouseEnter(e)
            }
        }
    }

    const WindowProps = {
        ...Window.props,
        "data-show": show,
        onChange: value => {
            setShow(false)

            if (Window.props.onChange) {
                Window.props.onChange(value)
            }
        }
    }

    return (
        <div
            className={/*classes.container*/ ""}
            ref={ref}
            onBlur={e => {
                if (ref.current && !ref.current.contains(e.relatedTarget)) {
                    setShow(false)
                }
            }}
        >
            {
                Children.map(children, child => {
                    console.log(child.props)
                    if (child.props.floatWindowInitiator) {
                        return cloneElement(Initiator, InitiatorProps)
                    } else if (child.props.floatWindow && show) {
                        return cloneElement(Window, WindowProps)
                    }

                    return child
                })
            }
        </div>
    )
}

export default FloatWindow