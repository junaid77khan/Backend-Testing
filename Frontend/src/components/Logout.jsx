import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { deleteATLS } from "../store/accessTokenSlice"
import { useDispatch } from "react-redux"

function Logout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deleteATLS())
    }, [deleteATLS])

    return <Navigate to={'/'}/>;
}

export default Logout
