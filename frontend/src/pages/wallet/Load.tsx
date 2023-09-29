import { useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";

function Load() {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleClick = async (event: Event) => {
        event.preventDefault();

        setIsLoading(true);

        const form = event.target as HTMLFormElement;

        if (!form.checkValidity()) event.stopPropagation();

        const data = {
            document: (form.querySelector("[name='document']") as HTMLInputElement).value,
            phone: (form.querySelector("[name='phone']") as HTMLInputElement).value,
            value: (form.querySelector("[name='value']") as HTMLInputElement).value
        };

        try {
            const response = await fetch("http://localhost:3000/wallet/load", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            if (!result.status) {
                setData("");
                throw new Error(result.message);
            }

            setErr("");
            setData(`Se ha cargado con exito, ahora cuentas con: $${result.data.balance}`);
        } catch (err: any) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Container fluid="sm">
                <Form onSubmit={handleClick}>
                    <Stack gap={2}>
                        <Form.Group controlId="load.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control required size="sm" name="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="load.phone">
                            <Form.Label column="sm">Phone</Form.Label>
                            <Form.Control required size="sm" name="phone" type="text" placeholder="3046089301" />
                        </Form.Group>
                        <Form.Group controlId="load.value">
                            <Form.Label column="sm">Value</Form.Label>
                            <Form.Control required size="sm" name="value" type="number" placeholder="100.0" />
                        </Form.Group>
                        <Button type="submit" variant="success">
                            {isLoading ? "Loading..." : "Load Wallet"}
                        </Button>
                        {data ? (
                            <Alert variant="success">
                                {data}
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
    )
}

export default Load;