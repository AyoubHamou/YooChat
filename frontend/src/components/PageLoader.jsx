import React from 'react'
import {LoaderIcon} from "lucide-react"
import { useThemes } from '../store/useThemes';


const PageLoader = () => {
  const { theme } = useThemes();
  return (
    <div className='min-h-screen flex items-center justify-center ' data-theme={theme}>
        <LoaderIcon className='animate-spin size-12 text-primary'/>
    </div>
  )
}

export default PageLoader