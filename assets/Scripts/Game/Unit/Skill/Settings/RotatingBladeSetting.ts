export class RotatingBladeSetting {
    public constructor(
        private id: string,
        private damage: number,
        private cooldown: number,
        private lifeTime: number,
        private level: number,
        private describe: string,
        private upLevel: string
    ) {
        this.id = id
        this.Damage = damage
        this.CoolDown = cooldown
        this.LifeTime = lifeTime
        this.Level = level
        this.Describe = describe
        this.UpLevel = upLevel
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
        return this.lifeTime
    }

    public set LifeTime(value: number) {
        this.lifeTime = value
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

    public get UpLevel(): string {
        return this.upLevel
    }

    public set UpLevel(value: string) {
        this.upLevel = value
    }
}