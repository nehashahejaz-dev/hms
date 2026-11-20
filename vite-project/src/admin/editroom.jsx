import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Editroom = () => {
    const { id } = useParams(); 

  const initialFormState = {
    roomNumber: "",
    roomType: "Single",
    pricePerNight: "",
    seasonalPrice: "",
    status: "Available",
    capacity: "",
    bedType: "Single Bed",
    roomSize: "",
    cancellationPolicy: "Flexible",
    description: "",
    specialNotes: "",
    amenities: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // FIX 1: Fetching state added
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // 1. Fetch Room Data on Mount or ID Change
useEffect(() => {
    const fetchRoomDetails = async () => {
      console.log("Extracted Room ID from URL:", id);

      if (!id) {
        setFetching(false);
        return;
      }

      try {
        setFetching(true);
        const response = await axios.get(`http://localhost:5000/room/${id}`);
        
        // Response key handling
        const room = response.data?.data || response.data;

        const amenitiesString = Array.isArray(room.amenities)
          ? room.amenities.join(", ")
          : room.amenities || "";

        // Form state update with database fields
        setFormData({
          roomNumber: room.roomNumber || room.room_number || "",
          roomType: room.roomType || room.type || "Single",
          pricePerNight: room.pricePerNight || room.price || "",
          seasonalPrice: room.seasonalPrice || "",
          status: room.status || "Available",
          capacity: room.capacity || "",
          bedType: room.bedType || "Single Bed",
          roomSize: room.roomSize || "",
          cancellationPolicy: room.cancellationPolicy || "Flexible",
          description: room.description || "",
          specialNotes: room.specialNotes || "",
          amenities: amenitiesString,
          images: room.images || [],
        });
      } catch (error) {
        console.error("Error fetching room details:", error);
        setAlert({
          show: true,
          type: "danger",
          message: error.response?.data?.message || "Failed to load room details.",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(base64Promises)
      .then((newBase64Images) => {
        // Purani aur nayi images ko merge kar rahe hain
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...newBase64Images],
        }));
      })
      .catch(() => {
        setAlert({
          show: true,
          type: "danger",
          message: "Error converting image files.",
        });
      });
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, type: "", message: "" });

    const payload = {
      ...formData,
      amenities: formData.amenities
        ? formData.amenities.split(",").map((item) => item.trim())
        : [],
    };

    try {
      // FIX 2: axios.put update endpoint use ho raha hai
      const response = await axios.put(`http://localhost:5000/room/${id}`, payload);

      setAlert({
        show: true,
        type: "success",
        message: response.data.message || "Room updated successfully!",
      });
    } catch (error) {
      console.error("Error updating room data:", error);
      setAlert({
        show: true,
        type: "danger",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="container text-center my-5 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading room details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ position: "relative", zIndex: 1 }}>
  <div className="card shadow-lg border-0 rounded-3">

        <div className="card-header bg-warning text-dark text-center py-3">
          <h3 className="mb-0 fw-bold">Edit Room Details</h3>
        </div>
        <div className="card-body p-4">
          
          {alert.show && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <h5 className="text-secondary border-bottom pb-2 mb-3">Basic Details</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Room Number *</label>
                <input
                  type="text"
                  className="form-control"
                  name="roomNumber"
                  placeholder="e.g., 101-A"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Room Type *</label>
                <select className="form-select" name="roomType" value={formData.roomType} onChange={handleChange}>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Price Per Night ($) *</label>
                <input
                  type="number"
                  className="form-control"
                  name="pricePerNight"
                  placeholder="0.00"
                  value={formData.pricePerNight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Seasonal Price ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="seasonalPrice"
                  placeholder="0.00"
                  value={formData.seasonalPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Room Specifications */}
            <h5 className="text-secondary border-bottom pb-2 mb-3">Room Specifications</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Status *</label>
                <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Capacity *</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  placeholder="Max guests"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Room Size (sq ft) *</label>
                <input
                  type="number"
                  className="form-control"
                  name="roomSize"
                  placeholder="e.g., 250"
                  value={formData.roomSize}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Bed Type *</label>
                <select className="form-select" name="bedType" value={formData.bedType} onChange={handleChange}>
                  <option value="Single Bed">Single Bed</option>
                  <option value="2 Single Beds">2 Single Beds</option>
                  <option value="1 Double Bed">1 Double Bed</option>
                  <option value="1 King Bed">1 King Bed</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Cancellation Policy</label>
                <select className="form-select" name="cancellationPolicy" value={formData.cancellationPolicy} onChange={handleChange}>
                  <option value="Flexible">Flexible</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Strict">Strict</option>
                </select>
              </div>
            </div>

            {/* Amenities & Media */}
            <h5 className="text-secondary border-bottom pb-2 mb-3">Amenities & Media</h5>
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label fw-semibold">Amenities (Comma separated) *</label>
                <input
                  type="text"
                  className="form-control"
                  name="amenities"
                  placeholder="WiFi, TV, AC, Minibar"
                  value={formData.amenities}
                  onChange={handleChange}
                />
              </div>

              {/* Current Images Preview */}
              {formData.images.length > 0 && (
                <div className="col-12">
                  <label className="form-label fw-semibold">Current Images</label>
                  <div className="d-flex flex-wrap gap-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="position-relative">
                        <img
                          src={img}
                          alt={`room-${idx}`}
                          className="rounded border"
                          style={{ width: "90px", height: "90px", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0 rounded-circle"
                          style={{ width: "20px", height: "20px", lineHeight: "1" }}
                          onClick={() => handleRemoveImage(idx)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-12">
                <label className="form-label fw-semibold">Upload More Images</label>
                <input
                  type="file"
                  id="images"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-warning w-100 py-2 fw-bold text-dark" disabled={loading}>
              {loading ? "Updating..." : "Update Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editroom;