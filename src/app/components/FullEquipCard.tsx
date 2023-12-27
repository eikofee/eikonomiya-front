import AscensionCard from "./AscensionCard";
import { ICharacterRule } from "../interfaces/ICharacterRule";
import ArtefactCard from "./ArtefactCard";
import WeaponCard from "./WeaponCard";
import { useState } from "react";
import { Card } from "./Card";
import { ICharacterData } from "@/server/gamedata/ICharacterData";
import { EArtefact } from "@/server/gamedata/enums/EArtefact";
import { IArtefact } from "@/server/gamedata/IArtefact";

export function FullEquipCard({character, rule}:{character : ICharacterData, rule: ICharacterRule}) {

    let [scoreFleur, setScoreFleur] = useState(0)
    let [scorePlume, setScorePlume] = useState(0)
    let [scoreSablier, setScoreSablier] = useState(0)
    let [scoreCoupe, setScoreCoupe] = useState(0)
    let [scoreCouronne, setScoreCouronne] = useState(0)

    const totalScore = (scoreFleur + scorePlume + scoreSablier + scoreCoupe + scoreCouronne) / 5
    const totalScoreContent = <div className="h-full flex flex-row items-center align-baseline font-semibold">
    <p className="text-center w-full ml-2">
        Score : {totalScore.toFixed(0).concat("%")}
    </p>
</div>

    const arteTypes = [EArtefact.FLEUR, EArtefact.PLUME, EArtefact.SABLIER, EArtefact.COUPE, EArtefact.COURONNE]
    let artes : IArtefact[] = []
    for (let i = 0; i < arteTypes.length; ++i) {
        for (let j = 0; j < character.artefacts.length; ++j) {
            if (character.artefacts[j].type == arteTypes[i]) {
                artes.push(character.artefacts[j])
            }
        }
    }
    let div = 0;
    let mvs = []
    for (let i = 0; i < rule.stats.length; ++i) {
        mvs.push(rule.stats[i])
    }
    mvs.sort((a, b) => b.value - a.value)

    return (
        <div className="max-w-5xl basis-1/4 grid lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-2 gap-2 p-1 bg-inherit h-full">
                        <div className="flex flex-col gap-y-1">
                            <AscensionCard char={character} />
                            <Card c={totalScoreContent} cname={"grow items-center"} />
                        </div>
                        <WeaponCard equip={character.weapon} rule={rule}/>
                        <ArtefactCard equip={artes[0]} rule={rule} scoreState={setScoreFleur} sortedStats={mvs}/>
                        <ArtefactCard equip={artes[1]} rule={rule} scoreState={setScorePlume} sortedStats={mvs}/>
                        <ArtefactCard equip={artes[2]} rule={rule} scoreState={setScoreSablier} sortedStats={mvs}/>
                        <ArtefactCard equip={artes[3]} rule={rule} scoreState={setScoreCoupe} sortedStats={mvs}/>
                        <ArtefactCard equip={artes[4]} rule={rule} scoreState={setScoreCouronne} sortedStats={mvs}/>
        </div>
    )
}