"use client";

import { useContext } from "react";
import { IArtefact } from "../interfaces/IArtefact";
import { ICharacterRule } from "../interfaces/ICharacterRule";
import { Card } from "./Card";
import Icon from "./Icon";
import InfoDiv from "./Tooltip";
import { ThemeContext } from "./ThemeContext";

export default function ArtefactCard({equip, rule} : {equip: IArtefact, rule: ICharacterRule}) {


    const isPercentage = (s: string) => s.includes("%")
    const {colorDirector} = useContext(ThemeContext)
    const fontWeight = [
        "font-light", //0-1
        "font-normal", //1-2
        "font-medium", // 2-3
        "font-semibold", //3-4
        "font-bold", //4-5
        "font-bold"
    ]

    let statList = []
    let div = 0;
    let mvs = rule.stats.maxValues()
    let mainIndex = 0
    if (mvs[mainIndex].k == equip.mainStatName) {
        mainIndex += 1
    }

    div = 6 * mvs[mainIndex].v
    for (let i = mainIndex + 1; i < mainIndex + 4; ++i) {
        div += mvs[i].v
    }
    div = Math.max(1, div)

    let statLine = <div className="w-full flex flex-row items-center">
                        <div className="text-left basis-3/5 max-h-4">
                            <Icon n={equip.mainStatName}/>
                        </div>
                        <div className={"text-right basis-2/5"}>
                            {isPercentage(equip.mainStatName) ? (equip.mainStatValue * 100).toFixed(1): equip.mainStatValue}{isPercentage(equip.mainStatName) ? "%" : ""}
                        </div>
                    </div>

    statList.push(
        <li className="flex justify-between place-items-center font-bold">
            <div className="flex flex-col w-full py-1">
                {statLine}
            </div>
        </li>
    )

    for (let i = 0; i < equip.subStatNames.length; ++i) {
        let liClassName = "flex justify-between place-items-center"
        let rolls = []
        let bar = 0
        if (equip.rolls[i] > 0) {
            for (bar = 1; bar < equip.rolls[i]; ++bar) {
                rolls.push(<div className={"h-1 col-span-1 ".concat(colorDirector.bgAccent(4))} />)
            }

            let rest = equip.rolls[i] - bar + 1;
            rolls.push(<div className={"h-1 w-full col-span-1 flex flex-row ".concat(colorDirector.bgAccent(6))}>
                <div className={"h-1 ".concat(colorDirector.bgAccent(4))} style={{width: (rest*100).toString().concat("%")}}/>
                </div>)

            for (bar = bar + 1; bar <= 5; ++bar) {
                rolls.push(<div className={"h-1 col-span-1 ".concat(colorDirector.bgAccent(6))} />)
            }
        }

        let statLineClassname = "w-full flex flex-row items-center ".concat(fontWeight[Math.floor(equip.rolls[i])])
        let statLine = <div className={statLineClassname}>
                            <div className="text-left basis-3/5 max-h-4">
                                <Icon n={equip.subStatNames[i]}/>
                            </div>
                            <div className={"text-right basis-2/5"}>
                                {isPercentage(equip.subStatNames[i]) ? (equip.subStatValues[i] * 100).toFixed(1): equip.subStatValues[i]}{isPercentage(equip.subStatNames[i]) ? "%" : ""}
                            </div>
                        </div>
        let infoLine = <div>
            <p>
            {"".concat("Rolls = ", (equip.rolls[i]).toFixed(1))}
            </p><p>
                {"Score = ".concat((equip.rolls[i] * rule.stats.get(equip.subStatNames[i])).toFixed(1))}
                </p>
            </div>
        let scoreLineDisplay = <div className="grid grid-cols-5 gap-x-0.5">
            {rolls}
        </div>
        statList.push(
        <li className={liClassName}>
            <div className="flex flex-col w-full py-1">
                {statLine}
                
                    <InfoDiv child={scoreLineDisplay} info={infoLine} />
            </div>
        </li>
        )
    }
    let score = 0
    for (let i = 0; i < equip.subStatNames.length; ++i) {
        score += equip.rolls[i] * rule.stats.get(equip.subStatNames[i])
    }
    
    let infoLine = <p>{score.toFixed(1)}/{div}</p>
    let scoreLine = <div className="w-full flex flex-row items-center align-baseline font-semibold">
        <div className="text-left basis-3/5 truncate">
            Score :
        </div>
        <div className={"text-right basis-2/5"}>
            {(score/div*100).toFixed(0).concat("%")}
        </div>
    </div>

    let content = <div className="flex flex-col">
    <div className="aspect-square grad-5star basis-1/5 flex items-center justify-center rounded-t-md">
        <img src={equip.icon} className="max-w-full max-h-full"/>
    </div>
    <div className="basis-4/5 px-1 py-2">
        <ul>
            {statList}
        </ul>
        <div className="w-full flex flex-row">
            <InfoDiv child={scoreLine} info={infoLine} childClassname="w-full"/>
        </div>
    </div>
</div>

    return (
        <Card c={content}/>
    )
}