
const newDelhiBounds = [
    [28.47, 76.98],
    [28.72, 77.30]
];

// Create the map.
const map = L.map("map", {
    zoomControl: true,
    minZoom: 12,
    maxZoom: 18,
    maxBounds: newDelhiBounds,
    maxBoundsViscosity: 1.0
});

// Add the OpenStreetMap background.
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19
}).addTo(map);

// Set the initial view.
map.setView([28.6139, 77.2090], 13);

// Keep track of all road layers.
const roadLayers = [];

// Normal and selected road styles. c75b39; 1464d2
const normalStyle = {
    color: "#1c8870",
    weight: 3.5,
    opacity: 0.6
};

const selectedStyle = {
    color: "#1c8870",
    weight: 9,
    opacity: 1
};

// Load road information from roads.json.
async function loadRoads() {
    try {
        const response = await fetch("data/roads.json");

        if (!response.ok) {
            throw new Error("Could not load roads.json");
        }

        const roads = await response.json();

        // Load each road's geometry.
        for (const road of roads) {
            await loadRoad(road);
        }
    } catch (error) {
        console.error("Error loading roads:", error);
        showRoadError(
            "Road data could not be loaded. Check your file paths and local server."
        );
    }
}

// Load one road's GeoJSON.
async function loadRoad(road) {
    try {
        const response = await fetch(road.geojson);

        if (!response.ok) {
            throw new Error("Could not load " + road.geojson);
        }

        const geojson = await response.json();

        let roadLayer;

        roadLayer = L.geoJSON(geojson, {
            style: normalStyle,

            onEachFeature: function (feature, layer) {
                layer.on("click", function () {
                    // Reset all roads to their normal appearance.
                    roadLayers.forEach(function (item) {
                        item.layer.setStyle(normalStyle);
                    });

                    // Highlight the entire selected road layer.
                    roadLayer.setStyle(selectedStyle);

                    // Display the road's information in the sidebar.
                    displayRoadInfo(road);
                });
            }
        }).addTo(map);

        roadLayers.push({
            id: road.id,
            layer: roadLayer
        });

    } catch (error) {
        console.error("Error loading road:", road.roadName, error);
        showRoadError(
            "Could not load " + road.roadName +
            ". Check its GeoJSON file and path."
        );
    }
}

// Start loading the roads.
loadRoads();
