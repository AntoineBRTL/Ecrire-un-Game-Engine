#version 300 es
precision mediump float;
in vec3 vertexPosition;

void main()
{
    gl_Position = vec4(vertexPosition, 1.0);
}