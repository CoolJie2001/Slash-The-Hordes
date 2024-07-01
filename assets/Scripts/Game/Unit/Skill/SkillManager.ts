import { _decorator, Component, Node } from 'cc';
import { BaseSkill } from './BaseSkill';
const { ccclass, property } = _decorator;

/**
 * 管理当前玩家的技能类
 */
@ccclass('SkillManager')
export class SkillManager extends Component {
    @property(BaseSkill)
    private skills: BaseSkill[] = []

    start() {
        if (this.skills != null && this.skills.length > 0) {
            this.skills[0].setup()
        }
    }

    public gameTick(deltaTime: number): void {
        if (this.skills != null && this.skills.length > 0) {
            for (let i = 0; i < this.skills.length; ++i) {
                this.skills[i].gameTick(deltaTime)
            }
        }
    }
}


