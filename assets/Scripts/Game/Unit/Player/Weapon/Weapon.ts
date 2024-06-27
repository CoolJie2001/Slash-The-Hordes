import { Animation, AnimationState, Component, Node, Vec2, _decorator, v3 } from "cc";
import { ISignal } from "../../../../Services/EventSystem/ISignal";
import { Signal } from "../../../../Services/EventSystem/Signal";
import { GameTimer } from "../../../../Services/GameTimer";

import { UpgradableCollider } from "./UpgradableCollider";
import { Player } from "../Player";
const { ccclass, property } = _decorator;

@ccclass("Weapon")
export class Weapon extends Component {
    @property(Animation) private weaponAnimation: Animation;
    @property(UpgradableCollider) private upgradableCollider: UpgradableCollider;

    @property(Node)
    private weaponNode: Node;

    @property(Number)
    private offsetDistance : number = 100

    private weaponStrikeEvent = new Signal<Weapon>();

    private strikeTimer: GameTimer;
    private strikeState: AnimationState;
    private damage: number;

    private player: Player;


    public init(strikeDelay: number, damage: number, player: Player): void {
        this.strikeTimer = new GameTimer(strikeDelay);
        this.damage = damage;
        this.node.active = false;

        this.weaponAnimation.on(Animation.EventType.FINISHED, this.endStrike, this);
        this.strikeState = this.weaponAnimation.getState(this.weaponAnimation.clips[0].name);
        this.strikeState.speed = 0.3;

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

            this.strike();
        }
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

    public upgradeWeaponDamage(): void {
        this.damage++;
    }
    public upgradeWeaponLength(): void {
        this.upgradableCollider.upgrade();
    }

    private strike(): void {
        this.node.active = true;
        this.weaponAnimation.play(this.strikeState.name);
        this.weaponStrikeEvent.trigger(this);
    }

    private endStrike(): void {
        this.node.active = false;
    }
}
