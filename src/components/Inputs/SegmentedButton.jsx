import { SelectList } from "/src/components/Inputs/Select"
import LabelWrapper from "/src/components/Inputs/LabelWrapper"
import * as classes from "./SegmentedButton.module.sass"

function SegmentedButton({ label, helperText, list, selected, onSelect, ...buttonProps }) {
    return (
        <LabelWrapper
            label={label}
            helperText={helperText}
            className={classes.container}
        >
            <SelectList
                list={list}
                selected={selected}
                onSelect={onSelect}
                {...buttonProps}
            />
        </LabelWrapper>
    )
}

export default SegmentedButton