import { _decorator, BoxCollider2D, Collider2D, Contact2DType, v2 } from 'cc';
import { BaseSkill } from './BaseSkill';
import { Enemy } from '../Enemy/Enemy';
import { RotatingBladeSetting } from './Settings/RotatingBladeSetting';
const { ccclass, property } = _decorator;

/**
 * 旋转刀片技能
 */
@ccclass('RotatingBladeSkill')
export class RotatingBladeSkill extends BaseSkill {
    @property(BoxCollider2D)
    private collider: BoxCollider2D

    private elapsedTime: number = 0

    start() {
    }

    protected override init(damage: number, duration: number, lifeTime: number) {
        super.init(damage, duration, lifeTime)

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onColliderContactBegin, this)
    }

    async onColliderContactBegin(thisCollider: Collider2D, otherCollider: Collider2D): Promise<void> {
        let enemy = otherCollider.getComponent(Enemy)

        if (enemy) {
            const dir = v2(-enemy.CurrentDirection.x, -enemy.CurrentDirection.y)

            await enemy.knockback(dir, 25.0, 0.1)

            enemy.dealDamage(this.Damage);
        }
    }

    override gameTick(deltaTime: number): void {
        super.gameTick(deltaTime)

        if (this.IsFire) {
            // 判断释放技能后, 技能的LifeTime是否到期
            if (this.elapsedTime < this.LifeTime) {
                this.elapsedTime += deltaTime
                const rotationSpeed = 360
                this.node.angle += rotationSpeed * deltaTime
            } else {
                this.elapsedTime = 0

                this.node.active = false

                this.IsFire = false
            }
        }
    }
}


