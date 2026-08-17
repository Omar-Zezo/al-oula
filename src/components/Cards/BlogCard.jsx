import { Link } from "react-router-dom";
import { BlogShapHover } from "../../images/imgs";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogCard = ({ blog }) => {
  console.log(blog);
  return (
    <div className="w-full h-[400px] rounded-2xl relative overflow-hidden">
      <Link to={`blogs-sections/blog/${blog?.id}`}>
        <img
          src={blog?.img}
          alt="blog-img"
          className="absolute top-0 left-0 size-full object-cover"
        />
        <div className="absolute top-0 left-0 size-full bg-gradient-to-r from-[#814494] to-[#C6ABCE] opacity-30"></div>
        <div
          style={{
            background: `url('${BlogShapHover}')`,
            backgroundRepeat: "no-repeat",
          }}
          className="size-[420px] flex flex-col items-center pt-20 absolute bottom-[-235px] left-[-2px] hover:bottom-[-110px] duration-300"
        >
          <p className="w-[80%] text-center text-2xl pr-5 text-white font-medium description2">
            {blog?.title}
          </p>
          <FontAwesomeIcon
            className="text-[70px] text-white mr-auto ml-10 mt-[77px]"
            icon={faArrowUpRightFromSquare}
          />
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
