import { createSlice } from "@reduxjs/toolkit";

// create an authSlice to maintain the user signin status
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        // user is not logged in
        status : false,
        statusAdmin : false,
    },
    reducers : {
        signin : (state,action)=>{
            //the user is now signed in
            state.status = true;

            // get the token from response and save it in sessionStorage
            // const token = result.data.token
            sessionStorage['token'] = action.payload['token']
            sessionStorage['username'] = action.payload['name']
        },
        signout : (state,action)=>{
            // the user is signed out
            state.status = false

            // remove the user token and name from sessionStorage
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('username')
        },

        isAdmin : (state,action)=>{
            // the user is signed out
            state.statusAdmin = false
           
            console.log(`auth slice madhe ${action.payload}`)
            if(action.payload == "admin")
            {
                state.statusAdmin = true
            }
            
        },

    },
})

// export the reducer for authSlice
export default authSlice.reducer

// export the actions
export const {signin, signout,isAdmin} = authSlice.actions
