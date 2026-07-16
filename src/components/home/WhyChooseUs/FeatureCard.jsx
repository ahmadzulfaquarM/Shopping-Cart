const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;

    return (
        <div className="group rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">

            {/* Icon */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">

                <Icon />

            </div>

            {/* Title */}

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {feature.title}
            </h3>

            {/* Description */}

            <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
            </p>

        </div>
    );
};

export default FeatureCard;