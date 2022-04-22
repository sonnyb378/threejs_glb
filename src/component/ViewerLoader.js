import React, { useEffect } from 'react';
import * as THREE from 'three';
import { overlayVertexShader, overlayFragmentShader } from '../shader/overlay/OverlayShader';
import { gsap } from 'gsap';

export const ViewerLoader = ({ loaded, total }) => {
	const overlayGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0, 1.0, 1.0);
	const overlayMaterial = new THREE.ShaderMaterial({
		transparent: true,
		uniforms: {
			uAlpha: { value: 1.0 }
		},
		vertexShader: overlayVertexShader(),
		fragmentShader: overlayFragmentShader(),
		depthWrite: false
	});

	useEffect(() => {
		if (loaded === total) {
			gsap.delayedCall(1.5, () => {
				gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3.0, value: 0.0 });
			});
		}
	});

	return (
		<scene>
			<mesh geometry={overlayGeometry} material={overlayMaterial} />
		</scene>
	);
};
