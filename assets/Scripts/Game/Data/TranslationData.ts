import { UpgradeType } from "../Upgrades/UpgradeType";

export class TranslationData {
    // [key: string]: string;

    private describeMap: Map<UpgradeType, string> = new Map()
    private titleMap: Map<UpgradeType, string> = new Map()


    /**
     * 根据可升级技能类别id查询到的描述
     * @param id 可升级的技能类别id
     * @returns 返回根据可升级技能类别id查询到的技能描述
     */
    public GetDescribe(id: UpgradeType): string | null {
        const value = this.describeMap.get(id)

        return value
    }

    /**
     * 根据可升级技能类别id查询到的标题
     * @param id 可升级的技能类别id
     * @returns 返回根据可升级技能类别id查询到的标题
     */
    public GetTitle(id: UpgradeType): string | null {
        const value = this.titleMap.get(id)

        return value
    }


}
