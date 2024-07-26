import Modal from 'react-modal';

const TouristSpotModal = ({ isOpen, onRequestClose, spot }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tourist Spot Details"
      ariaHideApp={false} // This is important for accessibility
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
    >
      <h2>{spot.tourists_spot_name}</h2>
      <img src={spot.image} alt={spot.tourists_spot_name} style={{ width: '100%' }} />
      <p>{spot.short_description}</p>
      <p><strong>Location:</strong> {spot.location}</p>
      <p><strong>Average Cost:</strong> ${spot.average_cost}</p>
      <p><strong>Best Season:</strong> {spot.seasonality}</p>
      <p><strong>Travel Time:</strong> {spot.travel_time}</p>
      <p><strong>Visitors per Year:</strong> {spot.totalVisitorsPerYear}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default TouristSpotModal;
