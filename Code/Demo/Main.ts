namespace Demo
{
    export class Main
    {
        public constructor()
        {
            // Call start cause it's async.
            this.start();
        }

        private async start()
        {
            let fileReader: Utils.FileReader  = new Utils.FileReader();

            let vertexShaderSource      = await fileReader.read('../Engine/Classe/Shaders/Default.vert');
            let fragmentShaderSource    = await fileReader.read('../Engine/Classe/Shaders/Default.frag');

            let triangle: TMP.Triangle      = new TMP.Triangle(vertexShaderSource, fragmentShaderSource);
            let renderer: RenderEngine.Renderer      = new RenderEngine.Renderer();

            renderer.render([triangle]);
        }
    }
}

new Demo.Main();