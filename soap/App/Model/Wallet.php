<?php

namespace App\Model;


class Wallet
{
    private int $id;
    private int $userId;
    private float $balance;

    /**
     * @param int $userId
     * @param float $balance
     */
    public function __construct(int $userId, float $balance = 0)
    {
        $this->userId = $userId;
        $this->balance = $balance;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getUserId(): int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }

    public function getBalance(): float
    {
        return $this->balance;
    }

    public function setBalance(float $balance): void
    {
        $this->balance = $balance;
    }




}
