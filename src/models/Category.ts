import { Document, Schema, model } from 'mongoose';

interface Category extends Document {
  name: string;
  // Add any other fields relevant to your Category model
}

const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    // Add other fields relevant to your Category model
  },
  { timestamps: true }
);

const CategoryModel = model<Category>('Category', categorySchema);

export default CategoryModel;
