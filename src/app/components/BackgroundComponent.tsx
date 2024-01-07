import { ICharacterData } from "@/server/gamedata/ICharacterData";
import { ERegion } from "@/server/gamedata/enums/ERegion";

export default function BackgroundComponent({character} : {character: ICharacterData}) {
    let bg = "bg-fontaine"
    switch (character.commonData.region) {
        case ERegion.MONDSTADT:
            bg = "bg-mondstadt"
            break;
        case ERegion.LIYUE:
            bg = "bg-liyue"
            break;
        case ERegion.INAZUMA:
            bg = "bg-inazuma"
            break;
        case ERegion.SUMERU:
            bg = "bg-sumeru"
            break;
        case ERegion.FONTAINE:
            bg = "bg-fontaine"
            break;
            
    }
    return <div className={"-z-10 fixed w-screen h-screen top-0 left-0 bg-cover scale-105 blur-md ".concat(bg)}></div>
}