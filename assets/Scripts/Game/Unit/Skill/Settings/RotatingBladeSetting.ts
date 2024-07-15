import { SkillLevel } from "../SkillLevel"

export class RotatingBladeSetting implements SkillLevel {
    public id: string
    public damage: number
    public cooldown: number
    public lifetime: number
    public level: number
    public name: string
    public describe: string

    public constructor(
        id: string,
        damage: number,
        cooldown: number,
        lifeTime: number,
        level: number,
        describe: string
    ) {
        this.id = id
        this.Damage = damage
        this.CoolDown = cooldown
        this.LifeTime = lifeTime
        this.Level = level
        this.Describe = describe
    }

    public get Id(): string {
        return this.id
    }

    public get Damage(): number {
        return this.damage
    }

    public set Damage(value: number) {
        this.damage = value
    }

    public get CoolDown(): number {
        return this.cooldown
    }

    public set CoolDown(value: number) {
        this.cooldown = value
    }

    public get LifeTime(): number {
        return this.lifetime
    }

    public set LifeTime(value: number) {
        this.lifetime = value
    }

    public get Level(): number {
        return this.level
    }

    public set Level(value: number) {
        this.level = value
    }

    public get Describe(): string {
        return this.describe
    }

    public set Describe(value: string) {
        this.describe = value
    }
}