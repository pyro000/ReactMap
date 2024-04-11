import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faExpand } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de haber instalado la librería @fortawesome/fontawesome-free
import { TransformWrapper, TransformComponent , useControls } from "react-zoom-pan-pinch";
import placeholder from './placeholder.jpg';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styles from './styles';

const ZoomControls = ({handle}) => {
  const { zoomIn, zoomOut } = useControls();
  return (
    <div style={styles.zoomControls}>
      <button onClick={() => zoomIn()} style={styles.zoomButton}>
        <FontAwesomeIcon icon={faSearchPlus} />
      </button>
      <button onClick={() => zoomOut()} style={styles.zoomButton}>
        <FontAwesomeIcon icon={faSearchMinus} />
      </button>
      <button onClick={handle.active ? handle.exit : handle.enter} style={styles.fullscreenButton}>
        <FontAwesomeIcon icon={faExpand} />
      </button>
    </div>
  );
};

const MapWidget = ({handle, imageUrl}) => {
  return (
    <FullScreen handle={handle}>
      <div style={styles.mapContainer}>
        <TransformWrapper>
          <TransformComponent>
            <img
              src={imageUrl ?? placeholder}
              alt="test"
              wheel={{step:100}}
              doubleClick={{step:10, animationTime: 0}}
              style={{
                width: handle.active ? "100vw" : 800,
                height: handle.active ? "100vh" : 550,
                objectFit: "contain"
              }}
            />
          </TransformComponent>
          <ZoomControls handle={handle}/>
        </TransformWrapper>
      </div>
    </FullScreen>
  );
};

const MapNavigation = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const handle = useFullScreenHandle();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {

    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || 
                                document.webkitFullscreenElement || 
                                document.mozFullScreenElement || 
                                document.msFullscreenElement;
      const isFullscreen = fullscreenElement ? true : false;
      console.log("Fullscreen changed:", isFullscreen);

      if (!isFullscreen) {
        handle.enter();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [handle]);

  document.body.style = "height: 100vh; display: flex; align-items: center; justify-content: center; background-color: black;"

  return (
    <div>
      <MapWidget handle={handle} imageUrl={imageUrl} />
      <input
        type="file"
        id="upload"
        onChange={handleImageUpload}
        accept="image/*"
      />
    </div>
  );
};

export default MapNavigation;
