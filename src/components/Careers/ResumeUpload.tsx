
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ResumeUploadProps {
  onFileUpload: (url: string, fileName: string) => void;
  currentFile?: string;
}

const ResumeUpload = ({ onFileUpload, currentFile }: ResumeUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { data, error } = await supabase.storage
        .from('job-applications')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('job-applications')
        .getPublicUrl(filePath);

      setFileName(file.name);
      onFileUpload(publicUrl, file.name);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFileName('');
    onFileUpload('', '');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Resume/CV *
      </label>
      
      {!fileName && !currentFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-sm text-gray-600 mb-4">
            <p>Upload your resume (PDF, DOC, DOCX)</p>
            <p className="text-xs text-gray-400">Maximum file size: 5MB</p>
          </div>
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="relative"
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            {uploading ? 'Uploading...' : 'Choose File'}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-700">{fileName || currentFile}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-red-600 hover:text-red-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
