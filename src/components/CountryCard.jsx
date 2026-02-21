import React from "react";

function CountryCard({ country }) {
  return (
    <div className="glass-card">
      <img
        src={country.flags?.png}
        alt={country.name?.common ?? "Country flag"}
      />
      <h3>{country.name?.common ?? "Unknown Country"}</h3>
      <p>Region: {country.region ?? "Unknown"}</p>
      <p>
        Population:{" "}
        {country.population !== undefined
          ? country.population.toLocaleString()
          : "Unknown"}
      </p>
    </div>
  );
}

export default CountryCard;
