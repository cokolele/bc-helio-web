import api from "/src/utils/api"
import { useNavigate } from "react-router-dom"
import { useAppState } from "/src/states/app"
import { SegmentedButtonLabeled, InputLabeled, Button } from "/src/components/Inputs"
import { IconCheck, IconLoaderSpinning } from "/src/components/Icons/24/Emph"
import { useLanguage } from "/src/utils/hooks"
import { useState } from "react"
import { map as mapRange } from "/src/utils/number"
import { typesList, dimensionsList } from "/src/utils/simulation"
import * as classes from "./SimulationNewCreate.module.sass"

const useFakeData = true

const sendForm = async (data, state, dispatch, language) => {
    if (useFakeData) {
        const newId = crypto.randomUUID()

        dispatch({
            type: "setSimulations",
            simulations: [
                ...(state.simulations.list || []),
                {
                    "uuid": newId,
                    "name": data.name,
                    "billionsOfSimulations": data.billionsOfSimulations,
                    "billionsOfSimulationsLeft": data.billionsOfSimulations,
                    "resultMap": {},
                    "nodeSimulationApiModelList": [],
                    "createTime": new Date().toISOString(),
                    "beginTime": null,
                    "endTime": null,
                    "simulationType": data.simulationType,
                    "dt": data.dt,
                    "kparKper": data.kparKper,
                    "k0": data.k0,
                    "v": data.v,
                    "mu": data.mu,
                    "finished": false
                }
            ]
        })

        return newId
    }

    try {
        const sent = await api.post("/simulation/", data)
        const all = await api.get("/simulation/all")
        return all.json.reverse().find(({ name }) => name == data.name).uuid
    } catch(e) {
        if (e instanceof api.ApiNetworkError || e instanceof api.ApiBodyParseError) {
            dispatch({
                type: "setError",
                message: language["api.error.unsuccessful_request"]
            })
        } else if (e instanceof api.ApiResponseError) {
            dispatch({
                type: "setError",
                message: language["api.error.send.invalid_response"]
            })
        } else {
            dispatch({
                type: "setError",
                message: language["api.error.invalid_response"]
            })
        }
    }
}

function SimulationNewCreate() {
    const [state, dispatch] = useAppState()
    const language = useLanguage()
    const navigate = useNavigate()
    const [sending, setSending] = useState(false)

    const [name, setName] = useState("")
    const [dimension, setDimension] = useState(dimensionsList[0])
    const [type, setType] = useState(typesList[0])

    const [n, setN] = useState(50000)
    const [dt, setDt] = useState(10)
    const [dtMapping, setDtMapping] = useState(50)
    const [v, setV] = useState(800)
    const [k, setK] = useState("5.5e22")
    const [kMapping, setKMapping] = useState(5.5)
    const [kpp, setKpp] = useState(0.05)
    const [mu, setMu] = useState(0.5)

    const onSubmit = async (e) => {
        e.preventDefault()
        setSending(true)

        const timeStart = Date.now()

        const sent = await sendForm({
            name,
            simulationType: (dimension == "1D" ? "ONE_DIMENSION_" : "TWO_DIMENSION_") + type,
            billionsOfSimulations: n,
            dt,
            v,
            k0: Number(k),
            kparKper: kpp,
            mu
        }, state, dispatch, language)

        const elapsed = Date.now() - timeStart
        
        if (sent) {
            if (elapsed < 2500) {
                await new Promise(resolve => setTimeout(resolve, 2500 - elapsed))
            }

            navigate("/simulations/" + sent)
        }

        setSending(false)
    }

    return (
        <form onSubmit={onSubmit} className={classes.container}>
            <div className={classes.top}>
                <InputLabeled
                    label={language["label.name"]}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <SegmentedButtonLabeled
                    label={language["label.dimensionality"]}
                    list={dimensionsList}
                    value={dimension}
                    onChange={setDimension}
                />
                <SegmentedButtonLabeled
                    label={language["label.simulation_type"]}
                    list={typesList}
                    value={type}
                    onChange={setType}
                    disabledList={dimension == "1D" ? ["FT"] : null}
                />
            </div>
            <div className={classes.middle}>
                <div className={classes.left}>
                    <InputLabeled
                        label={language["label.iteration_count"]}
                        labelInput={
                            <input
                                value={n}
                                onChange={e => setN(parseInt(e.target.value) || 1)}
                                type="number"
                            />
                        }
                        type="range"
                        value={n}
                        min={0}
                        max={100000}
                        step={1000}
                        onChange={e => setN(parseInt(e.target.value) || 1)}
                    />
                    <InputLabeled
                        label={language["label.time_delta"]}
                        labelInput={
                            <input
                                value={dt}
                                onChange={e => setDt(parseFloat(e.target.value) || 0.1)}
                                type="number"
                            />
                        }
                        type="range"
                        value={dtMapping}
                        min={0}
                        max={100}
                        step={1}
                        onChange={e => {
                            setDtMapping(e.target.value)

                            if (e.target.value < 25) {
                                const dt = mapRange(e.target.value, 0, 25, 0.1, 0.99)
                                setDt(+dt.toFixed(2))
                            } else if (e.target.value < 50) {
                                const dt = mapRange(e.target.value, 26, 50, 1, 10)
                                setDt(Math.round(dt))
                            } else if (e.target.value < 75) {
                                const dt = mapRange(e.target.value, 51, 75, 11, 100)
                                setDt(Math.round(dt))
                            } else if (e.target.value <= 100) {
                                const dt = mapRange(e.target.value, 76, 100, 101, 1000)
                                setDt(Math.round(dt))
                            }
                        }}
                    />
                    <InputLabeled
                        label={language["label.solar_wind_speed"]}
                        labelInput={
                            <input
                                value={v}
                                onChange={e => setV(parseInt(e.target.value) || "")}
                                onBlur={e => setV(parseInt(e.target.value) || 800)}
                                type="number"
                            />
                        }
                        type="range"
                        value={v}
                        min={100}
                        max={1500}
                        step={100}
                        onChange={e => setV(parseInt(e.target.value))}
                    />
                </div>
                <div className={classes.right}>
                    <InputLabeled
                        label={language["label.dif_coef"]}
                        labelInput={
                            <input
                                value={k}
                                onChange={e => setK(e.target.value)}
                                type="number"
                            />
                        }
                        type="range"
                        value={kMapping}
                        min={1}
                        max={10}
                        step={0.1}
                        onChange={e => {
                            setKMapping(e.target.value)
                            setK(e.target.value == "10" ? "1e23" : e.target.value + "e22")
                        }}
                    />
                    <InputLabeled
                        label={language["label.kparkper"]}
                        labelInput={
                            <input
                                value={kpp}
                                onChange={e => setKpp(parseFloat(e.target.value || 0))}
                                type="number"
                                disabled={dimension == "1D"}
                            />
                        }
                        type="range"
                        value={kpp}
                        min={0}
                        max={0.1}
                        step={0.001}
                        onChange={e => setKpp(parseFloat(e.target.value) || 0.01)}
                        disabled={dimension == "1D"}
                    />
                    <InputLabeled
                        label={language["label.mu_width_cos"]}
                        labelInput={
                            <input
                                value={mu}
                                onChange={e => setMu(e.target.value ? parseFloat(e.target.value) : e.target.value)}
                                type="number"
                                disabled={dimension != "2D" || type != "BP"}
                            />
                        }
                        type="range"
                        value={mu}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={e => setMu(parseFloat(e.target.value))}
                        disabled={dimension != "2D" || type != "BP"}
                    />
                </div>
            </div>
            <div className={classes.bottom}>
                <Button
                    outlined
                    IconLeft={sending ? <IconLoaderSpinning /> : <IconCheck/>}
                    type="submit"
                    disabled={sending}
                >
                    { language["button.create_simulation_confirm"] }
                </Button>
            </div>
        </form>
    )
}

export default SimulationNewCreate