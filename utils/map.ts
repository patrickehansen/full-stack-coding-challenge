import AirportDictionary from '../types/airportDictionary'
import Airport from '../types/airport'

let airportDictionary;

// Minimal implementation to cache this response so we only have to do it once.
export function mapAirports (airports: Airport[]): AirportDictionary {
  if (airportDictionary) return airportDictionary;

  airportDictionary = airports.reduce((a, v) => {
    a[v.name] = v;
    a[v.iata] = v;
    a[v.city] = v;
    a[v.country] = v;

    return a;
  }, {});

  return airportDictionary;
}