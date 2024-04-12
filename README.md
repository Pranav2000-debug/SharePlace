## This is a simple project that locates user location and also searches a location based on a given address. 
 Utilizes APIs: 
  1. for map - leaflet
  2. for geocoding and api key - Geoapify  
 
 ### Also uses advanced concepts utilizing webpack, several loaders and plugins (like babel, css loader, html plugins).

# USAGE: 
Fork then  
In terminal (text editors) run.  
> npm intall
  
 - installs all dependencies and packages required.

  # SCRIPTS:  
  npm run
> build:dev   

- for dev mode and opens dev server on localhost (uses memory for serving files).  
> build:prod  

- for production mode that also creates a dist folder.

# ON WEBPAGE: 
Use buttons on the page for interaction.  
NOTE: to open the searched address which gets copied to clipboard, paste that url in the web browser search bar.

# ISSUES: 
  1. geolocation even though enableHighAccuracy is set, it gets the wrong coordinates which is several meters away from current exact location. (it works sometimes)  
  Is this a behaviour normal or can this be fixed?
  2. Workarounds of certain code practices and functonalities and any wrong configs of webpack files if found please do reach out as I'm still learning :) (email: pranav.nyx410@gmail.com) 



