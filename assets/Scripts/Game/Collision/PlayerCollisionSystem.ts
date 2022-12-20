import { Collider2D, Contact2DType, Node } from "cc";
import { ISignal } from "../../Services/EventSystem/ISignal";
import { Signal } from "../../Services/EventSystem/Signal";
import { GameTimer } from "../../Services/GameTimer";
import { GroupType } from "../GroupType";
import { Gold } from "../Items/Gold/Gold";
import { ItemManager } from "../Items/ItemManager";
import { XP } from "../Items/XP/XP";
import { Enemy } from "../Unit/Enemy/Enemy";
import { Player } from "../Unit/Player/Player";

export class PlayerCollisionSystem {
    private playerContacts: Collider2D[] = [];
    private collisionTimer: GameTimer;

    private groupToResolver: Map<number, (collider: Collider2D) => void> = new Map<number, (collider: Collider2D) => void>();

    private itemPickedUpEvent = new Signal<Node>();

    public constructor(private player: Player, collisionDelay: number, private itemManager: ItemManager) {
        this.player = player;

        player.Collider.on(Contact2DType.BEGIN_CONTACT, this.onPlayerContactBegin, this);
        player.Collider.on(Contact2DType.END_CONTACT, this.onPlayerContactEnd, this);

        this.collisionTimer = new GameTimer(collisionDelay);

        this.groupToResolver.set(GroupType.ENEMY, this.resolveEnemyContact.bind(this));
        this.groupToResolver.set(GroupType.XP, this.resolveXpContact.bind(this));
        this.groupToResolver.set(GroupType.GOLD, this.resolveGoldContact.bind(this));
    }

    public gameTick(deltaTime: number): void {
        this.collisionTimer.gameTick(deltaTime);
        if (this.collisionTimer.tryFinishPeriod()) {
            this.resolveAllContacts();
        }
    }

    public get ItemPickedUpEvent(): ISignal<Node> {
        return this.itemPickedUpEvent;
    }

    private onPlayerContactBegin(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        this.playerContacts.push(otherCollider);
        this.resolveContact(otherCollider);
    }

    private onPlayerContactEnd(_selfCollider: Collider2D, otherCollider: Collider2D): void {
        const index: number = this.playerContacts.indexOf(otherCollider);
        if (index != -1) {
            this.playerContacts.splice(index, 1);
        }
    }

    private resolveAllContacts(): void {
        for (let i = 0; i < this.playerContacts.length; i++) {
            this.resolveContact(this.playerContacts[i]);
        }
    }

    private resolveContact(otherCollider: Collider2D): void {
        if (this.groupToResolver.has(otherCollider.group)) {
            this.groupToResolver.get(otherCollider.group)(otherCollider);
        } else {
            console.log("Collided with undefined group: " + otherCollider.group);
        }
    }

    private resolveEnemyContact(enemyCollider: Collider2D): void {
        const damage: number = enemyCollider.node.getComponent(Enemy).Damage;
        console.log("Collided with enemy: Damage: " + damage);
        this.player.Health.damage(damage);
    }

    private resolveXpContact(xpCollider: Collider2D): void {
        console.log("Collided with XP");
        this.itemManager.pickupXP(xpCollider.node.getComponent(XP));
    }

    private resolveGoldContact(goldCollider: Collider2D): void {
        this.itemManager.pickupGold(goldCollider.node.getComponent(Gold));
    }
}
