import { useEffect, useState } from 'react';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Rooms() {
  const [roomsData, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navi = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/room');
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error('Rooms fetch error:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Base64 image ko sahi format dene ke liye function
  const getImageSrc = (img) => {
    if (!img) return 'https://via.placeholder.com/400x200?text=No+Image';
    // Agar string pehle se data:image se shuru ho rahi hai
    if (img.startsWith('data:image')) return img;
    // Agar raw base64 string hai
    return `data:image/jpeg;base64,${img}`;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row g-4">
        {roomsData.map((room) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={room._id}>
            <Card className="h-100 shadow-sm border-0 room-card">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={getImageSrc(room.images?.[0])}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                {room.status && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 end-0 m-2"
                  >
                    {room.status}
                  </Badge>
                )}
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-1">{room.roomType}</Card.Title>

                <Card.Text className="text-muted mb-2">
                  🛏 {room.bedType}
                </Card.Text>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold fs-5">
                    Rs {room.pricePerNight}/night
                  </span>
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => navi(`/room/${room._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;