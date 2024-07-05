import { _decorator, BoxCollider2D, Collider2D, Contact2DType, PhysicsSystem2D, TextAsset, v2 } from 'cc';
import { BaseSkill } from './BaseSkill';
import { Enemy } from '../Enemy/Enemy';
import { SkillUpgradeType } from '../../Upgrades/UpgradeType';
import { CsvReader } from '../../../Services/Utils/CsvUtils';
const { ccclass, property } = _decorator;

/**
 * 旋转刀片技能
 */
@ccclass('RotatingBladeSkill')
export class RotatingBladeSkill extends BaseSkill {
    @property(BoxCollider2D)
    private collider: BoxCollider2D

    @property(TextAsset)
    skillSettings: TextAsset = null!

    private elapsedTime: number = 0

    start() {
        const data = this.skillSettings.text!

        let arr = CsvReader.parseCsv(data)

        arr.forEach((element, index, arr) => {
            console.log(element)
        })
    }

    protected override init(damage: number, duration: number, speed: number) {
        super.init(damage, duration, speed)

        this.UpgradeType = SkillUpgradeType.RotatingBlade

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


