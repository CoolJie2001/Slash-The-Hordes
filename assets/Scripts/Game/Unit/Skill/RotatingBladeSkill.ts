import { _decorator, BoxCollider2D, Collider2D, Contact2DType, PhysicsSystem2D } from 'cc';
import { BaseSkill } from './BaseSkill';
import { Enemy } from '../Enemy/Enemy';
const { ccclass, property } = _decorator;

/**
 * 旋转刀片技能
 */
@ccclass('RotatingBladeSkill')
export class RotatingBladeSkill extends BaseSkill {


    private elapsedTime: number = 0

    start() {
    }

    protected override init(damage: number, duration: number, speed: number) {
        super.init(damage, duration, speed)

        console.log('进入到RotatingBlade的init()')
        // PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this);
    }





    update(deltaTime: number) {
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


