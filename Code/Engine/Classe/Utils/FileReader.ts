namespace Utils
{
    export class FileReader
    {
        public async read(path: string): Promise<string>
        {
            // Use fetch to send GET requests
            let response = await fetch(path);
            return await response.text();
        }
    }
}