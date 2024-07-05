export class CsvReader {
    public static parseCsv(content: string) : any[] {
        const result = []

        if (content && content.length > 0) {
            const lines = content.split('\n')    
            const headers = lines[0].split(',')

            for (let i = 1; i < lines.length; ++i) {
                const obj : any = {}
                const currentLine = lines[i].split(',')

                for (let j = 0; j < headers.length; ++j) {
                    obj[headers[j].trim()] = currentLine[j].trim()
                }

                result.push(obj)
            }            
        }

        return result
    }
}