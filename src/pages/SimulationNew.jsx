import { SegmentedButton, Input, Button } from "/src/components/Inputs"
import { IconUploadFile, IconAdd, IconCheck } from "/src/components/Icons/Emph/24"
import { useState } from "react"
import * as classes from "./SimulationNew.module.sass"
 
function SimulationNewChoose() {
    return (
        <div className={classes.containerChoose}>
            <Button outlined IconTop={<IconUploadFile/>}>Nahrať zo súboru</Button>
            <Button outlined IconTop={<IconAdd/>} to="create">Vytvoriť</Button>
        </div>
    )
}

function SimulationNewCreate() {
    return (
        <form>
            <div className={classes.top}>
                <Input
                    label="Názov"
                />
                <SegmentedButton
                    label="Dimenzionalita"
                    list={["1D", "2D"]}
                    selected={0}
                />

                <SegmentedButton
                    label="Spôsob simulovania"
                    list={["BP", "FP", "FP-T"]}
                    selected={0}
                />
            </div>
            <div className={classes.middle}>
                <div className={classes.left}>
                    <Input
                        label="Časový krok"
                        type="range"
                        labelInput={
                            <input value="0000000000" />
                        }
                    />
                    <Input
                        label="Časový krok"
                        type="range"
                        labelInput={
                            <input value="0000000000" />
                        }
                    />
                    <Input
                        label="Časový krok"
                        type="range"
                        labelInput={
                            <input value="0000000000" />
                        }
                    />
                </div>
                <div className={classes.right}>
                    <Input
                        label="Časový krok"
                        type="range"
                        labelInput={
                            <input value="0000000000" />
                        }
                    />
                    <Input
                        label="Časový krok"
                        type="range"
                        labelInput={
                            <input value="0000000000" />
                        }
                    />
                    <Input
                        label="Časový krok"
                        type="range"
                        labelInput={
                            <input value="0000000000" />
                        }
                    />
                </div>
            </div>
            <div className={classes.bottom}>
                <Button outlined IconLeft={<IconCheck/>}>Dokončiť</Button>
            </div>
        </form>
    )
}

export { 
    SimulationNewChoose,
    SimulationNewCreate
}