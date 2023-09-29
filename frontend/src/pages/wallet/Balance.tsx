import { useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";

function Balance() {
    const [data, setData] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleClick = async (event: Event) => {
        event.preventDefault();
        setIsLoading(true);
        const form = event.target as HTMLFormElement;
        if(form.checkValidity() === false) {
            event.stopPropagation();
        }
        const data = {
            document: (form.querySelector("[name='document']") as HTMLInputElement).value,
            phone: (form.querySelector("[name='phone']") as HTMLInputElement)!.value
        };

        try {
            const response = await fetch(`http://localhost:3000/wallet/balance?document=${data.document}&phone=${data.phone}`,
                { mode: "cors" });

            if (!response.ok) {
                throw new Error(`Error: Status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.status) {
                setData(0);
                throw new Error(result.message);
            }

            setErr("");
            setData(result.data.saldo);
        } catch (err: any) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Container fluid="sm" className="mt-3">
                <Form onSubmit={handleClick}>
                    <Stack gap={2}>
                        <Form.Group controlId="balance.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control required name="document" size="sm" type="text" placeholder="123123123" />

                        </Form.Group>
                        <Form.Group controlId="balance.phone">
                            <Form.Label column="sm">Phone</Form.Label>
                            <Form.Control required name="phone" size="sm" type="text" placeholder="3046089301" />

                        </Form.Group>
                        <Button type="submit" variant="success">
                            {isLoading ? "Loading..." : "Get balance"}
                        </Button>
                        {data ? (
                            <Alert variant="success">
                                Your balance is: {data}
                            </Alert>
                        ) : ""}

                        {err ? (
                            <Alert variant="danger">
                                {err}
                            </Alert>
                        ) : ""}

                    </Stack>
                </Form>
            </Container>
        </>
    );
}

export default Balance;