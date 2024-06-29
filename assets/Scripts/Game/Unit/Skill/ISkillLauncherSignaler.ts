import { ISignal } from "../../../Services/EventSystem/ISignal";
import { SkillCollision } from "./SkillCollision";

/**
 * 技能信号接口
 */
export interface ISkillLauncherSignaler  {
    get SkillCollisionEvent() : ISignal<SkillCollision>

    
}


