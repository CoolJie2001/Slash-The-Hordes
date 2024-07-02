import { Collider2D, Node, Vec2, v2 } from "cc";
import { Enemy } from "../Unit/Enemy/Enemy";
import { Weapon } from "../Unit/Player/Weapon/Weapon";

/**
 * 武器碰撞器系统
 */
export class WeaponCollisionSystem {
    private weapon: Weapon;

    public constructor(weapon: Weapon) {
        this.weapon = weapon;

        weapon.Collider.ContactBeginEvent.on(this.onWeaponContactBegin, this);
    }

    private angleToDirection(angle : number) : Vec2 {
        const radian = angle * (Math.PI / 180)

        const x = Math.cos(radian)
        const y = Math.sin(radian)

        return v2(x, y)
    }

    private async onWeaponContactBegin(otherCollider: Collider2D): Promise<void> {
        let enemy = otherCollider.getComponent(Enemy)

        if (enemy) {
            if (this.weapon && this.weapon.WeaponNode) {
                console.log(this.weapon.WeaponNode.angle)
                
                let dir = this.angleToDirection(this.weapon.WeaponNode.angle)

                let knockbackDir = v2(-dir.x, -dir.y)

                await enemy.knockback(knockbackDir, 25.0, 0.1)
            }

            enemy.dealDamage(this.weapon.Damage);
        }
    }
}
