import React, { useState } from "react";
import { addArticle } from "../../data/store";
import { useNavigate } from "react-router-dom";

const NewArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build article object according to your Article interface
    const article = addArticle({
      title,
      description,
      category: "", // optional: you can map categoryId to category name later
      categoryId,
      readTime: Math.ceil(content.split(" ").length / 200), // rough estimate
      image: "/placeholder.jpg", // placeholder until you add uploads
      content: content.split("\n").filter(p => p.trim() !== ""),
    });

    // Redirect to the public article page after saving
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
        <input
          type="text"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 rounded bg-dark-700 text-white"
          required
        />
        <textarea
          placeholder="Article Content"
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