import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGovernanceMaterial } from "../../store/slices/about us/governanceMaterial";
import GovernanceMaterialCard from "../Cards/GovernanceMaterialCard";

const GovernanceMaterial = () => {
  const [materials, setMaterials] = useState(null);
  const { data } = useSelector((state) => state.governanceMaterial);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGovernanceMaterial());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.sections) {
            if (data.data.data.sections.data) {
              setMaterials(data.data.data.sections.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="container">
      <div className="container flex flex-col gap-4">
        <div className="flex flex-wrap justify-center gap-10">
          {materials?.map((material) => (
            <GovernanceMaterialCard key={material.id} material={material} />
          ))}
          <div />
        </div>
      </div>
    </div>
  );
};

export default GovernanceMaterial;
