import { Animation, AnimationState, CCFloat, Component, Node, _decorator, v3 } from "cc";
import { ISignal } from "../../../../Services/EventSystem/ISignal";
import { Signal } from "../../../../Services/EventSystem/Signal";
import { GameTimer } from "../../../../Services/GameTimer";

import { UpgradableCollider } from "./UpgradableCollider";
import { Player } from "../Player";
import { UpgradeType } from "../../../Upgrades/UpgradeType";
import { SkillManager } from "../../Skill/SkillManager";
const { ccclass, property } = _decorator;

@ccclass("Weapon")
export class Weapon extends Component {
    @property(Animation) private weaponAnimation: Animation;
    @property(UpgradableCollider) private upgradableCollider: UpgradableCollider;

    @property(Node)
    private weaponNode: Node;

    @property(CCFloat)
    private offsetDistance: number = 40

    private weaponStrikeEvent = new Signal<Weapon>();

    private strikeTimer: GameTimer;
    private strikeState: AnimationState;
    private batter: number;
    private damage: number;

    private currentWeaponLevel: number = 1

    private player: Player;

    private strikeQueue: Promise<void> = Promise.resolve()


    public init(strikeDelay: number, damage: number, batter: number, player: Player): void {
        this.strikeTimer = new GameTimer(strikeDelay);
        this.damage = damage;
        this.batter = batter;
        this.node.active = false;

        this.weaponAnimation.on(Animation.EventType.FINISHED, this.endStrike, this);
        this.strikeState = this.weaponAnimation.getState(this.weaponAnimation.clips[0].name);
        this.strikeState.speed = 1;

        this.upgradableCollider.init();

        this.player = player;
    }

    public gameTick(deltaTime: number): void {
        this.strikeTimer.gameTick(deltaTime);
        if (this.strikeTimer.tryFinishPeriod()) {
            this.weaponNode.angle = this.player.CurrentForward;

            let offsetX = this.offsetDistance * this.player.Direction.x
            let offsetY = this.offsetDistance * this.player.Direction.y

            this.weaponNode.setPosition(v3(offsetX, offsetY, 0))

            for (let i = 0; i < this.batter; i++) {
                this.enqueueStrike()
            }
        }
    }

    enqueueStrike() {
        this.strikeQueue = this.strikeQueue.then(() => this.strike())
    }

    public get WeaponStrikeEvent(): ISignal<Weapon> {
        return this.weaponStrikeEvent;
    }

    public get Collider(): UpgradableCollider {
        return this.upgradableCollider;
    }

    public get Damage(): number {
        return this.damage;
    }

    public get WeaponNode(): Node {
        return this.weaponNode
    }

    public upgradeWeaponDamage(): void {
        const weaponInfo = SkillManager. (UpgradeType.WeaponDamage, this.currentWeaponLevel)

        this.damage++;
    }
    public upgradeWeaponLength(): void {
        this.upgradableCollider.upgrade();
    }

    private async strike(): Promise<void> {
        this.node.active = true;
        this.weaponAnimation.play(this.strikeState.name);
        this.weaponStrikeEvent.trigger(this);

        await this.waitForAnimationToEnd();
    }

    private waitForAnimationToEnd(): Promise<void> {
        return new Promise((resolve) => {
            const onAnimationEnd = () => {
                this.weaponAnimation.off(Animation.EventType.FINISHED, onAnimationEnd, this);
                resolve();
            };
            this.weaponAnimation.on(Animation.EventType.FINISHED, onAnimationEnd, this);
        });
    }

    private endStrike(): void {
        this.node.active = false;
    }
}
