import { useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'

import SearchBar from './searchBar'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'
import AirportDictionary from '../types/airportDictionary'

const Page: NextPage = () => {
  const airports = useApiData<Airport[]>('/api/airports', []);

  const [ filteredAirports, setFiltered ] = useState([])

  function mapAirports (airports): AirportDictionary {
    return airports.reduce((a, v) => {
      a[v.name] = v;
      a[v.iata] = v;
      a[v.city] = v;
      a[v.country] = v;

      return a;
    }, {});
  }

  return <Layout>
    <h1 className='text-2xl font-bold'>Code Challenge: Airports</h1>

    <SearchBar allAirports={mapAirports(airports)} onFiltered={setFiltered}/>

    <div>
      {filteredAirports.map(airport => (
        <Link href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata}>
          <a className='flex items-center p-5 mt-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none'>
            <span>
              {airport.name}, {airport.city}
            </span>
            <span className='ml-auto text-gray-500'>
              {airport.country}
            </span>
          </a>
        </Link>
      ))}
    </div>
  </Layout>
}

export default Page
