import { IProjectileLauncherSignaler } from "../Projectile/IProjectileLauncherSignaler";
import { ProjectileCollision } from "../Projectile/ProjectileCollision";
import { Enemy } from "../Unit/Enemy/Enemy";

/**
 * 玩家投射的技能的碰撞系统
 */
export class PlayerProjectileCollisionSystem {
    public constructor(collisionSignalers: IProjectileLauncherSignaler[]) {
        for (const collisionSignaler of collisionSignalers) {
            collisionSignaler.ProjectileCollisionEvent.on(this.onProjectileCollision, this);
        }
    }

    /**
     * 响应投射的技能碰撞事件d
     * @param projectileCollision 发生碰撞的敌人节点
     */
    private onProjectileCollision(projectileCollision: ProjectileCollision): void {
        projectileCollision.otherCollider.getComponent(Enemy).dealDamage(projectileCollision.projectile.Damage);
        projectileCollision.projectile.pierce();
    }
}
