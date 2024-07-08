import { _decorator, Component, Enum, Node, Prefab } from 'cc';
import { EnumUtils, UpgradeType } from '../../Upgrades/UpgradeType';
const { ccclass, property } = _decorator;

const UpgradeTypeEnum = EnumUtils.createEnumFromStringEnum(UpgradeType)

@ccclass('SkillConfig')
export class SkillConfig {
    @property({type: UpgradeTypeEnum })
    public id: keyof typeof UpgradeTypeEnum = 'RotatingBlade'

    @property(Prefab)
    public prefab: Prefab
}


