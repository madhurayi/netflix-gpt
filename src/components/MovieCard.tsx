import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

interface MovieCardProps {
    moviePosterPath: string;
  }

export const MovieCard = ({moviePosterPath}:MovieCardProps) => {

  return (
    <div className='w-48'>
        <img src={IMG_CDN_URL+moviePosterPath}></img>
    </div>
  )
}
