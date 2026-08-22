import Address from "../models/Address.js";

// Get all addresses
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            addresses,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Add address
export const addAddress = async (req, res) => {
    try {

        const {
            fullName,
            phone,
            address,
            city,
            state,
            postalCode,
            country,
            isDefault,
        } = req.body;

        if (
            !fullName ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !postalCode
        ) {
            return res.status(400).json({
                message: "All required fields must be provided",
            });
        }

        // If this address is default,
        // remove default from previous addresses
        if (isDefault) {
            await Address.updateMany(
                { user: req.user._id },
                { $set: { isDefault: false } }
            );
        }

        const newAddress = await Address.create({
            user: req.user._id,
            fullName,
            phone,
            address,
            city,
            state,
            postalCode,
            country: country || "India",
            isDefault: Boolean(isDefault),
        });

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            address: newAddress,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Update address
export const updateAddress = async (req, res) => {
    try {

        const { id } = req.params;

        const addressData = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!addressData) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        const {
            fullName,
            phone,
            address,
            city,
            state,
            postalCode,
            country,
            isDefault,
        } = req.body;

        if (isDefault) {
            await Address.updateMany(
                {
                    user: req.user._id,
                    _id: { $ne: id },
                },
                { $set: { isDefault: false } }
            );
        }

        addressData.fullName = fullName ?? addressData.fullName;
        addressData.phone = phone ?? addressData.phone;
        addressData.address = address ?? addressData.address;
        addressData.city = city ?? addressData.city;
        addressData.state = state ?? addressData.state;
        addressData.postalCode =
            postalCode ?? addressData.postalCode;
        addressData.country =
            country ?? addressData.country;

        if (isDefault !== undefined) {
            addressData.isDefault = isDefault;
        }

        const updatedAddress = await addressData.save();

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: updatedAddress,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// Delete address
export const deleteAddress = async (req, res) => {
    try {

        const { id } = req.params;

        const address = await Address.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        await address.deleteOne();

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};