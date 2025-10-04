const findBtn = document.getElementById("find-location");

findBtn.addEventListener("click", () => {
  const loading = document.getElementById("loading");
  const errorBox = document.getElementById("error");
  const result = document.getElementById("result");

  // Hide error and result properly using classes
  errorBox.classList.remove("show");
  result.classList.remove("show");

  // Show loading
  loading.classList.add("show");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${latitude}&lon=${longitude}`
        );
        const xmlText = await res.text();

        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // Extract info
        const postcode = xmlDoc.querySelector("postcode")?.textContent || "Not found";
        const city = xmlDoc.querySelector("city")?.textContent || 
                     xmlDoc.querySelector("town")?.textContent || 
                     xmlDoc.querySelector("village")?.textContent || 
                     "Unknown";
        const state = xmlDoc.querySelector("state")?.textContent || "Unknown";
        const country = xmlDoc.querySelector("country")?.textContent || "Unknown";
        const road = xmlDoc.querySelector("road")?.textContent || "-";

    

        // Update DOM
        document.getElementById("postal-code").textContent = postcode;
        document.getElementById("location-name").textContent = city;
        document.getElementById("country").textContent = country;
        document.getElementById("coordinates").textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        // Hide loading & show result using class for CSS
        loading.classList.remove("show");
        result.classList.add("show");
      } catch (e) {
        showError("Failed to fetch postal code. Please try again.");
      }
    },
    (err) => {
      showError("Unable to access your location. Please enable location permission.");
    }
  );
});

function showError(message) {
  const loading = document.getElementById("loading");
  const errorBox = document.getElementById("error");

  loading.classList.remove("show");
  errorBox.querySelector("#error-message").textContent = message;
  errorBox.classList.add("show");
}
