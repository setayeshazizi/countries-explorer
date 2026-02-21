import React from "react";
import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import CountriesList from "./components/CountriesList";
import SkeletonGrid from "./components/SkeletonGrid";
import SortSelect from "./components/SortSelect";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const applyFilters = (list) => {
    let result = list.filter((country) => {
      const matchSearch =
        debouncedSearch.trim() === "" ||
        country.name?.common
          ?.toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      const matchRegion = region === "all" || country.region === region;

      return matchSearch && matchRegion;
    });

    if (sort === "asc") {
      result = [...result].sort(
        (a, b) => (a.population ?? 0) - (b.population ?? 0)
      );
    }

    if (sort === "desc") {
      result = [...result].sort(
        (a, b) => (b.population ?? 0) - (a.population ?? 0)
      );
    }

    return result;
  };

  const visibleCountries = applyFilters(countries);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "";
        if (search.trim().length >= 2) {
          url = `https://restcountries.com/v3.1/name/${search}?fields=name,flags,region,population`;
        } else if (region !== "all") {
          url = `https://restcountries.com/v3.1/region/${region}?fields=name,flags,region,population`;
        } else {
          url = `https://restcountries.com/v3.1/all?fields=name,flags,region,population`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            setCountries([]);
            return;
          }
          throw new Error("Something went wrong while fetching countries.");
        }

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [debouncedSearch, region]);

  const handleClearFilters = () => {
    setSearch("");
    setRegion("all");
    setSort("none");
  };

  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ display: "flex", alignItems: "center", gap: "1px" }}>
          Countries Explorer
        </h1>
      </div>

      <div
        className="controls"
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <Controls
          search={search}
          setSearch={setSearch}
          region={region}
          setRegion={setRegion}
        />
        <SortSelect sort={sort} setSort={setSort} />

        <button
          className="clear-btn"
          onClick={handleClearFilters}
          style={{ height: "40px" }}
        >
          Clear Filters
        </button>
      </div>

      {loading && (
        <>
          <p>Loading countries...</p>
          <SkeletonGrid />
        </>
      )}

      {error && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Error: {error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}
      {!loading && !error && <CountriesList countries={visibleCountries} />}
    </div>
  );
}

export default App;
