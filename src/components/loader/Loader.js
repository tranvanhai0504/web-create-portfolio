import PuffLoader from 'react-spinners/PuffLoader';
import { CSSProperties, useState } from 'react'

function Loader({loading}){

    const [isLoading, setIsLoading] = useState(loading);

    return (
        <PuffLoader
        color={'#000'}
        loading={isLoading}
        cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "red",
          }}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
}

export default Loader