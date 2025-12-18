import React from "react";
import PropTypes from "prop-types";

const TourPackageCard = ({ packageData, isCenter }) => {
  const { images, title } = packageData;
  const imageUrl = images && images.length > 0 ? images[0] : "";

  const baseCardClasses =
    "relative w-full rounded-3xl overflow-hidden bg-gray-200 shadow-lg transition-all duration-500 ease-out will-change-transform will-change-opacity";
  const cardClasses = isCenter
    ? `${baseCardClasses} scale-100 shadow-2xl z-20`
    : `${baseCardClasses} scale-90 md:scale-90 opacity-75 z-10`;

  const baseTitleClasses =
    "relative -mt-6 inline-flex items-center justify-center px-7 py-2 rounded-full bg-white shadow-lg whitespace-nowrap transition-all duration-500 ease-out will-change-transform will-change-opacity z-30";
  const titleClasses = isCenter
    ? `${baseTitleClasses} opacity-100 scale-100`
    : `${baseTitleClasses} opacity-0 scale-90 pointer-events-none`;

  return (
    <div className="relative flex flex-col items-center pb-8">
      <div className={cardClasses}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="h-64 sm:h-72 lg:h-80 w-full object-cover"
          />
        )}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5" />
        {/* Soft bottom gradient for center title readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Title pill, visually half overlapping the card via negative margin */}
      <div className={titleClasses}>
        <span className="text-xs font-medium tracking-[0.18em] uppercase text-primary-600 mr-3 hidden sm:inline">
          Featured
        </span>
        <span className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-gray-900">
          {title}
        </span>
      </div>
    </div>
  );
};

TourPackageCard.propTypes = {
  packageData: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }).isRequired,
  isCenter: PropTypes.bool,
};

TourPackageCard.defaultProps = {
  isCenter: false,
};

export default TourPackageCard;
