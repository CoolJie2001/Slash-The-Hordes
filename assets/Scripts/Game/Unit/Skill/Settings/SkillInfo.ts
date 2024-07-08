export class SkillInfo {
    public constructor(
        private id: string,
        private name: string,
        private describe: string,
        private level: number
    ) {
        this.id = id
        this.name = name
        this.describe = describe
        this.level = level
    }

    public get Id(): string {
        return this.id
    }

    public get Name(): string {
        return this.name
    }

    public get Level(): number {
        return this.level
    }

    public get Describe(): string {
        return this.describe
    }
}