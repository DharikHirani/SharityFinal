import { ShareFill } from "react-bootstrap-icons";
import { FacebookIcon, FacebookShareButton, FacebookShareCount, WhatsappIcon, WhatsappShareButton, TwitterShareButton,TwitterIcon} from "react-share";

const { default: React } = require("react");
const { useState } = require("react");
const { Button, Modal } = require("react-bootstrap");


export default function ShareButton({url}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button
			onClick={handleShow}		
		variant="outline-primary" size="sm" className="ml-2 mb-1"> <ShareFill /> Share
					
		</Button>  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Share links</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
          <FacebookShareButton url={url/* Use google.co.uk for an working example */ } quote={"Hey Check out this Event that i found On FBF!"} className="Demo__some-network__share-button mx-1"> <FacebookIcon size={48} round  /> </FacebookShareButton>  
          <WhatsappShareButton url={url/* Use google.co.uk for an working example */ } quote={"Hey Check out this Event that i found On FBF!"} className="Demo__some-network__share-button mx-1"> <WhatsappIcon size={48} round  /> </WhatsappShareButton>  
          <TwitterShareButton url={url/* Use google.co.uk for an working example */ } quote={"Hey Check out this Event that i found On FBF!"} className="Demo__some-network__share-button mx-1"> <TwitterIcon size={48} round  /> </TwitterShareButton>  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }