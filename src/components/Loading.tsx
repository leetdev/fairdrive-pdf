import React from 'react'
import {ThreeDots} from 'react-loader-spinner'

interface LoadingProps {
  loading: boolean
}

function Loading({loading}: LoadingProps) {
  return (
    <ThreeDots
      visible={loading}
      height="80"
      width="80"
      radius="9"
      color="#6b5ad5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        justifyContent: 'center',
      }}
      wrapperClass=""
    />
  )
}

export default Loading
