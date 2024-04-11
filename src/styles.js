const styles = {
  mapContainer: {
    marginBottom: '10px',
    overflow: "hidden",
    position: "relative",
    borderradius: "10px",
    cursor: 'grab'
  },
  mapContainerGrabbing: {
    cursor: 'grabbing'
  },
  uploadButton: {
    textAlign: 'center',
    width: '90px',
    padding: '6px 10px',
    background: '#181818',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer'
  },
  zoomControls: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: '1',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '5px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column'
  },
  zoomButton: {
    width: '30px',
    height: '30px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '18px',
    marginBottom: '5px'
  },
  fullscreenButton: {
    width: '30px',
    height: '30px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '18px',
    marginBottom: '5px'
  },
};

export default styles;