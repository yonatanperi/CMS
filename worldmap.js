function initMap() {
    const myLatLng = { lat: -25.363, lng: 131.044 };

    mapOptions = {
        zoom: 4,
        center: myLatLng,
    }

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
    const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX///8AOLgANrjGyOgAH7MNObn4+fwpP7oAELHn6fUAJLQAM7f19vsAJ7UALrYAIbPt8PnU1+63vuQAG7OOmdVmdMk3UL7Izelfb8eiqdzf4/MgMrcwRLuGkdOvt+E/Vb9yfsxHW8EsSr1o0zfYAAABhElEQVRoge2ZfW+CMBCHeyes0NKCoqgIvvD9P+TO6USWLFmE3+Zin380NT4lcHe9FqUCgRdgBkRFQBQBCfIgD/KnljMQFQNRb0D+ejn5LeZzoPx0wrkXZblAubOGuclA8qUhMkuMu3bnrHM1RL7yXFXsVwj3uqR8NsupXAPklfUbpTbeVtO7tzmz3O6aOd9OIqx3+oYlihutm5jI9qO7EY+3NX1xluJ/93HBtCMuPYtFViZJItdtkyvX76XMEo9KqX0uIZKmWcf2UKQfFAfLVZamEjj5foxbSpW1UqwWEZlbQZwbOpeYyy+juJgi9sd+7Og5kiJ2N9+jiEm3nl3RDxWOfasH8z1I4Zk9uUFsbx2dR4vv/vNzxESsh2NagshNkksdk/lST9aGuJvCDZUjbwv0gSJDEZpEyPRHFi5oyUUuFthl7o7JF+gByNYC2xRB27nPRjSFyKEtNLb5h25bsBsu7FbxqYAeLECPRHBHOcz/+IwryIM8yEfKoS+hoK/PAoEX4B0nTy+6weQ4NgAAAABJRU5ErkJggg==";
    const israel = new google.maps.Marker({
      position: { lat: 35.363, lng: -110.044 },
      map,
      title: "Hello World!",
      icon: image,
    });
  
    google.maps.event.addListener(israel,'click',function() {
     alert("israel!")
    });
}
  
window.initMap = initMap;