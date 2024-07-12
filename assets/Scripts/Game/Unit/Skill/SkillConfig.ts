import { _decorator, Prefab } from 'cc';
import { SkillUpgradeType } from '../../Upgrades/UpgradeType';
const { ccclass, property } = _decorator;

@ccclass('SkillConfig')
export class SkillConfig {
    @property({ type: SkillUpgradeType })
    public id: SkillUpgradeType

    @property(Prefab)
    public prefab: Prefab
}