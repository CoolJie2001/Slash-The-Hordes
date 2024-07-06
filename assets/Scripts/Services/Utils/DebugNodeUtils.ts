import { Node } from "cc";

export class DebugNodeUtils {
    public static DebugOutputNode(prev: string, root: Node) {
        if (root) {
            console.log(prev + root.name)

            if (root.children.length > 0) {
                root.children.forEach((value, index) => {
                    this.DebugOutputNode(prev + '  ', value)
                })
            }
        }
    }
}


