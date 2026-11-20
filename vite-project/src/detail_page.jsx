import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Carousel, Spinner } from 'react-bootstrap';

function RoomDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
const handleBookNow = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Apne storage key ke mutabiq check karein (e.g., 'user' ya 'token')
  if (!user) {
    navigate('/login' );
  } else {
    navigate(`/bookroom/${room._id}`);
  }
};
  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/room/${id}`);
        if (!response.ok) {
          throw new Error('Room not found');
        }
        const data = await response.json();
        setRoom(data);
        setLoading(false);
      } catch (error) {
        console.error('Room detail fetch error:', error);
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [id]);

  // Base64 image ko sahi format dene ke liye function (Rooms.jsx jaisa)
  const getImageSrc = (img) => {
    if (!img) return 'https://via.placeholder.com/600x400?text=No+Image';
    if (img.startsWith('data:image')) return img;
    return `data:image/jpeg;base64,${img}`;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  if (!room) {
    return <h2 className="text-center m-5">Room not found</h2>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={7}>
          <Carousel>
            {room.images && room.images.length > 0 ? (
              room.images.map((img, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100 rounded"
                    src={getImageSrc(img)}
                    style={{ height: '400px', objectFit: 'cover' }}
                    alt={`Room view ${i + 1}`}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src="https://via.placeholder.com/600x400?text=No+Image"
                  style={{ height: '400px', objectFit: 'cover' }}
                  alt="No image available"
                />
              </Carousel.Item>
            )}
          </Carousel>
        </Col>

        <Col md={5}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>{room.roomType}</h2>
            {room.status && <Badge bg="danger">{room.status}</Badge>}
          </div>

          <p className="text-muted">
            {room.rating && <>⭐ {room.rating} &nbsp;|&nbsp;</>}
            {room.size && <>{room.size} &nbsp;|&nbsp;</>}
            🛏 {room.bedType}
          </p>

          <h4 className="text-danger">
            Rs {room.pricePerNight} <small className="text-muted fs-6">/ night</small>
          </h4>

          <p>{room.description || 'No description available for this room.'}</p>

          {room.amenities && room.amenities.length > 0 && (
            <>
              <h5 className="mt-4">Amenities</h5>
              <div className="d-flex flex-wrap gap-2">
                {room.amenities.map((a, i) => (
                  <Badge key={i} bg="secondary" className="p-2">
                    {a}
                  </Badge>
                ))}
              </div>
            </>
          )}

          <Button
            variant="dark"
            size="lg"
            className="mt-4 w-100"
            disabled={room.status === 'Booked'}
             onClick={handleBookNow}
          >
            {room.status === 'Booked' ? 'Currently Booked' : 'Book Now'}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default RoomDetail;