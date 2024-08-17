import { combineSlices } from "@reduxjs/toolkit"
import { ApiSlice } from "./api/apiSlice"

export default combineSlices(
    ApiSlice
)
