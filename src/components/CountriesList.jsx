import CountryCard from "./CountryCard";
import React from "react";

function CountriesList({ countries }) {
  if (countries.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        No results found!
      </p>
    );

  return (
    <div className="countries-container">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3 || country.name?.common}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountriesList;
