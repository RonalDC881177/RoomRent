import asyncHandler from "../utils/asyncHandler.js";

import {
  createPropertyService,
  getPropertyByIdService,
  getAllPropertiesService,
  updatePropertyService,
  deletePropertyService,
} from "../services/propertyService.js";

export const createProperty = asyncHandler(
  async (req, res) => {

    const property =
      await createPropertyService(
        req.body,
        req.user
      );

    res.status(201).json({
      success: true,
      message:
        "Propiedad creada correctamente",
      data: {
        property,
      },
    });
  }
);

export const getPropertyById = asyncHandler(
  async (req, res) => {

    const property = await getPropertyByIdService(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message: "Propiedad obtenida correctamente",
      data: {
        property: property
      }
    });
  }
);

export const getAllProperties = asyncHandler(
  async (req, res) => {

    const {properties,pagination,} = await getAllPropertiesService(req.query);
    res.status(200).json({
    success: true,
    results: properties.length,
    message: "Propiedades obtenidas correctamente",
    pagination,
    data: {
        properties,
    },
    });
});

export const updateProperty = asyncHandler(
  async (req, res) => {

    const updatedProperty = await updatePropertyService(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json({
      success: true,
      message: "Propiedad actualizada correctamente",
      data: {
        property: updatedProperty,
      },
    });
  }
);

export const deleteProperty = asyncHandler(
  async (req, res) => {
    
    const property = await deletePropertyService(
      req.params.id,
      req.user
    );
    res.status(200).json({
      success: true,
      message: "Propiedad desactivada correctamente",
      data: {
        property,
      },
    });
  }
);