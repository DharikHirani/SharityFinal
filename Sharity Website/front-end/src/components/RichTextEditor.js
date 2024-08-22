import { useState } from "react";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form } from "react-bootstrap";
import NewsLetterPreview from "./NewsLetterPreview";

export default function RichTextEditor({ user }) {
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [newsletterBody, setNewsletterBody] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="p-2">
        <h1>Add NewsLetter:</h1>
      </div>
      <Form.Control
        placeholder="NewsLetter title"
        onChange={(e) => setNewsletterTitle(e.target.value)}
      ></Form.Control>
      <br></br>
      <Editor
        apiKey="0eaeovfkb8bmjst0r722hei1xehzejcl5hztm0jiibavpkks"
        // initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
          placeholder: "NewsLetter Body",
          menubar: true, //disabled due to lack of image customisation
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={(e) => setNewsletterBody(e)}
      />

      <Button
        variant="primary"
        onClick={() => {
          handleShow();
        }}
        block
        size="lg"
      >
        Preview
      </Button>
      <NewsLetterPreview
        user={user}
        newsletterBody={newsletterBody}
        newsletterTitle={newsletterTitle}
        show={show}
        close={handleClose}
      ></NewsLetterPreview>
    </div>
  );
}
