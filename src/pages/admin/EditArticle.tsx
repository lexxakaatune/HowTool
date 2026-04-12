import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticleById, updateArticle } from "../../services/api";

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  // Load article data
  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const res = await fetchArticleById(id);
        const article = res.data;
        setTitle(article.title || "");
        setDescription(article.description || "");
        setCategory(article.category || "");
        setCategoryId(article.categoryId || "");
        setContent((article.content || []).join("\n"));
        setFeatured(Boolean(article.featured));
        setVideoUrl(article.videoUrl || "");
      } catch (err) {
        console.error("Failed to load article", err);
      }
    };
    load();
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
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
    if (imageFile) form.append("image", imageFile);

    try {
      await updateArticle(id!, form);
      navigate("/admin/articles");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update article");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 rounded bg-dark-700"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 rounded bg-dark-700"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-full p-2 rounded bg-dark-700"
        />
        <input
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Category ID"
          className="w-full p-2 rounded bg-dark-700"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content (one paragraph per line)"
          className="w-full p-2 rounded bg-dark-700 h-40"
        />
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Video URL"
          className="w-full p-2 rounded bg-dark-700"
        />
        <label className="block">
          <span>Featured</span>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="ml-2"
          />
        </label>
        <input type="file" onChange={handleImageUpload} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditArticle;