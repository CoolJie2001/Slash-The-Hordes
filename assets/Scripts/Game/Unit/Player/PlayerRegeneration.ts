import { GameTimer } from "../../../Services/GameTimer";
import { UnitHealth } from "../UnitHealth";

/**
 * 玩家生命值恢复
 */
export class PlayerRegeneration {
    /**
     * 单次恢复血量
     */
    private singleRecoveryHealth = 0;

    /**
     * 跟踪恢复时间计时器
     */
    private regenerationTimer: GameTimer = new GameTimer(1);

    /**
     * 管理玩家生命单位的实例
     */
    private health: UnitHealth;

    public constructor(health: UnitHealth) {
        this.health = health;
    }


    public get SingleRecoveryHealth(): number {
        return this.singleRecoveryHealth
    }


    public set SingleRecoveryHealth(v: number) {
        this.singleRecoveryHealth = v;
    }

    /**
     * 升级恢复能力
     */
    public upgrade(): void {
        // 这里可以根据配置来决定一次升级恢复能力能在单位时间内恢复多少血量，这里是升一级多恢复1点血量
        
    }

    public gameTick(deltaTime: number): void {
        if (this.singleRecoveryHealth <= 0) return;

        this.regenerationTimer.gameTick(deltaTime);
        if (this.regenerationTimer.tryFinishPeriod()) {
            this.health.heal(this.SingleRecoveryHealth);
        }
    }
}
