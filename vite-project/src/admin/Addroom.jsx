import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios

const AddRoom = () => {
  // 1. Initial state definition to easily reset the form later
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
    images: [], // Base64 strings ki array
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

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
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          images: base64Images,
        }));
      })
      .catch((err) => {
        setAlert({
          show: true,
          type: "danger",
          message: "Error converting image files.",
        });
      });
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
      const response = await axios.post("http://localhost:5000/room", payload);

      setAlert({
        show: true,
        type: "success",
        message: response.data.message || "Room added successfully!",
      });

      // Form reset logic
      setFormData(initialFormState);
      
      // Clear file input manually from DOM if needed
      document.getElementById("images").value = "";

    } catch (error) {
      console.error("Error submitting room data:", error);
      setAlert({
        show: true,
        type: "danger",
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white text-center py-3">
          <h3 className="mb-0 fw-bold">Add New Room</h3>
        </div>
        <div className="card-body p-4">
          
          {/* Alert Handling Visual */}
          {alert.show && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info Section */}
            <h5 className="text-secondary border-bottom pb-2 mb-3">
              Basic Details
            </h5>
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
                <label className="form-label fw-semibold">Price Per Night (\$) *</label>
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
                <label className="form-label fw-semibold">Seasonal Price (\$)</label>
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
            <h5 className="text-secondary border-bottom pb-2 mb-3">
              Room Specifications
            </h5>
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

              <div className="col-12">
                <label className="form-label fw-semibold">Upload Images *</label>
                <input
                  type="file"
                  id="images"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange} // CRUCIAL: value attribute nahi lagana yahan!
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
              {loading ? "Submitting..." : "Add Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
