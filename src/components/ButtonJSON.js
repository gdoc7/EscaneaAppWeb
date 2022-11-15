import React from 'react'

export const ButtonJSON = ({onClick, title}) => {
  return (
    <button
      class="bg-transparent font-bold py-2 hover:text-black rounded-full inline-flex items-center text-white"
      onClick={onClick}
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0 0 64 64"
        className="fill-white"
      >
        <path d="M 28 9 C 26.895 9 26 9.895 26 11 L 26 12 L 14 12 C 12.896 12 12 12.896 12 14 C 12 15.104 12.896 16 14 16 L 15 16 L 15 46 C 15 49.309 17.691 52 21 52 L 43 52 C 46.309 52 49 49.309 49 46 L 49 16 L 50 16 C 51.104 16 52 15.104 52 14 C 52 12.896 51.104 12 50 12 L 38 12 L 38 11 C 38 9.895 37.105 9 36 9 L 28 9 z M 19 16 L 45 16 L 45 46 C 45 47.103 44.103 48 43 48 L 21 48 C 19.897 48 19 47.103 19 46 L 19 16 z M 23.5 20 C 22.672 20 22 20.671 22 21.5 L 22 42.5 C 22 43.329 22.672 44 23.5 44 C 24.328 44 25 43.329 25 42.5 L 25 21.5 C 25 20.671 24.328 20 23.5 20 z M 32 20 C 30.896 20 30 20.896 30 22 L 30 42 C 30 43.104 30.896 44 32 44 C 33.104 44 34 43.104 34 42 L 34 22 C 34 20.896 33.104 20 32 20 z M 40.5 20 C 39.672 20 39 20.671 39 21.5 L 39 42.5 C 39 43.329 39.672 44 40.5 44 C 41.328 44 42 43.329 42 42.5 L 42 21.5 C 42 20.671 41.328 20 40.5 20 z"></path> */}
      {/* </svg> */}
     {title}
    </button>
  );
  
}
