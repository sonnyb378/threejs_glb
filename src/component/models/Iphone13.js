import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Iphone13 = (props) => {
	const gltf = useLoader(GLTFLoader, './models/iphone13.glb');

	gltf.scene.traverse(function(object) {
		object.frustumCulled = false;
	});

	gltf.scene.position.set(0.0, 0.0, 0.0);
	gltf.scene.rotation.set(0.02, -0.4, -0.01);

	return <primitive object={gltf.scene} {...props} />;
};

export default Iphone13;
