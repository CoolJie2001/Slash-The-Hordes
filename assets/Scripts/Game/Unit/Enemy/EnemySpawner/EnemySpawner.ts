import { _decorator, Component, Prefab, Vec3, Node } from "cc";
import { ISignal } from "../../../../Services/EventSystem/ISignal";
import { Signal } from "../../../../Services/EventSystem/Signal";
import { ObjectPool } from "../../../../Services/ObjectPool";
import { EnemySettings } from "../../../Data/GameSettings";
import { Enemy } from "../Enemy";

const { ccclass, property } = _decorator;

@ccclass("EnemySpawner")
export class EnemySpawner extends Component {
    @property(Prefab) private enemies: Prefab[] = [];

    public enemyAddedEvent: Signal<Enemy> = new Signal<Enemy>();
    public enemyRemovedEvent: Signal<Enemy> = new Signal<Enemy>();

    private enemyPool: ObjectPool<Enemy>;

    private targetNode: Node;

    private idToSettings = new Map<string, EnemySettings>();

    public init(targetNode: Node, enemiesSettings: EnemySettings[]): void {
        this.targetNode = targetNode;
        this.enemyPool = new ObjectPool(this.enemies[0], this.node, 50, "Enemy");

        for (const enemySettings of enemiesSettings) {
            this.idToSettings.set(enemySettings.id, enemySettings);
        }
    }

    public get EnemyAddedEvent(): ISignal<Enemy> {
        return this.enemyAddedEvent;
    }

    public get EnemyRemovedEvent(): ISignal<Enemy> {
        return this.enemyRemovedEvent;
    }

    public spawnNewEnemy(positionX: number, positionY: number, id: string): Enemy {
        if (!this.idToSettings.has(id)) {
            throw new Error("Does not have setting for enemy " + id);
        }

        const enemy = this.enemyPool.borrow();
        const spawnPosition = new Vec3();
        spawnPosition.x = this.targetNode.worldPosition.x + positionX;
        spawnPosition.y = this.targetNode.worldPosition.y + positionY;
        enemy.setup(spawnPosition, this.idToSettings.get(id));

        enemy.DeathEvent.on(this.returnEnemy, this);

        this.enemyAddedEvent.trigger(enemy);

        return enemy;
    }

    public returnEnemy(enemy: Enemy): void {
        enemy.DeathEvent.off(this.returnEnemy);
        this.enemyPool.return(enemy);

        this.enemyRemovedEvent.trigger(enemy);
    }
}
