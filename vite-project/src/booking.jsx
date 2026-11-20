import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Badge, Alert } from "react-bootstrap";

const API = "http://localhost:5000/booking"; // change to your backend URL

export default function Booking() {
  const { roomId } = useParams(); // route: /booking/:roomId
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null"); // adjust to how you store login
  const token = localStorage.getItem("token");

  const [room, setRoom] = useState(null);
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get(`${API}/rooms/${roomId}`)
      .then((res) => setRoom(res.data))
      .catch(() => setError("Could not load room"));
  }, [roomId]);

  const pricePerNight = room?.pricePerNight ?? room?.price ?? 0;

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const diff = (new Date(form.checkOut) - new Date(form.checkIn)) / 86400000;
    return diff > 0 ? Math.ceil(diff) : 0;
  }, [form.checkIn, form.checkOut]);

  const total = nights * pricePerNight;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nights) return setError("Check-out must be after check-in");

    try {
      setLoading(true);
      await axios.post(
        `${API}/bookings`,
        { roomId, ...form, guests: Number(form.guests) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/my-bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <Container className="my-5">{error || "Loading..."}</Container>;

  return (
    <Container className="my-5">
      <h2 className="mb-4 fw-bold">Complete Your Booking</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm border-0 rounded-3 p-4">
            <h4 className="mb-3 fw-semibold">Stay & Guest Details</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="checkIn">
                    <Form.Label className="fw-semibold">Check-In Date</Form.Label>
                    <Form.Control type="date" size="lg" name="checkIn" min={today}
                      value={form.checkIn} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="checkOut">
                    <Form.Label className="fw-semibold">Check-Out Date</Form.Label>
                    <Form.Control type="date" size="lg" name="checkOut"
                      min={form.checkIn || today}
                      value={form.checkOut} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4" controlId="guests">
                <Form.Label className="fw-semibold">Number of Guests</Form.Label>
                <Form.Select size="lg" name="guests" value={form.guests} onChange={handleChange}>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} Guest{n > 1 && "s"}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="bg-light p-3 rounded-3 mb-4 border">
                <small className="text-muted d-block">Booking as:</small>
                <strong>{user?.name}</strong>
                <span className="text-muted ms-2">({user?.email})</span>
              </div>

              <Button type="submit" variant="dark" size="lg" className="w-100 py-2 fw-semibold"
                disabled={loading || !nights}>
                {loading ? "Booking..." : `Confirm Booking (Rs ${total.toLocaleString()})`}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
            <Card.Img variant="top" src={room.image || "https://via.placeholder.com/500x250?text=Room+Preview"}
              style={{ height: "220px", objectFit: "cover" }} />
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0 fw-bold">{room.name || room.type}</h4>
                {room.bedType && <Badge bg="secondary" className="px-3 py-2">{room.bedType}</Badge>}
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Price per night</span>
                <span className="fw-semibold">Rs {pricePerNight.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Total Nights</span>
                <span className="fw-semibold">{nights} Night{nights !== 1 && "s"}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Guests</span>
                <span className="fw-semibold">{form.guests} Guest{form.guests > 1 && "s"}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Total Amount</h5>
                <h4 className="mb-0 text-danger fw-bold">Rs {total.toLocaleString()}</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}