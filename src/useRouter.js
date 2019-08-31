import { useContext } from 'react'
import { __RouterContext } from 'react-router-dom'

// Custom hook used for page transitions.
export default function useRouter() {
    return useContext(__RouterContext)
}