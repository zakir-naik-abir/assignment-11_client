import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useFood = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const {data: foods = [], inPending: loading, refetch} = useQuery({
    queryKey: ['foods', user?.email],
    queryFn: async() =>{
      const res = await axiosPublic.get(`/foods?email=${user.email}`)
      return res.data;
    }
  })
  return [foods, loading, refetch]
}

export default useFood;