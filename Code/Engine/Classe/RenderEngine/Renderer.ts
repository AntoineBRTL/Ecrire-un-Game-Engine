namespace RenderEngine
{
    export class Renderer
    {
        private renderEnvironment: RenderEngine.RenderEnvironment;

        public constructor()
        {
            this.renderEnvironment = new RenderEngine.RenderEnvironment();
        }

        private clear(gl: WebGL2RenderingContext): void
        {
            // Ask WebGL to clear the color buffer
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        public render(triangles: TMP.Triangle[]): void
        {
            let gl: WebGL2RenderingContext = this.renderEnvironment.getGL();
            this.clear(gl);

            for(let triangle of triangles)
            {
                triangle.render(gl, this);
            }
        }

        public compileShader(gl: WebGL2RenderingContext, source: string, type: number): WebGLShader
        {
            // Create shader object.
            let shader: WebGLShader | null;
            shader = gl.createShader(type);
            if(!shader) throw new Error("Failed to create shader");

            // Add its source & compile it.
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
    
            // Log possible errors.
            if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                throw new Error(`Error in ${type} ` + gl.getShaderInfoLog(shader)?.toString());
    
            return shader;
        }

        public createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram
        {
            // Create a program object.
            let program: WebGLProgram | null;
            program = gl.createProgram();
            if(!program) throw new Error("Failed to create program");

            // Attach the vertex & fragment shader, & link it to OpenGL.
            gl.attachShader(program, fragmentShader);
            gl.attachShader(program, vertexShader);
            gl.linkProgram(program);
    
            return program;
        }

        public sendBuffer(gl: WebGL2RenderingContext, name: string, buffer: WebGLBuffer | null, program: WebGLProgram, iterable: Float32Array, length: number): void
        {
            // Update buffer data.
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, iterable, gl.DYNAMIC_DRAW);
    
            // Send buffer to vertex shader.
            let location = gl.getAttribLocation(program, name);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
        }
    }
}