<?php
namespace App\Model;

class User {
    public int $id;
    public string $document;
    public string $names;
    public string $email;
    public string $phone;

    /**
     * @param string $document
     * @param string $names
     * @param string $email
     * @param string $phone
     */
    public function __construct(string $document, string $names, string $email, string $phone)
    {
        $this->document = $document;
        $this->names = $names;
        $this->email = $email;
        $this->phone = $phone;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getDocument(): string
    {
        return $this->document;
    }

    public function setDocument(string $document): void
    {
        $this->document = $document;
    }

    public function getNames(): string
    {
        return $this->names;
    }

    public function setNames(string $names): void
    {
        $this->names = $names;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getPhone(): string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
    }



}