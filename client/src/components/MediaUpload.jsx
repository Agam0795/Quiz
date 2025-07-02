import React, { useState, useRef } from 'react';
import { Upload, X, Image, Video, File, AlertCircle, Check } from 'lucide-react';
import { uploadImage, uploadVideo, deleteMedia } from '../api';

function MediaUpload({ 
  onUpload, 
  onRemove, 
  acceptedTypes = ['image/*', 'video/*'], 
  maxSize = 10 * 1024 * 1024, // 10MB default
  currentMedia = null,
  placeholder = "Click to upload or drag and drop"
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    setError('');
    
    // Validate file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      setError('Please select an image or video file');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    try {
      setUploading(true);
      
      let response;
      if (isImage) {
        response = await uploadImage(file);
      } else if (isVideo) {
        response = await uploadVideo(file);
      }

      const mediaData = {
        id: response.data.id,
        url: response.data.url,
        type: isImage ? 'image' : 'video',
        filename: file.name,
        size: file.size
      };

      onUpload(mediaData);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = async () => {
    if (currentMedia?.id) {
      try {
        await deleteMedia(currentMedia.id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
    onRemove();
  };

  if (currentMedia) {
    return (
      <div className="relative group">
        <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
          {currentMedia.type === 'image' ? (
            <img 
              src={currentMedia.url} 
              alt="Uploaded content"
              className="w-full h-48 object-cover"
            />
          ) : (
            <video 
              src={currentMedia.url} 
              className="w-full h-48 object-cover"
              controls
            />
          )}
          
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            {currentMedia.type === 'image' ? (
              <Image className="h-4 w-4 mr-1" />
            ) : (
              <Video className="h-4 w-4 mr-1" />
            )}
            {currentMedia.filename}
          </div>
          <div className="text-xs text-gray-400">
            {(currentMedia.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-1">{placeholder}</p>
            <p className="text-xs text-gray-400">
              Images and videos up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 flex items-center text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}

export default MediaUpload;
