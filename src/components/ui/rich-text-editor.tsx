import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface RichTextEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (value: string) => void;
  preview?: boolean;
}

const RichTextEditor = React.forwardRef<HTMLTextAreaElement, RichTextEditorProps>(
  ({ className, value, onChange, preview = true, ...props }, ref) => {
    // Simple HTML preview
    const renderHTML = (html: string) => {
      return { __html: html };
    };

    // Handle text formatting
    const handleFormat = (format: string) => {
      const textarea = ref as React.RefObject<HTMLTextAreaElement>;
      if (!textarea?.current) return;

      const start = textarea.current.selectionStart;
      const end = textarea.current.selectionEnd;
      const selectedText = value.substring(start, end);
      let formattedText = "";

      switch (format) {
        case "bold":
          formattedText = `<strong>${selectedText}</strong>`;
          break;
        case "italic":
          formattedText = `<em>${selectedText}</em>`;
          break;
        case "underline":
          formattedText = `<u>${selectedText}</u>`;
          break;
        case "h1":
          formattedText = `<h1>${selectedText}</h1>`;
          break;
        case "h2":
          formattedText = `<h2>${selectedText}</h2>`;
          break;
        case "h3":
          formattedText = `<h3>${selectedText}</h3>`;
          break;
        case "ul":
          formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
          break;
        case "ol":
          formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`;
          break;
        case "li":
          formattedText = `<li>${selectedText}</li>`;
          break;
        case "p":
          formattedText = `<p>${selectedText}</p>`;
          break;
        default:
          formattedText = selectedText;
      }

      const newValue =
        value.substring(0, start) + formattedText + value.substring(end);
      onChange(newValue);

      // Set cursor position after the inserted text
      setTimeout(() => {
        if (textarea.current) {
          const newPosition = start + formattedText.length;
          textarea.current.focus();
          textarea.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    };

    return (
      <div className="w-full">
        {preview ? (
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-2">
              <div className="flex flex-wrap gap-1 mb-2">
                <button
                  type="button"
                  onClick={() => handleFormat("bold")}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("italic")}
                  className="px-2 py-1 border rounded hover:bg-gray-100 italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("underline")}
                  className="px-2 py-1 border rounded hover:bg-gray-100 underline"
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("h2")}
                  className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("h3")}
                  className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("p")}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("ul")}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  UL
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("ol")}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  OL
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("li")}
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  LI
                </button>
              </div>
              <Textarea
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn("min-h-[200px] font-mono text-sm", className)}
                {...props}
              />
            </TabsContent>
            <TabsContent value="preview">
              <div
                className="border rounded-md p-4 min-h-[200px] prose max-w-none"
                dangerouslySetInnerHTML={renderHTML(value)}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1 mb-2">
              <button
                type="button"
                onClick={() => handleFormat("bold")}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => handleFormat("italic")}
                className="px-2 py-1 border rounded hover:bg-gray-100 italic"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => handleFormat("underline")}
                className="px-2 py-1 border rounded hover:bg-gray-100 underline"
              >
                U
              </button>
              <button
                type="button"
                onClick={() => handleFormat("h2")}
                className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => handleFormat("h3")}
                className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => handleFormat("p")}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                P
              </button>
              <button
                type="button"
                onClick={() => handleFormat("ul")}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                UL
              </button>
              <button
                type="button"
                onClick={() => handleFormat("ol")}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                OL
              </button>
              <button
                type="button"
                onClick={() => handleFormat("li")}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                LI
              </button>
            </div>
            <Textarea
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={cn("min-h-[200px] font-mono text-sm", className)}
              {...props}
            />
          </div>
        )}
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };