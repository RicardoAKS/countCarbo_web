<?php

namespace MyApp;

use Exception;
use SplObjectStorage;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

final class Chat implements MessageComponentInterface
{
    private $clients;

    public function __construct()
    {
        $this->clients     = new SplObjectStorage();
        echo 'Server Started';
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo("\nNew Connection");
        echo("\n".count($this->clients));

        foreach ($this->clients as $client) {

            if($client->httpRequest->getUri()->getQuery() == $conn->httpRequest->getUri()->getQuery() && $client != $conn){
                $client->send(json_encode("open"));
            }
        }
    }

    public function onMessage(ConnectionInterface $from, $message)
    {   
        $countClients = 0;
        foreach ($this->clients as $client) {
            if($client->httpRequest->getUri()->getQuery() == $from->httpRequest->getUri()->getQuery()){
                $countClients++;
            }
        }

        foreach ($this->clients as $client) {

            $clientURL = $client->httpRequest->getUri()->getQuery();
            $chatORlive = explode("=", $clientURL);

            if($chatORlive[0] == "token"){
                if($from != $client){
                    $msg = str_replace('me\"', 'other\"', $message);
                }else{
                    $msg = $message;
                }
                
                if($from == $client || $client->httpRequest->getUri()->getQuery() == $from->httpRequest->getUri()->getQuery()){
                    $client->send($msg);
                    echo("\nMessage Sent");
                    $client->send(json_encode(array(
                        'count' => $countClients
                    )));
                }
                
            }else if($chatORlive[0] == 'live'){

                if($from == $client || $client->httpRequest->getUri()->getQuery() == $from->httpRequest->getUri()->getQuery() . "mylive"){
                    $client->send($message);
                    echo("\nMessage Sent");
                }
                
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo("\nConnection Closed");
    }

    public function onError(ConnectionInterface $conn, Exception $exception)
    {
        $conn->close();
        echo("\nError");
    }
}