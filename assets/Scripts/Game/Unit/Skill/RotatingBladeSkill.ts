import { _decorator, BoxCollider2D, CCInteger, Collider, Collider2D, Component, Contact2DType, Node, tween } from 'cc';
import { Player } from '../Player/Player';
import { Game } from '../../Game';
import { BaseSkill } from './BaseSkill';
const { ccclass, property } = _decorator;

/**
 * 旋转刀片技能
 */
@ccclass('RotatingBladeSkill')
export class RotatingBladeSkill extends BaseSkill {

    private collider : BoxCollider2D

    private elapsedTime : number = 0

    start() {
        console.log('进入到RotatingBlade的start()')

        this.collider = this.node.getComponent(BoxCollider2D)
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this)
    }

    onColliderContactBegin(thisCollider: Collider2D, otherCollider: Collider2D) {
        console.log(`碰撞到的对象名字:${otherCollider.node.name}`)
    }

    update(deltaTime : number) {
        if (this.elapsedTime < this.LifeTime) {
            this.elapsedTime += deltaTime
            const rotationSpeed = 360 
            this.node.angle += rotationSpeed * deltaTime
        } else {
            this.node.active = false
            this.elapsedTime = 0

            this.IsFire = false
        }
    }
}


