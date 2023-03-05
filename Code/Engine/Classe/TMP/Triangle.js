"use strict";
var TMP;
(function (TMP) {
    class Triangle {
        constructor(vertexShaderSource, fragmentShaderSource) {
            this.vertexShader = null;
            this.fragmentShader = null;
            this.program = null;
            this.vertexBuffer = null;
            this.vertexShaderSource = vertexShaderSource;
            this.fragmentShaderSource = fragmentShaderSource;
            this.verticePositions = new Float32Array([
                //   X       Y       Z
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                0.0, 1.0, 0.0,
            ]);
        }
        render(gl, renderer) {
            // Compile shaders if its not already done.
            if (!this.program) {
                this.vertexShader = renderer.compileShader(gl, this.vertexShaderSource, gl.VERTEX_SHADER);
                this.fragmentShader = renderer.compileShader(gl, this.fragmentShaderSource, gl.FRAGMENT_SHADER);
                this.program = renderer.createProgram(gl, this.vertexShader, this.fragmentShader);
            }
            // Create buffer if its not already done.
            if (!this.vertexBuffer)
                this.vertexBuffer = gl.createBuffer();
            // Draw ...
            gl.useProgram(this.program);
            renderer.sendBuffer(gl, "vertexPosition", this.vertexBuffer, this.program, this.verticePositions, 3);
            gl.drawArrays(gl.TRIANGLES, 0, this.verticePositions.length / 3);
        }
    }
    TMP.Triangle = Triangle;
})(TMP || (TMP = {}));
