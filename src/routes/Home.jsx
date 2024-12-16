import React from 'react'
import Coins from '../components/Coins'
import Trending from '../components/Trending'
import Exchange from '../components/Exchange'

function Home(props) {
  return (
    <div>
      <Exchange/>
        <Coins coins={props.coins}/>
        <Trending/>
    </div>
  )
}

export default Home