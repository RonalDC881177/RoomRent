import { useEffect, useState } from "react";
import { getProperties } from "../api/properties";
import { useLocation } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const locationHook = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(locationHook.search);
      const filters = {
        locality: params.get("locality"),
        propertyType: params.get("propertyType"),
        minPrice: params.get("minPrice"),
        maxPrice: params.get("maxPrice"),
      };
      const data = await getProperties({
        locality: filters.locality,
        propertyType: filters.propertyType,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });

      setProperties(data.properties);
    };
    fetchData();
  }, [locationHook.search]);
  return (
    <div>
      {properties.map((prop) => (
        <div key={prop._id}>
          <h3>{prop.title}</h3>
          <p>{prop.locality}</p>
          <p>${prop.price.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default Properties;
