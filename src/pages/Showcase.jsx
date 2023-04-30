import { useLanguage } from "/src/utils/hooks"
import Snackbar from "/src/components/Snackbar"
import { Label, InputLabeled, Button, SegmentedButtonLabeled, SelectLabeled } from "/src/components/Inputs"
import { IconSearch } from "/src/components/Icons/20/Emph"
import * as classes from "./Showcase.module.sass"

const Labels = () => <>
    <Label
        label="Označenie"
    >
        <div className={classes.comp}>{"<<komponent>>"}</div>
    </Label>

    <Label
        helperText="Pomocný text"
    >
        <div className={classes.comp}>{"<<komponent>>"}</div>
    </Label>

    <Label
        labelInput={<input style={{"min-width": "8rem"}} value="textový vstup"></input>}
    >
        <div className={classes.comp} style={{"width": "20rem"}}>{"<<komponent>>"}</div>
    </Label>

    <div className={classes.br}></div>

    <Label
        labelInput={<input style={{"max-width": "4rem"}} value="100"></input>}
        label="Vstup parametra x"
        helperText="Len číselné hodnoty"
    >
        <div className={classes.comp} style={{"width": "18rem"}}>{"<<komponent>>"}</div>
    </Label>

    <Label
        labelInput={<input style={{"max-width": "4rem"}} value="100"></input>}
        label="Vstup parametra x"
        helperText="Len číselné hodnoty"
        disabled
    >
        <div className={classes.comp} style={{"width": "18rem"}}>{"<<komponent>>"}</div>
    </Label>

    <div className={classes.br}></div>

    <Label
        labelInput={<input style={{"max-width": "4rem"}} value="100"></input>}
        label="Vstup parametra x"
        helperText="Len číselné hodnoty"
        invalid
    >
        <div className={classes.comp} style={{"width": "18rem"}}>{"<<komponent>>"}</div>
    </Label>

    <Label
        labelInput={<input style={{"max-width": "4rem"}} value="100"></input>}
        label="Vstup parametra x"
        helperText="Len číselné hodnoty"
        invalid
        disabled
    >
        <div className={classes.comp} style={{"width": "18rem"}}>{"<<komponent>>"}</div>
    </Label>
</>

const Inputs = () => <>
    <InputLabeled
        label="Označenie"
        className={classes.textInput}
    />

    <InputLabeled
        label="Označenie"
        value="hodnota"
        className={classes.textInput}
    />

    <div className={classes.br}></div>
    
    <InputLabeled
        label="Hľadať"
        Icon={<IconSearch />}
        value="výraz"
        helperText="Podľa názvu"
        className={classes.textInput}
    />

    <InputLabeled
        label="Hľadať"
        Icon={<IconSearch />}
        value="výraz"
        helperText="Podľa názvu"
        className={classes.textInput}
    />

    <InputLabeled
        label="Hľadať"
        Icon={<IconSearch />}
        value="výraz"
        helperText="Podľa názvu"
        disabled
        className={classes.textInput}
    />

    <div className={classes.br}></div>

    <InputLabeled
        label="Hľadať"
        Icon={<IconSearch />}
        value="výraz"
        helperText="Podľa názvu"
        customValidity="something is wrong"
        className={classes.textInput}
    />
    
    <InputLabeled
        label="Hľadať"
        Icon={<IconSearch />}
        value="výraz"
        helperText="Podľa názvu"
        customValidity="something is wrong"
        className={classes.textInput}
        disabled
    />

    <div className={classes.br}></div>

    <InputLabeled
        label="Parameter X"
        type="range"
        value="50"
        min="0"
        max="100"
        helperText="Len rozsahové hodnoty"
        labelInput={<input value="50"/>}
        className={classes.rangeInput}
    />

    <InputLabeled
        label="Parameter X"
        type="range"
        value="50"
        min="0"
        max="100"
        helperText="Len rozsahové hodnoty"
        labelInput={<input value="50"/>}
        className={classes.rangeInput}
    />

    <div className={classes.br}></div>

    <InputLabeled
        label="Parameter X"
        type="range"
        value="50"
        min="0"
        max="100"
        helperText="Len rozsahové hodnoty"
        labelInput={<input value="50"/>}
        className={classes.rangeInput}
        disabled
    />

    <div className={classes.br}></div>

    <InputLabeled
        label="Parameter X"
        type="range"
        value="50"
        min="0"
        max="100"
        helperText="Len rozsahové hodnoty"
        labelInput={<input value="50"/>}
        className={classes.rangeInput}
        customValidity="Something is wrong"
    />

    <InputLabeled
        label="Parameter X"
        type="range"
        value="50"
        min="0"
        max="100"
        helperText="Len rozsahové hodnoty"
        labelInput={<input value="50"/>}
        className={classes.rangeInput}
        customValidity="Something is wrong"
        disabled
    />
</>

const Buttons = () => <>
    <Button>Tlačidlo</Button>
    <Button>Tlačidlo</Button>
    <Button>Tlačidlo</Button>
    <Button>Tlačidlo</Button>

    <div className={classes.br}></div>

    <Button IconTop={<IconSearch/>} IconLeft={<IconSearch/>}>
        Hľadať
    </Button>
    <Button IconTop={<IconSearch/>} IconRight={<IconSearch/>}>
        Hľadať
    </Button>
    <Button IconTop={<IconSearch/>}>
        Hľadať
    </Button>
    <Button IconLeft={<IconSearch/>} />

    <div className={classes.br}></div>

    <Button IconLeft={<IconSearch/>} outlined>
        Hľadať
    </Button>
    <Button IconLeft={<IconSearch/>} outlined disabled>
        Hľadať
    </Button>
    <Button IconLeft={<IconSearch/>} outlined dangerous>
        Hľadať
    </Button>
    <Button IconLeft={<IconSearch/>} outlined dangerous disabled>
        Hľadať
    </Button>

    <div className={classes.br}></div>

    <Button IconRight={<IconSearch/>}>
        Hľadať
    </Button>
    <Button IconRight={<IconSearch/>} disabled >
        Hľadať
    </Button>
    <Button IconRight={<IconSearch/>} dangerous >
        Hľadať
    </Button>
    <Button IconRight={<IconSearch/>} disabled dangerous>
        Hľadať
    </Button>

    <div className={classes.br}></div>

    <div className={classes.compOutlined}>
        <div className={classes.comp}>{"<<komponent>>"}</div>
    </div>

    <div className={classes.compOutlinedBlock}>
        <div className={classes.comp}>{"<<komponent>>"}</div>
    </div>
</>

const SegButtons = () => <>
    <SegmentedButtonLabeled
        label="označenie"
        list={["Možnosť 1", "Možnosť 2"]}
        value="Možnosť 1"
    />
    <SegmentedButtonLabeled
        label="označenie"
        list={["Možnosť 1", "Možnosť 2"]}
        value="Možnosť 2"
    />

    <div className={classes.br}></div>

    <SegmentedButtonLabeled
        label="Písmená"
        list={["Abc", "Def", "ghi", "jkl", "mn"]}
        helperText="Abecedné zoradenie"
        disabledList={["Def", "mn"]}
    />

    <SegmentedButtonLabeled
        label="Písmená"
        list={["Abc", "Def", "ghi", "jkl", "mn"]}
        helperText="Abecedné zoradenie"
        value="ghi"
        disabledList={["Def", "mn"]}
    />
</> 

const Selects = () => <>
    <SelectLabeled
        label="označenie"
        list={["Možnosť 1", "Možnosť 2"]}
        value="Možnosť 1"
    />
    <SelectLabeled
        label="označenie"
        list={["Možnosť 1", "Možnosť 2"]}
        value="Možnosť 1"
        forceShow={true}
    />
    <SelectLabeled
        label="označenie"
        list={["Možnosť 1", "Možnosť 2"]}
        value="Možnosť 1"
        forceShow={true}
    />
    <SelectLabeled
        label="označenie"
        list={["Možnosť 1", "Možnosť 2"]}
        value="Možnosť 2"
        forceShow={true}
    />

    <div className={classes.br}></div>

    <div className={classes.shifted}>
        <SelectLabeled
            label="Písmená"
            list={["Abc", "Def", "ghi", "jkl", "mn"]}
            helperText="Abecedné zoradenie"
            allowBlank
        />

        <SelectLabeled
            label="Písmená"
            list={["Abc", "Def", "ghi", "jkl", "mn"]}
            helperText="Abecedné zoradenie"
            allowBlank
            forceShow
        />
        <SelectLabeled
            label="Písmená"
            list={["Abc", "Def", "ghi", "jkl", "mn"]}
            helperText="Abecedné zoradenie"
            allowBlank
            forceShow
            value="Def"
        />
        <SelectLabeled
            label="Písmená"
            list={["Abc", "Def", "ghi", "jkl", "mn"]}
            helperText="Abecedné zoradenie"
            allowBlank
            value="Def"
            disabled
        />
    </div>
</>

function NotFound() {
    const language = useLanguage()

    return (
        <div className={classes.container}>
            <Selects/>
        </div>
    )
}

export default NotFound