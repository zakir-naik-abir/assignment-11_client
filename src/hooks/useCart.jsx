import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"
import {useQuery} from '@tanstack/react-query'

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const { refetch, data: card = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async() =>{
      const res  = await axiosSecure.get(`/carts?email=${user.email}`)
      return res.data;
    }
  })
  return [card, refetch]
}

export default useCart;