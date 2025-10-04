document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("retry-btn").addEventListener("click", fetchLocation);
  fetchLocation();
});

async function fetchLocation() {
  const loading = document.getElementById("loading");
  const errorBox = document.getElementById("error");
  const locationCard = document.getElementById("location-card");

  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
  locationCard.classList.add("hidden");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch(`http://127.0.0.1:8000/reverse-geocode?lat=${latitude}&lng=${longitude}`);
        const data = await res.json();
const firstResult = data.results[0];
        if (!firstResult) {
          showError("No location data found.");
          return;
        }

        const components = firstResult.address_components || [];

        const formattedAddress = firstResult.formatted_address || "Not found";
        const postalCode = components.find(c => c.types.includes("postal_code"))?.long_name || "Not found";
        const country = components.find(c => c.types.includes("country"))?.long_name || "Not found";
        const state = components.find(c => c.types.includes("administrative_area_level_1"))?.long_name || "Not found";
        const region = components.find(c => c.types.includes("administrative_area_level_2"))?.long_name || "Not found";
        const city = components.find(c => c.types.includes("locality"))?.long_name 
                   || components.find(c => c.types.includes("administrative_area_level_3"))?.long_name 
                   || "Not found";


        document.getElementById("address").textContent = formattedAddress;
        document.getElementById("postal-code").textContent = postalCode;
        document.getElementById("coordinates").textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        loading.classList.add("hidden");
        locationCard.classList.remove("hidden");
      } catch (e) {
        showError("Failed to fetch location data.");
      }
    },
    () => showError("Unable to access your location. Please enable location permission."),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } 
  );
}

function showError(message) {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("error").classList.remove("hidden");
  document.getElementById("error-message").textContent = message;
}
