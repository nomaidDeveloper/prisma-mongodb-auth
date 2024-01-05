import { Document, Schema, model, Types } from 'mongoose';

interface Product extends Document {
  name: string;
  price: number;
  categoryId: Types.ObjectId; // Reference to Category
  // Add any other fields relevant to your Product model
}

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

const ProductModel = model<Product>('Product', productSchema);

export default ProductModel;
