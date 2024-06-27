import { GameTimer } from "../../../Services/GameTimer";
import { UnitHealth } from "../UnitHealth";

/**
 * 玩家生命值恢复
 */
export class PlayerRegeneration {
    /**
     * 当前生命恢复量
     */
    private currentRegenerationAmount = 0;
    /**
     * 恢复延迟时间
     */
    private regenerationDelay: number;
    /**
     * 跟踪恢复时间计时器
     */
    private regenerationTimer: GameTimer = new GameTimer(0);
    /**
     * 管理玩家生命单位的实例
     */
    private health: UnitHealth;

    public constructor(health: UnitHealth, regenerationDelay: number) {
        this.health = health;
        this.regenerationDelay = regenerationDelay;
    }

    /**
     * 升级恢复能力
     */
    public upgrade(): void {
        // 这里可以根据配置来决定一次升级恢复能力能在单位时间内恢复多少血量，这里是升一级多恢复1点血量
        this.currentRegenerationAmount++;
        this.regenerationTimer = new GameTimer(this.regenerationDelay / this.currentRegenerationAmount);
    }

    public gameTick(deltaTime: number): void {
        if (this.currentRegenerationAmount <= 0) return;

        this.regenerationTimer.gameTick(deltaTime);
        if (this.regenerationTimer.tryFinishPeriod()) {
            this.health.heal(1);
        }
    }
}
