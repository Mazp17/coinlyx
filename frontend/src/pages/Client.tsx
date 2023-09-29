import { useState } from "react";
import { Alert, Button, Container, Form, Stack } from "react-bootstrap";

function Client() {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const handlerSubmit = async (event: Event) => {
        event.preventDefault();

        setIsLoading(true);

        const form = event.target as HTMLFormElement;

        if (!form.checkValidity()) event.stopPropagation();

        const data = {
            document: (form.querySelector("[name='document']") as HTMLInputElement).value,
            names: (form.querySelector("[name='names']") as HTMLInputElement).value,
            phone: (form.querySelector("[name='phone']") as HTMLInputElement).value,
            email: (form.querySelector("[name='email']") as HTMLInputElement).value
        }

        try {
            const response = await fetch("http://localhost:3000/user/register", {
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
            setData(`Se ha registrado el usurio con exito`);
        } catch (err: any) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <>
            <Container fluid="sm" className="mt-3">
                <Form onSubmit={handlerSubmit}>
                    <Stack gap={2}>
                        <Form.Group controlId="register.document">
                            <Form.Label column="sm">Document</Form.Label>
                            <Form.Control size="sm" name="document" type="text" placeholder="123123123" />
                        </Form.Group>
                        <Form.Group controlId="register.names">
                            <Form.Label column="sm">Names</Form.Label>
                            <Form.Control size="sm" name="names" type="text" placeholder="Jhon Doe" />
                        </Form.Group>
                        <Form.Group controlId="register.email">
                            <Form.Label column="sm">Email</Form.Label>
                            <Form.Control size="sm" name="email" type="email" placeholder="example@domain.com" />
                        </Form.Group>
                        <Form.Group controlId="register.phone">
                            <Form.Label column="sm">Phone</Form.Label>
                            <Form.Control size="sm" name="phone" type="text" placeholder="3046089301" />
                        </Form.Group>
                        <Button type="submit" variant="success">
                            Submit
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
    );
}

export default Client;