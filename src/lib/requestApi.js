import { SUPABASE_ANON_KEY } from "@/database/dbInit"
import axios from "axios"

export const requestApi = async ({ url, method, data, token }) => {
    const headers = 
    { 
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"    
    }

    if(token){
        headers['Authorization'] = `Bearer ${token}`
    
    } else{
        headers['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`
    }

    const config = {
        url: `${url}`, 
        method, 
        headers
    }

    if(data){
        config.data = data
    }

    console.log(config.url)

    return axios(config)
        .then(response => {
            return { result: response.data, responseStatus: true }
        })
        .catch((error) => {
            console.log(error)
            if(error.response){
                //Request made and server responded
                return { responseStatus: false, errorMsg: error.response.data, statusCode: error.status }
            } 


            else if(error.request){
                //Request made but no server response
                return { responseStatus: false, errorMsg: {error: 'You have to be online for this to work'}, statusCode: error.status }
            } 
            
            
            else{
                return { responseStatus: false, errorMsg: {error: 'Unexpected error'}, statusCode: error.status }
            }
        })        

}


export const onRequestApi = async ({ requestInfo, successCallBack, failureCallback }) => {
    try {

        if(!successCallBack || !failureCallback || !requestInfo){
            return;
        }
        
        const request = await requestApi(requestInfo)

        const { result, responseStatus, errorMsg, statusCode } = request

        if(responseStatus){
            return successCallBack({ requestInfo, result })
        
        } else{
            console.log(errorMsg)
            const _errorMsg = "Unexpected server error"
            return failureCallback({ requestInfo, errorMsg: _errorMsg, statusCode })
        }
        
    } catch (error) {
        console.log(error)
        return failureCallback({ requestInfo, errorMsg: 'Server error!' })
    }
}

export const cloudinaryUpload = async ({ files }) => {
    try {

        // if(!folderName){
        //     return
        // }

        const formData = new FormData();
        const url = `https://api.cloudinary.com/v1_1/dqcmfizfd/upload`
    
        const uploadedFiles = []
    
        for (let i = 0; i < files.length; i++) {          
            let file = files[i];
            formData.append("file", file);
            formData.append("upload_preset", "testing");
            formData.append("folder", "testing");

            const uploadedFile = await fetch(url, { method: 'POST', body: formData, headers: { "content-type": "multipart/form-data" } })
            const uploadedFile_data = await uploadedFile.text()          
            const parsedFile = JSON.parse(uploadedFile_data)

            uploadedFiles.push(parsedFile)
        }
        
        return { responseStatus: true, result: uploadedFiles, errorMsg: null }

    } catch (error) {
        console.log(error)
        return { 
            responseStatus: false, 
            result: null, 
            errorMsg: {
                error: 'An unexpected error occured, try again later',
                actualError: error
            } 
        }
    }
}