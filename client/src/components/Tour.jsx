import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import './Tour.css';

const VirtualRoom = ({ roomType }) => {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
  });

  const createRoomGeometry = () => {
    const roomSize = 50;
    const elements = [];

    // Solo suelo y techo, sin paredes
    elements.push(
      <mesh key="floor" position={[0, -roomSize / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomSize, roomSize]} />
        <meshPhongMaterial color={0x8B4513} />
      </mesh>
    );



    return elements.concat(getRoomSpecificElements(roomType));
  };

  const getRoomSpecificElements = (type) => {
    switch (type) {
      case 'library':
        return createLibraryElements();
      case 'classroom':
        return createClassroomElements();
      case 'lab':
        return createLabElements();
      default:
        return [];
    }
  };

  const createLibraryElements = () => {
    const elements = [];
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

    for (let i = 0; i < 4; i++) {
      elements.push(
        <mesh key={`shelf-${i}`} position={[-20 + i * 13, -15, -20]}>
          <boxGeometry args={[8, 20, 2]} />
          <meshPhongMaterial color={0x8B4513} />
        </mesh>
      );
    }

    for (let i = 0; i < 12; i++) {
      elements.push(
        <mesh key={`book-${i}`} position={[-18 + (i % 4) * 13, -10 + Math.floor(i / 4) * 8, -19]}>
          <boxGeometry args={[1, 6, 0.5]} />
          <meshPhongMaterial color={colors[i % colors.length]} />
        </mesh>
      );
    }

    const furniture = [
      { key: 'table', position: [0, -20, 0], args: [12, 2, 6], color: 0x654321 },
      { key: 'chair1', position: [-8, -15, 0], args: [3, 8, 3], color: 0x4B0082 },
      { key: 'chair2', position: [8, -15, 0], args: [3, 8, 3], color: 0x4B0082 }
    ];

    furniture.forEach(item => {
      elements.push(
        <mesh key={item.key} position={item.position}>
          <boxGeometry args={item.args} />
          <meshPhongMaterial color={item.color} />
        </mesh>
      );
    });

    return elements;
  };

  const createClassroomElements = () => {
    const elements = [];

    elements.push(
      <mesh key="blackboard" position={[0, 5, -24]}>
        <boxGeometry args={[20, 12, 0.5]} />
        <meshPhongMaterial color={0x2F4F2F} />
      </mesh>
    );

    elements.push(
      <mesh key="teacher-desk" position={[0, -20, -15]}>
        <boxGeometry args={[8, 2, 4]} />
        <meshPhongMaterial color={0x8B4513} />
      </mesh>
    );

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        elements.push(
          <mesh key={`desk-${row}-${col}`} position={[-15 + col * 10, -20, -5 + row * 8]}>
            <boxGeometry args={[4, 2, 3]} />
            <meshPhongMaterial color={0xD2691E} />
          </mesh>
        );

        elements.push(
          <mesh key={`chair-${row}-${col}`} position={[-15 + col * 10, -15, -2 + row * 8]}>
            <boxGeometry args={[2, 6, 2]} />
            <meshPhongMaterial color={0x8B0000} />
          </mesh>
        );
      }
    }

    return elements;
  };

  const createLabElements = () => {
    const elements = [];
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];

    for (let i = 0; i < 3; i++) {
      elements.push(
        <mesh key={`lab-table-${i}`} position={[-15 + i * 15, -18, 0]}>
          <boxGeometry args={[8, 4, 4]} />
          <meshPhongMaterial color={0x708090} />
        </mesh>
      );
    }

    for (let i = 0; i < 6; i++) {
      elements.push(
        <mesh key={`equipment-${i}`} position={[-20 + i * 8, -12, 0]}>
          <cylinderGeometry args={[1, 1, 4]} />
          <meshPhongMaterial color={0x4682B4} />
        </mesh>
      );
    }

    elements.push(
      <mesh key="chemical-shelf" position={[0, -5, -20]}>
        <boxGeometry args={[30, 15, 3]} />
        <meshPhongMaterial color={0x8B4513} />
      </mesh>
    );

    for (let i = 0; i < 8; i++) {
      elements.push(
        <mesh key={`bottle-${i}`} position={[-12 + i * 3, 0, -19]}>
          <cylinderGeometry args={[0.5, 0.5, 3]} />
          <meshPhongMaterial color={colors[i % colors.length]} />
        </mesh>
      );
    }

    return elements;
  };

  const getRoomTitle = () => {
    switch (roomType) {
      case 'library':
        return 'Biblioteca Virtual';
      case 'classroom':
        return 'Aula Virtual';
      case 'lab':
        return 'Laboratorio Virtual';
      default:
        return 'Recorrido Virtual';
    }
  };

  return (
    <group ref={meshRef}>
      {createRoomGeometry()}

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 20, 0]} intensity={0.6} />

      <Text
        position={[0, 15, 0]}
        fontSize={3}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {getRoomTitle()}
      </Text>

      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          position={[
            Math.sin(time + i) * 20,
            Math.cos(time + i * 0.5) * 15,
            Math.sin(time + i * 0.3) * 20
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={0xffffff} opacity={0.5} transparent />
        </mesh>
      ))}
    </group>
  );
};

const Scene = ({ roomType }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [roomType]);

  if (isLoading) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          <meshBasicMaterial color="#1a1a1a" side={THREE.BackSide} />
        </mesh>
        <Text
          position={[0, 0, 0]}
          fontSize={5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Cargando...
        </Text>
      </>
    );
  }

  return (
    <>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        minDistance={5}
        maxDistance={100}
        target={[0, 0, 0]}
      />
      <VirtualRoom roomType={roomType} />
    </>
  );
};

const Tour = ({ title, image, description, onPlay, roomType }) => {
  const [isViewing, setIsViewing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
    events.forEach(event => document.addEventListener(event, handleFullscreenChange));

    return () => {
      events.forEach(event => document.removeEventListener(event, handleFullscreenChange));
    };
  }, []);

  if (!title || !image || !description) {
    return null;
  }

  const handlePlay = () => {
    if (roomType) {
      setIsViewing(true);
    }
    onPlay?.();
  };

  const handleBack = () => {
    if (isFullscreen) {
      exitFullscreen();
    }
    setIsViewing(false);
  };

  const enterFullscreen = () => {
    if (!viewerRef.current) return;

    const element = viewerRef.current;
    const methods = ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'];

    for (const method of methods) {
      if (element[method]) {
        element[method]();
        break;
      }
    }
  };

  const exitFullscreen = () => {
    const methods = ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'];

    for (const method of methods) {
      if (document[method]) {
        document[method]();
        break;
      }
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const renderButton = (onClick, ariaLabel, icon, text, isBack = false) => (
    <button
      className={`tour-card__header-button ${isBack ? 'tour-card__back-button' : 'tour-card__fullscreen-button'}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
      {text}
    </button>
  );

  if (isViewing && roomType) {
    return (
      <div className="tour-card tour-card--viewing" ref={viewerRef}>
        <div className="tour-card__viewer-header">
          <h2 className="tour-card__viewer-title">{title}</h2>
          <div className="tour-card__header-buttons">
            {renderButton(
              toggleFullscreen,
              isFullscreen ? "Salir de pantalla completa" : "Pantalla completa",
              isFullscreen ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              ),
              isFullscreen ? 'Salir' : 'Pantalla completa'
            )}
            {renderButton(
              handleBack,
              "Volver a la vista previa",
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>,
              'Volver',
              true
            )}
          </div>
        </div>

        <div className="tour-card__viewer">
          <Canvas
            camera={{ position: [0, 0, 30], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
            gl={{
              antialias: true,
              alpha: false,
              preserveDrawingBuffer: false,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false
            }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1;
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }}
            fallback={
              <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
                Cargando recorrido virtual...
              </div>
            }
          >
            <Scene roomType={roomType} />
          </Canvas>
        </div>

        <div className="tour-card__viewer-controls">
          <span className="tour-card__instructions">
            Arrastra para rotar • Rueda del mouse para zoom • Clic derecho para desplazar
            {isFullscreen && " • Presiona ESC para salir de pantalla completa"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="tour-card">
      <div
        className="tour-card__background"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="tour-card__overlay">
          <div className="tour-card__content">
            <h2 className="tour-card__title">{title}</h2>

            <button
              className="tour-card__play-button"
              onClick={handlePlay}
              aria-label="Reproducir tour"
            >
              <svg
                className="tour-card__play-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <p className="tour-card__description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;