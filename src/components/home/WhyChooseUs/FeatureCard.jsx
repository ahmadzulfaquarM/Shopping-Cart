const FeatureCard = ({ feature }) => {

    const Icon = feature.icon;

    return (
        <div
            className="
                group
                rounded-xl
                border
                border-gray-200
                bg-white
                p-4
                text-center
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg

                sm:rounded-2xl
                sm:p-6

                lg:p-7
            "
        >

            {/* ================= ICON ================= */}

            <div
                className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-xl
                    text-blue-600
                    transition-all
                    duration-300
                    group-hover:bg-blue-600
                    group-hover:text-white

                    sm:h-14
                    sm:w-14
                    sm:rounded-2xl
                    sm:text-2xl

                    lg:h-16
                    lg:w-16
                "
            >
                <Icon />
            </div>


            {/* ================= TITLE ================= */}

            <h3
                className="
                    mt-3
                    text-base
                    font-bold
                    text-gray-900

                    sm:mt-4
                    sm:text-lg

                    lg:mt-5
                "
            >
                {feature.title}
            </h3>


            {/* ================= DESCRIPTION ================= */}

            <p
                className="
                    mt-2
                    text-xs
                    leading-5
                    text-gray-500

                    sm:mt-3
                    sm:text-sm
                    sm:leading-6
                "
            >
                {feature.description}
            </p>

        </div>
    );
};

export default FeatureCard;