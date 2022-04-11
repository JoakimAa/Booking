import React from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonCard() {
  return (
    <>
      <div>
        <div id="bookingArticle">
          <Skeleton count={1} width={'70px'} borderRadius={25} />
          <Skeleton count={1} width={'70px'} borderRadius={25} />
          <Skeleton count={1} width={'70px'} borderRadius={25} />
          <Skeleton count={1} width={'70px'} borderRadius={25} />
          <Skeleton count={1} width={'70px'} borderRadius={25} />
          <Skeleton count={1} width={'70px'} borderRadius={25} />
        </div>
        <Skeleton count={1} width={'70px'} borderRadius={25} />
        <Skeleton count={1} width={'70px'} borderRadius={25} />
        <Skeleton count={1} width={'70px'} borderRadius={25} />
      </div>
      <div className="controlButtons">
        <Skeleton count={1} width={'70px'} borderRadius={25} />
        <Skeleton count={1} width={'70px'} borderRadius={25} />
      </div>
    </>
  )
}
