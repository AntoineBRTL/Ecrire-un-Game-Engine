namespace RenderEngine
{
    export class RenderEnvironment
    {
        private canvas: HTMLCanvasElement;
        private gl: WebGL2RenderingContext

        public constructor()
        {
            this.canvas = this.setupCanvas();   
            this.gl     = this.setupGL(this.canvas);

            this.resize();
            window.addEventListener('resize', this.resize.bind(this));
        }

        private resize(): void
        {
            // Copy width and height of the window to the width and height of the canvas
            this.canvas.width   = window.innerWidth;
            this.canvas.height  = window.innerHeight;

            // Ask gl to resize
            this.gl.viewport(0.0, 0.0, window.innerWidth, window.innerHeight);
        }

        private setupCanvas(): HTMLCanvasElement
        {
            // Create a canvas, display it in HTML & remove unwanted style from body.
            let canvas: HTMLCanvasElement = document.createElement('canvas');
            document.body.appendChild(canvas);
            document.body.style.margin = "0px";

            return canvas;
        }

        private setupGL(canvas: HTMLCanvasElement): WebGL2RenderingContext
        {
            // Try getting a WebGL context from the canvas.
            let gl: WebGL2RenderingContext | null = canvas.getContext('webgl2');
            if(!gl) throw new Error("Can't get a OpenGL context from canvas");

            // Configurate gl context
            // Telling gl to clear using a black-gray color
            gl.clearColor(0.09, 0.09, 0.09, 1.0);

            return gl;
        }

        public getCanvas(): HTMLCanvasElement
        {
            return this.canvas;
        }

        public getGL(): WebGL2RenderingContext
        {
            return this.gl;
        }
    }
}