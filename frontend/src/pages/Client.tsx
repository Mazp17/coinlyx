import { Button, Container, Form, Stack } from "react-bootstrap";

function Client() {
    return (
        <>
            <Container fluid="sm" className="mt-3">
                <Form>
                    <Stack gap={2}>
                        <Form.Group controlId="register.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control size="sm" id="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="register.names">
                            <Form.Label column="sm">Names</Form.Label>
                            <Form.Control size="sm" id="names" type="text" placeholder="Jhon Doe" />
                        </Form.Group>
                        <Form.Group controlId="register.email">
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm" id="email" type="email" placeholder="example@domain.com" />
                        </Form.Group>
                        <Form.Group controlId="register.phone">
                            <Form.Label column="sm">Phone</Form.Label>
                            <Form.Control size="sm" id="phone" type="email" placeholder="3046089301" />
                        </Form.Group>
                        <Button variant="success">
                            Submit
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </>
    );
}

export default Client;