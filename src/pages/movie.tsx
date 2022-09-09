import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Image from 'next/image'
const Movie = () => {
  const [inputs, setInputs] = useState({title: 'a'})
  const [movie, setMovie] = useState({
    Poster: '',
    Title: '',
    Year: '',
    Rated: '',
    imdbRating: '',
    Plot: '',

    
  })

  function handleChange(e) {
    const {name, value} = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    try {
      fetch(`http://www.omdbapi.com/?t=${inputs.title}&y=${inputs.year}&apikey=c450e1a6`)
        .then((response) => response.json())
        .then((data) => {
          if(Object.keys(data).length > 3){
            if(data.Poster && data.Poster.substring(0, 8) !== 'https://') {
              delete data.Poster
              console.log(data)
              setMovie(data)
            } else {
              setMovie(data)
            }}
        })
    } catch (error) {
      console.log(error);
    }
  }, [inputs])

  return (
    <Layout className="homepage">
    <div className='text-center bg-slate-600 rounded-3xl flex flex-col'>
      <div className='flex justify-center p-5'>
        <div className='basis-1/5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
          <input onChange={handleChange} name="title" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A Beautiful Mind" required/>
        </div>
        <div className='basis-1/5'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Year</label>
          <input onChange={handleChange} type="text" id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2001" required/>
        </div>
      </div>
      <div className="" >
        {movie &&
          <div className="movie-obj">
            <div className="">{movie.Poster &&
              <Image
                alt="Movie Poster"
                src={ movie.Poster.substring(0, 7) !== 'http://' ? movie.Poster : null}
                objectFit='contain'
                width={300}
                height={100}
                layout="responsive"
                priority
              />}
            </div>
            <h1 className='text-3xl p-5'>{movie.Title}</h1>
            <div className="flex text-center justify-center">
              <h2 className='w-14'>{movie.Year}</h2>
              <h2 className=''>|</h2>
              <h2 className='w-14'>{movie.Rated}</h2>
              <h2 className=''>|</h2>
              <h2 className='w-14'>{movie.imdbRating}</h2>
            </div>
            <div>
              <p className="p-5 ">{movie.Plot}</p>
            </div>
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>

          </div>
        }
        </div>
    </div>
    </Layout>
  )
}
export default Movie;