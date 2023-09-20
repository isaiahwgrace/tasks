import React from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./App.css";

/*
    - add a header
    - add an image w/ alt text
    - add a list w/ at least three elements
    - change the background color of the header area
    - add a bootstrap button with the text "Log Hello World"
    - make the button log "Hello World!" when clicked
    - have a two-column layout on the page somewhere
    - put a red-filled rectangle in each column using a `div` tag 
        w `width`, `height`, and `backgroundColor` styles
*/

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
<<<<<<< HEAD
                UD CISC275 with React Hooks and etc
=======
                UM COS420 with React Hooks and TypeScript
>>>>>>> upstream/task-functions
            </header>

            <h1>new header</h1>

            <img src="../assets/smile.jpg" alt="some strange thing" />

            <ul>
                <li>eenie</li>
                <li>meenie</li>
                <li>meyenie</li>
            </ul>

            <div>
                <Button onClick={() => console.log("Hello World!")}>
                    Log Hello World
                </Button>
            </div>

            <div>
                <Container>
                    <Row>
                        /COS420/i
                        <Col>
                            <div
                                style={{
                                    width: "30px",
                                    height: "20px",
                                    backgroundColor: "red"
                                }}
                            >
                                dog
                            </div>
                        </Col>
                        <Col>
                            <div
                                style={{
                                    width: "30px",
                                    height: "20px",
                                    backgroundColor: "red"
                                }}
                            >
                                cat
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;
