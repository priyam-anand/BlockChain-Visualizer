import React from 'react'
import Card from '../Card/card';
import "./Card-Wrapper.css";
import security from "../../Assets/security.png";
import decentral from "../../Assets/decentralize.png";
import tranparent from "../../Assets/tranparency.jpg"
const CardWrapper = () => {
    return (
        <>
        <h1 className="adv-heading">Advantages of BlockChain</h1>
        <div className="main-card-wrapper">
            <div className="card-container">
                <div className="card-container-wrapper">
                    <Card cardTitle={"Enhanced security"} cardText={"Your data is sensitive and crucial, and blockchain can significantly change how your critical information is viewed. By creating a record that can’t be altered and is encrypted end-to-end, blockchain helps prevent fraud and unauthorized activity. Privacy issues can also be addressed on blockchain by anonymizing personal data and using permissions to prevent access. Information is stored across a network of computers rather than a single server, making it difficult for hackers to view data. This can bring a revolution in the world of security"} cardImg={security} />
                </div>
            </div>
            <div className="card-container">
                <div className="card-container-wrapper">
                    <Card cardTitle={"Greater transparency"} cardText={"Without blockchain, each organization has to keep a separate database. Because blockchain uses a distributed ledger, transactions and data are recorded identically in multiple locations. All network participants with permissioned access see the same information at the same time, providing full transparency. All transactions are immutability recorded, and are time- and date-stamped. This enables members to view the entire history of a transaction and virtually eliminates any opportunity for fraud."} cardImg={tranparent} />
                </div>
            </div>
            <div className="card-container">
                <div className="card-container-wrapper">
                    <Card cardTitle={"Decentralization"} cardText={"In the blockchain, decentralization alludes to the transfer of supervision and decision-making from a centralized association (individual, corporation, or group of people) to a dispersed network. Decentralized networks endeavor to decrease the degree of trust that members should put in each other and dissuade their capacity to put forth authority or command over each other in manners that corrupt the potency of the network.Data is essential for social coordination, i.e., for services and information."} 
                    cardImg={decentral}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardWrapper
