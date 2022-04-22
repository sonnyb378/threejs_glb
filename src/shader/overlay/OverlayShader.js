export const overlayVertexShader = () => {
	return `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;
};

export const overlayFragmentShader = () => {
	return `
    uniform float uAlpha;
    void main() {
	    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }
  `;
};
