import React, { useState, useEffect } from "react";
import "./index.css";

const BmiCalculator = () => {
  const storedHeight = JSON.parse(localStorage.getItem("height"));
  const storedWeight = JSON.parse(localStorage.getItem("weight"));
  const [height, setHeight] = useState(storedHeight !== null ? storedHeight : 170);
  const [weight, setWeight] = useState(storedWeight !== null ? storedWeight : 60);
  const [bmi, setBMI] = useState(null);

  const calculateBMI = () => {
    if (weight === "" || height === "") {
      alert("Please enter both weight and height.");
      return;
    }

    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100;

    const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(
      2
    );

    setBMI(bmiValue);
  };

  useEffect(() => {
    if (bmi !== null) {
      document.title = `Your BMI: ${bmi}`;
    }
  }, [bmi]);

  useEffect(() => {
    localStorage.setItem("height", JSON.stringify(height));
  }, [height]);

  useEffect(() => {
    localStorage.setItem("weight", JSON.stringify(weight));
  }, [weight]);

  const incrementHeight = () => {
    setHeight((prevHeight) => prevHeight + 1);
  };

  const decrementHeight = () => {
    setHeight((prevHeight) => prevHeight - 1);
  };

  const incrementWeight = () => {
    setWeight((prevWeight) => prevWeight + 1);
  };

  const decrementWeight = () => {
    setWeight((prevWeight) => prevWeight - 1);
  };

  return (
    <div>
      <h1>BMI Calculator</h1>
      <div>
        <label>
          Weight (in kg): {weight}{" "}
          <span className="value">(Increment/Decrement)</span>
        </label>
        <div className="button-container">
          <button className="button" onClick={incrementWeight}>
            Increment
          </button>
          <button className="button" onClick={decrementWeight}>
            Decrement
          </button>
        </div>
      </div>
      <div>
        <label>
          Height (in cm): {height}{" "}
          <span className="value">(Increment/Decrement)</span>
        </label>
        <div className="button-container">
          <button className="button" onClick={incrementHeight}>
            Increment
          </button>
          <button className="button" onClick={decrementHeight}>
            Decrement
          </button>
        </div>
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi !== null && (
        <div>
          <h2>Your BMI is: {bmi}</h2>
          <p>
            Interpretation:
            {bmi < 18.5
              ? "Underweight"
              : bmi >= 18.5 && bmi < 24.9
              ? "Normal Weight"
              : bmi >= 25 && bmi < 29.9
              ? "Overweight"
              : "Obese"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
