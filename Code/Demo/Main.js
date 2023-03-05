"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Demo;
(function (Demo) {
    class Main {
        constructor() {
            // Call start cause it's async.
            this.start();
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                let fileReader = new Utils.FileReader();
                let vertexShaderSource = yield fileReader.read('../Engine/Classe/Shaders/Default.vert');
                let fragmentShaderSource = yield fileReader.read('../Engine/Classe/Shaders/Default.frag');
                let triangle = new TMP.Triangle(vertexShaderSource, fragmentShaderSource);
                let renderer = new RenderEngine.Renderer();
                renderer.render([triangle]);
            });
        }
    }
    Demo.Main = Main;
})(Demo || (Demo = {}));
new Demo.Main();
