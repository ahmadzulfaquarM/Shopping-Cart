import { Link } from "react-router-dom";

const ProductBreadcrumb = () => {
    return (
        <div className="text-sm text-gray-500">

            <Link
                to="/"
                className="hover:text-blue-600"
            >
                Home
            </Link>

            <span className="mx-2">/</span>

            <Link
                to="/products"
                className="hover:text-blue-600"
            >
                Products
            </Link>

            <span className="mx-2">/</span>

            <span className="font-medium text-blue-600">
                Product Details
            </span>

        </div>
    );
};

export default ProductBreadcrumb;