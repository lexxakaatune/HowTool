import React, { useState } from "react";
import { createArticle } from "../../services/api";
import { categories } from "../../data/categories";
import { useNavigate } from "react-router-dom";

const NewArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState< string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const navigate = useNavigate();

  // Upload image directly to Cloudinary and store URL
  const handleImageUpload = async (e:       React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "HowTool"); // your Cloudinary preset name

    try {
      const res = await  fetch("https://api.cloudinary.com/v1_1/dtpe1a6tb/image/upload", {
      method: "POST",
      body: formData,
    });

     const data = await res.json();
     setImage(data.secure_url); // store the Cloudinary URL instead of Base64
  } catch (err) {
     console.error("Image upload failed:", err);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const contentArray = content
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const form = new FormData();
  form.append("title", title);
  form.append("description", description);
  form.append("category", category);
  form.append("categoryId", categoryId);
  form.append("readTime", String(Math.ceil(content.split(" ").length / 200)));
  form.append("featured", String(Boolean(featured)));
  form.append("content", JSON.stringify(contentArray));
  form.append("videoUrl", videoUrl);

  if (imageFile) {
    form.append("image", imageFile);
  }

  try {
    const res = await createArticle(form);
    const created = res.data;
    const id = created.id || created._id;

    navigate(`/article/${id}`);
  } catch (err) {
    console.error("Create article failed", err);
    alert("Failed to create article", err);
  }
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
       
        <div className="text-white">
         <label className="block mb-1"> Upload Video</label>
         <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Video URL (optional)"
          className="text-white"
          required
         />
        </div>

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