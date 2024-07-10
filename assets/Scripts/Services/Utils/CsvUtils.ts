export class CsvReader {
    public static parseCsv(content: string): any[] {
        const result = [];

        if (content && content.length > 0) {
            const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
            const headers = this.splitCsvLine(lines[0]);
            for (let i = 1; i < lines.length; ++i) {
                const obj: any = {};
                const currentLine = this.splitCsvLine(lines[i]);
                for (let j = 0; j < headers.length; ++j) {
                    obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : '';
                }
                result.push(obj);
            }
        }

        return result;
    }

    private static splitCsvLine(line: string): string[] {
        const result: string[] = [];
        let currentField = '';
        let inQuotes = false;
        let quoteChar = '';

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (inQuotes) {
                if (char === quoteChar) {
                    if (i + 1 < line.length && line[i + 1] === quoteChar) {
                        // 处理双引号转义
                        currentField += char;
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    currentField += char;
                }
            } else {
                if (char === '"' || char === "'") {
                    inQuotes = true;
                    quoteChar = char;
                } else if (char === ',') {
                    result.push(currentField);
                    currentField = '';
                } else {
                    currentField += char;
                }
            }
        }
        result.push(currentField);
        return result;
    }
}