import { SkillLevel } from "../SkillLevel"

export class RegenerationSetting implements SkillLevel {
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
        lifetime: number,
        level: number,
        name: string,
        describe: string
    ) {
        this.id = id
        this.damage = damage
        this.cooldown = cooldown
        this.lifetime = lifetime
        this.level = level
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


    public set CoolDown(v: number) {
        this.cooldown = v;
    }


    public get LifeTime(): number {
        return this.lifetime
    }


    public set LifeTime(v: number) {
        this.lifetime = v;
    }


    public get Level(): number {
        return this.level
    }


    public set Level(v: number) {
        this.level = v;
    }


    public get Name(): string {
        return this.name
    }


    public set Name(v: string) {
        this.name = v;
    }


    public get Describe(): string {
        return this.describe
    }


    public set Describe(v: string) {
        this.describe = v;
    }

}


