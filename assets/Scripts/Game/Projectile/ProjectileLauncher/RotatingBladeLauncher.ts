import { _decorator } from 'cc';
import { GameTimer } from '../../../Services/GameTimer';
import { Signal } from '../../../Services/EventSystem/Signal';
const { ccclass, property } = _decorator;

/**
 * 旋转刀片技能启动器
 */
@ccclass('RotatingBladeLauncher')
export class RotatingBladeLauncher {

    private skillCooldown: number = 0
    private skillDuration: number = 0
    private damage: number = 0

    private currentUpgrade: number = 1

    private fireTimer: GameTimer = new GameTimer(0)
    private projectilesLaunchedEvent = new Signal()

    /**
     * 技能升级
     */
    public upgrade(): void {
        this.currentUpgrade++
        this.fireTimer = new GameTimer(this.skillCooldown)
    }
}


