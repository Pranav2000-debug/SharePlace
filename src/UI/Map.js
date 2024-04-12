export class Map {
  constructor() {
    this.map = null;
    this.marker = null;
  }

  initMap(coordinates) {
    this.map = L.map("map").setView([coordinates.lat, coordinates.lon], 16);
    const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    osm.addTo(this.map); // Opening the Tile Layer. After opened, we are just updating the coordinates on it and not re-initializing the map

    // Add a marker at the initial coordinates
    this.marker = L.marker([coordinates.lat, coordinates.lon]).addTo(this.map);
  }

  render(coordinates) {
    this.map.setView([coordinates.lat, coordinates.lon], 16); // Update the map view

    // Remove the existing marker
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    // Add a new marker
    this.marker = L.marker([coordinates.lat, coordinates.lon]).addTo(this.map);
  }
}
