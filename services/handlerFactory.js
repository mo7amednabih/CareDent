// Handlers of CRUD operations
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);
    if (populateOptions) query = query.populate(populateOptions);

    const document = await query;

    // if (!document) {
    //   return next(new ApiError(`No document for this id ${id}`, 404));
    // }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.find();

    const document = await query;

    // if (!document) {
    //   return next(new ApiError(`No document found`, 404));
    // }
    res.status(200).json({ data: document });
  });

// exports.getAll = (Model, modelName = "") =>
//   asyncHandler(async (req, res) => {
//     //if i need subcategies by category id in params in file subcategoryservices
//     let filter = {};
//     if (req.filterObj) {
//       filter = req.filterObj;
//     }
//     // Build query
//     const documentsCounts = await Model.countDocuments(); //num of products ex
//     const apiFeatures = new ApiFeatures(Model.find(filter), req.query) //build and easy chain these methods
//       .paginate(documentsCounts)
//       .filter()
//       .search(modelName) //in product modelNname contains value
//       .limitFields()
//       .sort();

//     // Execute query
//     const { mongooseQuery, paginationResult } = apiFeatures; // those in propery in class change at previous method(sort....)
//     const documents = await mongooseQuery;

//     res
//       .status(200)
//       .json({ results: documents.length, paginationResult, data: documents });
//   });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    document.save();
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });
