import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useProgress } from '@react-three/drei';
import Iphone13 from './component/models/Iphone13';
import { gsap } from 'gsap';
import { ViewerLoader } from './component/ViewerLoader';
import './App.css';

function App() {
	const loadingBarElement = document.querySelector('.loadingBar');

	const { progress, loaded, total } = useProgress();

	useEffect(
		() => {
			const progressRatio = loaded / total;
			if (!isNaN(progressRatio)) {
				// loadingBarElement.style.transform = `scaleX(${progressRatio})`;
				loadingBarElement.innerHTML = `${progress.toFixed(0)}`;
			}

			if (loadingBarElement && loaded === total) {
				gsap.delayedCall(0.9, () => {
					loadingBarElement.classList.add('complete');
					loadingBarElement.style.transform = '';
				});
			}
		}
		// [ loaded, total, progressRatio, loadingBarElement ]
	);

	return (
		<div className="App">
			<LoadingBar className="loadingBar" />
			<Suspense fallback={null}>
				<Canvas
					dpr={[ 1, 2 ]}
					shadows
					camera={{
						fov: 55,
						aspect: window.innerWidth / window.innerHeight,
						near: 1.0,
						far: 1000
					}}
				>
					<ViewerLoader loaded={loaded} total={total} />

					<OrbitControls target={[ 0.0, 2.5, 0.0 ]} />
					<Stage
						environment="dawn"
						intensity={0.9}
						contactShadow={false}
						shadowBias={-0.0015}
					>
						<Iphone13 scale={0.25} />
					</Stage>
				</Canvas>
			</Suspense>
		</div>
	);
}

const LoadingBar = styled.div`
	position: absolute;
	width: 100px;
	height: 100px;
	z-index: 1000;
	opacity: 1;
	border-radius: 50%;

	font-size: 2em;
	color: white;

	display: flex;
	align-items: center;
	justify-content: center;

	&.complete {
		opacity: 0;
		transition: opacity .5s ease;
	}
`;

export default App;
