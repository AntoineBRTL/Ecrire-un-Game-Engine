"use strict";
var RenderEngine;
(function (RenderEngine) {
    class RenderEnvironment {
        constructor() {
            this.canvas = this.setupCanvas();
            this.gl = this.setupGL(this.canvas);
            this.resize();
            window.addEventListener('resize', this.resize.bind(this));
        }
        resize() {
            // Copy width and height of the window to the width and height of the canvas
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            // Ask gl to resize
            this.gl.viewport(0.0, 0.0, window.innerWidth, window.innerHeight);
        }
        setupCanvas() {
            // Create a canvas, display it in HTML & remove unwanted style from body.
            let canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            document.body.style.margin = "0px";
            return canvas;
        }
        setupGL(canvas) {
            // Try getting a WebGL context from the canvas.
            let gl = canvas.getContext('webgl2');
            if (!gl)
                throw new Error("Can't get a OpenGL context from canvas");
            // Configurate gl context
            // Telling gl to clear using a black-gray color
            gl.clearColor(0.09, 0.09, 0.09, 1.0);
            return gl;
        }
        getCanvas() {
            return this.canvas;
        }
        getGL() {
            return this.gl;
        }
    }
    RenderEngine.RenderEnvironment = RenderEnvironment;
})(RenderEngine || (RenderEngine = {}));
