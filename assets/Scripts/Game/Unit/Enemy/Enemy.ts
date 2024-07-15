import { BoxCollider2D, Component, Material, randomRange, Sprite, Vec3, _decorator, Vec2, Prefab, instantiate, Color } from "cc";
import { ISignal } from "../../../Services/EventSystem/ISignal";
import { Signal } from "../../../Services/EventSystem/Signal";
import { delay } from "../../../Services/Utils/AsyncUtils";
import { EnemySettings } from "../../Data/GameSettings";
import { UnitHealth } from "../UnitHealth";
import { EnemyMovementType } from "./EnemyMovementType";
import { SkippingManager } from "../../UI/CharacterDamage/SkippingManager";

const { ccclass, property } = _decorator;

@ccclass("Enemy")
export class Enemy extends Component {
    @property(BoxCollider2D) private collider: BoxCollider2D;
    @property(Sprite) private sprite: Sprite;
    @property(Material) private defaultMaterial: Material;
    @property(Material) private whiteMaterial: Material;

    @property(Prefab) private damageSkipping: Prefab

    private deathEvent: Signal<Enemy> = new Signal<Enemy>();
    private lifetimeEndedEvent: Signal<Enemy> = new Signal<Enemy>();

    private id: string;
    private movementType: EnemyMovementType;
    private health: UnitHealth;
    private damage: number;
    private speedX: number;
    private speedY: number;
    private lifetimeLeft: number;

    private xpReward: number;
    private goldReward: number;
    private healthPotionRewardChance: number;
    private magnetRewardChance: number;
    private chestRewardChance: number;

    private endOfLifetimeTriggered = false;

    private knockbackDirection: Vec2 = new Vec2()
    private knockbackTimeLeft: number = 0
    private knockbackSpeed: number = 0

    private currentDirection: Vec2 = new Vec2()

    public setup(position: Vec3, settings: EnemySettings): void {
        this.id = settings.id;
        this.movementType = <EnemyMovementType>settings.moveType;
        this.health = new UnitHealth(settings.health);
        this.damage = settings.damage;
        this.speedX = randomRange(settings.speed / 2, settings.speed);
        this.speedY = randomRange(settings.speed / 2, settings.speed);
        this.lifetimeLeft = settings.lifetime;

        this.xpReward = settings.xpReward;
        this.goldReward = settings.goldReward;
        this.healthPotionRewardChance = settings.healthPotionRewardChance;
        this.magnetRewardChance = settings.magnetRewardChance;
        this.chestRewardChance = settings.chestRewardChance;

        this.node.setWorldPosition(position);
        this.node.active = true;

        this.health.HealthPointsChangeEvent.on(this.animateHurt, this);
        this.endOfLifetimeTriggered = false;
    }

    public get Id(): string {
        return this.id;
    }

    public get MovementType(): EnemyMovementType {
        return this.movementType;
    }

    public get Collider(): BoxCollider2D {
        return this.collider;
    }

    public get Damage(): number {
        return this.damage;
    }

    public get Health(): UnitHealth {
        return this.health;
    }

    public get DeathEvent(): ISignal<Enemy> {
        return this.deathEvent;
    }

    public get XPReward(): number {
        return this.xpReward;
    }

    public get GoldReward(): number {
        return this.goldReward;
    }

    public get HealthPotionRewardChance(): number {
        return this.healthPotionRewardChance;
    }

    public get MagnetRewardChance(): number {
        return this.magnetRewardChance;
    }

    public get ChestRewardChance(): number {
        return this.chestRewardChance;
    }

    public get LifetimeEndedEvent(): ISignal<Enemy> {
        return this.lifetimeEndedEvent;
    }

    public get CurrentDirection(): Vec2 {
        return this.currentDirection
    }

    public dealDamage(points: number): void {
        this.health.damage(points);

        // let damageNode = instantiate(this.damageSkipping)
        // let skipping = damageNode.getComponent(DamageSkipping)
        // skipping.init(AppRoot.Instance.DamageLayer, this.node, points, Color.RED)
        const obj = SkippingManager.Instance.createNewObject(this.node, points, Color.RED)

        if (obj) obj.play()

        if (!this.health.IsAlive) {
            this.deathEvent.trigger(this);
        }
    }

    public gameTick(move: Vec3, deltaTime: number): void {
        const newPosition: Vec3 = this.node.worldPosition;

        if (this.knockbackTimeLeft > 0) {
            newPosition.x += this.knockbackDirection.x * this.knockbackSpeed * deltaTime
            newPosition.y += this.knockbackDirection.y * this.knockbackSpeed * deltaTime
            this.knockbackTimeLeft -= deltaTime

            // 确保 knockbackTimeLeft 不会变成负数
            if (this.knockbackTimeLeft < 0) {
                this.knockbackTimeLeft = 0;
            }
        } else {
            newPosition.x += move.x * this.speedX * deltaTime;
            newPosition.y += move.y * this.speedY * deltaTime;
        }

        this.currentDirection.set(move.x, move.y).normalize()

        // 敌人往左右移动的时候把敌人的图片左右镜像
        if (move.x < 0) {
            this.sprite.node.setScale(-1, 1, 1);
        } else if (0 < move.x) {
            this.sprite.node.setScale(1, 1, 1);
        }

        // 设置敌人在新的世界坐标位置, 因为上面的代码是获得的敌人的世界坐标位置进行更新操作
        this.node.setWorldPosition(newPosition);

        if (0 < this.lifetimeLeft) {
            this.lifetimeLeft -= deltaTime;
            if (this.lifetimeLeft <= 0) {
                this.lifetimeEndedEvent.trigger(this);
            } else if (this.lifetimeLeft <= 2) {
                this.animateEndOfLifetime();
            }
        }
    }

    /**
     * 击退
     * @param direction 击退的方向
     * @param distance 击退的距离
     * @param duration 击退的持续时间
     */
    public async knockback(direction: Vec2, distance: number, duration: number): Promise<void> {
        this.knockbackDirection = direction.normalize()
        this.knockbackSpeed = distance / duration
        this.knockbackTimeLeft = duration

        while (this.knockbackTimeLeft > 0) {
            // 每帧减少击退时间
            const deltaTime = 1 / 60; // 例如，假设帧率为60FPS
            this.knockbackTimeLeft -= deltaTime;
            await delay(deltaTime * 1000);
        }
    }

    private async animateEndOfLifetime(): Promise<void> {
        if (this.endOfLifetimeTriggered) return;

        this.endOfLifetimeTriggered = true;

        // 模拟一个敌人的闪烁动画效果, 每隔200ms消失, 然后再显示再间隔200ms
        while (this.node?.active) {
            this.sprite.node.active = false;
            await delay(200);

            if (this.sprite == null) break; // exit scene

            this.sprite.node.active = true;
            await delay(200);
        }
    }

    private async animateHurt(): Promise<void> {
        this.sprite.material = this.whiteMaterial;
        await delay(100);
        this.sprite.material = this.defaultMaterial;
    }
}
