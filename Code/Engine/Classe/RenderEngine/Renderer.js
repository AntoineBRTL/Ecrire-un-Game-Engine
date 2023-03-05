"use strict";
var RenderEngine;
(function (RenderEngine) {
    class Renderer {
        constructor() {
            this.renderEnvironment = new RenderEngine.RenderEnvironment();
        }
        clear(gl) {
            // Ask WebGL to clear the color buffer
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        render(triangles) {
            let gl = this.renderEnvironment.getGL();
            this.clear(gl);
            for (let triangle of triangles) {
                triangle.render(gl, this);
            }
        }
        compileShader(gl, source, type) {
            var _a;
            // Create shader object.
            let shader;
            shader = gl.createShader(type);
            if (!shader)
                throw new Error("Failed to create shader");
            // Add its source & compile it.
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            // Log possible errors.
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
                throw new Error(`Error in ${type} ` + ((_a = gl.getShaderInfoLog(shader)) === null || _a === void 0 ? void 0 : _a.toString()));
            return shader;
        }
        createProgram(gl, vertexShader, fragmentShader) {
            // Create a program object.
            let program;
            program = gl.createProgram();
            if (!program)
                throw new Error("Failed to create program");
            // Attach the vertex & fragment shader, & link it to OpenGL.
            gl.attachShader(program, fragmentShader);
            gl.attachShader(program, vertexShader);
            gl.linkProgram(program);
            return program;
        }
        sendBuffer(gl, name, buffer, program, iterable, length) {
            // Update buffer data.
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, iterable, gl.DYNAMIC_DRAW);
            // Send buffer to vertex shader.
            let location = gl.getAttribLocation(program, name);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, length, gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);
        }
    }
    RenderEngine.Renderer = Renderer;
})(RenderEngine || (RenderEngine = {}));
