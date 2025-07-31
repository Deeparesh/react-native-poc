import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function LocationMapScreen() {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('');
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [savedPolygon, setSavedPolygon] = useState<{ latitude: number; longitude: number }[]>([]);
  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      if (!location || !location.coords) return;

      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      setLatitude(lat.toString());
      setLongitude(lng.toString());
      setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 });

      const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      if (geocode.length > 0) {
        const place = geocode[0];
        setLocationName(`${place.name ?? ''}, ${place.city ?? ''}, ${place.region ?? ''}`);
      }
    })();
  }, []);

  const handleMapToLocation = () => {
    setShowMap(false);
  };

  const handleFindOnMap = () => {
    if (!latitude || !longitude) {
      alert('Enter valid coordinates first');
      return;
    }
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const newRegion: Region = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);
    setShowMap(true);
  };

  const zoomToCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    if (!location || !location.coords) return;
    const zoomRegion: Region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(zoomRegion);
    mapRef.current?.animateToRegion(zoomRegion, 1000);
  };

  const handleClear = () => {
    setCoordinates([]);
    setSavedPolygon([]);
    setForceRefresh(prev => !prev)
  };

  const handleSave = () => {
    console.log('Saved polygon:', coordinates);
    setSavedPolygon(coordinates);
    // alert('Polygon saved (check console).');
  };

  return (
    <ImageBackground
      source={require('../assets/images/homeBg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.buttonContainer}>
        <Button title="Map to Location" onPress={handleMapToLocation} />
        <Button title="Find on Map" onPress={handleFindOnMap} />
      </View>

      <View style={styles.innerBox}>
        {showMap ? (
          <View style={styles.mapWrapper}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={region}
              mapType="satellite"
              showsUserLocation={true}
              showsMyLocationButton={false}
              followsUserLocation={true}
              onPress={(e) => {
                const coord = e.nativeEvent.coordinate;
                setCoordinates(prev => [...prev, coord]);
              }}
            >
              {/* Polygon only, no marker */}
              {coordinates.length >= 2 && (
                <Polygon
                  coordinates={coordinates}
                  fillColor="rgba(0,0,255,0.3)"
                  strokeColor="red"
                  strokeWidth={2}
                />
              )}

              {/* Red markers on touch points */}
              {coordinates.map((coord, index) => (
                <Marker
                  key={index}
                  coordinate={coord}
                  pinColor="red"
                />
              ))}
            </MapView>

            <View style={styles.gpsButton}>
              <Button title="📍" onPress={zoomToCurrentLocation} />
            </View>

            <View style={styles.actionRow}>
              <Button title="Clear" onPress={handleClear} color="red" />
              <Button title="Save" onPress={handleSave} color="green" />
            </View>

            {savedPolygon.length > 0 && (
              <View key={forceRefresh.toString()} style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                  Saved Polygon Coordinates:
                </Text>
                {savedPolygon.map((coord, index) => (
                  <Text key={index} style={{ color: 'white' }}>
                    {index + 1}. Latitude: {coord.latitude.toFixed(6)}, Longitude: {coord.longitude.toFixed(6)}
                  </Text>
                ))}
              </View>
            )}
          </View>


        ) : (
          <>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              value={latitude}
              onChangeText={(text) => setLatitude(text)}
              placeholder="Enter Latitude"
              placeholderTextColor="#aaa"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              value={longitude}
              onChangeText={(text) => setLongitude(text)}
              placeholder="Enter Longitude"
              placeholderTextColor="#aaa"
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Land Location</Text>
            <TextInput
              style={styles.input}
              value={locationName}
              onChangeText={(text) => setLocationName(text)}
              placeholder="Enter Land Location"
              placeholderTextColor="#aaa"
            />
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 60 : 100,
    paddingHorizontal: 16,
  },
  innerBox: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6,
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  map: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
  mapWrapper: {
    position: 'relative',
    height: 300,
    width: '100%',
    borderRadius: 10,
    // overflow: 'hidden',
  },
  gpsButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 23,
  },
});