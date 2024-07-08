import { _decorator, Component, Node, Prefab } from 'cc';
import { UpgradeType } from '../../Upgrades/UpgradeType';
const { ccclass, property } = _decorator;

@ccclass('SkillConfig')
export class SkillConfig {
    @property
    public id: UpgradeType

    @property(Prefab)
    public prefab: Prefab
}


