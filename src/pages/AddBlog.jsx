import React, { useState, useCallback } from "react"; // useCallback added for memoizing handleDrop
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { ImageIcon, Upload, Link } from "lucide-react"; // Import Icons
import  Editor  from '../components/Editor'; // Your Rich Text Editor component

const AddBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    tags: "",
    image: null, // Can be a File object or a URL string
    author: "me@mindlet.com",
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // To show image thumbnail
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To control dialog open/close
  const [imageTab, setImageTab] = useState("upload"); // State for active image selection tab

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescriptionChange = (newContent) => {
    setBlogData((prev) => ({
      ...prev,
      description: newContent,
    }));
  };

  // Handler for file input (Upload from Computer)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData((prev) => ({
        ...prev,
        image: file, // Store the File object
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBlogData((prev) => ({ ...prev, image: null }));
      setImagePreviewUrl(null);
    }
  };

  // Handler for URL input (Use Image URL)
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setBlogData((prev) => ({
      ...prev,
      image: url, // Store the URL string
    }));
    setImagePreviewUrl(url); // Directly use URL for preview
  };

  // Optional: Drag and Drop handler
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFileChange({ target: { files: [file] } });
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImageUrl = null;

    if (blogData.image) {
      if (blogData.image instanceof File) {
        console.log("Image selected for upload:", blogData.image.name);
        // 🚨 FRONTEND UI ONLY: This is where you'd integrate ImageKit.io SDK for client-side upload
        // Or send the file to your backend for server-side upload to ImageKit.io
        // For UI purposes, we're just logging.
        // Example with placeholder for ImageKit.io client-side (requires SDK setup & auth endpoint):
        /*
        try {
            const uploadedResponse = await uploadImageToImageKit(blogData.image); // Your ImageKit.io upload function
            finalImageUrl = uploadedResponse.url; // Get URL after successful upload
            console.log("Image uploaded to ImageKit.io:", finalImageUrl);
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Image upload failed. Please try again.");
            return; // Prevent form submission if image upload fails
        }
        */
        // For now, let's just use a placeholder URL for demonstration
        finalImageUrl = "https://via.placeholder.com/150/0000FF/FFFFFF?text=Uploaded_Image";
      } else if (typeof blogData.image === 'string' && blogData.image.startsWith('http')) {
        finalImageUrl = blogData.image; // It's already a URL
        console.log("Image URL provided:", finalImageUrl);
      }
    }

    const finalBlogData = {
      ...blogData,
      image: finalImageUrl, // Update image with the final URL
    };

    console.log("Submitted blog data:", finalBlogData);
    // 🔜 Here you'll add your backend API call to save finalBlogData
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-gray-900">✍️ Add New Blog </CardTitle>
          <CardDescription className="text-md text-gray-600">
            Craft your compelling story and share it with the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="mb-2 block text-gray-700 font-semibold">Blog Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter a captivating title for your blog"
                value={blogData.title}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="description" className="mb-2 block text-gray-700 font-semibold">Blog Content</Label>
              <Editor content={blogData.description} onContentChange={handleDescriptionChange} />
            </div>

            <div>
              <Label htmlFor="tags" className="mb-2 block text-gray-700 font-semibold">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g., Finance, Health, Technology, Travel (comma-separated)"
                value={blogData.tags}
                onChange={handleChange}
              />
            </div>

            {/* --- Professional Image Selection Section --- */}
            <div>
              <Label className="mb-2 block text-gray-700 font-semibold">Featured Image</Label>
              <div className="flex items-center space-x-4 mb-3">
                {imagePreviewUrl && (
                  <img src={imagePreviewUrl} alt="Image Preview" className="w-24 h-24 object-cover rounded-md border border-gray-200" />
                )}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" /> {imagePreviewUrl ? "Change Image" : "Select Image"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]"> {/* Increased dialog width */}
                    <DialogHeader>
                      <DialogTitle>Select Featured Image</DialogTitle>
                      <DialogDescription>
                        Choose to upload from your computer or provide an image URL.
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs value={imageTab} onValueChange={setImageTab} className="w-full mt-4">
                      <TabsList className="grid w-full grid-cols-2"> {/* Two tabs */}
                        <TabsTrigger value="upload" className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload</TabsTrigger>
                        <TabsTrigger value="url" className="flex items-center gap-2"><Link className="h-4 w-4" /> From URL</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upload" className="p-4 border border-t-0 rounded-b-md">
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                        >
                            <Upload className="h-8 w-8 mb-2" />
                            <p className="text-sm font-medium mb-1">Drag & drop an image here, or</p>
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="sr-only" // Hide default file input
                            />
                            <Label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:underline">
                                Click to browse
                            </Label>
                        </div>
                        {imagePreviewUrl && blogData.image instanceof File && (
                          <div className="mt-4 text-center">
                            <img src={imagePreviewUrl} alt="Selected Image Preview" className="max-w-full h-auto max-h-[200px] object-contain mx-auto rounded-md border border-gray-200" />
                            <p className="text-sm text-gray-500 mt-1 truncate">{blogData.image?.name || 'Selected File'}</p>
                          </div>
                        )}
                        {!imagePreviewUrl && <p className="text-center text-sm text-gray-500 mt-4">No image selected for upload.</p>}
                      </TabsContent>
                      <TabsContent value="url" className="p-4 border border-t-0 rounded-b-md">
                        <Label htmlFor="image-url-input" className="mb-2 block text-gray-700 font-semibold">Image URL</Label>
                        <Input
                          id="image-url-input"
                          name="imageUrlInput" // Dummy name for this input, actual state handled by handleImageUrlChange
                          placeholder="Paste image URL here (e.g., https://example.com/image.jpg)"
                          value={typeof blogData.image === 'string' ? blogData.image : ''} // Display current URL if it's a string
                          onChange={handleImageUrlChange}
                          className="w-full"
                        />
                        {imagePreviewUrl && typeof blogData.image === 'string' && blogData.image.startsWith('http') && (
                          <div className="mt-4 text-center">
                            <img src={imagePreviewUrl} alt="URL Image Preview" className="max-w-full h-auto max-h-[200px] object-contain mx-auto rounded-md border border-gray-200" />
                            <p className="text-sm text-gray-500 mt-1 truncate">{blogData.image}</p>
                          </div>
                        )}
                        {!imagePreviewUrl && <p className="text-center text-sm text-gray-500 mt-4">No image URL provided.</p>}
                      </TabsContent>
                    </Tabs>
                    <DialogFooter>
                      <Button type="button" onClick={() => setIsDialogOpen(false)}>Done</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {/* --- End Professional Image Selection Section --- */}

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-100">
                Save as Draft
              </Button>
              <Button type="submit" className="px-6 py-2 bg-orange-500  hover:bg-orange-600 text-white font-semibold">
                ✨ Publish Blog
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;