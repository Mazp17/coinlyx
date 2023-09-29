import { Button, Container, Form, Stack } from "react-bootstrap";

function Balance() {
    return (
        <>
            <Container fluid="sm" className="mt-3">
                <Form>
                    <Stack gap={2}>
                        <Form.Group controlId="balance.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control size="sm" id="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="balance.phone">
                            <Form.Label column="sm">Phone</Form.Label>
                            <Form.Control size="sm" id="phone" type="text" placeholder="3046089301" />
                        </Form.Group>
                        <Button variant="success">
                            Get balance
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </>
    );
}

export default Balance;