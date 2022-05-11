import createError from "http-errors";
import { checkSchema, validationResult } from "express-validator";

const blogPostsSchema = {
  //   readTime: {
  //     value: {
  //       in: ["body"],
  //       isNumber: true,
  //       min: 1,
  //       max: 2,
  //       errorMessage: "value must be between 1 and 10",
  //     },
  //     unit: {
  //       in: ["body"],
  //       isString: true,
  //       errorMessage: "unit unit must be a string",
  //     },
  //   },

  readTime: {
    value: {
      min: 2,
      errorMessage: "Read time must be minimum of 2 minutes",
    },
    unit: {
      in: ["body"],
      isString: { errorMessage: "Unit is required" },
    },
  },
  title: {
    in: ["body"],
    isString: true,
    errorMessage: "title must be a string",
  },
  category: {
    in: ["body"],
    isString: true,
    errorMessage: "category must be a string",
  },
};

export const checkBlogPostSchema = checkSchema(blogPostsSchema);

export const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(
      createError(400, "Validation errors!", { errorsList: errors.array() })
    );
  } else {
    next();
  }
};
