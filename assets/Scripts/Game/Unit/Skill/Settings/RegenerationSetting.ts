
export class RegenerationSetting {
    public constructor(
        private id : string,
        private damage: number,
        private cooldown: number,
        private lifeTime : number,
        private level:number
    ) {
        this.id = id
        this.damage = damage
        this.cooldown = cooldown
        this.lifeTime = lifeTime
        this.level = level
    }

    public get Id() : string {
        return this.id
    }

    public get Damage() : number {
        return this.damage
    }

    public set Damage(value : number) {
        this.damage = value
    }

    
    public get CoolDown() : number {
        return this.cooldown
    }

    
    public set CoolDown(v : number) {
        this.cooldown = v;
    }
    
    
    public get LifeTime() : number {
        return this.lifeTime
    }
    
    
    public set LifeTime(v : number) {
        this.lifeTime = v;
    }
    
    
    public get Level() : number {
        return this.level
    }
    
    
    public set Level(v : number) {
        this.level = v;
    }
    
}


