import { InputMask, MASK } from './index'

function Example() {
    return (
        <div>
            <InputMask
                value="12.12.2001"
                mask={MASK.date}
                intent='danger'
            />
        </div>
    )
}

export {
    Example
}