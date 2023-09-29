import { Button, Container, Form, Stack } from "react-bootstrap";

function Pay() {
    return (
        <>
            <Container fluid="sm">
                <Form>
                    <Stack gap={2}>
                        <Form.Group controlId="pay.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control size="sm" id="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="pay.value">
                            <Form.Label column="sm">Value</Form.Label>
                            <Form.Control size="sm" id="phone" type="number" placeholder="100.0" />
                        </Form.Group>
                        <Button variant="success">
                            Make Pay
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </>
    )
}

export default Pay;