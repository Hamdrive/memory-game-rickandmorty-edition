import React, { useEffect, useState } from "react";
import Cards from "./Cards"

const CardDeck = ({resetScore, updateScore, cardDeckSize }) => {
	const [generatedCards, setGeneratedCards] = useState([]);
	const [userSeenCards, setUserSeenCards] = useState([]);
	const [numberOfCards, setNumberOfCards] = useState(3);
    const [imgURL, setImgURL] = useState([]);

    //Generate array with value of all cards for getting random cards and API
    const allCardsIndex = Array(cardDeckSize).fill().map((_, index) => index + 1);

	//Prepare array of random indexes for character API call
	const generatedRandomCards = () => {
        
        console.log(allCardsIndex)
		let newCardIndexs = [];

		for(let i = allCardsIndex.length - 1; i>0; i--){
            let j = Math.floor(Math.random() * i);
            let k =allCardsIndex[i]
            allCardsIndex[i] = allCardsIndex[j]
            allCardsIndex[j] = k
        }

        for(let i=0; i<numberOfCards; i++){
            let n = allCardsIndex[i];
            // console.log(allCardsIndex)
            newCardIndexs.push(n)
        }

        // console.log(allCardsIndex);
        console.log(newCardIndexs);
        setGeneratedCards(newCardIndexs)
	};

    //Update user seen cards
	const cardClickHandle = (cardnumber) => {
		if (!userSeenCards.includes(cardnumber)) {
			let newUserSeenCards = [...userSeenCards, cardnumber];
            console.log(newUserSeenCards);

			setUserSeenCards(newUserSeenCards);
			updateScore();
		} else {
			resetScore();

		}

        //Generate new stack of cards
        generatedRandomCards();
        
	};
    

    //Mount component on load
    useEffect(()=>{
        generatedRandomCards()
    },[])


	//Obtain characters image from API
	//Try to also implement JS api (https://github.com/afuh/rick-and-morty-api-node)
    useEffect(()=>{
        async function fetchData(){
            const imgsrc = [];
            for(let card of generatedCards){
                const response = await fetch(
					`https://rickandmortyapi.com/api/character/${card}`
				);
                const data = await response.json()
                const charImage = data.image
                console.log(charImage)

                imgsrc.push(charImage)   
            }
            setImgURL(imgsrc);
        }
        fetchData();
    }, [generatedCards])
    
    // console.log(imgURL)




	return (
		<div className="flex flex-row justify-items-center items-center">
			{imgURL.map((imgsrc, index) => {
				return (
					<Cards
						key={index}
						cardnumber={generatedCards[index]}
						imgsrc={imgsrc}
						cardClickHandle={cardClickHandle}
					/>
				);
			})}
		</div>
	);
};

export default CardDeck;
