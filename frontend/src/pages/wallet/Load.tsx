import { Button, Container, Form, Stack } from "react-bootstrap";

function Load() {
    return (
        <>
            <Container fluid="sm">
                <Form>
                    <Stack gap={2}>
                        <Form.Group controlId="load.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control size="sm" id="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="load.phone">
                            <Form.Label column="sm">Phone</Form.Label>
                            <Form.Control size="sm" id="phone" type="text" placeholder="3046089301" />
                        </Form.Group>
                        <Form.Group controlId="load.value">
                            <Form.Label column="sm">Value</Form.Label>
                            <Form.Control size="sm" id="phone" type="number" placeholder="100.0" />
                        </Form.Group>
                        <Button variant="success">
                            Load Wallet
                        </Button>
                    </Stack>
                </Form>
            </Container>
        </>
    )
}

export default Load;