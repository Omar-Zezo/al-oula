import { useDispatch, useSelector } from 'react-redux';
import DonationCategoryCard from '../Cards/DonationCategoryCard'
import { useEffect, useState } from 'react';
import { getServicesSections } from '../../store/slices/services/servicesSections';

const Projects = () => {
    const [servicesList, setServicesList] = useState(null);
    const { data } = useSelector((state) => state.servicesSections);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getServicesSections());
    }, []);
  
    useEffect(() => {
      if (data) {
        if (data.data) {
          if (data.data.data) {
            if(data.data.data.data){
                setServicesList(data.data.data.data)
            }
          }
        }
      }
    }, [data]);

  return (
    <div className='container flex gap-5 flex-wrap items-center'>
        {
            servicesList?.map(service=>(
                <DonationCategoryCard key={service?.id} service={service}/>
            ))
        }
    </div>
  )
}

export default Projects
