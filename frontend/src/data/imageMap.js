const DEFAULT_PRODUCT_IMAGE = "/images/headphone17.png";

const imageMap = {
  "SoundX Premium Headphones": "/images/headphone11.png",
  "JBL Tune 760NC": "/images/headphone14.png",
  "Anker Soundcore Q20i": "/images/headphone12.png",
  "Bose QuietComfort": "/images/headphone13.png",
  "Bose QuietComfort Ultra": "/images/headphone16.png",
  "Sony WH-CH720N": "/images/headphone18.png",
};

export const getProductImage = (product) => {
  return imageMap[product?.name] || DEFAULT_PRODUCT_IMAGE;
};

export default imageMap;