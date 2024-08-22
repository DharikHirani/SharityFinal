// import React from "react";
// import { useState } from "react";

// import { Modal, Button, Form, FormLabel } from "react-bootstrap";

// export default function VarifyUser({
//   setIsPasswordValid,
//   userPassword,
//   show,
//   onHide,
// }) {
//   const [password, setPassword] = React.useState("");

//   const handleChange = (e) => {
//     setPassword(e.target.value.trim());
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userPassword === password) {
//       console.log("password matches");
//       setIsPasswordValid(true);
//       onHide();
//     } else {
//       setIsPasswordValid(false);
//     }
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Enter Password To Varify:
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formBasicText">
//             <Form.Group controlId="formBasicPassword">
//               <Form.Label></Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 placeholder={"Password"}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form.Group>
//           <FormLabel>
//             {/* {setIsPasswordValid === false ? <p></p> : <p>password invalid</p>} */}
//           </FormLabel>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={handleSubmit}>Update</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

{
  /* <Form.Label>Firstname:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder={ user.firstName}
              onChange={handleChange}
            />
            <Form.Group controlId="formBasicText">
              <Form.Label>Surname:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder={ user.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder={ user.email}
                onChange={handleChange}
              />
            </Form.Group> */
}
{
  /* <Form.Group controlId="formBasicText">
              <Form.Label>Account Type:</Form.Label>
              <Form.Control
                type="text"
                name="role"
                placeholder={ user.role}
              />
            </Form.Group> */
}
