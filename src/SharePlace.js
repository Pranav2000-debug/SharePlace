import "./styles/app.css";
import "./styles/my-place.css";
import "./styles/share-place.css";
import { Modal } from "./UI/Modal";
import { getCoordsFromAddress, getAddressFromCoords } from "./Util/Location";
import { Map } from "./UI/Map";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");

    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  sharePlaceHandler() {
    const shareLinkInput = document.getElementById("share-link");
    if (!navigator.clipboard) {
      shareLinkInput.select();
      return;
    }
    navigator.clipboard
      .writeText(shareLinkInput.value)
      .then(() => {
        alert("COPIED");
      })
      .catch((err) => {
        console.log(err);
        shareLinkInput.select();
      });
  }

  selectPlace(coordinates, addressRev) {
    if (!this.map) {
      this.map = new Map();
      this.map.initMap(coordinates);
    } else {
      this.map.render(coordinates);
    }
    this.shareBtn.disabled = false;
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = `${location.origin}/my-place.html?address=${encodeURI(
      addressRev
    )}&lat=${coordinates.lat}&lng=${coordinates.lon}`;
  }
  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Location feature not available in your browser.");
      return;
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maxmimumAge:0,
    };
    const modal = new Modal(
      "loading-modal-content",
      "Loading location- please wait"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        console.log(successResult.coords.latitude);
        console.log(successResult);
        const coordinates = {
          lat: successResult.coords.latitude,
          lon: successResult.coords.longitude,
        };
        const addressRev = await getAddressFromCoords(coordinates);
        console.log(addressRev);
        this.selectPlace(coordinates, addressRev);
        modal.hide();
      },
      (error) => {
        modal.hide();
        alert("Could not locate. Enter address manually");
      }, 
      options
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = document.querySelector("form input").value;
    if (!address || address.trim().length === 0) {
      alert("invalid address");
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location- please wait"
    );
    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      console.log(address);
      console.log(coordinates);
      this.selectPlace(coordinates, address);
    } catch (err) {
      alert(err.message);
    } finally {
      modal.hide();
    }
  }
}

new PlaceFinder();
