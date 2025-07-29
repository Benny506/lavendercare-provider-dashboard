import { useSelector } from 'react-redux'
import './css/appLoading.css'
import { getAppLoadingSlice } from '@/redux/slices/appLoadingSlice'


export default function AppLoading(){

    const appLoading = useSelector(state => getAppLoadingSlice(state).appLoading)

    if(appLoading){
        return(
            <div className="apploading-container">
                <img 
                    className='apploading-logo'
                    src="/assets/logo.svg" 
                    style={{ width: '70px', height: '70px' }} 
                />

                <div 
                    className='loader'
                />
            </div>
        )
    }
}