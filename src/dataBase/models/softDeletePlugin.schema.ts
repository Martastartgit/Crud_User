import mongoose from 'mongoose';

export interface TWithSoftDeleted {
    isDeleted: boolean;
    deletedAt: Date | null;
}

type TDocument = TWithSoftDeleted & mongoose.Document;

const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add({
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    }
  });

  const typesFindQueryMiddleware = [
    'find',
    'findOne',
    'findById',
    'findByIdAndUpdate',
    'update',
    'updateOne'

  ];

  const excludeInFindQueriesIsDeleted = async function(
    this: mongoose.Query<TDocument, any>,
    next: mongoose.HookNextFunction
  ) {
    this.where({isDeleted: false});
    next();
  };

  typesFindQueryMiddleware.forEach((type) => {
    schema.pre(type, excludeInFindQueriesIsDeleted);
  });
};

export {
  softDeletePlugin
};
