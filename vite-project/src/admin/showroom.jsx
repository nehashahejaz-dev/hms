import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowRoom() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend se rooms fetch karein
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");

      // Apne backend ka actual API URL yahan likhein
      const res = await axios.get(
        "http://localhost:5000/room"
      );

      setRooms(
        Array.isArray(res.data) ? res.data : res.data.rooms || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Rooms load nahi ho sake. Backend API check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Room delete karein
  const deleteRoom = async (id) => {
    const confirmDelete = window.confirm(
      "Kya aap waqai is room ko delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/rooms/${id}`
      );

      setRooms((prevRooms) =>
        prevRooms.filter((room) => room._id !== id)
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Room delete nahi ho saka."
      );
    }
  };

  // Search filter
  const filteredRooms = rooms.filter((room) => {
    const value = search.toLowerCase();

    return (
      room.roomNumber?.toLowerCase().includes(value) ||
      room.roomType?.toLowerCase().includes(value) ||
      room.status?.toLowerCase().includes(value)
    );
  });

  // Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "bg-success";
      case "Booked":
        return "bg-danger";
      case "Under Maintenance":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    
<div
  className="container-fluid p-4"

>



      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">🏨 Show Rooms</h2>
          <p className="text-muted mb-0">
            Manage all hotel rooms
          </p>
        </div>

        <Link
          to="/admin/addroom"
          className="btn btn-primary"
        >
          + Add Room
        </Link>
      </div>

      {/* Search and count */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row align-items-center mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search room number, type or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-6 text-md-end">
              <span className="badge bg-primary fs-6">
                Total Rooms: {filteredRooms.length}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={fetchRooms}
              >
                ↻ Refresh
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
              />
              <p className="mt-2">Loading rooms...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger">
              {error}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={fetchRooms}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Rooms table */}
          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Room No.</th>
                    <th>Room Type</th>
                    <th>Price / Night</th>
                    <th>Seasonal Price</th>
                    <th>Status</th>
                    <th>Capacity</th>
                    <th>Bed Type</th>
                    <th>Room Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room, index) => (
                      <tr key={room._id}>
                        <td>{index + 1}</td>

                        <td className="fw-bold">
                          {room.roomNumber}
                        </td>

                        <td>{room.roomType}</td>

                        <td>
                          Rs.{" "}
                          {Number(
                            room.pricePerNight
                          ).toLocaleString()}
                        </td>

                        <td>
                          {room.seasonalPrice != null
                            ? `Rs. ${Number(
                                room.seasonalPrice
                              ).toLocaleString()}`
                            : "—"}
                        </td>

                        <td>
                          <span
                            className={`badge ${getStatusClass(
                              room.status
                            )}`}
                          >
                            {room.status}
                          </span>
                        </td>

                        <td>{room.capacity} persons</td>

                        <td>{room.bedType}</td>

                        <td>{room.roomSize} sq. ft.</td>

                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              to={`/admin/editroom/${room._id}`}
                              className="btn btn-sm btn-warning"
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                deleteRoom(room._id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center py-4 text-muted"
                      >
                        No rooms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}