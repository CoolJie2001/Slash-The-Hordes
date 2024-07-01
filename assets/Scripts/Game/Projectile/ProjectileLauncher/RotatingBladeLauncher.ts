import { _decorator } from 'cc';
import { IProjectileLauncherSignaler } from '../IProjectileLauncherSignaler';
import { GameTimer } from '../../../Services/GameTimer';
import { Signal } from '../../../Services/EventSystem/Signal';
const { ccclass, property } = _decorator;

/**
 * 旋转刀片技能启动器
 */
@ccclass('RotatingBladeLauncher')
export class RotatingBladeLauncher implements IProjectileLauncherSignaler {

    private currentUpgrade: number = 0
    private defaultCooldown: number = 0
    private cooldownDivisorPerUpgrade: number = 0

    private fireTimer: GameTimer = new GameTimer(0)
    private projectilesLaunchedEvent = new Signal()

    // public constructor(
    //     private launcher: ProjectileLauncher,
    //     private playerNode: Node,
    //     settings: RotatingBladeLauncherSettings,
    //     projectileData: ProjectileData
    // ) {
    //     this.defaultCooldown = settings.launcher.cooldown
    //     this.cooldownDivisorPerUpgrade = settings.cooldownDivisorPerUpgrade

    //     launcher.init(settings.launcher.projectileLifetime, settings.launcher.projectileSpeed,
    //         projectileData.damage, projectileData.pierces
    //     )
    // }

    // get ProjectileCollisionEvent(): ISignal<ProjectileCollision> {
    //     return this.launcher.ProjectileCollisionEvent
    // }
    // get ProjectileLaunchedEvent(): ISignal<void> {
    //     return this.launcher.ProjectileLaunchedEvent
    // }

    // public gameTick(deltaTime: number): void {
    //     if (this.currentUpgrade == 0) return

    //     this.launcher.gameTick(deltaTime)
    //     this.fireTimer.gameTick(deltaTime)

    //     if (this.fireTimer.tryFinishPeriod()) {
    //         this.launcher.fireProjectiles(this.playerNode.worldPosition, [Vec2.ZERO])
    //         this.projectilesLaunchedEvent.trigger()
    //     }
    // }

    /**
     * 技能升级
     */
    public upgrade(): void {
        this.currentUpgrade++
        this.fireTimer = new GameTimer(this.defaultCooldown / (this.cooldownDivisorPerUpgrade * this.currentUpgrade))
    }
}


