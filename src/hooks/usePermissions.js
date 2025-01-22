import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { getUserPermissions } from '../redux/actions/user'
const usePermissions=(requiredPermissions)=>{
    const dispatch=useDispatch()
    useEffect(() => {
      dispatch(getUserPermissions())
    }, [dispatch])
    
    const {userPermissions}=useSelector(state=>state.user)
    console.log(userPermissions)
  try{  
    
    const isAuthorized=userPermissions.includes(requiredPermissions)
    return isAuthorized}
    catch(error){
      console.log(error)
    }
  
}
export default usePermissions;