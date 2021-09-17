import React, { useEffect, useState } from 'react'

import { NextPage } from 'next'

import Airport from '../types/airport'
import AirportDictionary from '../types/airportDictionary'
import AirportOption from './airportOption'
import AirportOptionData from '../types/airportOptionData'

interface Props {
  allAirports: AirportDictionary;
  onFiltered: (a: Airport[]) => any;
}

const nullOption: AirportOptionData = {
  term: '. . .', 
  airport: null,
}

const SearchBar: NextPage<Props> = ({allAirports, onFiltered}) => {
  const [ input, setInput ] = useState('');
  const [ results, setResults ] = useState([]);
  const [ resultCount, setResultCount ] = useState(0);

  useEffect(() => {
    if (!input) return;

    const filteredSet = Object.entries(allAirports).reduce((a, [key, value]) => {
      if (key.toLowerCase().includes(input)) {
        a.add({
          term: key,
          airport: value,
        });
      }

      return a;
    }, new Set);

    const asArray = Array.from(filteredSet);

    setResultCount(asArray.length);
    setResults(asArray.slice(0, 10));
  }, [input])

  return <div>
    <input 
      className='flex items-center p-5 mt-5 w-full text-gray-800 border border-black shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none'
      onChange={
        (e) => {
          if (e.target.value.length < 2) {
            setResults([]);
            setResultCount(0);
            return;
          };

          setInput(e.target.value);
        }
      }
      onKeyUp={
        (e) => {
          if(e.key === 'Enter') {
            onFiltered(results.map(v => v.airport));
            setInput('');
            setResults([]);
            setResultCount(0);
          }
        }
      }
    />

    {
      (resultCount > 0) && <div className="border p-1.5">
        {
          results.map((v, i) => <AirportOption match={v} key={i} />)
        }
        {
          resultCount > 10 && <AirportOption match={nullOption} />
        }
      </div>
    } 
  </div>
}

export default SearchBar
