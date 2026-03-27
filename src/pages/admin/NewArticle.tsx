import React, { useState } from "react";
import { addArticle } from "../../data/store";
import { categories } from "../../data/categories";
import { useNavigate } from "react-router-dom";

const NewArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // Base64 image
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  // Convert uploaded image to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const contentArray = content
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p !== "");

    const article = addArticle({
      title,
      description,
      category,
      categoryId,
      readTime: Math.ceil(content.split(" ").length / 200),
      image, // Base64 image
      featured,
      content: contentArray,
    });

    navigate(`/article/${article.id}`);
  };

  return (
    <div className="p-6 bg-dark-800 rounded-xl border border-dark-500">
      <h2 className="text-white text-xl font-semibold mb-4">Create New Article</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white"
          required
        />

        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white"
          required
        />

        {/* CATEGORY DROPDOWN */}
        <select
          value={categoryId}
          onChange={(e) => {
            const selected = categories.find(c => c.id === e.target.value);
            if (selected) {
              setCategoryId(selected.id);
              setCategory(selected.name);
            }
          }}
          className="p-2 rounded bg-dark-700 text-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* IMAGE UPLOAD */}
        <div className="text-white">
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white"
            required
          />
        </div>

        {/* Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border border-dark-500"
          />
        )}

        <label className="text-white flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured Article
        </label>

        <textarea
          placeholder="Article Content (use Enter for new paragraphs)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white h-40"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Save Article
        </button>
      </form>
    </div>
  );
};

export default NewArticle;