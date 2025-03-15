class GeoLocation {
    
    // Fetches geolocation and returns a promise resolving to the coordinates
    static fetchGeolocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude.toFixed(6);
                        const longitude = position.coords.longitude.toFixed(6);
                        const geolocation = { latitude, longitude };
                        const geolocationGMS = {
                            latitude: GeoLocation.decimalDegreesToGMS(latitude, 'latitude'),
                            longitude: GeoLocation.decimalDegreesToGMS(longitude, 'longitude'),
                        };

                        console.log("coordinates: ", latitude + ", " + longitude);
                        resolve({ geolocation});
                    },
                    error => {
                        console.error('Error obtaining geolocation', error);
                        reject(new Error('Unable to obtain your location. Please check your permissions.'));
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser');
                reject(new Error('Geolocation is not supported by your browser.'));
            }
        });
    }

    // Converts decimal degrees to GMS (degrees, minutes, seconds) format
    static decimalDegreesToGMS(decimalDegrees, type) {
        const absolute = Math.abs(decimalDegrees);
        const degrees = Math.floor(absolute);
        const minutesNotTruncated = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesNotTruncated);
        const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);

        const direction = decimalDegrees >= 0
            ? (type === 'latitude' ? 'N' : 'E')
            : (type === 'latitude' ? 'S' : 'W');

        return `${degrees}°${minutes}'${seconds}"${direction}`;
    }
}

export default GeoLocation;
