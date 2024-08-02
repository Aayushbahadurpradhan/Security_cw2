// import { createSlice } from '@reduxjs/toolkit'


// const initialState = {
//     user : null
// }
  
//   export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//       setUserDetails : (state,action)=>{
//         state.user = action.payload
//       }
//     },
//   })
  
//   // Action creators are generated for each case reducer function
//   export const { setUserDetails } = userSlice.actions
  
//   export default userSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload
        },
        clearUserData: (state) => {
            state.user = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserDetails, clearUserData } = userSlice.actions

export default userSlice.reducer
