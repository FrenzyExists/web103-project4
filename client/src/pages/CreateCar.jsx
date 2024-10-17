import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { createCar } from "../services/CarsAPI";

const CreateCar = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [wheelType, setWheelType] = useState("");
  const [usageType, setUsageType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [basePrice, setBasePrice] = useState(20000);
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const navigate = useNavigate();

  const colorPrices = {
    Black: 1000,
    Blue: 1200,
    Red: 1500,
    Pink: 1300,
    Green: 1100,
    White: 900,
  };

  const wheelTypePrices = {
    Alloy: 3000,
    Steel: 2000,
    Chrome: 4000,
  };

  useEffect(() => {
    const colorPrice = color ? colorPrices[color] : 0;
    const wheelPrice = wheelType ? wheelTypePrices[wheelType] : 0;
    setTotalPrice(basePrice + colorPrice + wheelPrice);
  }, [color, wheelType, basePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wheelType === "Steel" && usageType === "Personal") {
      setShowModal(true);
    } else {
      const newCar = {
        name,
        color,
        wheel_type: wheelType,
        usage_type: usageType,
        price: totalPrice,
      };
      try {
        await createCar(newCar);
        navigate("/customcars");
      } catch (error) {
        console.error("Error creating car", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="create-car-container">
      <h1>Create a New Car</h1>
      <form onSubmit={handleSubmit} className="create-car-form">
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter car name"
              required
            />
          </label>
          {name && <span className="selected-option">Selected: {name}</span>}
        </div>

        <div className="form-group">
          <label>
            Color:
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            >
              <option value="">Select a color</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Pink">Pink</option>
              <option value="Green">Green</option>
              <option value="White">White</option>
            </select>
          </label>
          {color && <span className="selected-option">Selected: {color}</span>}
        </div>

        <div className="form-group">
          <label>
            Wheel Type:
            <select
              value={wheelType}
              onChange={(e) => setWheelType(e.target.value)}
              required
            >
              <option value="">Select a wheel type</option>
              <option value="Alloy">Alloy</option>
              <option value="Steel">Steel</option>
              <option value="Chrome">Chrome</option>
            </select>
          </label>
          {wheelType && (
            <span className="selected-option">Selected: {wheelType}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            Usage Type:
            <select
              value={usageType}
              onChange={(e) => setUsageType(e.target.value)}
              required
            >
              <option value="">Select a usage type</option>
              <option value="Personal">Personal</option>
              <option value="Commercial">Commercial</option>
              <option value="Rental">Rental</option>
            </select>
          </label>
          {usageType && (
            <span className="selected-option">Selected: {usageType}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            Total Price: <span>${totalPrice}</span>{" "}
          </label>
        </div>

        <button type="submit" className="create-button">
          Create
        </button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Out of Stock</h2>
            <p>
              Sorry, you cannot have a steel wheel for a personal car because it
              is out of stock.
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCar;
