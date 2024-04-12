import "./styles/app.css";
import "./styles/my-place.css";
import { Map } from "./UI/Map"

class LoaderPlace {
    constructor(coordinates, address) {
        const mapped = new Map();
        mapped.initMap(coordinates);
        const headerTitle = document.querySelector('header h1');
        headerTitle.textContent = address;
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
    lat: parseFloat(queryParams.get('lat')),
    lon: parseFloat(queryParams.get('lng'))
}
console.log(coords);
const address = queryParams.get('address');
console.log(address);
new LoaderPlace(coords, address);