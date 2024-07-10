import { _decorator, Component, Node, ParticleSystem2D } from 'cc';
import { BaseSkill } from './BaseSkill';
import { RegenerationSetting } from './Settings/RegenerationSetting';
const { ccclass, property } = _decorator;

/**
 * 回复术技能
 */
@ccclass('RegenerationSkill')
export class RegenerationSkill extends BaseSkill {
    @property(ParticleSystem2D)
    regenerationParticle:ParticleSystem2D

    private elapsedTime : number = 0

    public get RegenerationSettings() : RegenerationSetting[] {
        return this.SkillSettings
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.elapsedTime < this.LifeTime) {
            this.elapsedTime += deltaTime
        } else {
            this.elapsedTime = 0

            this.node.active = false

            this.IsFire = false
        }
    }
}


