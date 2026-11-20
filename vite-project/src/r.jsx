import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function R() {
  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4 text-center">Hotel Management Rooms</h3>
      
      {/* Responsive Grid */}
      <div className="row g-4">
        
        {/* Card 1 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card hotel-card shadow-sm h-100">
            <div className="card-img-container position-relative">
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80" 
                alt="Deluxe Suite" 
              />
              <span className="badge bg-primary position-absolute top-0 start-0 m-3 badge-tag">
                Available
              </span>
            </div>
            
            <div className="card-body d-flex flex-column p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i> Block A, Floor 2
                </span>
                <span className="text-warning small fw-bold">
                  <i className="bi bi-star-fill me-1"></i> 4.8
                </span>
              </div>

              <h5 className="card-title fw-bold">Deluxe Ocean Suite</h5>
              <p className="card-text text-muted small">
                <i className="bi bi-person me-1"></i> 2 Guests • 1 King Bed
              </p>

              <div className="d-flex gap-2 my-2">
                <span className="badge bg-light text-dark border">WiFi</span>
                <span className="badge bg-light text-dark border">AC</span>
                <span className="badge bg-light text-dark border">TV</span>
              </div>

              <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                <div>
                  <span className="fs-4 fw-bold text-primary">$150</span>
                  <span className="text-muted small"> / night</span>
                </div>
                <button className="btn btn-outline-primary btn-sm fw-bold px-3">
                  Book Room
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card hotel-card shadow-sm h-100">
            <div className="card-img-container position-relative">
              <img 
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80" 
                alt="Executive Room" 
              />
              <span className="badge bg-danger position-absolute top-0 start-0 m-3 badge-tag">
                Occupied
              </span>
            </div>

            <div className="card-body d-flex flex-column p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i> Block B, Floor 4
                </span>
                <span className="text-warning small fw-bold">
                  <i className="bi bi-star-fill me-1"></i> 4.5
                </span>
              </div>

              <h5 className="card-title fw-bold">Executive Room</h5>
              <p className="card-text text-muted small">
                <i className="bi bi-person me-1"></i> 1 Guest • 1 Single Bed
              </p>

              <div className="d-flex gap-2 my-2">
                <span className="badge bg-light text-dark border">WiFi</span>
                <span className="badge bg-light text-dark border">Breakfast</span>
              </div>

              <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                <div>
                  <span className="fs-4 fw-bold text-primary">$90</span>
                  <span className="text-muted small"> / night</span>
                </div>
                <button className="btn btn-secondary btn-sm fw-bold px-3" disabled>
                  Booked
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card hotel-card shadow-sm h-100">
            <div className="card-img-container position-relative">
              <img 
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80" 
                alt="Family Villa" 
              />
              <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-3 badge-tag">
                Cleaning
              </span>
            </div>

            <div className="card-body d-flex flex-column p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i> Villa Block
                </span>
                <span className="text-warning small fw-bold">
                  <i className="bi bi-star-fill me-1"></i> 4.9
                </span>
              </div>

              <h5 className="card-title fw-bold">Family Luxury Suite</h5>
              <p className="card-text text-muted small">
                <i className="bi bi-person me-1"></i> 4 Guests • 2 Queen Beds
              </p>

              <div className="d-flex gap-2 my-2">
                <span className="badge bg-light text-dark border">WiFi</span>
                <span className="badge bg-light text-dark border">Pool</span>
                <span className="badge bg-light text-dark border">Balcony</span>
              </div>

              <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                <div>
                  <span className="fs-4 fw-bold text-primary">$230</span>
                  <span className="text-muted small"> / night</span>
                </div>
                <button className="btn btn-outline-primary btn-sm fw-bold px-3">
                  Book Room
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default R;