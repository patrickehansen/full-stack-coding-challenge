import { NextPage } from 'next'
import Link from 'next/link'

import AirportOptionData from '../types/airportOptionData'

interface Props {
  match: AirportOptionData;
}

const AirportOption: NextPage<Props> = ({match}) => {
  // In the event of the null option in the parent searchBar, we don't want to present them a link that will take them to a broken page.
  if (!match.airport) return (
    <div className='flex items-center p-2 mt-2 w-full text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none'>
      <span>. . .</span>
    </div>
  )

  const { iata } = match.airport;

  return <Link href={`/airports/${iata.toLowerCase()}`} key={iata}>
  <a className='flex items-center p-2 mt-2 w-full text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none'>
    <span className="w-full">
      {match.term}
    </span>
  </a>
</Link>
}

export default AirportOption
