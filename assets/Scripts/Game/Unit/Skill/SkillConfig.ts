import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SkillConfig')
export class SkillConfig {
    @property
    public id: string = ''

    @property(Prefab)
    public prefab: Prefab
}


