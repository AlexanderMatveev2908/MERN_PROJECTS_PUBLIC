import { useEffect, useState } from "react";
import PropTypes, { oneOfType } from "prop-types";

const ProductImages = ({ image }) => {
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    image && setMainImg(image[0]?.url);
  }, [image]);

  const renderedImages = image?.map(({ url }) => (
    <img
      onClick={() => setMainImg(url)}
      key={url}
      src={url}
      alt=""
      className="w-[24%] md:max-w-[75px] lg:max-w-full lg:w-full lg:min-h-[100px] h-auto object-cover cursor-pointer"
    />
  ));

  return (
    <div className="flex-1 flex  flex-col-reverse gap-3 lg:flex-row">
      <div className="flex lg:flex-col justify-between sm:justify-between  w-full lg:w-[20%]">
        {renderedImages}
      </div>

      <div className="w-full items-start">
        <img
          className="w-full h-auto sm:w-full sm:min-h-[400px] lg:min-h-[500px] object-cover m-auto "
          src={mainImg}
          alt=""
        />
      </div>
    </div>
  );
};

ProductImages.propTypes = {
  image: PropTypes.arrayOf(oneOfType([PropTypes.string, PropTypes.object]))
    .isRequired,
};

export default ProductImages;
