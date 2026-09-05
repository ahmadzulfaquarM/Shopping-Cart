const FeatureCard = ({ feature }) => {

    const Icon = feature.icon;

    return (
        <div
            className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-7
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
            "
        >

            {/* Icon */}
            <div
                className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-2xl
                    text-blue-600
                    transition-all
                    duration-300
                    group-hover:bg-blue-600
                    group-hover:text-white
                "
            >
                <Icon />
            </div>

            {/* Title */}
            <h3 className="mt-5 text-lg font-bold text-gray-900">
                {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-gray-500">
                {feature.description}
            </p>

        </div>
    );
};

export default FeatureCard;